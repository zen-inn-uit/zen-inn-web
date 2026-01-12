'use client';

import type { DashboardStatsDTO } from '../dto/dashboard.dto';

interface StatsCardsProps {
  stats: DashboardStatsDTO;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'New Bookings',
      value: stats.newBookings.value,
      change: stats.newBookings.change,
      isUp: stats.newBookings.isUp,
      icon: (
        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-100',
    },
    {
      title: 'Check-In',
      value: stats.checkIns.value,
      change: stats.checkIns.change,
      isUp: stats.checkIns.isUp,
      icon: (
        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      ),
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100',
    },
    {
      title: 'Check-Out',
      value: stats.checkOuts.value,
      change: stats.checkOuts.change,
      isUp: stats.checkOuts.isUp,
      icon: (
        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100',
    },
    {
      title: 'Total Revenue',
      value: stats.totalRevenue.value,
      change: stats.totalRevenue.change,
      isUp: stats.totalRevenue.isUp,
      icon: (
        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100',
      isCurrency: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <div key={idx} className={`${card.bgColor} border ${card.borderColor} rounded-2xl p-6`}>
          <div className="flex items-start justify-between mb-3">
            <div className="text-sm text-slate-600">{card.title}</div>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              {card.icon}
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-900 mb-2">
            {card.isCurrency && '$'}
            {card.value.toLocaleString()}
          </div>
          <div className={`text-xs flex items-center gap-1 ${card.isUp ? 'text-green-600' : 'text-red-600'}`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {card.isUp ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              )}
            </svg>
            {Math.abs(card.change)}% from last week
          </div>
        </div>
      ))}
    </div>
  );
}
