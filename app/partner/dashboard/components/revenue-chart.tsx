'use client';

export function RevenueChart() {
  // Mock data points for the line
  const points = "0,80 20,60 40,75 60,40 80,50 100,30 120,45 140,25 160,35 180,15 200,20";
  
  return (
    <div className="bg-white border border-[#E5D5C3] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-[#3d2e1f]">Revenue</h3>
          <p className="text-xs text-slate-500">Total revenue this year</p>
        </div>
        <select className="text-xs text-slate-500 bg-[#FDFBF7] border border-[#E5D5C3] rounded-lg px-2 py-1">
          <option>2024</option>
        </select>
      </div>

      <div className="relative h-64 w-full">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="20" x2="200" y2="20" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="0" y1="40" x2="200" y2="40" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="0" y1="60" x2="200" y2="60" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="0" y1="80" x2="200" y2="80" stroke="#F1F5F9" strokeWidth="1" />
          
          {/* Main line */}
          <polyline
            fill="none"
            stroke="#14B8A6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
          
          {/* Area under line */}
          <path
            d={`M 0,100 L 0,80 ${points} L 200,100 Z`}
            fill="url(#gradient)"
            opacity="0.2"
          />
          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* X-Axis Labels */}
        <div className="flex justify-between mt-4 text-[10px] text-slate-400">
          <span>Jan</span>
          <span>Mar</span>
          <span>May</span>
          <span>Jul</span>
          <span>Sep</span>
          <span>Nov</span>
        </div>
      </div>
    </div>
  );
}
