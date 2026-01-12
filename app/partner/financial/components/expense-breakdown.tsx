'use client';

import type { ExpenseBreakdownDTO } from '../dto/financial.dto';

interface ExpenseBreakdownProps {
  data: ExpenseBreakdownDTO[];
}

export function ExpenseBreakdown({ data }: ExpenseBreakdownProps) {
  const total = data.reduce((acc, item) => acc + item.amount, 0);

  const colors = [
    'rgb(134, 239, 172)',
    'rgb(163, 230, 53)',
    'rgb(217, 249, 157)',
    'rgb(254, 240, 138)',
    'rgb(253, 224, 71)',
    'rgb(252, 211, 77)',
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-slate-900">Expense Breakdown</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors">
            Income
          </button>
          <button className="px-3 py-1.5 bg-lime-200 text-lime-900 text-xs font-semibold rounded-lg">
            Expense
          </button>
        </div>
      </div>

      <div className="relative w-56 h-56 mx-auto mb-8">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {data.reduce((acc, item, idx) => {
            const start = acc.end;
            const end = start + (item.percentage / 100) * 360;
            const x1 = Number((50 + 40 * Math.cos((start * Math.PI) / 180)).toFixed(2));
            const y1 = Number((50 + 40 * Math.sin((start * Math.PI) / 180)).toFixed(2));
            const x2 = Number((50 + 40 * Math.cos((end * Math.PI) / 180)).toFixed(2));
            const y2 = Number((50 + 40 * Math.sin((end * Math.PI) / 180)).toFixed(2));
            const largeArc = end - start > 180 ? 1 : 0;
            
            acc.elements.push(
              <path
                key={idx}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={colors[idx % colors.length]}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            );
            acc.end = end;
            return acc;
          }, { elements: [] as any[], end: 0 }).elements}
          <circle cx="50" cy="50" r="28" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">${total.toLocaleString()}</div>
            <div className="text-xs text-slate-500">Total Expense</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm hover:bg-slate-50 p-2 rounded-lg transition-colors cursor-pointer">
            <div className="flex items-center gap-3 flex-1">
              <div 
                className="w-3 h-3 rounded-sm flex-shrink-0" 
                style={{ backgroundColor: colors[idx % colors.length] }}
              />
              <span className="text-slate-700 font-medium">{item.category}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-500 text-xs">({item.percentage}%)</span>
              <span className="font-bold text-slate-900 min-w-[80px] text-right">
                ${item.amount.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
