import { ratePlansApi } from './api/rate-plans.api';
import { RatePlansList } from './components/rate-plans-list';
import { partnerAPI } from '@/lib/api/partner-api';

export default async function RatePlansPage() {
  const [ratePlans, hotels] = await Promise.all([
    ratePlansApi.getRatePlans(),
    partnerAPI.listHotels(),
  ]);

  return <RatePlansList initialRatePlans={ratePlans} hotels={hotels} />;
}
