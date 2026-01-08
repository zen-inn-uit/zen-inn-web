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
  guest: string;
  rating: number;
  comment: string;
  date: string;
}
