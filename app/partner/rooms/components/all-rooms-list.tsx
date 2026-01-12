'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ImageViewer } from '@/components/ui/image-viewer';
import type { HotelDTO } from '@/app/partner/hotels/dto/hotel.dto';
import type { RoomDTO } from '../dto/room.dto';
import { partnerAPI } from '@/lib/api/partner-api';
import { PageContainer } from '@/components/ui/page-container';

interface AllRoomsListProps {
  hotels: HotelDTO[];
  initialRooms: RoomDTO[];
}

export function AllRoomsList({ hotels, initialRooms }: AllRoomsListProps) {
  const router = useRouter();
  const [rooms, setRooms] = useState<RoomDTO[]>(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState<RoomDTO | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHotelId, setSelectedHotelId] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'occupied'>('all');

  const openViewer = (index: number) => {
    setCurrentImageIndex(index);
    setViewerOpen(true);
  };

  const handleDeleteRoom = async (roomId: string, hotelId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa phòng này?')) return;
    
    try {
      await partnerAPI.deleteRoom(hotelId, roomId);
      setRooms(rooms.filter(r => r.id !== roomId));
      if (selectedRoom?.id === roomId) {
        setSelectedRoom(null);
      }
      alert('Xóa phòng thành công!');
    } catch (error) {
      console.error('Failed to delete room:', error);
      alert('Xóa phòng thất bại!');
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.roomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'available' && room.availableCount > 0) ||
                         (filterStatus === 'occupied' && room.availableCount === 0);
    const matchesHotel = selectedHotelId === 'all' || room.hotelId === selectedHotelId;
    
    return matchesSearch && matchesStatus && matchesHotel;
  });

  const getRoomTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'standard': return 'bg-slate-100 text-slate-700';
      case 'deluxe': return 'bg-amber-100 text-amber-700';
      case 'suite': return 'bg-indigo-100 text-indigo-700';
      case 'family': return 'bg-emerald-100 text-emerald-700';
      case 'single': return 'bg-sky-100 text-sky-700';
      default: return 'bg-brand/10 text-brand';
    }
  };

  return (
    <PageContainer className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-outfit">Quản lý Loại phòng</h1>
          <p className="text-slate-500 mt-2">Danh sách tất cả các loại phòng trong hệ thống khách sạn của bạn</p>
        </div>
        <Link
          href="/partner/rooms/new"
          className="bg-brand text-white px-6 py-3 rounded-2xl font-bold text-sm hover:shadow-xl hover:shadow-brand/20 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm phòng mới
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm tên phòng, loại phòng, khách sạn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 transition-all shadow-sm font-medium"
          />
        </div>
        
        <div className="flex gap-3">
          <select
            value={selectedHotelId}
            onChange={(e) => setSelectedHotelId(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 transition-all shadow-sm font-bold text-slate-700 min-w-[200px]"
          >
            <option value="all">Tất cả khách sạn</option>
            {hotels.map(h => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 transition-all shadow-sm font-bold text-slate-700"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="available">Còn trống</option>
            <option value="occupied">Hết phòng</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Rooms List */}
        <div className="w-1/2 space-y-4">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`w-full bg-white rounded-2xl p-4 flex gap-4 transition-all border text-left group ${
                  selectedRoom?.id === room.id 
                    ? 'border-brand shadow-md ring-1 ring-brand/20' 
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="w-24 h-24 bg-slate-100 rounded-xl flex-shrink-0 overflow-hidden border border-slate-100">
                  {room.images?.[0] ? (
                    <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50">
                      <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-900 truncate group-hover:text-brand transition-colors">{room.name}</h3>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${getRoomTypeColor(room.roomType)}`}>
                        {room.roomType}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                       <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {room.hotel.name}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-500 font-medium">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {room.capacity} khách
                      </span>
                      {room.availableCount > 0 ? (
                        <span className="flex items-center gap-1 text-lime-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-lime-500"></span>
                          Trống: <strong className="font-bold">{room.availableCount}/{room.totalCount}</strong>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                          Hết phòng
                        </span>
                      )}
                    </div>
                    {room.ratePlans?.[0] && (
                       <span className="font-bold text-slate-900">
                        {room.ratePlans[0].basePrice.toLocaleString()}đ
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-slate-900 font-bold mb-1">Không thấy phòng nào</h3>
              <p className="text-slate-500 text-sm">Thử thay đổi bộ lọc hoặc thêm phòng mới</p>
            </div>
          )}
        </div>

        {/* Room Detail Panel */}
        <div className="w-1/2 bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col shadow-sm sticky top-8">
          {selectedRoom ? (
            <>
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1 font-outfit">{selectedRoom.name}</h2>
                  <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Mã: {selectedRoom.id.split('-')[0]}</p>
                  <div className="flex items-center gap-1.5 text-xs text-brand font-bold uppercase tracking-wider">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {selectedRoom.hotel.name}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/partner/rooms/${selectedRoom.id}/edit`}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    Chỉnh sửa
                  </Link>
                  <button
                    onClick={() => handleDeleteRoom(selectedRoom.id, selectedRoom.hotelId)}
                    className="px-4 py-2 bg-red-50 border border-red-100 text-red-600 rounded-xl font-bold text-xs hover:bg-red-100 transition-colors"
                  >
                    Xóa
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-8 space-y-10">
                  {/* Images Gallery */}
                  {selectedRoom.images && selectedRoom.images.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Thư viện ảnh</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedRoom.images.slice(0, 4).map((img, idx) => (
                          <div 
                            key={idx} 
                            className={`${idx === 0 && selectedRoom.images!.length > 1 ? 'col-span-2 h-72' : 'h-36'} bg-slate-100 rounded-2xl overflow-hidden cursor-pointer hover:opacity-95 transition-all relative group shadow-sm`}
                            onClick={() => openViewer(idx)}
                          >
                            <img src={img} alt={`${selectedRoom.name} ${idx + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                              <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                            {idx === 3 && selectedRoom.images!.length > 4 && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-lg backdrop-blur-[2px]">
                                +{selectedRoom.images!.length - 4}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">Loại phòng</h4>
                      <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${getRoomTypeColor(selectedRoom.roomType)}`}>
                        {selectedRoom.roomType}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">Sức chứa</h4>
                      <p className="text-slate-900 font-bold text-sm flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {selectedRoom.capacity} khách
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">Diện tích</h4>
                      <p className="text-slate-900 font-bold text-sm">{selectedRoom.area || '--'} m²</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">Số lượng</h4>
                      <p className="text-slate-900 font-bold text-sm">{selectedRoom.availableCount}/{selectedRoom.totalCount} phòng trống</p>
                    </div>
                  </div>

                  {/* Rate Plans */}
                  {selectedRoom.ratePlans && selectedRoom.ratePlans.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Gói giá đang áp dụng</h4>
                      <div className="space-y-3">
                        {selectedRoom.ratePlans.map((plan) => (
                          <div key={plan.id} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm">
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{plan.name}</p>
                              <p className="text-[10px] text-slate-500 font-bold uppercase">{plan.rateType || 'BAR'}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-brand text-lg">{plan.basePrice.toLocaleString()}đ</p>
                              <p className="text-[10px] text-slate-400 uppercase font-bold">Mỗi đêm</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {selectedRoom.description && (
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Mô tả chi tiết</h4>
                      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{selectedRoom.description}</p>
                    </div>
                  )}

                  {/* Amenities */}
                  {selectedRoom.amenities && selectedRoom.amenities.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Tiện nghi & Dịch vụ</h4>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                        {selectedRoom.amenities.map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-600 font-medium">
                            <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                               <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            {amenity.amenity?.name || amenity.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/20 p-12 text-center">
              <div className="w-24 h-24 bg-white shadow-2xl shadow-slate-200 rounded-[2rem] flex items-center justify-center mb-8 transform rotate-6 scale-110">
                <svg className="w-12 h-12 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-outfit">Sẵn sàng quản lý phòng?</h3>
              <p className="text-sm text-slate-500 max-w-[240px] mx-auto leading-relaxed">Chọn một loại phòng bất kỳ từ danh sách bên trái để bắt đầu kiểm tra và cập nhật thông tin.</p>
            </div>
          )}
        </div>
      </div>

      <ImageViewer 
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        images={selectedRoom?.images || []}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
        title={selectedRoom?.name}
        description={selectedRoom?.description}
      />
    </PageContainer>
  );
}
