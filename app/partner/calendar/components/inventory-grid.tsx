'use client';

import React, { useState } from 'react';
import { format, eachDayOfInterval, isWeekend } from 'date-fns';
import { vi } from 'date-fns/locale';
import { partnerAPI } from '@/lib/api/partner-api';

interface InventoryGridProps {
  data: any[];
  startDate: Date;
  endDate: Date;
  onUpdate: () => void;
}

export function InventoryGrid({ data, startDate, endDate, onUpdate }: InventoryGridProps) {
  const [editingCell, setEditingCell] = useState<{ roomId: string, date: string, type: 'price' | 'available' } | null>(null);
  const [tempValue, setTempValue] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getInventoryForDate = (roomInventory: any[], date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return roomInventory.find(inv => format(new Date(inv.date), 'yyyy-MM-dd') === dateStr);
  };

  const handleCellClick = (roomId: string, date: Date, type: 'price' | 'available', currentVal: number) => {
    setEditingCell({ roomId, date: format(date, 'yyyy-MM-dd'), type });
    setTempValue(currentVal.toString());
  };

  const handleSave = async () => {
    if (!editingCell) return;
    setIsSaving(true);
    try {
      const update = {
        date: editingCell.date,
        [editingCell.type]: parseInt(tempValue) || 0
      };
      await partnerAPI.bulkUpdateInventory(editingCell.roomId, [update]);
      onUpdate();
      setEditingCell(null);
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleStopSell = async (roomId: string, date: Date, currentStatus: boolean) => {
    try {
      await partnerAPI.bulkUpdateInventory(roomId, [{
        date: format(date, 'yyyy-MM-dd'),
        isStopSell: !currentStatus
      }]);
      onUpdate();
    } catch (error) {
      console.error('Lỗi khi toggle stop sell:', error);
    }
  };

  const formatPrice = (price: number) => {
    return (price / 1000).toFixed(0) + 'k';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="sticky left-0 bg-slate-50 z-20 p-4 text-left border-r border-slate-200 min-w-[200px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loại phòng / Ngày</span>
            </th>
            {days.map((day: Date) => (
              <th key={day.toString()} className={`p-3 border-r border-slate-200 min-w-[80px] ${isWeekend(day) ? 'bg-slate-100/50' : ''}`}>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">
                  {format(day, 'EEE', { locale: vi })}
                </div>
                <div className={`text-sm font-bold ${isWeekend(day) ? 'text-brand' : 'text-slate-700'}`}>
                  {format(day, 'dd/MM')}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((room) => {
            const rows = [
              { label: 'Trống', type: 'available', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { label: 'Giá (k)', type: 'price', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { label: 'Đóng bán', type: 'status', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' }
            ];

            return (
              <React.Fragment key={room.id}>
                {/* Room Category Header */}
                <tr className="bg-slate-50/30">
                  <td colSpan={days.length + 1} className="p-3 pl-4 border-b border-slate-200">
                    <span className="text-sm font-bold text-slate-900 font-outfit">{room.name}</span>
                    <span className="ml-3 text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full uppercase">{room.roomType}</span>
                  </td>
                </tr>

                {rows.map((row) => (
                  <tr key={row.type} className="hover:bg-slate-50 transition-colors group/room">
                    <td className="sticky left-0 bg-white group-hover/room:bg-slate-50 z-20 p-3 pl-6 border-r border-b border-slate-200 flex items-center gap-2 text-xs font-medium text-slate-500">
                       <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={row.icon} />
                       </svg>
                       {row.label}
                    </td>
                    {days.map((day: Date) => {
                      const inv = getInventoryForDate(room.inventory, day);
                      const isSelected = editingCell?.roomId === room.id && editingCell?.date === format(day, 'yyyy-MM-dd') && editingCell?.type === row.type;
                      
                      const val = row.type === 'available' 
                        ? (inv?.available ?? room.totalCount) 
                        : (inv?.price ?? room.basePrice);

                      if (row.type === 'status') {
                        return (
                          <td key={day.toString()} className="p-0 border-r border-b border-slate-200 text-center align-middle">
                            <button 
                              onClick={() => toggleStopSell(room.id, day, inv?.isStopSell || false)}
                              className={`w-full h-full py-3 flex justify-center transition-all ${inv?.isStopSell ? 'bg-red-50 text-red-500' : 'text-slate-200 hover:text-slate-400'}`}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>
                            </button>
                          </td>
                        );
                      }

                      return (
                        <td 
                          key={day.toString()} 
                          className={`p-0 border-r border-b border-slate-200 cursor-pointer group/cell relative ${inv?.isStopSell ? 'bg-red-50/30' : ''}`}
                          onClick={() => handleCellClick(room.id, day, row.type as any, val)}
                        >
                          {isSelected ? (
                            <input
                              autoFocus
                              type="number"
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              onBlur={handleSave}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSave();
                                if (e.key === 'Escape') setEditingCell(null);
                              }}
                              className="w-full h-full absolute inset-0 text-center font-bold text-xs focus:ring-2 focus:ring-brand focus:outline-none z-30"
                            />
                          ) : (
                            <div className={`py-4 text-center text-xs font-bold transition-all ${
                              row.type === 'price' ? 'text-brand' : 'text-slate-600'
                            } ${inv?.isStopSell ? 'opacity-30' : ''}`}>
                              {row.type === 'price' ? formatPrice(val) : val}
                              {/* Hover indicator */}
                              <div className="absolute top-1 right-1 opacity-0 group-hover/cell:opacity-100 transition-opacity">
                                <svg className="w-2.5 h-2.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
