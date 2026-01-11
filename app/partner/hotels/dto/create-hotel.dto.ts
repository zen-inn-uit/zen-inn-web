export interface CreateHotelDto {
  name: string;
  description?: string;
  address: string;
  city: string;
  country: string;
  starRating?: number;
  amenities?: string[];
  images?: string[];
}
