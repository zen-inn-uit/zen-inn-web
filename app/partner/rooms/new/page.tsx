import { PageContainer } from '@/components/ui/page-container';
import { CreateRoomForm } from './components/create-room-form';
import { hotelsApi } from '../../hotels/api/hotels.api';
import { cancellationPoliciesApi } from '../../cancellation-policies/api/cancellation-policies.api';
import { ratePlansApi } from '../../rate-plans/api/rate-plans.api';
import Link from 'next/link';

export default async function NewRoomPage() {
  const [hotels, policies, ratePlans] = await Promise.all([
    hotelsApi.getHotels(),
    cancellationPoliciesApi.getPolicies(),
    ratePlansApi.getRatePlans(),
  ]);

  return (
    <PageContainer className="p-8">
      <div className="mb-8">
        <Link
          href="/partner/rooms"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại danh sách phòng
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Thêm phòng mới</h1>
        <p className="text-slate-600 mt-2">Tạo loại phòng mới cho cơ sở lưu trú của bạn</p>
      </div>

      <CreateRoomForm hotels={hotels} policies={policies} ratePlans={ratePlans} />
    </PageContainer>
  );
}
