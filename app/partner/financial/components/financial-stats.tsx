'use client';

import type { FinancialStatsDTO } from '../dto/financial.dto';

interface FinancialStatsProps {
  stats: FinancialStatsDTO;
}

export function FinancialStats({ stats }: FinancialStatsProps) {
  const cards = [
    { 
      label: 'Total Balance', 
      value: stats.totalBalance, 
      change: stats.balanceChange, 
      isUp: stats.balanceChange > 0,
      prefix: '$',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600'
    },
    { 
      label: 'Total Income', 
      value: stats.totalIncome, 
      change: stats.incomeChange, 
      isUp: stats.incomeChange > 0,
      prefix: '$',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600'
    },
    { 
      label: 'Total Expenses', 
      value: stats.totalExpenses, 
      change: stats.expenseChange, 
      isUp: stats.expenseChange > 0,
      prefix: '$',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 ${card.bgColor} rounded-xl flex items-center justify-center ${card.iconColor}`}>
              {card.icon}
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
          
          <div className="text-sm text-slate-500 mb-2">{card.label}</div>
          <div className="text-3xl font-bold text-slate-900 mb-3">
            {card.prefix}{card.value.toLocaleString()}
          </div>
          
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
            card.isUp ? 'bg-lime-100 text-lime-700' : 'bg-red-100 text-red-700'
          }`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {card.isUp ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              )}
            </svg>
            {Math.abs(card.change)}%
            <span className="text-slate-500 ml-1">from last week</span>
          </div>
        </div>
      ))}
    </div>
  );
}
