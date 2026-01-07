import { PageContainer } from '@/components/ui/page-container';
import { CreatePolicyForm } from '../components/create-policy-form';
import Link from 'next/link';

export default function NewCancellationPolicyPage() {
  return (
    <PageContainer className="p-8">
      <div className="mb-8">
        <Link
          href="/partner/cancellation-policies"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors font-medium text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại danh sách chính sách
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 font-outfit">Thêm chính sách hủy mới</h1>
        <p className="text-slate-500 mt-2 font-medium">Thiết lập các điều kiện hoàn trả và thay đổi linh hoạt cho khách hàng của bạn</p>
      </div>

      <CreatePolicyForm />
    </PageContainer>
  );
}
