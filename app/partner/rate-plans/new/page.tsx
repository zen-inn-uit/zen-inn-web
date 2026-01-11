import { PageContainer } from '@/components/ui/page-container';
import { CreateRatePlanForm } from '../components/create-rate-plan-form';
import { cancellationPoliciesApi } from '../../cancellation-policies/api/cancellation-policies.api';
import Link from 'next/link';

export default async function NewRatePlanPage() {
  const { partnerAPI } = await import('@/lib/api/partner-api');
  const [policies, hotels] = await Promise.all([
    cancellationPoliciesApi.getPolicies(),
    partnerAPI.listHotels()
  ]);

  return (
    <PageContainer className="p-8">
      <div className="mb-8">
        <Link
          href="/partner/rate-plans"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors font-medium text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại quản lý giá
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 font-outfit">Thiết lập chính sách giá</h1>
        <p className="text-slate-500 mt-2 font-medium">Cấu hình các gói giá chuẩn hoặc tạo chiến dịch khuyến mãi cho từng ngày cụ thể</p>
      </div>

      <CreateRatePlanForm policies={policies} hotels={hotels} />
    </PageContainer>
  );
}
