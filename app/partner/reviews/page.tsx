import { reviewsApi } from './api/review.api';
import { ReviewStats } from './components/review-stats';
// import { OverallRating } from './components/overall-rating';
// import { CountryDistribution } from './components/country-distribution';
import { OverallRating } from './components/overall-rating';
import { CountryDistribution } from './components/country-distribution';
import { PageContainer } from '@/components/ui/page-container';

export default async function ReviewsPage() {
  const stats = await reviewsApi.getStats();
  const ratings = await reviewsApi.getRatingBreakdown();
  const countries = await reviewsApi.getCountryReviews();

  return (
    <PageContainer className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#3d2e1f]">Reviews</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ReviewStats positive={stats.positive} negative={stats.negative} />
        <OverallRating rating={stats.overallRating} totalReviews={stats.totalReviews} breakdown={ratings} />
      </div>

      <CountryDistribution data={countries} />
    </PageContainer>
  );
}
