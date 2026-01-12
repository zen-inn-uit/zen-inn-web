'use client';

interface ProfileCardProps {
  guest: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
    dob: string;
    gender: string;
    nationality: string;
    passport: string;
  };
}

export function ProfileCard({ guest }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5D5C3] p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-[#3d2e1f]">Hồ sơ</h3>
        <button className="text-slate-400 hover:text-brand">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>
      
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-[#E5D5C3] p-1 mb-4">
          <div className="w-full h-full rounded-full bg-[#C9A882] flex items-center justify-center overflow-hidden">
            <img src={`https://ui-avatars.com/api/?name=${guest.name}&background=C9A882&color=fff&size=128`} alt={guest.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <h4 className="text-2xl font-bold text-[#3d2e1f] mb-1">{guest.name}</h4>
          <p className="text-sm text-slate-400 font-medium tracking-wide">ID: G011-987654321</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 text-brand">
          <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <span className="text-sm font-semibold">{guest.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-brand">
          <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm font-semibold">{guest.email}</span>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 mb-8">
        <h5 className="text-sm font-bold text-[#3d2e1f] mb-5">Thông tin cá nhân</h5>
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Ngày sinh</div>
            <div className="font-bold text-[#3d2e1f] text-sm">{guest.dob}</div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Giới tính</div>
            <div className="font-bold text-[#3d2e1f] text-sm">{guest.gender === 'Male' ? 'Nam' : 'Nữ'}</div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Quốc tịch</div>
            <div className="font-bold text-[#3d2e1f] text-sm">{guest.nationality}</div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Số hộ chiếu</div>
            <div className="font-bold text-[#3d2e1f] text-sm">{guest.passport}</div>
          </div>
        </div>
      </div>

    </div>
  );
}
