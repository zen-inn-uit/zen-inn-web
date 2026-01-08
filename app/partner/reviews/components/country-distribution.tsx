'use client';

import { motion } from 'framer-motion';
import type { CountryReviewDTO } from '../dto/review.dto';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const ReviewMap = dynamic(() => import('./review-map-client'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#FDFBF7] animate-pulse flex items-center justify-center">
      <div className="text-slate-400 text-sm font-medium">Loading Map...</div>
    </div>
  )
});

interface CountryDistributionProps {
  data: CountryReviewDTO[];
}

export function CountryDistribution({ data }: CountryDistributionProps) {
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | undefined>(undefined);

  const handleCountryClick = (item: CountryReviewDTO) => {
    if (item.lat !== undefined && item.lng !== undefined) {
      setSelectedLocation([item.lat, item.lng]);
    }
  };

  return (
    <div className="bg-white border border-[#E5D5C3] rounded-2xl p-6">
      <h3 className="text-lg font-bold text-[#3d2e1f] mb-8">Reviews by Country</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-video relative rounded-xl overflow-hidden shadow-inner">
          <ReviewMap data={data} selectedLocation={selectedLocation} />
          
          <div className="absolute bottom-6 left-6 z-[1000] flex items-center gap-4 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-[#E5D5C3] shadow-lg pointer-events-none">
            <div className="text-center px-2">
              <div className="text-2xl font-bold text-[#3D2E1F]">17,850</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total Reviews</div>
            </div>
            <div className="w-px h-10 bg-[#E5D5C3]" />
            <div className="text-center px-2">
              <div className="text-2xl font-bold text-teal-600">84%</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Positive Sentiment</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {data.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => handleCountryClick(item)}
              className="flex items-center justify-between group cursor-pointer hover:bg-[#FDFBF7] p-2 -mx-2 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  selectedLocation && selectedLocation[0] === item.lat && selectedLocation[1] === item.lng
                    ? 'bg-brand text-white border-brand'
                    : 'text-slate-400 group-hover:bg-brand group-hover:text-white group-hover:border-brand'
                }`}>
                  {item.country.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#3d2e1f]">{item.country}</div>
                  <div className="text-[10px] text-slate-400">{item.count.toLocaleString()} visits this month</div>
                </div>
              </div>
              <div className="flex items-center gap-4 min-w-[140px]">
                <span className="text-xs font-bold text-teal-600 w-10 text-right">{item.percentage}%</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="h-full bg-teal-500 rounded-full group-hover:bg-teal-400 transition-colors" 
                  />
                </div>
              </div>
            </div>
          ))}
          <button 
            onClick={() => setSelectedLocation([20, 0])} 
            className="w-full mt-4 py-3 text-xs font-bold text-[#6B5B3D] border border-dashed border-[#C9A882] rounded-xl hover:bg-[#FDFBF7] transition-colors"
          >
            Reset World View
          </button>
        </div>
      </div>
    </div>
  );
}
