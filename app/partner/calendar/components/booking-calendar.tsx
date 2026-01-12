'use client';

import { useState, useEffect } from 'react';
import { HotelDTO } from '@/app/partner/hotels/dto/hotel.dto';
import { format, addDays, startOfToday, eachDayOfInterval, subDays, isWeekend } from 'date-fns';
import { vi } from 'date-fns/locale';
import { BookingStats } from './booking-stats';
import { BookingGrid } from './booking-grid';

interface BookingCalendarProps {
  hotels: HotelDTO[];
}

// Mock data structure
interface MockBooking {
  id: string;
  roomId: string;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  status: 'CONFIRMED' | 'PENDING' | 'CHECKED_IN' | 'CHECKED_OUT';
  guestCount: number;
  totalPrice: number;
}

interface MockRoom {
  id: string;
  name: string;
  roomType: string;
  totalCount: number;
}

export function BookingCalendar({ hotels }: BookingCalendarProps) {
  const [selectedHotelId, setSelectedHotelId] = useState(hotels[0]?.id || '');
  const [startDate, setStartDate] = useState(startOfToday());
  const [viewMode, setViewMode] = useState<'stats' | 'calendar'>('stats');
  const [isLoading, setIsLoading] = useState(false);

  // Safety check for empty hotels
  if (!hotels || hotels.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 font-outfit mb-2">Chưa có khách sạn</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">Vui lòng tạo khách sạn trước để xem lịch phòng.</p>
      </div>
    );
  }

  // Mock rooms data
  const mockRooms: MockRoom[] = [
    { id: 'room1', name: 'Deluxe Double', roomType: 'Double', totalCount: 10 },
    { id: 'room2', name: 'Superior Twin', roomType: 'Twin', totalCount: 8 },
    { id: 'room3', name: 'Family Suite', roomType: 'Suite', totalCount: 5 },
    { id: 'room4', name: 'Executive King', roomType: 'King', totalCount: 6 },
  ];

  // Mock bookings data - All 3 statuses with clear examples
  const mockBookings: MockBooking[] = [
    // === CHECKED_IN (Đang ở) - Green ===
    {
      id: 'b1',
      roomId: 'room1',
      guestName: 'Nguyễn Văn A',
      checkIn: addDays(startOfToday(), 0), // Hôm nay check-in
      checkOut: addDays(startOfToday(), 3),
      status: 'CHECKED_IN',
      guestCount: 2,
      totalPrice: 3000000,
    },
    {
      id: 'b5',
      roomId: 'room4',
      guestName: 'Hoàng Văn E',
      checkIn: addDays(startOfToday(), -1), // Hôm qua check-in
      checkOut: addDays(startOfToday(), 2),
      status: 'CHECKED_IN',
      guestCount: 2,
      totalPrice: 2400000,
    },
    {
      id: 'b8',
      roomId: 'room2',
      guestName: 'Bùi Thị H',
      checkIn: addDays(startOfToday(), 3),
      checkOut: addDays(startOfToday(), 6),
      status: 'CHECKED_IN',
      guestCount: 2,
      totalPrice: 2700000,
    },
    
    // === PENDING (Chờ check-in) - Blue ===
    {
      id: 'b2',
      roomId: 'room1',
      guestName: 'Trần Thị B',
      checkIn: addDays(startOfToday(), 5),
      checkOut: addDays(startOfToday(), 7),
      status: 'PENDING',
      guestCount: 2,
      totalPrice: 2000000,
    },
    {
      id: 'b3',
      roomId: 'room2',
      guestName: 'Lê Văn C',
      checkIn: addDays(startOfToday(), 1),
      checkOut: addDays(startOfToday(), 4),
      status: 'PENDING',
      guestCount: 3,
      totalPrice: 2700000,
    },
    {
      id: 'b4',
      roomId: 'room3',
      guestName: 'Phạm Thị D',
      checkIn: addDays(startOfToday(), 2),
      checkOut: addDays(startOfToday(), 6),
      status: 'PENDING',
      guestCount: 4,
      totalPrice: 4000000,
    },
    {
      id: 'b6',
      roomId: 'room1',
      guestName: 'Vũ Thị F',
      checkIn: addDays(startOfToday(), 10),
      checkOut: addDays(startOfToday(), 14),
      status: 'PENDING',
      guestCount: 2,
      totalPrice: 4000000,
    },
    {
      id: 'b7',
      roomId: 'room1',
      guestName: 'Đặng Văn G',
      checkIn: addDays(startOfToday(), 1),
      checkOut: addDays(startOfToday(), 2),
      status: 'PENDING',
      guestCount: 1,
      totalPrice: 1000000,
    },
    {
      id: 'b10',
      roomId: 'room4',
      guestName: 'Phan Thị K',
      checkIn: addDays(startOfToday(), 2),
      checkOut: addDays(startOfToday(), 4),
      status: 'PENDING',
      guestCount: 2,
      totalPrice: 2000000,
    },
    
    // === CHECKED_OUT (Đã check-out) - Gray ===
    {
      id: 'b9',
      roomId: 'room3',
      guestName: 'Võ Văn I',
      checkIn: addDays(startOfToday(), -3), // 3 ngày trước
      checkOut: addDays(startOfToday(), -1), // Hôm qua check-out
      status: 'CHECKED_OUT',
      guestCount: 3,
      totalPrice: 3000000,
    },
    {
      id: 'b12',
      roomId: 'room2',
      guestName: 'Cao Thị M',
      checkIn: addDays(startOfToday(), -5),
      checkOut: addDays(startOfToday(), -2),
      status: 'CHECKED_OUT',
      guestCount: 2,
      totalPrice: 2500000,
    },
    
    // === OVERDUE (Quá giờ check-out) - CHECKED_IN but past checkout time ===
    {
      id: 'b11',
      roomId: 'room3',
      guestName: 'Mai Văn L (QUÁ GIỜ)',
      checkIn: addDays(startOfToday(), -1), // Hôm qua check-in
      checkOut: new Date(new Date().setHours(2, 0, 0, 0)), // Hôm nay 2:00 sáng (hiện tại 3:03 đã quá giờ)
      status: 'CHECKED_IN',
      guestCount: 2,
      totalPrice: 1500000,
    },
  ];

  const endDate = addDays(startDate, 13); // 14 days view

  const handlePrev = () => setStartDate(addDays(startDate, -14));
  const handleNext = () => setStartDate(addDays(startDate, 14));
  const handleToday = () => setStartDate(startOfToday());

  return (
    <div className="space-y-6">
      {/* Hotel Selector & Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Khách sạn:</span>
            <div className="relative">
              <select
                value={selectedHotelId}
                onChange={(e) => setSelectedHotelId(e.target.value)}
                className="pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:border-brand transition-all min-w-[250px]"
              >
                {hotels.map((h) => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('stats')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  viewMode === 'stats' ? 'bg-white text-brand shadow-sm' : 'text-slate-500'
                }`}
              >
                Thống kê
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  viewMode === 'calendar' ? 'bg-white text-brand shadow-sm' : 'text-slate-500'
                }`}
              >
                Lịch phòng
              </button>
            </div>

            {/* Date Navigation */}
            {viewMode === 'calendar' && (
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
                <button onClick={handlePrev} className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-500 hover:text-brand">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button onClick={handleToday} className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-brand transition-all">
                  Hôm nay
                </button>
                <button onClick={handleNext} className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-500 hover:text-brand">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {viewMode === 'calendar' && (
              <div className="text-sm font-bold text-slate-900 font-outfit">
                {format(startDate, 'dd MMM', { locale: vi })} - {format(endDate, 'dd MMM, yyyy', { locale: vi })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {viewMode === 'stats' ? (
          <BookingStats rooms={mockRooms} bookings={mockBookings} />
        ) : (
          <BookingGrid 
            rooms={mockRooms} 
            bookings={mockBookings}
            startDate={startDate}
            endDate={endDate}
          />
        )}
      </div>
    </div>
  );
}
