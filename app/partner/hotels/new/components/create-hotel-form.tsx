'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createHotelSchema, type CreateHotelFormData } from '../schema/create-hotel.schema';
import { partnerAPI } from '@/lib/api/partner-api';
import { useLoading } from '@/contexts/loading-context';
import { CreateHotelDto } from '@/app/partner/hotels/dto/create-hotel.dto';

export function CreateHotelForm() {
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [primaryImage, setPrimaryImage] = useState<string>('');
  const [subImages, setSubImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateHotelFormData>({
    resolver: zodResolver(createHotelSchema),
    defaultValues: {
      starRating: 5,
    },
  });

  const handlePrimaryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPrimaryImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSubImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setSubImages(prev => [...prev, ...newImageUrls]);
    });

    e.target.value = '';
  };

  const removeSubImage = (index: number) => {
    setSubImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: CreateHotelFormData) => {
    startLoading();
    setIsSubmitting(true);
    try {
      // Step 1: Upload images to Cloudinary if there are any
      let imageUrls: string[] = [];
      const allImages = primaryImage ? [primaryImage, ...subImages] : subImages;
      
      if (allImages.length > 0) {
        console.log('Uploading images to Cloudinary...');
        const uploadResult = await partnerAPI.uploadBase64Images(allImages, 'hotels');
        imageUrls = uploadResult.urls;
        console.log('Images uploaded successfully:', imageUrls);
      }

      // Step 2: Create hotel with image URLs
      const payload: CreateHotelDto = {
        name: data.name,
        description: data.description,
        address: data.address,
        city: data.city,
        country: data.country,
        starRating: data.starRating,
        images: imageUrls, // Use Cloudinary URLs instead of base64
      };
      
      await partnerAPI.createHotel(payload);
      router.push('/partner/hotels');
    } catch (error) {
      console.error('Failed to create hotel:', error);
      alert('Tạo khách sạn thất bại. Vui lòng thử lại.');
    } finally {
      stopLoading();
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
      <div className="space-y-8">
        {/* Basic Information Section */}
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
                placeholder="Tên khách sạn (VD: Zen Inn Downtown)"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Số điện thoại</label>
                <input
                  type="text"
                  {...register('phone')}
                  className={`w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-400 focus:outline-none transition-all`}
                  placeholder="VD: +84-28-1234-5678"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Xếp hạng sao</label>
                <select
                  {...register('starRating', { valueAsNumber: true })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-400 focus:outline-none transition-all"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>{star} sao</option>
                  ))}
                </select>
              </div>
            </div>

            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-400 focus:outline-none transition-all resize-none text-sm"
              placeholder="Mô tả chi tiết về khách sạn..."
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="flex items-start gap-6 border-b border-slate-50 pb-6">
          <label className="w-1/4 text-sm font-semibold text-slate-900 pt-3">
            Địa chỉ & Vị trí <span className="text-red-500">*</span>
          </label>
          <div className="w-3/4 space-y-4">
            <div>
              <input
                type="text"
                {...register('address')}
                className={`w-full px-4 py-3 border rounded-lg focus:border-slate-400 focus:outline-none transition-all ${
                  errors.address ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="Địa chỉ số nhà, tên đường..."
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  {...register('city')}
                  className={`w-full px-4 py-3 border rounded-lg focus:border-slate-400 focus:outline-none transition-all ${
                    errors.city ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Thành phố / Tỉnh"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  {...register('country')}
                  className={`w-full px-4 py-3 border rounded-lg focus:border-slate-400 focus:outline-none transition-all ${
                    errors.country ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Quốc gia"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Primary Image Section */}
        <div className="flex items-start gap-6 border-b border-slate-50 pb-6">
          <label className="w-1/4 text-sm font-semibold text-slate-900 pt-3">
            Ảnh đại diện <span className="text-red-500">*</span>
          </label>
          <div className="w-3/4">
            {primaryImage ? (
              <div className="relative group w-64">
                <img
                  src={primaryImage}
                  alt="Ảnh chính"
                  className="w-full h-40 object-cover rounded-xl border-2 border-slate-200"
                />
                <button
                  type="button"
                  onClick={() => setPrimaryImage('')}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <label className="w-64 h-40 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all group">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-sm text-slate-600 font-semibold">Tải lên ảnh chính</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePrimaryImageUpload}
                  className="hidden"
                />
              </label>
            )}
            <p className="text-xs text-slate-400 mt-2 font-medium italic">* Ảnh bìa hiển thị đầu tiên trên trang chi tiết</p>
          </div>
        </div>

        {/* Sub Images Section */}
        <div className="flex items-start gap-6">
          <label className="w-1/4 text-sm font-semibold text-slate-900 pt-3">
            Hình ảnh chi tiết
          </label>
          <div className="w-3/4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {subImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Ảnh khách sạn ${index + 1}`}
                    className="w-full h-32 object-cover rounded-xl border-2 border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeSubImage(index)}
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
                  onChange={handleSubImagesUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-slate-400 mt-3 font-medium italic">Tải lên các ảnh chi tiết của khách sạn.</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-12 pt-8 border-t border-slate-100">
        <button
          type="button"
          onClick={() => router.push('/partner/hotels')}
          className="px-10 py-3 border-2 border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors font-bold"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-10 py-3 bg-brand text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-brand/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold"
        >
          {isSubmitting ? 'Đang xử lý...' : 'Tạo khách sạn ngay'}
        </button>
      </div>
    </form>
  );
}
