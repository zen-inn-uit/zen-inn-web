'use client';

import type { RatingBreakdownDTO } from '../dto/review.dto';

interface OverallRatingProps {
  rating: number;
  totalReviews: number;
  breakdown: RatingBreakdownDTO[];
}

export function OverallRating({ rating, totalReviews, breakdown }: OverallRatingProps) {
  return (
    <div className="bg-white border border-[#E5D5C3] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-[#3d2e1f]">Overall Rating</h3>
        <select className="text-xs text-slate-500 bg-[#FDFBF7] border border-[#E5D5C3] rounded-lg px-2 py-1">
          <option>This Week</option>
        </select>
      </div>

      <div className="flex items-start gap-12">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#F1F5F9" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="45" fill="none" stroke="#C9A882" strokeWidth="8" 
                strokeDasharray={`${(rating / 5) * 282.7} 282.7`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-[#3d2e1f]">{rating}</span>
              <span className="text-xs text-slate-400">out of 5</span>
            </div>
          </div>
          <div className="px-3 py-1 bg-lime-200 text-lime-900 text-xs font-bold rounded-full mb-2">Impressive</div>
          <p className="text-xs text-slate-500 text-center">of {totalReviews.toLocaleString()} reviews</p>
        </div>

        <div className="flex-1 space-y-3">
          {breakdown.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">{item.label}</span>
                <span className="font-bold text-[#3d2e1f]">{item.score}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 transition-all duration-1000" 
                  style={{ width: `${(item.score / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
