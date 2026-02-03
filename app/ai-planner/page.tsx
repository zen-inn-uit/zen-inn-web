'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import { TripInputForm } from '../../components/ai-planner/TripInputForm';
import { ItineraryView } from '../../components/ai-planner/ItineraryView';
import { Trip } from '../../types/ai-planner/trip.types';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import { MOCK_TRIP } from '@/types/ai-planner/trip.mock';

export default function AIPlannerPage() {
  const [generatedTrip, setGeneratedTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTripGenerated = (trip: Trip) => {
    setGeneratedTrip(trip);
    setIsLoading(false);
  };

  const showSample = () => {
    setIsLoading(true);
    setTimeout(() => {
      setGeneratedTrip(MOCK_TRIP);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-[1440px] mx-auto bg-white min-h-screen shadow-sm">
        <Navbar showSearch={false} />
        
        <main className="px-6 py-10 md:px-20">
          <div className="max-w-6xl mx-auto">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">AI Lên Kế Hoạch Chuyến Đi</h1>
                <p className="text-slate-500 text-lg">
                  Chuyến đi mơ ước của bạn, được lên kế hoạch trong vài giây. Chỉ cần cho tôi biết ý tưởng của bạn.
                </p>
              </div>
              {!generatedTrip && (
                <button 
                  onClick={showSample}
                  className="px-6 py-3 border border-slate-200 rounded-2xl text-slate-600 font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <Sparkles size={18} className="text-[#6B5B3D]" />
                  Xem chuyến đi mẫu
                </button>
              )}
            </header>

            <AnimatePresence mode="wait">
              {!generatedTrip ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <TripInputForm 
                    onLoading={setIsLoading} 
                    onGenerated={handleTripGenerated} 
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="itinerary"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="mb-8 flex justify-between items-center">
                    <button 
                      onClick={() => setGeneratedTrip(null)}
                      className="text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                      </svg>
                      Quay lại trang lên kế hoạch
                    </button>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 border rounded-full hover:bg-slate-50 transition-colors">Chia sẻ</button>
                      <button className="px-4 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors">Lưu lịch trình</button>
                    </div>
                  </div>
                  <ItineraryView trip={generatedTrip} />
                </motion.div>
              )}
            </AnimatePresence>

            {isLoading && (
              <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                <div className="w-20 h-20 relative">
                  <div className="absolute inset-0 border-4 border-rose-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-rose-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-800">Đang tạo chuyến đi mơ ước của bạn...</h3>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
