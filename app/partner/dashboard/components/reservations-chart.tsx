'use client';

import type { ReservationStatsDTO } from '../dto/dashboard.dto';

interface ReservationsChartProps {
  data: ReservationStatsDTO[];
}

export function ReservationsChart({ data }: ReservationsChartProps) {
  const maxVal = Math.max(...data.map(d => d.booked + d.cancelled));

  return (
    <div className="bg-white border border-[#E5D5C3] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-[#3d2e1f]">Reservations</h3>
          <p className="text-xs text-slate-500">Statistics of your reservations</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-500" />
            <span className="text-xs text-slate-600">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-lime-400" />
            <span className="text-xs text-slate-600">Cancelled</span>
          </div>
          <select className="text-xs text-slate-500 bg-[#FDFBF7] border border-[#E5D5C3] rounded-lg px-2 py-1">
            <option>Monthly</option>
          </select>
        </div>
      </div>

      <div className="relative h-64 flex items-end justify-between gap-2 px-2">
        {data.map((item, idx) => {
          const bookedHeight = (item.booked / maxVal) * 100;
          const cancelledHeight = (item.cancelled / maxVal) * 100;
          
          return (
            <div key={idx} className="flex-1 flex flex-col items-center group relative">
              <div className="w-full flex flex-col-reverse gap-0.5 max-w-[40px]">
                <div 
                  className="w-full bg-lime-400 rounded-sm transition-all duration-500" 
                  style={{ height: `${cancelledHeight}%` }}
                />
                <div 
                  className="w-full bg-teal-500 rounded-sm transition-all duration-500" 
                  style={{ height: `${bookedHeight}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-3 transform -rotate-45 origin-top-left">{item.date}</span>
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
                <div className="bg-slate-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">
                  Booked: {item.booked}<br/>
                  Cancelled: {item.cancelled}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
