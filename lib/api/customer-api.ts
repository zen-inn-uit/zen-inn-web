// Customer API - Bookings and Wishlist
import axiosInstance from './axios';
import { buildUrlWithParams } from './url-utils';
import { BookingStatus } from './types';

// ==================== BOOKING TYPES ====================
export interface BookingRoom {
  id: string;
  name: string;
  hotel: {
    id: string;
    slug?: string;
    name: string;
    city: string;
    address: string;
    thumbnailUrl: string | null;
  };
}

export interface CustomerBooking {
  id: string;
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  totalPrice: number;
  currency?: string;
  status: BookingStatus;
  paymentIntentId: string | null;
  transactionId: string | null;
  paymentMethod: string;
  paymentStatus: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  createdAt: string;
  updatedAt: string;
  room?: BookingRoom;
}

export interface QueryCustomerBookingDto {
  status?: BookingStatus;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

export interface BookingsResponse {
  items: CustomerBooking[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ==================== WISHLIST TYPES ====================
export interface WishlistItem {
  id: string;
  hotelId: string;
  hotelSlug?: string;
  name: string;
  city: string;
  address: string;
  thumbnailUrl: string | null;
  rating: number | null;
  reviewCount: number;
  startingPrice: number | null;
  currency: string;
  createdAt: string;
}

export interface WishlistResponse {
  items: WishlistItem[];
  meta: {
    total: number;
  };
}

export interface WishlistAddResponse {
  id: string;
  userId: string;
  hotelId: string;
  createdAt: string;
}

// ==================== API METHODS ====================
export const customerAPI = {
  // ========== BOOKINGS ==========
  /**
   * Get customer's bookings with optional filters
   */
  getMyBookings: (query?: QueryCustomerBookingDto) => {
    const url = buildUrlWithParams('/bookings', query as Record<string, string | number | boolean | undefined | null>);
    return axiosInstance.get<any, BookingsResponse>(url);
  },

  /**
   * Get a specific booking by ID
   */
  getBookingById: (id: string) => {
    return axiosInstance.get<any, { booking: CustomerBooking }>(`/bookings/${id}`);
  },

  // ========== WISHLIST ==========
  /**
   * Get customer's wishlist
   */
  getWishlist: () => {
    return axiosInstance.get<any, WishlistResponse>('/wishlist');
  },

  /**
   * Add hotel to wishlist
   */
  addToWishlist: (hotelId: string) => {
    return axiosInstance.post<any, WishlistAddResponse>(`/wishlist/${hotelId}`);
  },

  /**
   * Remove hotel from wishlist
   */
  removeFromWishlist: (hotelId: string) => {
    return axiosInstance.delete<any, { message: string }>(`/wishlist/${hotelId}`);
  },

  /**
   * Check if hotel is in wishlist (helper method)
   */
  isInWishlist: async (hotelId: string): Promise<boolean> => {
    try {
      const response = await customerAPI.getWishlist();
      return response.items.some(item => item.hotelId === hotelId);
    } catch (error) {
      return false;
    }
  },

  // ========== CREATE/RESERVE BOOKING ==========
  /**
   * Reserve a booking (instant confirmation, no payment)
   */
  reserveBooking: (data: ReserveBookingDto) => {
    return axiosInstance.post<any, ReserveBookingResponse>('/bookings/reserve', data);
  },

  /**
   * Create a new booking (legacy - with payment)
   */
  createBooking: (data: CreateBookingDto) => {
    return axiosInstance.post<any, CreateBookingResponse>('/bookings', data);
  },

  /**
   * Cancel a booking
   */
  cancelBooking: (bookingId: string, data: CancelBookingDto) => {
    return axiosInstance.post<any, { booking: CustomerBooking; message: string }>(`/bookings/${bookingId}/cancel`, data);
  },
};

// ==================== BOOKING CREATION TYPES ====================
/**
 * Reserve booking DTO (simplified - no payment method)
 */
export interface ReserveBookingDto {
  roomId: string;
  ratePlanId?: string;
  checkIn: string; // ISO 8601 date string
  checkOut: string; // ISO 8601 date string
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCount: number;
  specialRequests?: string;
}

/**
 * Reserve booking response (instant confirmation)
 */
export interface ReserveBookingResponse {
  success: boolean;
  booking: CustomerBooking;
  message: string;
}

/**
 * Create booking DTO (legacy - with payment method)
 */
export interface CreateBookingDto {
  roomId: string;
  ratePlanId?: string;
  checkIn: string; // ISO 8601 date string
  checkOut: string; // ISO 8601 date string
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCount: number;
  paymentMethod: 'VNPAY' | 'SEPAY' | 'CASH' | 'CARD';
  specialRequests?: string;
}

export interface CreateBookingResponse {
  booking: CustomerBooking;
  paymentUrl: string | null;
}

export interface CancelBookingDto {
  cancellationReason?: string;
}
