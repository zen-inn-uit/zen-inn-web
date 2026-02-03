import axiosInstance from './axios';

export interface HotelSearchItem {
  id: string;
  slug?: string;
  name: string;
  city: string;
  address: string;
  thumbnailUrl: string | null;
  rating: number | null;
  reviewCount: number;
  startingPrice: number | null;
  currency: string;
  availableRoomsCount: number | null;
  maxGuests: number | null;
  bedroomCount: number | null;
}

export interface SearchHotelsResponse {
  items: HotelSearchItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface SearchHotelsParams {
  city?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  rooms?: number;
  page?: number;
  limit?: number;
  sortBy?: 'recommended' | 'price_asc' | 'rating_desc';
}

export interface RoomDetail {
  roomId: string;
  roomName: string;
  maxGuests: number;
  bedInfo: string | null;
  images: string[];
  pricePerNight: number | null;
  currency: string;
  availableCount: number | null;
  refundable: boolean | null;
  cancellationPolicyText: string | null;
}

export interface HotelInfo {
  id: string;
  slug?: string;
  name: string;
  description: string | null;
  city: string;
  address: string;
  country?: string;
  images: string[];
  rating: number | null;
  reviewCount: number;
  facilities: string[];
}

export interface HotelDetailResponse {
  hotel: HotelInfo;
  rooms: RoomDetail[];
}

export const hotelApi = {
  getFeaturedHotels: async (limit: number = 10): Promise<HotelSearchItem[]> => {
    return axiosInstance.get('/hotels/featured', { params: { limit } });
  },

  searchHotels: async (params: SearchHotelsParams): Promise<SearchHotelsResponse> => {
    return axiosInstance.get('/hotels/search', { params });
  },

  getHotelDetail: async (hotelId: string, params?: Partial<SearchHotelsParams>): Promise<HotelDetailResponse> => {
    return axiosInstance.get(`/hotels/${hotelId}`, { params });
  }
};
