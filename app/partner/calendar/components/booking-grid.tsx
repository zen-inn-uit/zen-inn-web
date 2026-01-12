'use client';

import React, { useState } from 'react';
import { format, eachDayOfInterval, isWeekend, isWithinInterval, isSameDay } from 'date-fns';
import { vi } from 'date-fns/locale';

interface BookingGridProps {
  rooms: any[];
  bookings: any[];
  startDate: Date;
  endDate: Date;
}

export function BookingGrid({ rooms, bookings, startDate, endDate }: BookingGridProps) {
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getBookingsForRoomAndDate = (roomId: string, date: Date) => {
    return bookings.filter(booking => 
      booking.roomId === roomId &&
      isWithinInterval(date, { 
        start: new Date(booking.checkIn), 
        end: new Date(booking.checkOut) 
      })
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-800', dot: 'bg-blue-500' };
      case 'CHECKED_IN': return { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-800', dot: 'bg-green-500' };
      case 'CHECKED_OUT': return { bg: 'bg-slate-100', border: 'border-slate-300', text: 'text-slate-700', dot: 'bg-slate-400' };
      default: return { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-800', dot: 'bg-blue-500' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Chờ check-in';
      case 'CHECKED_IN': return 'Đang ở';
      case 'CHECKED_OUT': return 'Đã check-out';
      default: return status;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="relative">
      {/* Scrollable Calendar */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
            <tr>
              <th className="sticky left-0 bg-slate-50 z-20 p-4 text-left border-r border-slate-200 w-[220px]">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loại phòng</span>
              </th>
              {days.map((day) => (
                <th 
                  key={day.toString()} 
                  className={`p-3 border-r border-slate-200 min-w-[140px] ${
                    isWeekend(day) ? 'bg-slate-100/50' : ''
                  } ${isSameDay(day, new Date()) ? 'bg-brand/5' : ''}`}
                >
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                      {format(day, 'EEE', { locale: vi })}
                    </div>
                    <div className={`text-sm font-bold ${
                      isSameDay(day, new Date()) ? 'text-brand' : 'text-slate-700'
                    }`}>
                      {format(day, 'dd/MM')}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-b border-slate-200 hover:bg-slate-50/30 transition-colors">
                <td className="sticky left-0 bg-white hover:bg-slate-50/30 z-10 p-4 border-r border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-slate-900 mb-0.5">{room.name}</div>
                      <div className="text-xs text-slate-500">{room.totalCount} phòng</div>
                    </div>
                  </div>
                </td>
                {days.map((day) => {
                  const dayBookings = getBookingsForRoomAndDate(room.id, day);
                  const isCheckIn = dayBookings.some(b => isSameDay(new Date(b.checkIn), day));
                  const isCheckOut = dayBookings.some(b => isSameDay(new Date(b.checkOut), day));

                  return (
                    <td 
                      key={day.toString()} 
                      className={`p-2 border-r border-slate-200 align-top ${
                        isWeekend(day) ? 'bg-slate-50/30' : ''
                      } ${isSameDay(day, new Date()) ? 'bg-brand/5' : ''}`}
                    >
                      <div className="min-h-[90px] space-y-1.5">
                        {dayBookings.map((booking) => {
                          const colors = getStatusColor(booking.status);
                          const isCheckIn = isSameDay(new Date(booking.checkIn), day);
                          const isCheckOut = isSameDay(new Date(booking.checkOut), day);
                          
                          // Check if booking is overdue (CHECKED_IN but past checkout time)
                          const isOverdue = booking.status === 'CHECKED_IN' && new Date() > new Date(booking.checkOut);
                          const displayColors = isOverdue 
                            ? { bg: 'bg-red-100', border: 'border-red-400', text: 'text-red-900', dot: 'bg-red-600' }
                            : colors;
                          
                          return (
                            <button
                              key={booking.id}
                              onClick={() => setSelectedBooking(booking)}
                              className={`w-full text-left p-2.5 rounded-lg border transition-all hover:shadow-md ${displayColors.bg} ${displayColors.border} ${displayColors.text} relative group`}
                            >
                              {/* Booking info */}
                              <div className="text-xs font-bold mb-1 truncate pr-1">{booking.guestName}</div>
                              <div className="text-[10px] opacity-75 mb-1">{booking.guestCount} khách</div>
                              
                              {/* Time labels */}
                              <div className="flex items-center gap-1 flex-wrap">
                                {isCheckIn && (
                                  <div className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                    isOverdue ? 'text-red-800 bg-red-50' : 'text-green-700 bg-green-50'
                                  }`}>
                                    14:00 CI
                                  </div>
                                )}
                                {isCheckOut && (
                                  <div className="text-[9px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">
                                    12:00 CO
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Detail Sidebar */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-end" onClick={() => setSelectedBooking(null)}>
          <div 
            className="bg-white h-full w-full max-w-md shadow-2xl overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between z-10">
              <h3 className="text-lg font-bold text-slate-900 font-outfit">Chi tiết booking</h3>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${getStatusColor(selectedBooking.status).bg} ${getStatusColor(selectedBooking.status).border} ${getStatusColor(selectedBooking.status).text} border`}>
                  {getStatusLabel(selectedBooking.status)}
                </span>
                <span className="text-xs text-slate-500">#{selectedBooking.id}</span>
              </div>

              {/* Overdue Checkout Warning */}
              {selectedBooking.status === 'CHECKED_IN' && new Date() > new Date(selectedBooking.checkOut) && (
                <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-sm font-bold text-red-900">Quá giờ check-out!</span>
                  </div>
                  <p className="text-xs text-red-700">Khách đã quá giờ check-out. Vui lòng xử lý ngay.</p>
                </div>
              )}

              {/* Guest Info */}
              <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {selectedBooking.guestName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{selectedBooking.guestName}</div>
                    <div className="text-xs text-slate-500">{selectedBooking.guestCount} khách</div>
                  </div>
                </div>
              </div>

              {/* Check-in / Check-out with Time - Fixed colors */}
              <div className="grid grid-cols-2 gap-4">
                {/* Check-in */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <div className="text-xs font-bold text-green-600 uppercase tracking-wider">Check-in</div>
                  </div>
                  <div className="text-lg font-bold text-green-900 mb-1">
                    {format(new Date(selectedBooking.checkIn), 'dd MMM yyyy', { locale: vi })}
                  </div>
                  <div className="flex items-center gap-1.5 text-green-700">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-bold">14:00</span>
                  </div>
                </div>

                {/* Check-out - Fixed red color */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    <div className="text-xs font-bold text-red-600 uppercase tracking-wider">Check-out</div>
                  </div>
                  <div className="text-lg font-bold text-red-900 mb-1">
                    {format(new Date(selectedBooking.checkOut), 'dd MMM yyyy', { locale: vi })}
                  </div>
                  <div className="flex items-center gap-1.5 text-red-700">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-bold">12:00</span>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-bold text-blue-900">Thời gian lưu trú</span>
                  </div>
                  <span className="text-lg font-bold text-blue-900">
                    {Math.ceil((new Date(selectedBooking.checkOut).getTime() - new Date(selectedBooking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} đêm
                  </span>
                </div>
              </div>

              {/* Room Info */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thông tin phòng</div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="text-sm font-bold text-slate-900 mb-1">
                    {rooms.find(r => r.id === selectedBooking.roomId)?.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {rooms.find(r => r.id === selectedBooking.roomId)?.roomType}
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thanh toán</div>
                <div className="bg-gradient-to-br from-brand/5 to-brand/10 border border-brand/20 rounded-2xl p-4">
                  <div className="text-xs text-brand/70 mb-1">Tổng tiền</div>
                  <div className="text-2xl font-bold text-brand">{formatCurrency(selectedBooking.totalPrice)}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Sticky at bottom */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 space-y-3">
              {selectedBooking.status === 'PENDING' && (
                <button className="w-full px-4 py-3 bg-green-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition-all flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Check-in khách
                </button>
              )}

              {selectedBooking.status === 'CHECKED_IN' && (
                <button className="w-full px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-600/20 transition-all flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  {new Date() > new Date(selectedBooking.checkOut) ? 'Check-out ngay (Quá giờ!)' : 'Check-out khách'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="p-6 bg-slate-50 border-t border-slate-200">
        <div className="flex flex-wrap items-center gap-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chú thích:</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium text-slate-600">Check-in</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs font-medium text-slate-600">Check-out</span>
          </div>
          <div className="h-4 w-px bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
            <span className="text-xs font-medium text-slate-600">Chờ check-in</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
            <span className="text-xs font-medium text-slate-600">Đang ở</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-100 border-2 border-slate-300 rounded"></div>
            <span className="text-xs font-medium text-slate-600">Đã check-out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
