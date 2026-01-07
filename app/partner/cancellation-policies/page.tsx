import { cancellationPoliciesApi } from './api/cancellation-policies.api';
import { PoliciesList } from './components/policies-list';

export default async function CancellationPoliciesPage() {
  const policies = await cancellationPoliciesApi.getPolicies();

  return <PoliciesList initialPolicies={policies} />;
}
