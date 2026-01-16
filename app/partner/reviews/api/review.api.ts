import type { 
  ReviewStatsDTO, 
  RatingBreakdownDTO, 
  CountryReviewDTO, 
  ReviewItemDTO,
  ReviewsResponseDTO,
  QueryReviewsDTO,
} from '../dto/review.dto';
import axiosInstance from '@/lib/api/axios';
import { buildUrlWithParams } from '@/lib/api/url-utils';

export const reviewsApi = {
  // Get review statistics
  getStats: async (): Promise<ReviewStatsDTO> => {
    const stats = await axiosInstance.get<any, { totalReviews: number; averageRating: number; ratingBreakdown: Array<{ rating: number; count: number }> }>('/partners/reviews/stats');
    
    // Calculate positive/negative from breakdown
    const positive = stats.ratingBreakdown
      .filter(r => r.rating >= 4)
      .reduce((sum, r) => sum + r.count, 0);
    const negative = stats.ratingBreakdown
      .filter(r => r.rating <= 2)
      .reduce((sum, r) => sum + r.count, 0);

    return {
      positive,
      negative,
      overallRating: stats.averageRating,
      totalReviews: stats.totalReviews,
    };
  },

  // Get rating breakdown (mock for now - can be enhanced later)
  getRatingBreakdown: async (): Promise<RatingBreakdownDTO[]> => {
    return [
      { label: 'Facilities', score: 4.4 },
      { label: 'Cleanliness', score: 4.4 },
      { label: 'Services', score: 4.6 },
      { label: 'Comfort', score: 4.8 },
      { label: 'Food and Dining', score: 4.5 },
    ];
  },

  // Get country reviews (mock for now)
  getCountryReviews: async (): Promise<CountryReviewDTO[]> => {
    return [
      { country: 'Vietnam', percentage: 25, count: 640, lat: 21.0285, lng: 105.8542 },
      { country: 'USA', percentage: 23, count: 585, lat: 37.0902, lng: -95.7129 },
      { country: 'China', percentage: 15, count: 382, lat: 35.8617, lng: 104.1954 },
      { country: 'UK', percentage: 12, count: 305, lat: 55.3781, lng: -3.4360 },
      { country: 'France', percentage: 10, count: 255, lat: 46.2276, lng: 2.2137 },
      { country: 'Australia', percentage: 8, count: 204, lat: -25.2744, lng: 133.7751 },
    ];
  },

  // Get reviews with filters
  getReviews: async (query?: QueryReviewsDTO): Promise<ReviewsResponseDTO> => {
    const url = buildUrlWithParams('/partners/reviews', query as Record<string, string | number | boolean | undefined | null>);
    return axiosInstance.get<any, ReviewsResponseDTO>(url);
  },

  // Reply to a review
  replyToReview: async (id: string, reply: string): Promise<ReviewItemDTO> => {
    return axiosInstance.patch<any, ReviewItemDTO>(`/partners/reviews/${id}/reply`, { reply });
  },
};
