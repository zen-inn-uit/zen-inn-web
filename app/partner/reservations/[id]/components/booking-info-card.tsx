'use client';

interface BookingInfoCardProps {
  booking: {
    id: string;
    date: string;
    roomType: string;
    roomNumber: string;
    guests: number;
    request: string;
    checkInDate: string;
    checkInTime: string;
    checkOutDate: string;
    checkOutTime: string;
    duration: string;
    status: string;
    notes: string;
  };
  amenities: string[];
}

export function BookingInfoCard({ booking, amenities }: BookingInfoCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5D5C3] p-8 shadow-sm h-full flex flex-col transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-[#3d2e1f]">Thông tin đặt phòng</h3>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#E4F5AC] text-[#3d2e1f] rounded-lg text-[11px] font-bold flex items-center gap-1.5 border border-[#D4E59C]">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            Đã xác nhận đặt phòng
          </span>
          <button className="text-slate-400 hover:text-brand transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-2xl font-black text-[#3d2e1f] mb-1">Mã đặt phòng: {booking.id}</h4>
        <p className="text-sm text-slate-400 font-bold">{booking.date}</p>
      </div>

      <div className="grid grid-cols-3 gap-y-8 gap-x-6 mb-8">
        <div>
          <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Loại phòng</div>
          <div className="font-bold text-[#3d2e1f] text-sm whitespace-nowrap">{booking.roomType}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Số phòng</div>
          <div className="font-bold text-[#3d2e1f] text-sm">{booking.roomNumber}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Giá</div>
          <div className="font-bold text-[#3d2e1f] text-sm">$150<span className="text-slate-400 font-medium">/đêm</span></div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Khách</div>
          <div className="font-bold text-[#3d2e1f] text-sm">{booking.guests} Người lớn</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Yêu cầu</div>
          <div className="font-bold text-[#3d2e1f] text-sm truncate" title={booking.request}>{booking.request}</div>
        </div>
        <div />

        <div>
          <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Nhận phòng</div>
          <div className="font-bold text-[#3d2e1f] text-sm whitespace-nowrap">
            {new Date(booking.checkInDate).toLocaleDateString('vi-VN', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="text-xs text-slate-400 font-bold mt-0.5">{booking.checkInTime}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Trả phòng</div>
          <div className="font-bold text-[#3d2e1f] text-sm whitespace-nowrap">
            {new Date(booking.checkOutDate).toLocaleDateString('vi-VN', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="text-xs text-slate-400 font-bold mt-0.5">{booking.checkOutTime}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Thời gian lưu trú</div>
          <div className="font-bold text-[#3d2e1f] text-sm">{booking.duration}</div>
        </div>
      </div>

      <div className="mb-8 flex-1">
        <div className="mb-6">
          <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-3 uppercase">Tiện ích đặc biệt</div>
          <div className="flex flex-wrap gap-4">
            {amenities.map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[13px] text-green-600 font-bold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-2 uppercase">Ghi chú</div>
        <p className="text-sm text-[#3d2e1f] font-bold leading-relaxed">{booking.notes}</p>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-50 flex justify-end gap-3">
        <button className="px-8 py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 transition-all">
          Xác nhận
        </button>
        <button className="px-6 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-all border border-red-100">
          Hủy đặt phòng
        </button>
      </div>
    </div>
  );
}
