'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export function AIPlannerPromo() {
  return (
    <div className="px-10 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden bg-slate-950 rounded-[32px] p-10 md:p-20 text-white shadow-2xl"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6B5B3D]/20 rounded-full blur-[120px] -mr-40 -mt-40 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#6B5B3D]/10 rounded-full blur-[100px] -ml-20 -mb-20"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[#A48F6D] text-sm font-bold mb-6 border border-white/10">
            <Sparkles size={16} />
            Llama 3.3 70B Powered
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Plan your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A48F6D] to-[#6B5B3D]">dream adventure</span> with AI.
          </h2>
          
          <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
            Tell us your vibe and budget, and we'll generate a personalized day-by-day itinerary with hotels, dining, and experiences in seconds.
          </p>

          <Link href="/ai-planner">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-xl hover:shadow-white/10 transition-shadow"
            >
              Start Planning Now
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </div>

        {/* Floating preview element (mock design) */}
        <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 w-80 h-[450px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 rotate-6 shadow-2xl">
          <div className="w-full h-32 bg-slate-800 rounded-2xl mb-4 animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-800 rounded-full w-3/4 animate-pulse"></div>
            <div className="h-4 bg-slate-800 rounded-full w-1/2 animate-pulse"></div>
            <div className="pt-4 space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-xl animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-800 rounded-full w-full animate-pulse"></div>
                    <div className="h-2 bg-slate-800 rounded-full w-2/3 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
