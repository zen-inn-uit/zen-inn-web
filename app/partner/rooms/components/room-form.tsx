'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createRoomSchema, type CreateRoomFormData } from '../schema/room.schema';
import { HotelDTO } from '@/app/partner/hotels/dto/hotel.dto';
import { CancellationPolicyDTO } from '@/app/partner/cancellation-policies/dto/cancellation-policy.dto';
import { partnerAPI } from '@/lib/api/partner-api';
import { useLoading } from '@/contexts/loading-context';
import { CreateRoomDto } from '../dto/create-room.dto';
import { RoomDTO } from '../dto/room.dto';
import { RatePlanDTO } from '@/app/partner/rate-plans/dto/rate-plan.dto';

interface RoomFormProps {
  hotels: HotelDTO[];
  policies: CancellationPolicyDTO[];
  ratePlans: RatePlanDTO[];
  initialData?: RoomDTO;
  fixedHotelId?: string;
}

export function RoomForm({ hotels, policies, ratePlans, initialData, fixedHotelId }: RoomFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const [images, setImages] = useState<string[]>(initialData?.images || []);

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
      hotelId: fixedHotelId || initialData?.hotelId || (hotels.length === 1 ? hotels[0].id : ''),
      name: initialData?.name || '',
      roomType: initialData?.roomType || '',
      description: initialData?.description || '',
      capacity: initialData?.capacity || 2,
      area: initialData?.area || 0,
      totalCount: initialData?.totalCount || 1,
      availableCount: initialData?.availableCount || 1,
      cancellationPolicyId: initialData?.cancellationPolicyId || '',
      ratePlanId: initialData?.ratePlans?.[0]?.id || '',
      beds: initialData?.beds?.map((b: any) => ({ bedType: b.bedType, quantity: b.quantity })) || [{ bedType: 'QUEEN', quantity: 1 }],
      amenities: initialData?.amenities?.map((a: any) => ({ 
        name: a.amenity?.name || a.name, 
        category: a.amenity?.category || a.category || 'ROOM_FEATURE'
      })) || [],
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

  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const newImageUrls = await Promise.all(newImagePromises);
    
    try {
      const uploadResult = await partnerAPI.uploadBase64Images(newImageUrls, 'rooms');
      const updatedImages = [...images, ...uploadResult.urls];
      setImages(updatedImages);
    } catch (error) {
      console.error('Failed to upload images:', error);
      alert('Upload hình ảnh thất bại!');
    }

    e.target.value = '';
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
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
        cancellationPolicyId: data.cancellationPolicyId,
        beds: data.beds?.map(b => ({ bedType: b.bedType, quantity: b.quantity })),
        amenities: data.amenities?.map(a => ({ 
          name: a.name, 
          category: a.category,
        })),
        ratePlanId: data.ratePlanId,
      };

      if (initialData) {
        await partnerAPI.updateRoom(data.hotelId, initialData.id, payload);
        alert('Cập nhật phòng thành công!');
      } else {
        await partnerAPI.createRoom(data.hotelId, payload);
        alert('Tạo phòng thành công!');
      }
      router.push('/partner/rooms');
      router.refresh();
    } catch (error) {
      console.error('Failed to save room:', error);
      alert(initialData ? 'Cập nhật phòng thất bại.' : 'Tạo phòng thất bại.');
    } finally {
      stopLoading();
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl border border-slate-200 p-10 shadow-sm space-y-12">
      <div className="space-y-10">
        {/* Hotel Selection (if not fixed) */}
        {!fixedHotelId && !initialData && (
          <div className="flex flex-col md:flex-row gap-8 items-start border-b border-slate-50 pb-10">
             <div className="md:w-1/4">
              <label className="text-sm font-bold text-slate-900 uppercase tracking-widest block mb-1">
                Khách sạn <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-slate-400 font-medium">Chọn khách sạn mà phòng này thuộc về</p>
            </div>
            <div className="md:w-3/4">
              <select
                {...register('hotelId')}
                className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 focus:outline-none transition-all font-bold text-slate-900 ${
                  errors.hotelId ? 'border-red-500' : 'border-slate-200'
                }`}
              >
                <option value="">-- Chọn khách sạn --</option>
                {hotels.map(h => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
              {errors.hotelId && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-tight">{errors.hotelId.message}</p>}
            </div>
          </div>
        )}

        {/* Basic Info */}
        <div className="flex flex-col md:flex-row gap-8 items-start border-b border-slate-50 pb-10">
          <div className="md:w-1/4">
            <label className="text-sm font-bold text-slate-900 uppercase tracking-widest block mb-1">
              Thông tin cơ bản <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-slate-400 font-medium">Tên hiển thị và loại phòng</p>
          </div>
          <div className="md:w-3/4 space-y-6">
            <div>
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Tên hiển thị</label>
               <input
                type="text"
                {...register('name')}
                className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 focus:outline-none transition-all font-bold text-slate-900 ${
                  errors.name ? 'border-red-500' : 'border-slate-200'
                }`}
                placeholder="VD: Deluxe Double Room with Sea View"
              />
              {errors.name && <p className="text-red-500 text-xs mt-2 font-bold italic">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Loại phòng</label>
                <input
                  type="text"
                  {...register('roomType')}
                  className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 focus:outline-none transition-all font-bold text-slate-900 ${
                    errors.roomType ? 'border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="VD: Deluxe, Suite, ..."
                />
                {errors.roomType && <p className="text-red-500 text-xs mt-2 font-bold italic">{errors.roomType.message}</p>}
              </div>

               <div>
                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Sức chứa (Người)</label>
                 <input
                  type="number"
                  {...register('capacity', { valueAsNumber: true })}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 focus:outline-none transition-all font-bold text-slate-900"
                />
               </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Mô tả chi tiết</label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 focus:outline-none transition-all font-medium text-slate-700 resize-none"
                placeholder="Mô tả các đặc điểm nổi bật của phòng..."
              />
            </div>
          </div>
        </div>

        {/* Inventory & Size */}
        <div className="flex flex-col md:flex-row gap-8 items-start border-b border-slate-50 pb-10">
          <div className="md:w-1/4">
            <label className="text-sm font-bold text-slate-900 uppercase tracking-widest block mb-1">Diện tích & Số lượng</label>
            <p className="text-xs text-slate-400 font-medium">Thông số vật lý và vận hành</p>
          </div>
          <div className="md:w-3/4 grid grid-cols-3 gap-6">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Diện tích (m²)</label>
              <input
                type="number"
                {...register('area', { valueAsNumber: true })}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 focus:outline-none font-bold text-slate-900"
              />
            </div>
            <div>
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Tổng số phòng</label>
               <input
                type="number"
                {...register('totalCount', { valueAsNumber: true })}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 focus:outline-none font-bold text-slate-900"
              />
            </div>
            <div>
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Sẵn sàng bán</label>
               <input
                type="number"
                {...register('availableCount', { valueAsNumber: true })}
                className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 focus:outline-none font-bold text-slate-900 ${
                  errors.availableCount ? 'border-red-500' : 'border-slate-200'
                }`}
              />
              {errors.availableCount && <p className="text-red-500 text-xs mt-2 font-bold italic">{errors.availableCount.message}</p>}
            </div>
          </div>
        </div>

        {/* Pricing & Policy */}
        <div className="flex flex-col md:flex-row gap-8 items-start border-b border-slate-50 pb-10">
          <div className="md:w-1/4">
            <label className="text-sm font-bold text-slate-900 uppercase tracking-widest block mb-1">Gói giá & Chính sách</label>
            <p className="text-xs text-slate-400 font-medium">Thiết lập mặc định cho phòng</p>
          </div>
          <div className="md:w-3/4 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Gói giá áp dụng <span className="text-red-500">*</span></label>
                <select
                  {...register('ratePlanId')}
                  className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand focus:outline-none font-bold text-slate-900 shadow-sm"
                >
                  <option value="">-- Chọn gói giá --</option>
                  {ratePlans.map((rp) => (
                    <option key={rp.id} value={rp.id}>
                      {rp.name} ({(rp.basePrice/1000).toFixed(0)}kđ)
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 mt-2 font-medium italic">Bạn phải tạo Gói giá trước tại mục "Giá & Chiến dịch"</p>
              </div>

               <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Chính sách hủy mặc định</label>
                <select
                  {...register('cancellationPolicyId')}
                  className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:border-brand focus:outline-none font-bold text-slate-900 shadow-sm"
                >
                  <option value="">-- Chọn chính sách --</option>
                  {policies.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Beds */}
        <div className="flex flex-col md:flex-row gap-8 items-start border-b border-slate-50 pb-10">
          <div className="md:w-1/4">
            <label className="text-sm font-bold text-slate-900 uppercase tracking-widest block mb-1">Bố trí giường</label>
            <p className="text-xs text-slate-400 font-medium">Thông tin quan trọng cho khách</p>
          </div>
          <div className="md:w-3/4 space-y-4">
             {bedFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-end animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Loại giường</label>
                  <select
                    {...register(`beds.${index}.bedType`)}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand focus:outline-none font-bold text-slate-900"
                  >
                    <option value="SINGLE">Single Bed</option>
                    <option value="DOUBLE">Double Bed</option>
                    <option value="QUEEN">Queen Bed</option>
                    <option value="KING">King Bed</option>
                    <option value="TWIN">Twin Bed</option>
                    <option value="BUNK">Bunk Bed</option>
                  </select>
                </div>
                <div className="w-32">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Số lượng</label>
                   <input
                    type="number"
                    {...register(`beds.${index}.quantity`, { valueAsNumber: true })}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand focus:outline-none font-bold text-slate-900 text-center"
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeBed(index)}
                    className="p-3.5 text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-red-100 mb-[2px]"
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
              onClick={() => appendBed({ bedType: 'QUEEN', quantity: 1 })}
              className="text-xs font-bold text-brand hover:bg-brand/5 px-4 py-2 rounded-xl transition-all flex items-center gap-2 border border-brand/20 border-dashed w-fit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Thêm loại giường
            </button>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-col md:flex-row gap-8 items-start border-b border-slate-50 pb-10">
          <div className="md:w-1/4">
             <label className="text-sm font-bold text-slate-900 uppercase tracking-widest block mb-1">Tiện nghi & Dịch vụ</label>
             <p className="text-xs text-slate-400 font-medium">Chọn các tiện ích có sẵn trong phòng</p>
          </div>
          <div className="md:w-3/4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {amenityFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center bg-slate-50 p-3 rounded-2xl border border-slate-100 group">
                  <span className="flex-1 font-bold text-slate-700 text-xs px-2">{field.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAmenity(index)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Wi-Fi miễn phí', category: 'ENTERTAINMENT' },
                { name: 'Máy điều hòa', category: 'ROOM_FEATURE' },
                { name: 'Tivi truyền hình cáp', category: 'ENTERTAINMENT' },
                { name: 'Minibar', category: 'CONVENIENCE' },
                { name: 'Máy sấy tóc', category: 'CONVENIENCE' },
                { name: 'Ấm đun nước', category: 'CONVENIENCE' },
                { name: 'Két sắt an toàn', category: 'SAFETY' },
                { name: 'Bàn làm việc', category: 'ROOM_FEATURE' },
              ].map((item) => {
                const isSelected = amenityFields.some(a => a.name === item.name);
                if (isSelected) return null;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => appendAmenity(item as any)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-brand hover:text-brand transition-all shadow-sm"
                  >
                    + {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/4">
            <label className="text-sm font-bold text-slate-900 uppercase tracking-widest block mb-1">Hình ảnh phòng</label>
            <p className="text-xs text-slate-400 font-medium">Tải lên ít nhất 3 ảnh chất lượng cao</p>
          </div>
          <div className="md:w-3/4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {images.map((url, index) => (
                <div key={index} className="relative group aspect-video rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                  <img src={url} alt={`Room ${index + 1}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-2 bg-white/20 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-all scale-75 group-hover:scale-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  {index === 0 && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-brand text-white text-[8px] font-bold rounded-md uppercase tracking-wider">Ảnh bìa</div>
                  )}
                </div>
              ))}
              
              <label 
                className="aspect-video rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-brand hover:bg-brand/5 transition-all text-slate-400 hover:text-brand bg-slate-50/50"
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImagesUpload}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Tải ảnh</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-8 border-t border-slate-50">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-10 py-4 bg-brand text-white rounded-2xl font-bold text-sm hover:shadow-2xl hover:shadow-brand/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 min-w-[180px] justify-center"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
          ) : null}
          {initialData ? 'Lưu thay đổi' : 'Xác nhận tạo phòng'}
        </button>
      </div>
    </form>
  );
}
