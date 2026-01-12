'use client';

import { useState } from 'react';
import { HotelDTO } from '../../hotels/dto/hotel.dto';
import { PageContainer } from '@/components/ui/page-container';
import Link from 'next/link';

interface PoliciesListProps {
  initialPolicies: any[];
  hotels: HotelDTO[];
}

export function PoliciesList({ initialPolicies, hotels }: PoliciesListProps) {
  const [selectedPolicy, setSelectedPolicy] = useState<any | null>(initialPolicies[0] || null);
  const [selectedHotelId, setSelectedHotelId] = useState<string>('all');

  const filteredPolicies = initialPolicies.filter(policy => {
    if (selectedHotelId === 'all') return true;

    // Check if policy is directly assigned to this hotel
    const isDirectlyAssigned = policy.hotelId === selectedHotelId;
    
    // Check if policy is used in rooms of this hotel
    const usedInRooms = policy.rooms?.some((r: any) => r.hotelId === selectedHotelId);
    
    // Check if policy is used in rate plans of this hotel
    const usedInRatePlans = policy.ratePlans?.some((rp: any) => 
      rp.hotelId === selectedHotelId || 
      rp.rooms?.some((r: any) => r.hotelId === selectedHotelId)
    );
    
    return isDirectlyAssigned || usedInRooms || usedInRatePlans;
  });

  if (initialPolicies.length === 0) {
    return (
      <PageContainer className="p-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-outfit mb-3">Chưa có chính sách hủy nào</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
            Thiết lập các quy định về việc hoàn tiền và thay đổi đặt phòng để áp dụng cho các loại phòng của bạn.
          </p>
          <Link
            href="/partner/cancellation-policies/new"
            className="bg-brand text-white px-8 py-4 rounded-2xl font-bold text-sm hover:shadow-xl hover:shadow-brand/20 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tạo chính sách đầu tiên
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-outfit">Chính sách hủy phòng</h1>
          <p className="text-slate-500 mt-2">Quản lý các quy định về hoàn tiền và thay đổi đặt phòng</p>
        </div>
        <Link
          href="/partner/cancellation-policies/new"
          className="bg-brand text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-brand/20 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tạo chính sách mới
        </Link>
      </div>

      <div className="flex gap-4 mb-8">
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
      </div>

      <div className="flex gap-8">
        {/* Left: List */}
        <div className="w-1/3 space-y-4">
          {filteredPolicies.map((policy) => (
            <button
              key={policy.id}
              onClick={() => setSelectedPolicy(policy)}
              className={`w-full p-6 rounded-2xl border transition-all text-left group ${
                selectedPolicy?.id === policy.id
                  ? 'bg-white border-brand shadow-md scale-[1.02]'
                  : 'bg-white/50 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-bold transition-colors ${selectedPolicy?.id === policy.id ? 'text-brand' : 'text-slate-900'}`}>
                  {policy.name}
                </h3>
                {policy.active && (
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                )}
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {policy.description || 'Không có mô tả'}
              </p>
              <div className="mt-4 flex gap-2">
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md uppercase tracking-wider">
                  {policy.freeCancellationHours}H FREE
                </span>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md uppercase tracking-wider">
                  REFUND {policy.refundablePercent}%
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Right: Detailed View */}
        <div className="flex-1">
          {selectedPolicy ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex justify-between items-start mb-8 pb-6 border-b border-slate-50">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedPolicy.name}</h2>
                  <p className="text-slate-500 mt-1 italic text-sm">Cập nhật lần cuối: {new Date(selectedPolicy.updatedAt).toLocaleDateString('vi-VN')}</p>
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
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Thời gian hủy miễn phí</span>
                  <div className="text-3xl font-bold text-slate-900">{selectedPolicy.freeCancellationHours} Giờ</div>
                  <p className="text-sm text-slate-500 mt-1">Trước khi nhận phòng 14:00</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Phần trăm hoàn trả</span>
                  <div className="text-3xl font-bold text-brand">{selectedPolicy.refundablePercent}%</div>
                  <p className="text-sm text-slate-500 mt-1">Tính trên tổng tiền booking</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Mô tả chính sách</h4>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl text-sm border-l-4 border-brand/20">
                    {selectedPolicy.description || 'Chưa cung cấp mô tả chi tiết cho chính sách này.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-4 pt-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-slate-600 text-sm">Thay đổi Booking (Modification)</span>
                    <span className={`text-xs font-bold text-center px-4 w-full py-1 rounded-full ${selectedPolicy.modificationAllowed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {selectedPolicy.modificationAllowed ? 'CHO PHÉP' : 'KHÔNG CHO PHÉP'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-slate-600 text-sm">Phí thay đổi</span>
                    <span className="text-slate-900 font-bold text-sm">
                      {selectedPolicy.modificationFeePercent}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-slate-600 text-sm">Phí No-show (Vắng mặt)</span>
                    <span className="text-slate-900 font-bold text-sm">
                      {100 - selectedPolicy.noShowRefundPercent}% (Khấu trừ)
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-slate-600 text-sm">Trạng thái áp dụng</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${selectedPolicy.active ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                      {selectedPolicy.active ? 'ĐANG KÍCH HOẠT' : 'TẠM NGƯNG'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-400 font-medium font-outfit">Vui lòng chọn một chính sách để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
