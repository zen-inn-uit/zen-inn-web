'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ratePlanSchema, type RatePlanFormData } from '../schema/rate-plan.schema';
import { CancellationPolicyDTO } from '../../cancellation-policies/dto/cancellation-policy.dto';
import { HotelDTO } from '@/app/partner/hotels/dto/hotel.dto';

interface CreateRatePlanFormProps {
  policies: CancellationPolicyDTO[];
  hotels: HotelDTO[];
}

export function CreateRatePlanForm({ policies, hotels }: CreateRatePlanFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type') as any) || 'BAR';
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RatePlanFormData>({
    resolver: zodResolver(ratePlanSchema),
    defaultValues: {
      rateType: initialType,
      minLos: 1,
      refundablePercent: 100,
      modificationAllowed: true,
      active: true,
      depositRequired: false,
      depositPercent: 0,
      includesBreakfast: false,
      includesDinner: false,
      includesParking: false,
      minGuestCount: 1,
      modificationFee: 0,
      basePrice: 0,
      validFrom: '',
      validUntil: '',
    },
  });

  const depositRequired = watch('depositRequired');
  const rateType = watch('rateType');

  const onSubmit = async (data: RatePlanFormData) => {
    setIsSubmitting(true);
    try {
      const { partnerAPI } = await import('@/lib/api/partner-api');
      await partnerAPI.createStandaloneRatePlan(data);
      router.push('/partner/rate-plans');
      router.refresh();
    } catch (error: any) {
      alert(error.message || 'Thất bại');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
      <div className="space-y-8">
        {/* Type Selection Heading */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${rateType === 'CAMPAIGN' ? 'bg-red-100 text-red-600' : 'bg-brand/10 text-brand'}`}>
            {rateType === 'CAMPAIGN' ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 tracking-wider">
              {rateType === 'CAMPAIGN' ? 'Tạo chương trình khuyến mãi (Campaign)' : 'Tạo gói giá phòng tiêu chuẩn (Rate Plan)'}
            </h3>
            <p className="text-xs text-slate-500 font-medium">Vui lòng điền đầy đủ các thông tin thiết lập giá dưới đây</p>
          </div>
        </div>

        {/* Basic Info Section */}
        <div className="flex items-start gap-8 border-b border-slate-50 pb-8">
          <label className="w-1/4 text-sm font-bold text-slate-900 pt-3 tracking-wider">
            Thông tin chung <span className="text-red-500">*</span>
          </label>
          <div className="w-3/4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-2 ml-1">Tên gói giá / Chiến dịch</label>
                <input
                  type="text"
                  {...register('name')}
                  className={`w-full px-5 py-3.5 border rounded-2xl focus:border-slate-400 focus:outline-none transition-all ${
                    errors.name ? 'border-red-500 bg-red-50/10' : 'border-slate-200 bg-slate-50/30'
                  }`}
                  placeholder={rateType === 'CAMPAIGN' ? "VD: KM Tết Ất Tỵ - Giảm 20%" : "VD: Giá tiêu chuẩn (BAR)"}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-2 ml-1">Mã nội bộ (Rate Code)</label>
                <input
                  type="text"
                  {...register('rateCode')}
                  className="w-full px-5 py-3.5 border border-slate-200 bg-slate-50/30 rounded-2xl focus:border-slate-400 focus:outline-none transition-all"
                  placeholder="VD: BAR, TET2025, CORPORATE..."
                />
              </div>
            </div>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-5 py-3.5 border border-slate-200 bg-slate-50/30 rounded-2xl focus:border-slate-400 focus:outline-none transition-all resize-none text-sm"
              placeholder="Mô tả quyền lợi của gói giá này cho khách hàng thấy..."
            />
            
            <div className="pt-2">
              <label className="block text-[10px] font-bold text-slate-400 mb-2 ml-1 uppercase tracking-wider">Khách sạn áp dụng (Tùy chọn)</label>
              <select
                {...register('hotelId')}
                className="w-full px-5 py-3.5 border border-slate-200 bg-white rounded-2xl focus:border-slate-400 focus:outline-none transition-all font-medium"
              >
                <option value="">Áp dụng cho tất cả khách sạn</option>
                {hotels.map(h => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400 mt-2 ml-1 italic font-medium">Bỏ trống nếu bạn muốn gói giá này có thể sử dụng cho bất kỳ phòng nào của bạn.</p>
            </div>
          </div>
        </div>

        {/* Pricing & Dates Section */}
        <div className="flex items-start gap-8 border-b border-slate-50 pb-8">
          <label className="w-1/4 text-sm font-bold text-slate-900 pt-3 tracking-wider">
            Giá & Thời hạn <span className="text-red-500">*</span>
          </label>
          <div className="w-3/4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-2 ml-1">Giá áp dụng (VND)</label>
                <div className="relative">
                  <input
                    type="number"
                    {...register('basePrice', { valueAsNumber: true })}
                    className="w-full px-5 py-3.5 border border-slate-200 bg-slate-50/30 rounded-2xl focus:border-slate-400 focus:outline-none transition-all font-bold text-brand"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-slate-400">VND</span>
                </div>
              </div>
              <div>
                 <label className="block text-[10px] font-bold text-slate-400 mb-2 ml-1">Số đêm tối thiểu</label>
                <input
                  type="number"
                  {...register('minLos', { valueAsNumber: true })}
                  className="w-full px-5 py-3.5 border border-slate-200 bg-slate-50/30 rounded-2xl focus:border-slate-400 focus:outline-none transition-all font-bold"
                  min={1}
                />
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-4 ${rateType === 'CAMPAIGN' ? 'p-4 bg-red-50/30 border-2 border-red-100 rounded-3xl' : ''}`}>
               <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-2 ml-1">Áp dụng từ ngày</label>
                <input
                  type="date"
                  {...register('validFrom')}
                  className="w-full px-5 py-3.5 border border-slate-200 bg-white rounded-2xl focus:border-slate-400 focus:outline-none transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-2 ml-1">Áp dụng đến ngày</label>
                <input
                  type="date"
                  {...register('validUntil')}
                  className={`w-full px-5 py-3.5 border rounded-2xl focus:border-slate-400 focus:outline-none transition-all font-medium ${
                    errors.validUntil ? 'border-red-500' : 'border-slate-200 bg-white'
                  }`}
                />
                {errors.validUntil && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.validUntil.message}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="flex items-start gap-8 border-b border-slate-50 pb-8">
          <label className="w-1/4 text-sm font-bold text-slate-900 pt-3 tracking-wider">
            Dịch vụ & Tiện ích
          </label>
          <div className="w-3/4 grid grid-cols-3 gap-4">
             <label className="flex items-center gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-white transition-all">
                <input type="checkbox" {...register('includesBreakfast')} className="w-5 h-5 rounded-lg border-slate-300 text-brand focus:ring-brand" />
                <span className="text-xs font-bold text-slate-700">Bữa sáng</span>
             </label>
             <label className="flex items-center gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-white transition-all">
                <input type="checkbox" {...register('includesParking')} className="w-5 h-5 rounded-lg border-slate-300 text-brand focus:ring-brand" />
                <span className="text-xs font-bold text-slate-700">Bãi đỗ xe</span>
             </label>
             <label className="flex items-center gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-white transition-all">
                <input type="checkbox" {...register('includesDinner')} className="w-5 h-5 rounded-lg border-slate-300 text-brand focus:ring-brand" />
                <span className="text-xs font-bold text-slate-700">Ăn tối</span>
             </label>
          </div>
        </div>

        {/* Policies Section */}
        <div className="flex items-start gap-8">
          <label className="w-1/4 text-sm font-bold text-slate-900 pt-3 tracking-wider">
            Chính sách áp dụng
          </label>
          <div className="w-3/4 space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-2 ml-1">Chọn chính sách hủy phòng</label>
              <select
                {...register('cancellationPolicyId')}
                className="w-full px-5 py-3.5 border border-slate-200 bg-slate-50/30 rounded-2xl focus:border-slate-400 focus:outline-none transition-all font-medium"
              >
                <option value="">Sử dụng cấu hình mặc định</option>
                {policies.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            <div className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Yêu cầu thanh toán đặt cọc</h4>
                <p className="text-xs text-slate-500 mt-1">Khách phải trả trước một phần tiền phòng</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" {...register('depositRequired')} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-brand"></div>
              </label>
            </div>

            {depositRequired && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-[10px] font-bold text-slate-400 mb-2 ml-1">Phần trăm đặt cọc (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    {...register('depositPercent', { valueAsNumber: true })}
                    className="w-full px-5 py-3.5 border border-slate-200 bg-slate-50/30 rounded-2xl focus:border-slate-400 focus:outline-none transition-all font-bold"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-slate-400">%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-12 pt-8 border-t border-slate-100">
        <button
          type="button"
          onClick={() => router.push('/partner/rate-plans')}
          className="px-10 py-4 border-2 border-slate-200 text-slate-600 font-bold text-sm rounded-2xl hover:bg-slate-50 transition-all font-bold"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-10 py-4 text-white font-bold text-sm rounded-2xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold ${
            rateType === 'CAMPAIGN' ? 'bg-red-600 hover:shadow-red-200' : 'bg-brand hover:shadow-brand/20'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Đang lưu hệ thống...</span>
            </div>
          ) : (
            rateType === 'CAMPAIGN' ? 'Xác nhận tạo chiến dịch' : 'Xác nhận tạo gói giá'
          )}
        </button>
      </div>
    </form>
  );
}
