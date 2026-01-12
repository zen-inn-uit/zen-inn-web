'use client';

import { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, eachDayOfInterval, startOfToday, addDays, subDays, isWeekend } from 'date-fns';
import { vi } from 'date-fns/locale';

interface InventoryOverviewProps {
  hotelId: string;
  inventoryData: any[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function InventoryOverview({ hotelId, inventoryData, isLoading, onRefresh }: InventoryOverviewProps) {
  // Calculate KPIs
  const kpis = useMemo(() => {
    if (!inventoryData.length) return { occupancyRate: 0, totalRevenue: 0, adr: 0, revpar: 0, availableRooms: 0, totalRooms: 0 };

    const today = startOfToday();
    const next30Days = eachDayOfInterval({ start: today, end: addDays(today, 30) });

    let totalRooms = 0;
    let totalAvailable = 0;
    let totalRevenue = 0;
    let bookedRooms = 0;

    inventoryData.forEach(room => {
      totalRooms += room.totalCount;
      
      next30Days.forEach(day => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const inv = room.inventory?.find((i: any) => format(new Date(i.date), 'yyyy-MM-dd') === dateStr);
        const available = inv?.available ?? room.totalCount;
        const price = inv?.price ?? room.basePrice;
        
        totalAvailable += available;
        const booked = room.totalCount - available;
        bookedRooms += booked;
        totalRevenue += booked * price;
      });
    });

    const totalRoomNights = totalRooms * 30;
    const occupancyRate = totalRoomNights > 0 ? ((totalRoomNights - totalAvailable) / totalRoomNights) * 100 : 0;
    const adr = bookedRooms > 0 ? totalRevenue / bookedRooms : 0;
    const revpar = totalRoomNights > 0 ? totalRevenue / totalRoomNights : 0;

    return {
      occupancyRate: Math.round(occupancyRate),
      totalRevenue,
      adr: Math.round(adr),
      revpar: Math.round(revpar),
      availableRooms: Math.round(totalAvailable / 30),
      totalRooms,
    };
  }, [inventoryData]);

  // Prepare chart data - Occupancy Trend (30 days)
  const occupancyTrendData = useMemo(() => {
    if (!inventoryData.length) return [];

    const today = startOfToday();
    const next30Days = eachDayOfInterval({ start: today, end: addDays(today, 29) });

    return next30Days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      let totalRooms = 0;
      let totalAvailable = 0;

      inventoryData.forEach(room => {
        totalRooms += room.totalCount;
        const inv = room.inventory?.find((i: any) => format(new Date(i.date), 'yyyy-MM-dd') === dateStr);
        totalAvailable += inv?.available ?? room.totalCount;
      });

      const occupancy = totalRooms > 0 ? ((totalRooms - totalAvailable) / totalRooms) * 100 : 0;

      return {
        date: format(day, 'dd/MM', { locale: vi }),
        occupancy: Math.round(occupancy),
        isWeekend: isWeekend(day),
      };
    });
  }, [inventoryData]);

  // Revenue by Room Type
  const revenueByRoomData = useMemo(() => {
    if (!inventoryData.length) return [];

    return inventoryData.map(room => {
      const today = startOfToday();
      const next30Days = eachDayOfInterval({ start: today, end: addDays(today, 29) });

      let revenue = 0;
      next30Days.forEach(day => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const inv = room.inventory?.find((i: any) => format(new Date(i.date), 'yyyy-MM-dd') === dateStr);
        const available = inv?.available ?? room.totalCount;
        const price = inv?.price ?? room.basePrice;
        const booked = room.totalCount - available;
        revenue += booked * price;
      });

      return {
        name: room.name,
        revenue: Math.round(revenue / 1000000), // Convert to millions
      };
    }).sort((a, b) => b.revenue - a.revenue);
  }, [inventoryData]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
          <span className="text-sm font-bold text-slate-500">Đang tải dữ liệu...</span>
        </div>
      </div>
    );
  }

  if (!inventoryData.length) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-200">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 font-outfit mb-2">Chưa có dữ liệu</h3>
        <p className="text-sm text-slate-500 max-w-md">Vui lòng tạo phòng cho khách sạn này để xem báo cáo.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-900 mb-1">{kpis.occupancyRate}%</div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Tỷ lệ lấp đầy (30 ngày)</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-900 mb-1">{(kpis.totalRevenue / 1000000).toFixed(1)}M</div>
          <div className="text-xs font-bold text-green-600 uppercase tracking-wider">Doanh thu dự kiến (VND)</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-900 mb-1">{formatCurrency(kpis.adr)}</div>
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">ADR (Giá TB/Phòng)</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-orange-900 mb-1">{kpis.availableRooms}/{kpis.totalRooms}</div>
          <div className="text-xs font-bold text-orange-600 uppercase tracking-wider">Phòng trống TB/Ngày</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Trend */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Xu hướng lấp đầy (30 ngày tới)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={occupancyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11, fill: '#64748b' }}
                stroke="#cbd5e1"
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748b' }}
                stroke="#cbd5e1"
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: 'none', 
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#fff'
                }}
                formatter={(value: any) => [`${value}%`, 'Lấp đầy']}
              />
              <Line 
                type="monotone" 
                dataKey="occupancy" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Room Type */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Doanh thu theo loại phòng (Triệu VND)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByRoomData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: '#64748b' }}
                stroke="#cbd5e1"
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748b' }}
                stroke="#cbd5e1"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: 'none', 
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#fff'
                }}
                formatter={(value: any) => [`${value}M VND`, 'Doanh thu']}
              />
              <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Thông tin nhanh</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 mb-1">Hiệu suất</div>
              <div className="text-sm font-bold text-slate-900">
                {kpis.occupancyRate >= 70 ? 'Tốt - Tỷ lệ lấp đầy cao' : kpis.occupancyRate >= 50 ? 'Trung bình - Cần tối ưu giá' : 'Thấp - Cần chiến dịch marketing'}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 mb-1">Doanh thu/Phòng</div>
              <div className="text-sm font-bold text-slate-900">{formatCurrency(kpis.revpar)}/ngày (RevPAR)</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 mb-1">Khuyến nghị</div>
              <div className="text-sm font-bold text-slate-900">
                {kpis.occupancyRate < 50 ? 'Giảm giá cuối tuần để kích cầu' : 'Tăng giá ngày lễ để tối ưu doanh thu'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
