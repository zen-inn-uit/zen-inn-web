'use client';

import { useState, useEffect } from 'react';
import { HotelDTO } from '@/app/partner/hotels/dto/hotel.dto';
import { partnerAPI } from '@/lib/api/partner-api';
import { InventoryGrid } from './inventory-grid';
import { format, addDays, startOfToday } from 'date-fns';
import { vi } from 'date-fns/locale';

interface InventoryManagerProps {
  hotels: HotelDTO[];
}

export function InventoryManager({ hotels }: InventoryManagerProps) {
  const [selectedHotelId, setSelectedHotelId] = useState(hotels[0]?.id || '');
  const [startDate, setStartDate] = useState(startOfToday());
  const [inventoryData, setInventoryData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const endDate = addDays(startDate, 14); // Hiển thị 15 ngày một lượt

  const fetchInventory = async () => {
    if (!selectedHotelId) return;
    setIsLoading(true);
    try {
      const data = await partnerAPI.getHotelInventory(
        selectedHotelId,
        format(startDate, 'yyyy-MM-dd'),
        format(endDate, 'yyyy-MM-dd')
      );
      setInventoryData(data);
    } catch (error) {
      console.error('Lỗi khi tải kho phòng:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [selectedHotelId, startDate]);

  const handlePrev = () => setStartDate(addDays(startDate, -15));
  const handleNext = () => setStartDate(addDays(startDate, 15));
  const handleToday = () => setStartDate(startOfToday());

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={selectedHotelId}
              onChange={(e) => setSelectedHotelId(e.target.value)}
              className="pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:border-brand transition-all min-w-[200px]"
            >
              {hotels.map((h) => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
            <button onClick={handlePrev} className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-500 hover:text-brand">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={handleToday} className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-brand transition-all">
              Hôm nay
            </button>
            <button onClick={handleNext} className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-500 hover:text-brand">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-sm font-bold text-slate-900 font-outfit">
            {format(startDate, 'dd MMM', { locale: vi })} - {format(endDate, 'dd MMM, yyyy', { locale: vi })}
          </div>
          <button 
            onClick={fetchInventory}
            className="p-2.5 bg-brand/5 text-brand rounded-xl hover:bg-brand/10 transition-all"
          >
            <svg className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px] relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
              <span className="text-xs font-bold text-slate-500">Đang đồng bộ dữ liệu...</span>
            </div>
          </div>
        )}
        
        {inventoryData.length > 0 ? (
          <InventoryGrid 
            data={inventoryData} 
            startDate={startDate} 
            endDate={endDate}
            onUpdate={fetchInventory}
          />
        ) : !isLoading ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-center p-12">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-200">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
               </svg>
             </div>
             <h3 className="text-lg font-bold text-slate-900 font-outfit">Không tìm thấy phòng nào</h3>
             <p className="text-sm text-slate-500 max-w-xs mt-2 font-medium italic">Bạn cần tạo loại phòng trước khi quản lý kho phòng tại đây.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
