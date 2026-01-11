'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ImageViewer } from '@/components/ui/image-viewer';
import type { HotelDTO } from '../dto/hotel.dto';
import { partnerAPI } from '@/lib/api/partner-api';
import { useLoading } from '@/contexts/loading-context';

export function HotelsList() {
  const [hotels, setHotels] = useState<HotelDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<HotelDTO | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await partnerAPI.listHotels();
      setHotels(data);
    } catch (err: any) {
      console.error('Failed to fetch hotels:', err);
      setError(err.message || 'Không thể tải danh sách khách sạn. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const openViewer = (index: number) => {
    setCurrentImageIndex(index);
    setViewerOpen(true);
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-brand rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Đang tải danh sách khách sạn...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm border border-red-100 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Đã xảy ra lỗi</h3>
          <p className="text-slate-500 mb-6">{error}</p>
          <button 
            onClick={fetchHotels}
            className="w-full py-2.5 bg-brand text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <div className="p-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Quản lý khách sạn</h1>
          <span className="px-3 py-1 bg-slate-200 text-slate-600 rounded-full text-xs font-bold">
            {hotels.length} khách sạn
          </span>
        </div>
        
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
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400 transition-all shadow-sm"
            />
          </div>
          
          <Link href="/partner/hotels/new" className="px-6 py-2.5 bg-brand text-white rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-brand/20 transition-all inline-block">
            Thêm khách sạn
          </Link>
        </div>
      </div>

      <div className="flex-1 flex gap-6 px-8 pb-8 overflow-hidden">
        {/* Hotels List */}
        <div className="w-1/2 overflow-y-auto space-y-3 pr-3">
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              /* ... existing button code ... */
              <button
                key={hotel.id}
                onClick={() => setSelectedHotel(hotel)}
                className={`w-full bg-white rounded-xl p-4 flex gap-4 transition-all border text-left group ${
                  selectedHotel?.id === hotel.id 
                    ? 'border-brand shadow-md ring-1 ring-brand/20' 
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="w-24 h-24 bg-slate-100 rounded-lg flex-shrink-0 overflow-hidden border border-slate-100">
                  {hotel.images?.[0] ? (
                    <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50">
                      <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-900 truncate group-hover:text-brand transition-colors">{hotel.name}</h3>
                      {(hotel.rating || hotel.starRating) && (
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {hotel.starRating || hotel.rating}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {hotel.city}, {hotel.country}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-[11px]">
                    <span className="flex items-center gap-1 text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      Tổng: <strong className="text-slate-900 font-bold">{hotel.totalRooms || 0}</strong>
                    </span>
                    <span className="flex items-center gap-1 text-lime-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-500"></span>
                      Trống: <strong className="font-bold">{hotel.availableRooms || 0}</strong>
                    </span>
                  </div>
                </div>
              </button>
            ))
          ) : searchTerm ? (
            <div className="bg-white rounded-xl p-12 text-center border border-dashed border-slate-300">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-slate-900 font-bold mb-1">Không tìm thấy kết quả</h3>
              <p className="text-slate-500 text-sm">Thử thay đổi từ khóa tìm kiếm của bạn</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center border border-dashed border-brand/30 bg-brand/5">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-slate-900 font-bold mb-2 text-lg">Chào mừng đối tác mới!</h3>
              <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">Bạn chưa đăng ký khách sạn nào trên hệ thống. Hãy bắt đầu bằng cách thêm khách sạn đầu tiên của bạn.</p>
              <Link href="/partner/hotels/new" className="px-6 py-2 bg-brand text-white rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all">
                Thêm khách sạn ngay
              </Link>
            </div>
          )}
        </div>

        {/* Hotel Detail Panel */}
        <div className="w-1/2 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
          {selectedHotel ? (
            <>
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">{selectedHotel.name}</h2>
                  <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Mã: {selectedHotel.id.split('-')[0]}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold text-xs hover:bg-slate-50 transition-colors shadow-sm">
                    Chỉnh sửa
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-8">
                  {/* Images Gallery */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Thư viện ảnh</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedHotel.images && selectedHotel.images.length > 0 ? (
                        selectedHotel.images.slice(0, 4).map((img, idx) => (
                          <div 
                            key={idx} 
                            className={`${idx === 0 && selectedHotel.images!.length > 1 ? 'col-span-2 h-64' : 'h-32'} bg-slate-100 rounded-xl overflow-hidden cursor-pointer hover:opacity-95 transition-all relative group shadow-sm`}
                            onClick={() => openViewer(idx)}
                          >
                            <img src={img} alt={`${selectedHotel.name} ${idx + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                              <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                            {idx === 3 && selectedHotel.images!.length > 4 && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-lg backdrop-blur-[2px]">
                                +{selectedHotel.images!.length - 4}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 h-48 rounded-xl bg-slate-50 border border-dashed border-slate-300 flex flex-col items-center justify-center gap-2">
                          <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs text-slate-400 font-medium">Chưa có hình ảnh</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-6 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    <div className="col-span-2 sm:col-span-1">
                      <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Xếp hạng</h4>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {selectedHotel.starRating || selectedHotel.rating || 0} sao
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Liên hệ</h4>
                      <p className="text-slate-900 font-bold text-sm truncate">{selectedHotel.phone || 'N/A'}</p>
                    </div>
                    <div className="col-span-2">
                      <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Địa chỉ</h4>
                      <p className="text-slate-900 text-sm leading-relaxed">{selectedHotel.address}, {selectedHotel.city}, {selectedHotel.country}</p>
                    </div>
                  </div>

                  {/* Description */}
                  {selectedHotel.description && (
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Giới thiệu</h4>
                      <p className="text-slate-600 text-sm leading-relaxed antialiased">{selectedHotel.description}</p>
                    </div>
                  )}

                  {/* Amenities */}
                  {selectedHotel.amenities && selectedHotel.amenities.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-3">Tiện ích dịch vụ</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedHotel.amenities.map((amenity, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded-lg shadow-sm">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-slate-50/30">
              <div className="text-center px-8">
                <div className="w-20 h-20 bg-white shadow-xl shadow-slate-200/50 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                  <svg className="w-10 h-10 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Chào mừng bạn trở lại!</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">Chọn một khách sạn từ danh sách bên trái để bắt đầu quản lý thông tin và phòng nghỉ.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ImageViewer 
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        images={selectedHotel?.images || []}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
        title={selectedHotel?.name}
        description={selectedHotel?.description}
      />
    </div>
  );
}
