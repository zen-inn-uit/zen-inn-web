'use client';

import { useState } from 'react';
import { HotelDTO } from '../../hotels/dto/hotel.dto';
import { PageContainer } from '@/components/ui/page-container';
import Link from 'next/link';

interface RatePlansListProps {
  initialRatePlans: any[];
  hotels: HotelDTO[];
}

export function RatePlansList({ initialRatePlans, hotels }: RatePlansListProps) {
  const [selectedPlan, setSelectedPlan] = useState<any | null>(initialRatePlans[0] || null);
  const [filter, setFilter] = useState<'ALL' | 'BAR' | 'CAMPAIGN'>('ALL');
  const [selectedHotelId, setSelectedHotelId] = useState<string>('all');

  const filteredPlans = initialRatePlans.filter(plan => {
    const matchesType = filter === 'ALL' || plan.rateType === filter;
    
    // Filter by hotel: a rate plan matches a hotel if it's directly assigned to it
    // OR if any of its rooms belong to that hotel (for backward compatibility)
    const matchesHotel = selectedHotelId === 'all' || 
                        plan.hotelId === selectedHotelId ||
                        plan.rooms?.some((r: any) => r.hotelId === selectedHotelId);
                        
    return matchesType && matchesHotel;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (initialRatePlans.length === 0) {
    return (
      <PageContainer className="p-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-outfit mb-3">Chưa có gói giá nào</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
            Bắt đầu bằng việc tạo các gói giá tiêu chuẩn (BAR) hoặc các chiến dịch khuyến mãi để thu hút khách hàng.
          </p>
          <div className="flex gap-4">
            <Link
              href="/partner/rate-plans/new?type=BAR"
              className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all"
            >
              Tạo gói giá chuẩn
            </Link>
            <Link
              href="/partner/rate-plans/new?type=CAMPAIGN"
              className="bg-brand text-white px-8 py-4 rounded-2xl font-bold text-sm hover:shadow-xl hover:shadow-brand/20 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              Tạo chiến dịch mới
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-outfit">Giá & Chiến dịch</h1>
          <p className="text-slate-500 mt-2">Quản lý các gói giá tiêu chuẩn và các chương trình khuyến mãi theo mùa</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/partner/rate-plans/new?type=BAR"
            className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            Tạo gói giá chuẩn
          </Link>
          <Link
            href="/partner/rate-plans/new?type=CAMPAIGN"
            className="bg-brand text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-brand/20 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            Tạo chiến dịch khuyến mãi
          </Link>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={selectedHotelId}
          onChange={(e) => setSelectedHotelId(e.target.value)}
          className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 focus:outline-none focus:border-slate-400 transition-all shadow-sm"
        >
          <option value="all">Tất cả khách sạn</option>
          {hotels.map(h => (
            <option key={h.id} value={h.id}>{h.name}</option>
          ))}
        </select>

        {['ALL', 'BAR', 'CAMPAIGN'].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filter === t 
                ? 'bg-slate-900 text-white' 
                : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-400'
            }`}
          >
            {t === 'ALL' ? 'TẤT CẢ' : t === 'BAR' ? 'GIÁ CHUẨN' : 'CHIẾN DỊCH'}
          </button>
        ))}
      </div>

      <div className="flex gap-8">
        {/* Left: List */}
        <div className="w-1/3 space-y-4">
          {filteredPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`w-full p-6 rounded-2xl border transition-all text-left group ${
                selectedPlan?.id === plan.id
                  ? 'bg-white border-brand shadow-md scale-[1.02]'
                  : 'bg-white/50 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-bold transition-colors ${selectedPlan?.id === plan.id ? 'text-brand' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                {plan.rateType === 'CAMPAIGN' && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded uppercase">Lễ/Hội</span>
                )}
              </div>
              <div className="text-lg font-bold text-slate-900 mb-2">
                {formatPrice(plan.basePrice)}
              </div>
              <p className="text-xs text-slate-500 line-clamp-1 italic">
                {new Date(plan.validFrom).toLocaleDateString('vi-VN')} - {new Date(plan.validUntil).toLocaleDateString('vi-VN')}
              </p>
            </button>
          ))}
          {filteredPlans.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-sm italic">
              Không có dữ liệu phù hợp
            </div>
          )}
        </div>

        {/* Right: Detailed View */}
        <div className="flex-1">
          {selectedPlan ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex justify-between items-start mb-8 pb-6 border-b border-slate-50">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-slate-900">{selectedPlan.name}</h2>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedPlan.rateType === 'CAMPAIGN' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {selectedPlan.rateType === 'CAMPAIGN' ? 'Chiến dịch khuyến mãi' : 'Gói giá chuẩn'}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm">{selectedPlan.description}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all border border-slate-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Giá áp dụng</span>
                  <div className="text-3xl font-bold text-slate-900">{formatPrice(selectedPlan.basePrice)}</div>
                  <p className="text-sm text-slate-500 mt-1">/{selectedPlan.minLos} đêm tối thiểu</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Thời gian áp dụng</span>
                  <div className="text-sm font-bold text-slate-900">
                    {new Date(selectedPlan.validFrom).toLocaleDateString('vi-VN')} - {new Date(selectedPlan.validUntil).toLocaleDateString('vi-VN')}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Dành cho các đặt phòng trong khoảng thời gian này</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-l-4 border-brand pl-3">Dịch vụ đi kèm</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`p-4 rounded-xl border flex items-center gap-3 ${selectedPlan.includesBreakfast ? 'bg-green-50 border-green-100 text-green-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-xs font-bold">Bữa sáng</span>
                    </div>
                    <div className={`p-4 rounded-xl border flex items-center gap-3 ${selectedPlan.includesParking ? 'bg-green-50 border-green-100 text-green-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-bold">Bãi đỗ xe</span>
                    </div>
                    <div className={`p-4 rounded-xl border flex items-center gap-3 ${selectedPlan.includesDinner ? 'bg-green-50 border-green-100 text-green-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="text-xs font-bold">Bữa tối</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-l-4 border-brand pl-3">Điều kiện & Chính sách</h4>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-12">
                     <div className="flex justify-between py-2 border-b border-slate-50">
                      <span className="text-sm text-slate-500">Hoàn tiền khi hủy</span>
                      <span className="text-sm font-bold text-slate-900">{selectedPlan.refundablePercent}%</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-50">
                      <span className="text-sm text-slate-500">Yêu cầu đặt cọc</span>
                      <span className="text-sm font-bold text-slate-900">{selectedPlan.depositRequired ? `${selectedPlan.depositPercent}%` : 'Không'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-50">
                      <span className="text-sm text-slate-500">Thay đổi đặt phòng</span>
                      <span className="text-sm font-bold text-slate-900">{selectedPlan.modificationAllowed ? 'Cho phép' : 'Mất phí/Không'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-50">
                      <span className="text-sm text-slate-500">Số khách tối đa</span>
                      <span className="text-sm font-bold text-slate-900">{selectedPlan.maxGuestCount || 'Theo phòng'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">Vui lòng chọn một gói giá để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
