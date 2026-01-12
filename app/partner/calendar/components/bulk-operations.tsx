'use client';

import { useState } from 'react';
import { partnerAPI } from '@/lib/api/partner-api';
import { format, addDays, startOfToday, eachDayOfInterval, isWeekend } from 'date-fns';
import { vi } from 'date-fns/locale';

interface BulkOperationsProps {
  hotelId: string;
  inventoryData: any[];
  onUpdate: () => void;
}

type OperationType = 'price' | 'stopSell' | 'availability';
type DatePattern = 'all' | 'weekdays' | 'weekends' | 'custom';

export function BulkOperations({ hotelId, inventoryData, onUpdate }: BulkOperationsProps) {
  const [operationType, setOperationType] = useState<OperationType>('price');
  const [datePattern, setDatePattern] = useState<DatePattern>('all');
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([]);
  const [priceAdjustment, setPriceAdjustment] = useState<{ type: 'percent' | 'fixed', value: number }>({ type: 'percent', value: 0 });
  const [stopSellValue, setStopSellValue] = useState(false);
  const [availabilityValue, setAvailabilityValue] = useState(0);
  const [customStartDate, setCustomStartDate] = useState(format(startOfToday(), 'yyyy-MM-dd'));
  const [customEndDate, setCustomEndDate] = useState(format(addDays(startOfToday(), 7), 'yyyy-MM-dd'));
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleRoomSelection = (roomId: string) => {
    setSelectedRoomIds(prev =>
      prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId]
    );
  };

  const selectAllRooms = () => {
    setSelectedRoomIds(inventoryData.map(r => r.id));
  };

  const clearSelection = () => {
    setSelectedRoomIds([]);
  };

  const getDatesForPattern = () => {
    const start = datePattern === 'custom' ? new Date(customStartDate) : startOfToday();
    const end = datePattern === 'custom' ? new Date(customEndDate) : addDays(startOfToday(), 30);
    const allDates = eachDayOfInterval({ start, end });

    if (datePattern === 'weekdays') {
      return allDates.filter(d => !isWeekend(d));
    } else if (datePattern === 'weekends') {
      return allDates.filter(d => isWeekend(d));
    }
    return allDates;
  };

  const handleApply = async () => {
    if (selectedRoomIds.length === 0) {
      alert('Vui lòng chọn ít nhất một loại phòng');
      return;
    }

    setIsProcessing(true);
    try {
      const dates = getDatesForPattern();
      
      for (const roomId of selectedRoomIds) {
        const room = inventoryData.find(r => r.id === roomId);
        if (!room) continue;

        const updates = dates.map(date => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const inv = room.inventory?.find((i: any) => format(new Date(i.date), 'yyyy-MM-dd') === dateStr);
          const currentPrice = inv?.price ?? room.basePrice;
          const currentAvailable = inv?.available ?? room.totalCount;

          const update: any = { date: dateStr };

          if (operationType === 'price') {
            if (priceAdjustment.type === 'percent') {
              update.price = Math.round(currentPrice * (1 + priceAdjustment.value / 100));
            } else {
              update.price = Math.round(currentPrice + priceAdjustment.value);
            }
          } else if (operationType === 'stopSell') {
            update.isStopSell = stopSellValue;
          } else if (operationType === 'availability') {
            update.available = availabilityValue;
          }

          return update;
        });

        await partnerAPI.bulkUpdateInventory(roomId, updates);
      }

      alert('Cập nhật thành công!');
      onUpdate();
    } catch (error) {
      console.error('Lỗi khi cập nhật hàng loạt:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Operation Type Selection */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Loại thao tác</h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setOperationType('price')}
            className={`p-4 rounded-xl border-2 transition-all ${
              operationType === 'price'
                ? 'border-brand bg-brand/5 text-brand'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-xs font-bold">Điều chỉnh giá</div>
          </button>
          <button
            onClick={() => setOperationType('stopSell')}
            className={`p-4 rounded-xl border-2 transition-all ${
              operationType === 'stopSell'
                ? 'border-brand bg-brand/5 text-brand'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <div className="text-xs font-bold">Đóng/Mở bán</div>
          </button>
          <button
            onClick={() => setOperationType('availability')}
            className={`p-4 rounded-xl border-2 transition-all ${
              operationType === 'availability'
                ? 'border-brand bg-brand/5 text-brand'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <div className="text-xs font-bold">Số lượng phòng</div>
          </button>
        </div>
      </div>

      {/* Date Pattern */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Áp dụng cho</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            { id: 'all', label: 'Tất cả ngày (30 ngày)' },
            { id: 'weekdays', label: 'Chỉ ngày thường' },
            { id: 'weekends', label: 'Chỉ cuối tuần' },
            { id: 'custom', label: 'Tùy chỉnh' },
          ].map(pattern => (
            <button
              key={pattern.id}
              onClick={() => setDatePattern(pattern.id as DatePattern)}
              className={`px-4 py-3 rounded-xl border-2 text-xs font-bold transition-all ${
                datePattern === pattern.id
                  ? 'border-brand bg-brand/5 text-brand'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {pattern.label}
            </button>
          ))}
        </div>

        {datePattern === 'custom' && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2">Từ ngày</label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2">Đến ngày</label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-brand"
              />
            </div>
          </div>
        )}
      </div>

      {/* Room Selection */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Chọn loại phòng</h3>
          <div className="flex gap-2">
            <button
              onClick={selectAllRooms}
              className="px-3 py-1.5 text-xs font-bold text-brand hover:bg-brand/5 rounded-lg transition-all"
            >
              Chọn tất cả
            </button>
            <button
              onClick={clearSelection}
              className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-all"
            >
              Bỏ chọn
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {inventoryData.map(room => (
            <button
              key={room.id}
              onClick={() => toggleRoomSelection(room.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedRoomIds.includes(room.id)
                  ? 'border-brand bg-brand/5'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  selectedRoomIds.includes(room.id) ? 'border-brand bg-brand' : 'border-slate-300'
                }`}>
                  {selectedRoomIds.includes(room.id) && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-bold text-slate-900">{room.name}</span>
              </div>
              <div className="text-xs text-slate-500">{room.totalCount} phòng</div>
            </button>
          ))}
        </div>
      </div>

      {/* Operation Value */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Giá trị điều chỉnh</h3>
        
        {operationType === 'price' && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <button
                onClick={() => setPriceAdjustment({ ...priceAdjustment, type: 'percent' })}
                className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                  priceAdjustment.type === 'percent'
                    ? 'border-brand bg-brand/5 text-brand'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                Theo phần trăm (%)
              </button>
              <button
                onClick={() => setPriceAdjustment({ ...priceAdjustment, type: 'fixed' })}
                className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                  priceAdjustment.type === 'fixed'
                    ? 'border-brand bg-brand/5 text-brand'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                Số tiền cố định (VND)
              </button>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2">
                {priceAdjustment.type === 'percent' ? 'Tăng/Giảm (%)' : 'Tăng/Giảm (VND)'}
              </label>
              <input
                type="number"
                value={priceAdjustment.value}
                onChange={(e) => setPriceAdjustment({ ...priceAdjustment, value: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand font-bold text-lg"
                placeholder={priceAdjustment.type === 'percent' ? 'VD: 20 (tăng 20%)' : 'VD: 100000'}
              />
              <p className="text-xs text-slate-500 mt-2 italic">
                {priceAdjustment.type === 'percent' 
                  ? 'Số dương để tăng giá, số âm để giảm giá. VD: 20 = tăng 20%, -10 = giảm 10%'
                  : 'Số dương để tăng giá, số âm để giảm giá. VD: 100000 = tăng 100k, -50000 = giảm 50k'}
              </p>
            </div>
          </div>
        )}

        {operationType === 'stopSell' && (
          <div className="flex gap-3">
            <button
              onClick={() => setStopSellValue(true)}
              className={`flex-1 px-4 py-4 rounded-xl border-2 text-sm font-bold transition-all ${
                stopSellValue
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Đóng bán
            </button>
            <button
              onClick={() => setStopSellValue(false)}
              className={`flex-1 px-4 py-4 rounded-xl border-2 text-sm font-bold transition-all ${
                !stopSellValue
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mở bán
            </button>
          </div>
        )}

        {operationType === 'availability' && (
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2">Số phòng trống</label>
            <input
              type="number"
              value={availabilityValue}
              onChange={(e) => setAvailabilityValue(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand font-bold text-lg"
              placeholder="VD: 5"
              min="0"
            />
          </div>
        )}
      </div>

      {/* Apply Button */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleApply}
          disabled={isProcessing || selectedRoomIds.length === 0}
          className="px-8 py-4 bg-brand text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-brand/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              Đang xử lý...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Áp dụng thay đổi
            </>
          )}
        </button>
      </div>
    </div>
  );
}
