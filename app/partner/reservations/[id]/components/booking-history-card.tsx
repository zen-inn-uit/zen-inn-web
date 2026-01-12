'use client';

import { useState } from 'react';

interface BookingHistoryItem {
  id: string;
  date: string;
  time: string;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  image: string;
}

interface BookingHistoryCardProps {
  history: BookingHistoryItem[];
}

export function BookingHistoryCard({ history }: BookingHistoryCardProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getRoomTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case 'deluxe':
        return 'bg-[#E4F5AC] text-[#3d2e1f]';
      case 'suite':
        return 'bg-[#E5D5C3] text-[#3d2e1f]';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5D5C3] overflow-hidden shadow-sm transition-all hover:shadow-md">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#3d2e1f]">Lịch sử đặt phòng</h3>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm mã, trạng thái..."
              className="pl-9 pr-4 py-2 bg-[#F9F7F2] border-none rounded-xl text-sm focus:ring-2 focus:ring-brand/20 w-64 font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-[#F9F7F2] rounded-xl text-sm font-bold text-[#3d2e1f] hover:bg-[#F5EFE7] transition-colors border border-[#E5D5C3]/30">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            19 - 24 Tháng 6, 2024
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9F7F2]/50">
              <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hình ảnh</th>
              <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mã đặt phòng</th>
              <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ngày đặt</th>
              <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Loại phòng</th>
              <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Số phòng</th>
              <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nhận phòng</th>
              <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Trả phòng</th>
              <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Khách</th>
              <th className="px-8 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {history.map((booking) => (
              <tr key={booking.id} className="hover:bg-[#F9F7F2]/30 transition-colors group">
                <td className="px-8 py-5">
                  <div className="w-20 h-12 rounded-lg overflow-hidden border border-[#E5D5C3] shadow-sm">
                    <img src={booking.image} alt={booking.roomType} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-bold text-[#3d2e1f]">{booking.id}</span>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="text-sm font-bold text-[#3d2e1f]">{booking.date}</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">{booking.time}</div>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap ${getRoomTypeBadge(booking.roomType)}`}>
                    {booking.roomType}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-bold text-[#3d2e1f]">{booking.roomNumber}</span>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="text-sm font-bold text-[#3d2e1f]">{booking.checkIn.split(' ')[0] + ' ' + booking.checkIn.split(' ')[1] + ' ' + booking.checkIn.split(' ')[2]}</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">{booking.checkIn.split(' ').slice(3).join(' ')}</div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="text-sm font-bold text-[#3d2e1f]">{booking.checkOut.split(' ')[0] + ' ' + booking.checkOut.split(' ')[1] + ' ' + booking.checkOut.split(' ')[2]}</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">{booking.checkOut.split(' ').slice(3).join(' ')}</div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-bold text-[#3d2e1f]">{booking.guests}</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-slate-300 hover:text-brand transition-colors p-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
