'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cancellationPolicySchema, type CancellationPolicyFormData } from '../schema/cancellation-policy.schema';
import { HotelDTO } from '@/app/partner/hotels/dto/hotel.dto';

interface CreatePolicyFormProps {
  hotels: HotelDTO[];
}

export function CreatePolicyForm({ hotels }: CreatePolicyFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CancellationPolicyFormData>({
    resolver: zodResolver(cancellationPolicySchema),
    defaultValues: {
      freeCancellationHours: 48,
      refundablePercent: 100,
      noShowRefundPercent: 0,
      modificationAllowed: true,
      modificationFeePercent: 0,
    },
  });

  const modificationAllowed = watch('modificationAllowed');

  const onSubmit = async (data: CancellationPolicyFormData) => {
    setIsSubmitting(true);
    try {
      const { cancellationPoliciesApi } = await import('../api/cancellation-policies.api');
      await cancellationPoliciesApi.createPolicy(data);
      router.push('/partner/cancellation-policies');
      router.refresh();
    } catch (error: any) {
      alert(error.message || 'Tạo chính sách thất bại');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
      <div className="space-y-8">
        {/* Basic Info */}
        <div className="flex items-start gap-8 border-b border-slate-50 pb-8">
          <label className="w-1/4 text-sm font-bold text-slate-900 pt-3 tracking-wider">
            Thông tin chung <span className="text-red-500">*</span>
          </label>
          <div className="w-3/4 space-y-4">
            <div>
              <input
                type="text"
                {...register('name')}
                className={`w-full px-5 py-4 border rounded-2xl focus:border-slate-400 focus:outline-none transition-all font-medium ${
                  errors.name ? 'border-red-500 bg-red-50/10' : 'border-slate-200 bg-slate-50/30'
                }`}
                placeholder="Tên chính sách (VD: Linh hoạt 48h)"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-2 font-medium ml-1">{errors.name.message}</p>
              )}
            </div>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-5 py-4 border border-slate-200 bg-slate-50/30 rounded-2xl focus:border-slate-400 focus:outline-none transition-all resize-none text-sm"
              placeholder="Mô tả chi tiết nội dung chính sách cho khách hàng..."
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
              <p className="text-[10px] text-slate-400 mt-2 ml-1 italic font-medium">Bỏ trống nếu bạn muốn chính sách này có thể sử dụng cho bất kỳ khách sạn nào.</p>
            </div>
          </div>
        </div>

        {/* Cancellation Rules */}
        <div className="flex items-start gap-8 border-b border-slate-50 pb-8">
          <label className="w-1/4 text-sm font-bold text-slate-900 pt-3 tracking-wider">
            Quy tắc hủy phòng <span className="text-red-500">*</span>
          </label>
          <div className="w-3/4 grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-2 ml-1">Giờ hủy miễn phí chuẩn</label>
              <div className="relative">
                <input
                  type="number"
                  {...register('freeCancellationHours', { valueAsNumber: true })}
                  className="w-full px-5 py-4 border border-slate-200 bg-slate-50/30 rounded-2xl focus:border-slate-400 focus:outline-none transition-all font-bold"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">giờ</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 ml-1">* Trước 14:00 ngày nhận phòng</p>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-2 ml-1">% Hoàn tiền sau hạn</label>
              <div className="relative">
                <input
                  type="number"
                  {...register('refundablePercent', { valueAsNumber: true })}
                  className="w-full px-5 py-4 border border-slate-200 bg-slate-50/30 rounded-2xl focus:border-slate-400 focus:outline-none transition-all font-bold text-brand"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 ml-1">* Phần trăm tiền khách nhận lại được</p>
            </div>
          </div>
        </div>

        {/* Modification Rules */}
        <div className="flex items-start gap-8">
          <label className="w-1/4 text-sm font-bold text-slate-900 pt-3 tracking-wider">
            Thay đổi & Vắng mặt
          </label>
          <div className="w-3/4 space-y-6">
            <div className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Cho phép thay đổi đặt phòng</h4>
                <p className="text-xs text-slate-500 mt-1">Khách được phép đổi ngày hoặc loại phòng</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" {...register('modificationAllowed')} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-brand"></div>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className={modificationAllowed ? 'opacity-100' : 'opacity-40 pointer-events-none'}>
                <label className="block text-[11px] font-bold text-slate-400 mb-2 ml-1">Phí thay đổi (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    {...register('modificationFeePercent', { valueAsNumber: true })}
                    className="w-full px-5 py-4 border border-slate-200 bg-slate-50/30 rounded-2xl focus:border-slate-400 focus:outline-none transition-all font-bold"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">%</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-2 ml-1">Hoàn tiền nếu vắng mặt (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    {...register('noShowRefundPercent', { valueAsNumber: true })}
                    className="w-full px-5 py-4 border border-slate-200 bg-slate-50/30 rounded-2xl focus:border-slate-400 focus:outline-none transition-all font-bold"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-12 pt-8 border-t border-slate-100">
        <button
          type="button"
          onClick={() => router.push('/partner/cancellation-policies')}
          className="px-10 py-4 border-2 border-slate-200 text-slate-600 font-bold text-sm rounded-2xl hover:bg-slate-50 transition-all font-bold"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-10 py-4 bg-brand text-white font-bold text-sm rounded-2xl hover:shadow-xl hover:shadow-brand/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Đang lưu hệ thống...</span>
            </div>
          ) : (
            'Xác nhận tạo chính sách'
          )}
        </button>
      </div>
    </form>
  );
}
