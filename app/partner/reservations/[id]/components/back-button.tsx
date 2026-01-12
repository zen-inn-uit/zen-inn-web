'use client';

import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-[#6B5B3D] hover:text-[#8B6F47] transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
      </svg>
      <span className="font-bold">Quay lại danh sách đặt phòng</span>
    </button>
  );
}
