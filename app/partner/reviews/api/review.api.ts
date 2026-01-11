import type { 
  ReviewStatsDTO, 
  RatingBreakdownDTO, 
  CountryReviewDTO, 
  ReviewItemDTO 
} from '../dto/review.dto';

export const reviewsApi = {
  getStats: async (): Promise<ReviewStatsDTO> => {
    return {
      positive: 1560,
      negative: 230,
      overallRating: 4.6,
      totalReviews: 2546
    };
  },

  getRatingBreakdown: async (): Promise<RatingBreakdownDTO[]> => {
    return [
      { label: 'Facilities', score: 4.4 },
      { label: 'Cleanliness', score: 4.4 },
      { label: 'Services', score: 4.6 },
      { label: 'Comfort', score: 4.8 },
      { label: 'Food and Dining', score: 4.5 },
    ];
  },

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

  getRecentReviews: async (): Promise<ReviewItemDTO[]> => {
    return [
      { id: '1', guest: 'John Doe', rating: 5, comment: 'Excellent stay!', date: '2024-06-15' },
      { id: '2', guest: 'Jane Smith', rating: 4, comment: 'Very clean and comfortable.', date: '2024-06-14' },
    ];
  }
};
