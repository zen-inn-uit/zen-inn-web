'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createRoomSchema, type CreateRoomFormData } from '../schema/create-room.schema';

export function CreateRoomForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      capacity: 2,
      price: 0,
      totalCount: 0,
      availableCount: 0,
    },
  });

  const onSubmit = async (data: CreateRoomFormData) => {
    setIsSubmitting(true);

    try {
      const amenitiesArray = data.amenities
        ?.split(',')
        .map((a) => a.trim())
        .filter(Boolean) || [];
      
      const imagesArray = data.images
        ?.split(',')
        .map((i) => i.trim())
        .filter(Boolean) || [];

      // TODO: Call API to create room
      console.log('Creating room:', {
        ...data,
        amenities: amenitiesArray,
        images: imagesArray,
      });

      alert('Room created successfully!');
      router.push('/partner/rooms');
    } catch (error) {
      alert('Failed to create room');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-slate-200 p-8">
      <div className="space-y-6">
        {/* Room Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Room Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('name')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all ${
              errors.name ? 'border-red-500' : 'border-slate-300'
            }`}
            placeholder="e.g., Deluxe Double Room"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all resize-none"
            placeholder="Describe the room features, view, and amenities..."
          />
        </div>

        {/* Room Type & Capacity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Room Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register('roomType')}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all ${
                errors.roomType ? 'border-red-500' : 'border-slate-300'
              }`}
            >
              <option value="">Select room type</option>
              <option value="Single Room">Single Room</option>
              <option value="Double Room">Double Room</option>
              <option value="Twin Room">Twin Room</option>
              <option value="Suite">Suite</option>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Family Room">Family Room</option>
            </select>
            {errors.roomType && (
              <p className="text-red-500 text-sm mt-1">{errors.roomType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('capacity', { valueAsNumber: true })}
              min={1}
              max={10}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all ${
                errors.capacity ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.capacity && (
              <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>
            )}
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Price per Night (VND) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register('price', { valueAsNumber: true })}
            min={0}
            step={10000}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all ${
              errors.price ? 'border-red-500' : 'border-slate-300'
            }`}
            placeholder="500000"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Total & Available Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Total Rooms <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('totalCount', { valueAsNumber: true })}
              min={0}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all ${
                errors.totalCount ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="10"
            />
            {errors.totalCount && (
              <p className="text-red-500 text-sm mt-1">{errors.totalCount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Available Rooms <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('availableCount', { valueAsNumber: true })}
              min={0}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all ${
                errors.availableCount ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="10"
            />
            {errors.availableCount && (
              <p className="text-red-500 text-sm mt-1">{errors.availableCount.message}</p>
            )}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Amenities
          </label>
          <input
            type="text"
            {...register('amenities')}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
            placeholder="King Bed, WiFi, TV, Mini Bar, Air Conditioning"
          />
          <p className="text-xs text-slate-500 mt-1">Separate multiple amenities with commas</p>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Image URLs
          </label>
          <input
            type="text"
            {...register('images')}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
            placeholder="https://example.com/room1.jpg, https://example.com/room2.jpg"
          />
          <p className="text-xs text-slate-500 mt-1">Separate multiple URLs with commas</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-[#6B5B3D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating Room...' : 'Create Room'}
        </button>
      </div>
    </form>
  );
}
