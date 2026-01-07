'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { RoomDTO } from '../dto/room.dto';

interface RoomsListProps {
  initialRooms: RoomDTO[];
}

export function RoomsList({ initialRooms }: RoomsListProps) {
  const [filterStatus, setFilterStatus] = useState('All Room');
  const [selectedRoom, setSelectedRoom] = useState<RoomDTO | null>(null);

  const filteredRooms = filterStatus === 'All Room' 
    ? initialRooms 
    : filterStatus === 'Available'
    ? initialRooms.filter(r => r.availableCount > 0)
    : initialRooms.filter(r => r.availableCount === 0);

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <div className="p-8 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Phòng</h1>
        
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm loại phòng, số phòng..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400 transition-all font-medium"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400 transition-all font-medium"
          >
            <option value="All Room">Tất cả phòng</option>
            <option value="Available">Đang trống</option>
            <option value="Occupied">Đã đặt</option>
          </select>
 
          <Link href="/partner/rooms/new" className="px-6 py-2.5 bg-brand text-white rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-brand/20 transition-all inline-block">
            Thêm phòng mới
          </Link>
        </div>
      </div>

      <div className="flex-1 flex gap-6 px-8 pb-8 overflow-hidden">
        {/* Rooms List */}
        <div className="w-1/2 overflow-y-auto space-y-3 pr-3">
          {filteredRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              className={`w-full bg-white rounded-xl p-4 flex gap-4 hover:shadow-md transition-all border text-left ${
                selectedRoom?.id === room.id ? 'border-brand shadow-md' : 'border-slate-200'
              }`}
            >
              <div className="w-24 h-20 bg-slate-200 rounded-lg flex-shrink-0 overflow-hidden">
                {room.images?.[0] ? (
                  <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900">{room.name}</h3>
                  {room.availableCount > 0 ? (
                    <span className="px-2 py-0.5 bg-lime-100 text-lime-700 text-xs font-medium rounded-full">
                      Đang trống
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                      Đã đặt
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mb-2 line-clamp-1">{room.description}</p>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    {room.size}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-6 0h6" />
                    </svg>
                    {room.bedType}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {room.capacity} khách
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {room.ratePlans?.[0] 
                      ? `${new Intl.NumberFormat('vi-VN').format(room.ratePlans[0].basePrice)}/đêm`
                      : 'Liên hệ giá'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {room.availableCount}/{room.totalCount} trống
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Room Detail Panel */}
        <div className="w-1/2 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
          {selectedRoom ? (
            <>
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Chi tiết phòng</h2>
                  <p className="text-sm text-slate-500">{selectedRoom.hotel.name}</p>
                </div>
                <button className="px-4 py-2 bg-brand text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all">
                  Chỉnh sửa
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* Images Gallery */}
                <div className="p-6 border-b border-slate-200">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {selectedRoom.images.map((img, idx) => (
                      <div key={idx} className={`${idx === 0 ? 'col-span-2 h-64' : 'h-32'} bg-slate-200 rounded-lg overflow-hidden`}>
                        <img src={img} alt={`${selectedRoom.name} ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <button className="text-sm text-brand hover:text-[#6B5B3D] font-medium">
                    Xem tất cả {selectedRoom.images.length} ảnh
                  </button>
                </div>

                {/* Room Info */}
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{selectedRoom.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#C9A882] text-[#6B5B3D] text-xs font-medium rounded-full">
                          {selectedRoom.roomType}
                        </span>
                        {selectedRoom.availableCount > 0 ? (
                          <span className="px-2.5 py-1 bg-lime-100 text-lime-700 text-xs font-medium rounded-full">
                            Đang trống
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                            Đã đặt
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">
                      {selectedRoom.ratePlans?.[0]
                        ? new Intl.NumberFormat('vi-VN').format(selectedRoom.ratePlans[0].basePrice)
                        : 'N/A'}
                    </div>
                    <div className="text-sm text-slate-500">mỗi đêm</div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">{selectedRoom.description}</p>
                </div>

                {/* Room Details */}
                <div className="p-6 border-b border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-4">Thông tin chi tiết</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Diện tích</div>
                      <div className="text-sm font-medium text-slate-900">{selectedRoom.size}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Loại giường</div>
                      <div className="text-sm font-medium text-slate-900">{selectedRoom.bedType}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Sức chứa</div>
                      <div className="text-sm font-medium text-slate-900">{selectedRoom.capacity} khách</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Tình trạng</div>
                      <div className="text-sm font-medium text-slate-900">
                        {selectedRoom.availableCount}/{selectedRoom.totalCount} phòng trống
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="p-6 border-b border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-4">Tiện ích & Dịch vụ</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedRoom.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Chưa chọn phòng</h3>
                <p className="text-sm text-slate-500">Chọn một phòng từ danh sách để xem chi tiết</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
