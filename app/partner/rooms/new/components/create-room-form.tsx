'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createRoomSchema, type CreateRoomFormData } from '../schema/create-room.schema';
import { HotelDTO } from '@/app/partner/hotels/dto/hotel.dto';
import { CancellationPolicyDTO } from '@/app/partner/cancellation-policies/dto/cancellation-policy.dto';
import { RatePlanDTO } from '@/app/partner/rate-plans/dto/rate-plan.dto';
import { partnerAPI } from '@/lib/api/partner-api';
import { useLoading } from '@/contexts/loading-context';
import { CreateRoomDto } from '@/app/partner/rooms/dto/create-room.dto';

interface CreateRoomFormProps {
  hotels: HotelDTO[];
  policies: CancellationPolicyDTO[];
  ratePlans: RatePlanDTO[];
}

export function CreateRoomForm({ hotels, policies, ratePlans }: CreateRoomFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const [images, setImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      capacity: 2,
      totalCount: 1,
      availableCount: 1,
      beds: [{ bedType: 'QUEEN', quantity: 1 }],
      amenities: [],
    },
  });

  const { fields: bedFields, append: appendBed, remove: removeBed } = useFieldArray({
    control,
    name: 'beds',
  });

  const { fields: amenityFields, append: appendAmenity, remove: removeAmenity } = useFieldArray({
    control,
    name: 'amenities',
  });

  const handleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const newImagePromises = fileArray.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImagePromises).then((newImageUrls) => {
      const updatedImages = [...images, ...newImageUrls];
      setImages(updatedImages);
      setValue('images', updatedImages.join(','));
    });

    e.target.value = '';
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setValue('images', updatedImages.join(','));
  };

  const onSubmit = async (data: CreateRoomFormData) => {
    startLoading();
    setIsSubmitting(true);

    try {
      const payload: CreateRoomDto = {
        name: data.name,
        roomType: data.roomType,
        description: data.description,
        capacity: data.capacity,
        area: data.area,
        totalCount: data.totalCount,
        availableCount: data.availableCount,
        images: images,
        ratePlanId: data.ratePlanId,
        cancellationPolicyId: data.cancellationPolicyId,
        beds: data.beds?.map(b => ({ bedType: b.bedType, quantity: b.quantity })),
        amenities: data.amenities?.map(a => ({ 
          name: a.name, 
          category: a.category,
        })),
      };

      await partnerAPI.createRoom(data.hotelId, payload);
      router.push('/partner/rooms');
    } catch (error) {
      console.error('Failed to create room:', error);
      alert('Tạo phòng thất bại. Vui lòng thử lại.');
    } finally {
      stopLoading();
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
      <div className="space-y-8">
        {/* Hotel Selection */}
        <div className="flex items-start gap-6 border-b border-slate-50 pb-6">
          <label className="w-1/4 text-sm font-semibold text-slate-900 pt-3">
            Chọn khách sạn <span className="text-red-500">*</span>
          </label>
          <div className="w-3/4">
            <select
              {...register('hotelId')}
              className={`w-full px-4 py-3 border rounded-lg focus:border-slate-400 focus:outline-none transition-all ${
                errors.hotelId ? 'border-red-500' : 'border-slate-300'
              }`}
            >
              <option value="">Chọn khách sạn của bạn</option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name} - {hotel.city}
                </option>
              ))}
            </select>
            {errors.hotelId && (
              <p className="text-red-500 text-sm mt-1">{errors.hotelId.message}</p>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="flex items-start gap-6 border-b border-slate-50 pb-6">
          <label className="w-1/4 text-sm font-semibold text-slate-900 pt-3">
            Thông tin cơ bản <span className="text-red-500">*</span>
          </label>
          <div className="w-3/4 space-y-4">
            <div>
              <input
                type="text"
                {...register('name')}
                className={`w-full px-4 py-3 border rounded-lg focus:border-slate-400 focus:outline-none transition-all ${
                  errors.name ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="Tên phòng (VD: Deluxe Double Room)"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  {...register('roomType')}
                  className={`w-full px-4 py-3 border rounded-lg focus:border-slate-400 focus:outline-none transition-all ${
                    errors.roomType ? 'border-red-500' : 'border-slate-300'
                  }`}
                >
                  <option value="">Loại phòng</option>
                  <option value="Single Room">Phòng đơn</option>
                  <option value="Double Room">Phòng đôi</option>
                  <option value="Twin Room">Phòng đôi 2 giường đơn</option>
                  <option value="Suite">Suite</option>
                  <option value="Deluxe Room">Phòng Deluxe</option>
                  <option value="Family Room">Phòng gia đình</option>
                </select>
                {errors.roomType && (
                  <p className="text-red-500 text-sm mt-1">{errors.roomType.message}</p>
                )}
              </div>
            </div>
            
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-400 focus:outline-none transition-all resize-none text-sm"
              placeholder="Mô tả chi tiết về phòng..."
            />
          </div>
        </div>

        {/* Capacity & Allocation */}
        <div className="flex items-start gap-6 border-b border-slate-50 pb-6">
          <label className="w-1/4 text-sm font-semibold text-slate-900 pt-3">
            Sức chứa & Phân bổ <span className="text-red-500">*</span>
          </label>
          <div className="w-3/4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Sức chứa (người)</label>
              <input
                type="number"
                {...register('capacity', { valueAsNumber: true })}
                className={`w-full px-4 py-3 border rounded-lg focus:border-slate-400 focus:outline-none transition-all ${
                  errors.capacity ? 'border-red-500' : 'border-slate-300'
                }`}
                min={1}
              />
              {errors.capacity && (
                <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Diện tích (m²)</label>
              <div className="relative">
                <input
                  type="number"
                  {...register('area', { valueAsNumber: true })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-400 focus:outline-none transition-all"
                  placeholder="VD: 35"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">m²</span>
              </div>
            </div>
          </div>
        </div>

        {/* Room Inventory */}
        <div className="flex items-start gap-6 border-b border-slate-50 pb-6">
          <label className="w-1/4 text-sm font-semibold text-slate-900 pt-3">
            Số lượng phòng <span className="text-red-500">*</span>
          </label>
          <div className="w-3/4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Tổng số phòng</label>
              <input
                type="number"
                {...register('totalCount', { valueAsNumber: true })}
                className={`w-full px-4 py-3 border rounded-lg focus:border-slate-400 focus:outline-none transition-all ${
                  errors.totalCount ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.totalCount && (
                <p className="text-red-500 text-sm mt-1">{errors.totalCount.message}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Số phòng trống</label>
              <input
                type="number"
                {...register('availableCount', { valueAsNumber: true })}
                className={`w-full px-4 py-3 border rounded-lg focus:border-slate-400 focus:outline-none transition-all ${
                  errors.availableCount ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.availableCount && (
                <p className="text-red-500 text-sm mt-1">{errors.availableCount.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bed Configuration */}
        <div className="flex items-start gap-6 border-b border-slate-50 pb-6">
          <label className="w-1/4 text-sm font-semibold text-slate-900 pt-3">
            Cấu hình giường
          </label>
          <div className="w-3/4 space-y-3">
            {bedFields.map((field, index) => (
              <div key={field.id} className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">Loại giường</label>
                  <select
                    {...register(`beds.${index}.bedType`)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-slate-400 focus:outline-none text-sm transition-all"
                  >
                    <option value="SINGLE">Giường đơn (Single)</option>
                    <option value="DOUBLE">Giường đôi (Double)</option>
                    <option value="QUEEN">Giường Queen</option>
                    <option value="KING">Giường King</option>
                    <option value="TWIN">2 Giường đơn (Twin)</option>
                    <option value="BUNK">Giường tầng (Bunk)</option>
                  </select>
                </div>
                <div className="w-24">
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">Số lượng</label>
                  <input
                    type="number"
                    {...register(`beds.${index}.quantity`, { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-slate-400 focus:outline-none text-sm transition-all"
                    min={1}
                  />
                </div>
                {bedFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBed(index)}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendBed({ bedType: 'SINGLE', quantity: 1 })}
              className="text-brand font-bold text-xs flex items-center gap-1 hover:opacity-80 transition-opacity pt-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Thêm loại giường
            </button>
          </div>
        </div>

        {/* Amenities section */}
        <div className="flex items-start gap-6 border-b border-slate-50 pb-6">
          <label className="w-1/4 text-sm font-semibold text-slate-900 pt-3">
            Tiện nghi dịch vụ
          </label>
          <div className="w-3/4 space-y-4">
            <div className="space-y-3">
              {amenityFields.map((field, index) => (
                <div key={field.id} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">Tên tiện nghi</label>
                    <input
                      {...register(`amenities.${index}.name`)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-slate-400 focus:outline-none text-sm transition-all"
                      placeholder="VD: Free Wifi"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">Danh mục</label>
                    <select
                      {...register(`amenities.${index}.category`)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-slate-400 focus:outline-none text-sm transition-all"
                    >
                      <option value="ROOM_FEATURE">Đặc điểm phòng</option>
                      <option value="BATHROOM">Phòng tắm</option>
                      <option value="ENTERTAINMENT">Giải trí</option>
                      <option value="CONVENIENCE">Tiện nghi</option>
                      <option value="SAFETY">An toàn</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAmenity(index)}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => appendAmenity({ name: '', category: 'ROOM_FEATURE' })}
              className="text-brand font-bold text-xs flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Thêm tiện nghi
            </button>
          </div>
        </div>

        {/* Policies & Rate Plans */}
        <div className="flex items-start gap-6 border-b border-slate-50 pb-6">
          <label className="w-1/4 text-sm font-semibold text-slate-900 pt-3">
            Gói giá & Chính sách <span className="text-red-500">*</span>
          </label>
          <div className="w-3/4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Gói giá mặc định <span className="text-red-500">*</span></label>
              <select
                {...register('ratePlanId')}
                className={`w-full px-4 py-3 border rounded-lg focus:border-slate-400 focus:outline-none transition-all font-medium ${
                  errors.ratePlanId ? 'border-red-500' : 'border-slate-300'
                }`}
              >
                <option value="">Chọn gói giá áp dụng</option>
                {ratePlans.filter(rp => rp.rateType === 'BAR').map(rp => (
                  <option key={rp.id} value={rp.id}>{rp.name} - {new Intl.NumberFormat('vi-VN').format(rp.basePrice)}/đêm</option>
                ))}
              </select>
              {errors.ratePlanId && (
                <p className="text-red-500 text-sm mt-1">{errors.ratePlanId.message}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Chính sách hủy (Mặc định)</label>
              <select
                {...register('cancellationPolicyId')}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-400 focus:outline-none transition-all font-medium"
              >
                <option value="">Chọn chính sách hủy</option>
                {policies.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Room Images Section */}
        <div className="flex items-start gap-6">
          <label className="w-1/4 text-sm font-semibold text-slate-900 pt-3">
            Hình ảnh phòng
          </label>
          <div className="w-3/4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Ảnh phòng ${index + 1}`}
                    className="w-full h-32 object-cover rounded-xl border-2 border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              
              <label className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all group">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider">Thêm ảnh</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-slate-400 mt-3 font-medium italic">Tải lên các hình ảnh chi tiết của phòng.</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-12 pt-8 border-t border-slate-100">
        <button
          type="button"
          onClick={() => router.push('/partner/rooms')}
          className="px-10 py-3 border-2 border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-10 py-3 bg-brand text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-brand/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Đang xử lý...' : 'Tạo phòng ngay'}
        </button>
      </div>
    </form>
  );
}
