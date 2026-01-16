export interface ReviewStatsDTO {
  positive: number;
  negative: number;
  overallRating: number;
  totalReviews: number;
}

export interface RatingBreakdownDTO {
  label: string;
  score: number;
}

export interface CountryReviewDTO {
  country: string;
  percentage: number;
  count: number;
  lat?: number;
  lng?: number;
}

export interface ReviewItemDTO {
  id: string;
  guest: {
    name: string;
    email: string;
    avatar?: string;
    country?: string;
  };
  hotel: {
    id: string;
    name: string;
  };
  room?: {
    id: string;
    name: string;
  };
  rating: number;          // 1-5 stars
  comment?: string;
  reply?: string;
  repliedAt?: string;
  date: string;            // Review date (createdAt)
  bookingId: string;
}

export interface ReviewsResponseDTO {
  data: ReviewItemDTO[];
  total: number;
  page: number;
  limit: number;
}

export interface QueryReviewsDTO {
  rating?: number;
  hotelId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

