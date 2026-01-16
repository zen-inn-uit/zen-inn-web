import { reviewsApi } from './api/review.api';
import { ReviewStats } from './components/review-stats';
import { OverallRating } from './components/overall-rating';
import { CountryDistribution } from './components/country-distribution';
import { ReviewsList } from './components/reviews-list';
import { PageContainer } from '@/components/ui/page-container';
import { partnerAPI } from '@/lib/api/partner-api';

export default async function ReviewsPage() {
  const [stats, ratings, countries, hotels] = await Promise.all([
    reviewsApi.getStats(),
    reviewsApi.getRatingBreakdown(),
    reviewsApi.getCountryReviews(),
    partnerAPI.listHotels(),
  ]);

  return (
    <PageContainer className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3d2e1f] font-outfit">Reviews</h1>
          <p className="text-slate-500 mt-1">Manage customer reviews and feedback</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ReviewStats positive={stats.positive} negative={stats.negative} />
        <OverallRating rating={stats.overallRating} totalReviews={stats.totalReviews} breakdown={ratings} />
      </div>

      <div className="mb-8">
        <CountryDistribution data={countries} />
      </div>

      {/* Reviews List with Filters */}
      <div>
        <h2 className="text-2xl font-bold text-[#3d2e1f] mb-6">All Reviews</h2>
        <ReviewsList hotels={hotels} />
      </div>
    </PageContainer>
  );
}
