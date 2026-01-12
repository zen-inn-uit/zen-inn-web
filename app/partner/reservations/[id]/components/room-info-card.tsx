'use client';

interface RoomInfoCardProps {
  room: {
    name: string;
    image: string;
    size: string;
    bedType: string;
    capacity: number;
  };
  price: {
    room: number;
    extras: number;
    vat: number;
    cityTax: number;
    total: number;
  };
}

export function RoomInfoCard({ room, price }: RoomInfoCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5D5C3] p-6 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#3d2e1f]">Thông tin phòng</h3>
        <button className="text-slate-400 hover:text-brand">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>

      <div className="relative h-48 rounded-xl overflow-hidden mb-6 group cursor-pointer">
        <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-lg font-bold">{room.name}</div>
          <div className="flex items-center gap-3 text-xs opacity-90 font-medium">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {room.size}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {room.capacity} Khách
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Tóm tắt giá</h4>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-medium">Giá phòng</span>
            <span className="font-bold text-[#3d2e1f]">${price.room.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-medium">Thuế VAT (8%)</span>
            <span className="font-bold text-[#3d2e1f]">${price.vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-medium">Phí dịch vụ</span>
            <span className="font-bold text-[#3d2e1f]">${price.cityTax.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100">
        <div className="flex justify-between items-center mb-1">
          <span className="text-base font-bold text-[#3d2e1f]">Tổng thanh toán</span>
          <span className="text-2xl font-black text-brand">${price.total.toFixed(2)}</span>
        </div>
        <p className="text-[10px] text-slate-400 font-medium text-right italic">Bao gồm tất cả các thuế và phí</p>
      </div>
    </div>
  );
}
