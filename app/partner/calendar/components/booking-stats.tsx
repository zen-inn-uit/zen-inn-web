'use client';

import { useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, eachDayOfInterval, startOfToday, addDays, isWithinInterval } from 'date-fns';
import { vi } from 'date-fns/locale';

interface BookingStatsProps {
  rooms: any[];
  bookings: any[];
}

export function BookingStats({ rooms, bookings }: BookingStatsProps) {
  // Calculate stats
  const stats = useMemo(() => {
    const today = startOfToday();
    const next30Days = eachDayOfInterval({ start: today, end: addDays(today, 29) });

    let totalRooms = rooms.reduce((sum, r) => sum + r.totalCount, 0);
    let totalRevenue = 0;
    let confirmedBookings = 0;
    let pendingBookings = 0;
    let checkedInBookings = 0;

    bookings.forEach(booking => {
      totalRevenue += booking.totalPrice;
      if (booking.status === 'CONFIRMED') confirmedBookings++;
      if (booking.status === 'PENDING') pendingBookings++;
      if (booking.status === 'CHECKED_IN') checkedInBookings++;
    });

    // Calculate occupancy for next 30 days
    let occupiedRoomNights = 0;
    next30Days.forEach(day => {
      bookings.forEach(booking => {
        if (isWithinInterval(day, { start: new Date(booking.checkIn), end: new Date(booking.checkOut) })) {
          occupiedRoomNights++;
        }
      });
    });

    const totalRoomNights = totalRooms * 30;
    const occupancyRate = totalRoomNights > 0 ? (occupiedRoomNights / totalRoomNights) * 100 : 0;

    return {
      totalBookings: bookings.length,
      confirmedBookings,
      pendingBookings,
      checkedInBookings,
      totalRevenue,
      occupancyRate: Math.round(occupancyRate),
      avgBookingValue: bookings.length > 0 ? totalRevenue / bookings.length : 0,
    };
  }, [rooms, bookings]);

  // Booking status distribution
  const statusData = [
    { name: 'Đã xác nhận', value: stats.confirmedBookings, color: '#10b981' },
    { name: 'Chờ xác nhận', value: stats.pendingBookings, color: '#f59e0b' },
    { name: 'Đang ở', value: stats.checkedInBookings, color: '#3b82f6' },
  ];

  // Revenue by room type
  const revenueByRoom = useMemo(() => {
    const roomRevenue: { [key: string]: number } = {};
    
    bookings.forEach(booking => {
      const room = rooms.find(r => r.id === booking.roomId);
      if (room) {
        roomRevenue[room.name] = (roomRevenue[room.name] || 0) + booking.totalPrice;
      }
    });

    return Object.entries(roomRevenue).map(([name, revenue]) => ({
      name,
      revenue: Math.round(revenue / 1000000), // Convert to millions
    })).sort((a, b) => b.revenue - a.revenue);
  }, [rooms, bookings]);

  // Daily bookings trend (next 14 days)
  const dailyTrend = useMemo(() => {
    const next14Days = eachDayOfInterval({ start: startOfToday(), end: addDays(startOfToday(), 13) });
    
    return next14Days.map(day => {
      const dayBookings = bookings.filter(b => 
        isWithinInterval(day, { start: new Date(b.checkIn), end: new Date(b.checkOut) })
      );

      return {
        date: format(day, 'dd/MM', { locale: vi }),
        bookings: dayBookings.length,
      };
    });
  }, [bookings]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="p-8 space-y-8">
      {/* KPI Cards - Simplified */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{stats.totalBookings}</div>
          <div className="text-xs font-bold text-slate-500 uppercase">Tổng booking</div>
        </div>

        <div className="bg-white border-2 border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
          <div className="text-xs font-bold text-slate-500 uppercase">Doanh thu (VND)</div>
        </div>

        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{stats.occupancyRate}%</div>
          <div className="text-xs font-bold text-slate-500 uppercase">Lấp đầy (30 ngày)</div>
        </div>

        <div className="bg-white border-2 border-orange-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{formatCurrency(stats.avgBookingValue)}</div>
          <div className="text-xs font-bold text-slate-500 uppercase">TB/Booking</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Status Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Trạng thái booking
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {statusData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Bookings Trend */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:col-span-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Xu hướng booking (14 ngày tới)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11, fill: '#64748b' }}
                stroke="#cbd5e1"
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748b' }}
                stroke="#cbd5e1"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: any) => [`${value} booking`, 'Số lượng']}
              />
              <Line 
                type="monotone" 
                dataKey="bookings" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue by Room Type */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Doanh thu theo loại phòng</h3>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-400 rounded"></div>
                <span className="text-xs text-slate-600">Doanh thu (Triệu VND)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[250px] flex items-end justify-between gap-4 px-2">
          {revenueByRoom.map((item, idx) => {
            const maxRevenue = Math.max(...revenueByRoom.map(r => r.revenue), 1);
            const height = (item.revenue / maxRevenue) * 100;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative h-full justify-end">
                <div className="w-full flex justify-center h-full items-end relative">
                  <div 
                    className="w-full max-w-[60px] bg-teal-400 rounded-t-lg transition-all duration-500 hover:opacity-80 relative group/bar" 
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap pointer-events-none z-10">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-teal-300">Doanh thu: {item.revenue}M VND</div>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-500 mt-2 text-center line-clamp-1 w-full" title={item.name}>
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
