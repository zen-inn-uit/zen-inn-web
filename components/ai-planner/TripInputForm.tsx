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
        AI Lên Kế Hoạch Chuyến Đi
      </div>

      {/* Example Prompts */}
      <div className="mb-6 p-5 bg-gradient-to-br from-[#6B5B3D]/5 to-[#6B5B3D]/10 rounded-2xl border border-[#6B5B3D]/20">
        <p className="text-xs font-bold text-[#6B5B3D] uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#6B5B3D] rounded-full"></span>
          Thử các ví dụ sau
        </p>
        <div className="space-y-2">
          {[
            "Chuyến đi 3 ngày đến Đà Lạt, Việt Nam từ 15-17 tháng 3 năm 2026 cho 2 người lớn với ngân sách vừa phải. Chúng tôi thích tour cà phê, hoạt động hồ và ẩm thực địa phương.",
            "Nghỉ dưỡng lãng mạn 5 ngày tại Phú Quốc cho 2 người, ngân sách cao cấp, bắt đầu từ 1 tháng 4 năm 2026. Chúng tôi muốn thư giãn bãi biển, du thuyền ngắm hoàng hôn và ẩm thực cao cấp.",
            "Cuối tuần tại Hà Nội cho 4 người lớn, ngân sách tiết kiệm. Chúng tôi quan tâm đến tour ẩm thực đường phố, khám phá Phố Cổ và di sản văn hóa."
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
            Mô tả chuyến đi mơ ước của bạn
            <span className="block text-xs text-slate-500 font-normal mt-1">
              Bao gồm: <span className="text-[#6B5B3D] font-medium">điểm đến, thời gian (ngày cụ thể hoặc số ngày), số lượng du khách, mức ngân sách</span>, và các sở thích khác
            </span>
          </label>
          <div className="flex gap-4 items-start">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="VD: Chuyến đi 3 ngày đến Đà Lạt cho 2 người, ngân sách vừa phải..."
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
          disabled={!description.trim()}
          className="bg-[#6B5B3D] hover:bg-[#5A4D34] text-white px-6 py-3 rounded-xl font-semibold text-base transition-all transform active:scale-95 shadow-md shadow-[#6B5B3D]/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Tạo lịch trình
        </button>
        <p className="text-slate-400 text-sm hidden md:block">
          AI sẽ phân tích mô tả của bạn và tạo một <span className="text-[#6B5B3D] font-medium">lịch trình từng ngày</span> được cá nhân hóa.
        </p>
      </div>
    </div>
  );
}
