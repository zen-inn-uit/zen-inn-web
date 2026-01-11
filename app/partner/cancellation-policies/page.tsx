import { cancellationPoliciesApi } from './api/cancellation-policies.api';
import { PoliciesList } from './components/policies-list';
import { partnerAPI } from '@/lib/api/partner-api';

export default async function CancellationPoliciesPage() {
  const [policies, hotels] = await Promise.all([
    cancellationPoliciesApi.getPolicies(),
    partnerAPI.listHotels(),
  ]);

  return <PoliciesList initialPolicies={policies} hotels={hotels} />;
}
