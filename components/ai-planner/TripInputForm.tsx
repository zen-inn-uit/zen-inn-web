'use client';

import React, { useState } from 'react';
import { Sparkles, Mic } from 'lucide-react';
import { aiPlannerApi } from '@/lib/api/ai-planner-api';
import { Trip } from '@/types/ai-planner/trip.types';

interface TripInputFormProps {
  onLoading: (loading: boolean) => void;
  onGenerated: (trip: Trip) => void;
}

export function TripInputForm({ onLoading, onGenerated }: TripInputFormProps) {
  const [description, setDescription] = useState('');

  const handleGenerate = async () => {
    onLoading(true);
    try {
      // AI will parse all details from the description
      const trip = await aiPlannerApi.generateTrip({
        description,
      });
      onGenerated(trip);
    } catch (error) {
      console.error('Generation failed:', error);
      onLoading(false);
      alert('Failed to generate trip. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 mb-12">
      <div className="flex items-center gap-2 mb-6 text-[#6B5B3D] font-semibold tracking-wide uppercase text-sm">
        <Sparkles size={18} />
        AI Trip Planner
      </div>

      {/* Example Prompts */}
      <div className="mb-6 p-5 bg-gradient-to-br from-[#6B5B3D]/5 to-[#6B5B3D]/10 rounded-2xl border border-[#6B5B3D]/20">
        <p className="text-xs font-bold text-[#6B5B3D] uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#6B5B3D] rounded-full"></span>
          Try these examples
        </p>
        <div className="space-y-2">
          {[
            "A 3-day trip to Da Lat, Vietnam from March 15-17, 2026 for 2 adults with a moderate budget. We love coffee tours, lake activities, and local cuisine.",
            "5-day romantic getaway to Phu Quoc for 2 people, luxury budget, starting April 1st 2026. We want beach relaxation, sunset cruises, and fine dining.",
            "Weekend trip to Hanoi for 4 adults, economy budget. We're interested in street food tours, Old Quarter exploration, and cultural sites."
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setDescription(example)}
              className="w-full text-left p-3 bg-white/60 hover:bg-white rounded-xl text-xs text-slate-600 hover:text-slate-900 transition-all border border-transparent hover:border-[#6B5B3D]/30 hover:shadow-sm group"
            >
              <span className="opacity-60 group-hover:opacity-100 transition-opacity line-clamp-2">
                {example}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative group mb-6">
        <div className="absolute inset-0 bg-[#6B5B3D]/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity -m-4"></div>
        <div className="relative bg-slate-50 rounded-2xl p-6 border border-transparent group-focus-within:border-[#6B5B3D]/20 transition-all">
          <label className="text-slate-700 text-sm mb-3 block font-semibold">
            Describe your dream trip
            <span className="block text-xs text-slate-500 font-normal mt-1">
              Include: <span className="text-[#6B5B3D] font-medium">destination, duration (dates or number of days), number of travelers, budget level</span>, and any preferences
            </span>
          </label>
          <div className="flex gap-4 items-start">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-slate-800 text-base resize-none h-24 placeholder:text-slate-300 font-medium"
            />
            <button className="p-3 bg-white rounded-full text-slate-400 hover:text-[#6B5B3D] hover:shadow-md transition-all">
              <Mic size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleGenerate}
          className="bg-[#6B5B3D] hover:bg-[#5A4D34] text-white px-6 py-3 rounded-xl font-semibold text-base transition-all transform active:scale-95 shadow-md shadow-[#6B5B3D]/20"
        >
          Generate itinerary
        </button>
        <p className="text-slate-400 text-sm hidden md:block">
          AI will parse your description and create a personalized <span className="text-[#6B5B3D] font-medium">day-by-day itinerary</span>.
        </p>
      </div>
    </div>
  );
}
