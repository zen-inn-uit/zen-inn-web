'use client';

import type { EarningDataDTO } from '../dto/financial.dto';

interface EarningsChartProps {
  data: EarningDataDTO[];
}

export function EarningsChart({ data }: EarningsChartProps) {
  const maxVal = Math.max(...data.flatMap(d => [d.income, d.expense]));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Earnings</h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-teal-400 rounded"></div>
              <span className="text-xs text-slate-600">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-lime-400 rounded"></div>
              <span className="text-xs text-slate-600">Expense</span>
            </div>
          </div>
        </div>
        <button className="px-4 py-2 bg-lime-200 text-lime-900 rounded-lg text-sm font-semibold hover:bg-lime-300 transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          This Year
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="relative h-80 flex items-end justify-between gap-2 px-2">
        {data.map((item, idx) => {
          const incomeHeight = (item.income / maxVal) * 100;
          const expenseHeight = (item.expense / maxVal) * 100;
          const isHovered = false;
          
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative h-full justify-end">
              <div className="w-full flex justify-center gap-1 h-full items-end relative">
                <div 
                  className="flex-1 bg-teal-400 rounded-t-lg transition-all duration-500 hover:opacity-80 relative group/bar" 
                  style={{ height: `${incomeHeight}%` }}
                >
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap pointer-events-none z-10">
                    <div className="font-semibold">{item.month}</div>
                    <div className="text-teal-300">Income: ${item.income.toLocaleString()}</div>
                    <div className="text-lime-300">Expense: ${item.expense.toLocaleString()}</div>
                  </div>
                </div>
                <div 
                  className="flex-1 bg-lime-400 rounded-t-lg transition-all duration-500 hover:opacity-80" 
                  style={{ height: `${expenseHeight}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 mt-2">{item.month}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-slate-500 mb-1">Avg Income</div>
            <div className="text-lg font-bold text-slate-900">
              ${Math.round(data.reduce((acc, d) => acc + d.income, 0) / data.length).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Avg Expense</div>
            <div className="text-lg font-bold text-slate-900">
              ${Math.round(data.reduce((acc, d) => acc + d.expense, 0) / data.length).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Net Profit</div>
            <div className="text-lg font-bold text-teal-600">
              ${(data.reduce((acc, d) => acc + (d.income - d.expense), 0)).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
