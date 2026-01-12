'use client';

import type { RoomAvailabilityDTO } from '../dto/dashboard.dto';

interface RoomAvailabilityProps {
  data: RoomAvailabilityDTO;
}

export function RoomAvailability({ data }: RoomAvailabilityProps) {
  const total = data.occupied + data.reserved + data.available + data.notReady;
  
  const segments = [
    { label: 'Occupied', value: data.occupied, color: 'bg-teal-500', textColor: 'text-teal-600' },
    { label: 'Reserved', value: data.reserved, color: 'bg-lime-400', textColor: 'text-lime-600' },
    { label: 'Available', value: data.available, color: 'bg-[#C9A882]', textColor: 'text-[#C9A882]' },
    { label: 'Not Ready', value: data.notReady, color: 'bg-slate-200', textColor: 'text-slate-400' },
  ];

  return (
    <div className="bg-white border border-[#E5D5C3] rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#3d2e1f]">Room Availability</h3>
        <select className="text-xs text-slate-500 bg-transparent border-none focus:ring-0">
          <option>Today</option>
        </select>
      </div>

      <div className="flex items-center justify-center mb-8">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {segments.reduce((acc, segment, idx) => {
              const start = acc.end;
              const end = start + (segment.value / total) * 360;
              const x1 = 50 + 40 * Math.cos((start * Math.PI) / 180);
              const y1 = 50 + 40 * Math.sin((start * Math.PI) / 180);
              const x2 = 50 + 40 * Math.cos((end * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin((end * Math.PI) / 180);
              const largeArc = end - start > 180 ? 1 : 0;
              
              acc.elements.push(
                <path
                  key={idx}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill="none"
                  stroke={segment.color.replace('bg-', '')}
                  className={segment.color.includes('teal') ? 'fill-teal-500' : segment.color.includes('lime') ? 'fill-lime-400' : segment.color.includes('[#C9A882]') ? 'fill-[#C9A882]' : 'fill-slate-200'}
                />
              );
              acc.end = end;
              return acc;
            }, { elements: [] as any[], end: 0 }).elements}
            <circle cx="50" cy="50" r="30" fill="white" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-slate-900">{total}</div>
            <div className="text-[10px] text-slate-500">Total Rooms</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-4">
        {segments.map((segment, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${segment.color}`} />
            <div>
              <div className="text-xs text-slate-500">{segment.label}</div>
              <div className={`text-sm font-bold ${segment.textColor}`}>{segment.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
