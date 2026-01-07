import { PageContainer } from '@/components/ui/page-container';
import { CreateHotelForm } from './components/create-hotel-form';
import Link from 'next/link';

export default function NewHotelPage() {
  return (
    <PageContainer className="p-8">
      <div className="mb-8">
        <Link
          href="/partner/hotels"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại danh sách khách sạn
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Thêm khách sạn mới</h1>
        <p className="text-slate-600 mt-2">Đăng ký cơ sở lưu trú mới của bạn vào hệ thống Zen Inn</p>
      </div>

      <CreateHotelForm />
    </PageContainer>
  );
}
