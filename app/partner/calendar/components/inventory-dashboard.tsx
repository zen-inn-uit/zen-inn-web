'use client';

import { useState, useEffect } from 'react';
import { HotelDTO } from '@/app/partner/hotels/dto/hotel.dto';
import { partnerAPI } from '@/lib/api/partner-api';
import { format, addDays, startOfToday, eachDayOfInterval, subDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import { InventoryOverview } from './inventory-overview';
import { InventoryManager } from './inventory-manager';
import { BulkOperations } from './bulk-operations';

interface InventoryDashboardProps {
  hotels: HotelDTO[];
}

type TabType = 'overview' | 'calendar' | 'bulk';

export function InventoryDashboard({ hotels }: InventoryDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedHotelId, setSelectedHotelId] = useState(hotels[0]?.id || '');
  const [inventoryData, setInventoryData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const startDate = subDays(startOfToday(), 7); // 7 ngày trước
  const endDate = addDays(startOfToday(), 30); // 30 ngày sau

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
  }, [selectedHotelId]);

  const tabs = [
    { id: 'overview' as TabType, label: 'Tổng quan', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'calendar' as TabType, label: 'Lịch phòng', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'bulk' as TabType, label: 'Điều chỉnh hàng loạt', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
  ];

  return (
    <div className="space-y-6">
      {/* Hotel Selector */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Khách sạn:</span>
          <div className="relative">
            <select
              value={selectedHotelId}
              onChange={(e) => setSelectedHotelId(e.target.value)}
              className="pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:border-brand transition-all min-w-[250px]"
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
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50/50">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-bold transition-all relative flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-brand bg-white'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <InventoryOverview 
              hotelId={selectedHotelId}
              inventoryData={inventoryData}
              isLoading={isLoading}
              onRefresh={fetchInventory}
            />
          )}
          {activeTab === 'calendar' && (
            <InventoryManager hotels={hotels} />
          )}
          {activeTab === 'bulk' && (
            <BulkOperations 
              hotelId={selectedHotelId}
              inventoryData={inventoryData}
              onUpdate={fetchInventory}
            />
          )}
        </div>
      </div>
    </div>
  );
}
