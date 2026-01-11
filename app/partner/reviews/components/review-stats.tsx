'use client';

interface ReviewStatsProps {
  positive: number;
  negative: number;
}

export function ReviewStats({ positive, negative }: ReviewStatsProps) {
  const total = positive + negative;
  const positivePercent = (positive / total) * 100;
  const negativePercent = (negative / total) * 100;

  return (
    <div className="bg-white border border-[#E5D5C3] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-[#3d2e1f]">Review Statistics</h3>
        <select className="text-xs text-slate-500 bg-[#FDFBF7] border border-[#E5D5C3] rounded-lg px-2 py-1">
          <option>Last 7 Days</option>
        </select>
      </div>

      <div className="flex items-end justify-center gap-12 h-48">
        <div className="flex flex-col items-center gap-2 h-full justify-end">
          <div className="relative w-12 bg-slate-100 rounded-t-lg overflow-hidden h-full">
            <div 
              className="absolute bottom-0 w-full bg-teal-500 transition-all duration-1000" 
              style={{ height: `${positivePercent}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-teal-600">Positive</span>
        </div>
        <div className="flex flex-col items-center gap-2 h-full justify-end">
          <div className="relative w-12 bg-slate-100 rounded-t-lg overflow-hidden h-full">
            <div 
              className="absolute bottom-0 w-full bg-lime-400 transition-all duration-1000" 
              style={{ height: `${negativePercent}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-lime-600">Negative</span>
        </div>
      </div>
    </div>
  );
}
