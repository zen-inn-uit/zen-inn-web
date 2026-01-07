'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { HotelDTO } from '../dto/hotel.dto';

interface HotelsListProps {
  initialHotels: HotelDTO[];
}

export function HotelsList({ initialHotels }: HotelsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<HotelDTO | null>(null);

  const filteredHotels = initialHotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <div className="p-8 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Quản lý khách sạn</h1>
        
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm khách sạn, thành phố..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400 transition-all"
            />
          </div>
          
          <Link href="/partner/hotels/new" className="px-6 py-2.5 bg-brand text-white rounded-lg font-medium text-sm hover:bg-[#6B5B3D] transition-colors inline-block">
            Thêm khách sạn
          </Link>
        </div>
      </div>

      <div className="flex-1 flex gap-6 px-8 pb-8 overflow-hidden">
        {/* Hotels List */}
        <div className="w-1/2 overflow-y-auto space-y-3 pr-3">
          {filteredHotels.map((hotel) => (
            <button
              key={hotel.id}
              onClick={() => setSelectedHotel(hotel)}
              className={`w-full bg-white rounded-xl p-4 flex gap-4 hover:shadow-md transition-all border text-left ${
                selectedHotel?.id === hotel.id ? 'border-brand shadow-md' : 'border-slate-200'
              }`}
            >
              <div className="w-24 h-24 bg-slate-200 rounded-lg flex-shrink-0 overflow-hidden">
                {hotel.images?.[0] ? (
                  <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 truncate">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {hotel.rating}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {hotel.city}, {hotel.country}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <strong className="text-slate-900">{hotel.totalRooms}</strong> phòng
                  </span>
                  <span className="flex items-center gap-1 text-lime-600">
                    <strong className="text-lime-700">{hotel.availableRooms}</strong> trống
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Hotel Detail Panel */}
        <div className="w-1/2 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
          {selectedHotel ? (
            <>
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Chi tiết khách sạn</h2>
                  <p className="text-sm text-slate-500">ID: {selectedHotel.id}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border-2 border-slate-200 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-50 transition-colors">
                    Chỉnh sửa
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-8">
                  {/* Hero Image */}
                  <div className="h-64 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    {selectedHotel.images?.[0] ? (
                      <img src={selectedHotel.images[0]} alt={selectedHotel.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-50">
                        <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tên khách sạn</h4>
                      <p className="text-slate-900 font-medium">{selectedHotel.name}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Đánh giá</h4>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {selectedHotel.rating} / 5.0
                      </div>
                    </div>
                    <div className="col-span-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Địa chỉ</h4>
                      <p className="text-slate-900">{selectedHotel.address}, {selectedHotel.city}, {selectedHotel.country}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Liên hệ</h4>
                      <p className="text-slate-900 text-sm">{selectedHotel.phone}</p>
                      <p className="text-slate-500 text-xs">{selectedHotel.email}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Check-in / Check-out</h4>
                      <p className="text-slate-900 text-sm">{selectedHotel.checkInTime} - {selectedHotel.checkOutTime}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mô tả</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{selectedHotel.description}</p>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Tiện ích</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedHotel.amenities?.map((amenity, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Chưa chọn khách sạn</h3>
                <p className="text-sm text-slate-500">Chọn một khách sạn từ danh sách để xem chi tiết</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
