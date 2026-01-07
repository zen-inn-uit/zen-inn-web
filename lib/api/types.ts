// API Types matching server DTOs

export enum KycStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum Role {
  ADMIN = 'ADMIN',
  PARTNER = 'PARTNER',
  CUSTOMER = 'CUSTOMER',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

// Partner Profile
export interface UpsertPartnerDto {
  company?: string;
}

export interface Partner {
  id: string;
  userId: string;
  company: string | null;
  kycStatus: KycStatus;
  createdAt: string;
  updatedAt: string;
  user?: User;
  hotels?: Hotel[];
  kycDocuments?: KycDocument[];
}

// KYC Document
export interface CreateKycDocDto {
  kind: string;
  url: string;
}

export interface KycDocument {
  id: string;
  partnerId: string;
  kind: string;
  url: string;
  createdAt: string;
}

// User
export interface User {
  id: string;
  email: string;
  role: Role;
  name: string | null;
}

// Hotel
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

export interface UpdateHotelDto {
  name?: string;
  description?: string;
  address?: string;
  city?: string;
  country?: string;
  starRating?: number;
  amenities?: string[];
  images?: string[];
}

export interface Hotel {
  id: string;
  partnerId: string;
  name: string;
  description: string | null;
  address: string;
  city: string;
  country: string;
  starRating: number | null;
  amenities: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Room
export interface CreateRoomDto {
  name: string;
  description?: string;
  roomType: string;
  capacity: number;
  price: number;
  amenities?: string[];
  images?: string[];
  availableCount: number;
  totalCount: number;
}

export interface UpdateRoomDto {
  name?: string;
  description?: string;
  roomType?: string;
  capacity?: number;
  price?: number;
  amenities?: string[];
  images?: string[];
  availableCount?: number;
  totalCount?: number;
}

export interface Room {
  id: string;
  hotelId: string;
  name: string;
  description: string | null;
  roomType: string;
  capacity: number;
  price: number;
  amenities: string[];
  images: string[];
  availableCount: number;
  totalCount: number;
  createdAt: string;
  updatedAt: string;
}

// Inventory
export interface UpdateInventoryDto {
  availableCount?: number;
  totalCount?: number;
}

// Rate Plan
export interface CreateRatePlanDto {
  name: string;
  rateCode: string;
  basePrice: number;
  validFrom: string;
  validUntil: string;
  cancellationPolicyId?: string;
  refundablePercent?: number;
  includesBreakfast?: boolean;
  active?: boolean;
}

export interface UpdateRatePlanDto {
  name?: string;
  rateCode?: string;
  basePrice?: number;
  validFrom?: string;
  validUntil?: string;
  cancellationPolicyId?: string;
  refundablePercent?: number;
  includesBreakfast?: boolean;
  active?: boolean;
}

export interface RatePlan {
  id: string;
  roomId: string;
  name: string;
  rateCode: string;
  basePrice: number;
  validFrom: string;
  validUntil: string;
  cancellationPolicyId: string | null;
  refundablePercent: number;
  includesBreakfast: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Deal
export interface CreateDealDto {
  name: string;
  dealType: string;
  discountPercent?: number;
  discountAmount?: number;
  validFrom: string;
  validUntil: string;
  conditions?: string;
  active?: boolean;
}

export interface UpdateDealDto {
  name?: string;
  dealType?: string;
  discountPercent?: number;
  discountAmount?: number;
  validFrom?: string;
  validUntil?: string;
  conditions?: string;
  active?: boolean;
}

export interface Deal {
  id: string;
  roomId: string;
  name: string;
  dealType: string;
  discountPercent: number | null;
  discountAmount: number | null;
  validFrom: string;
  validUntil: string;
  conditions: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Cancellation Policy
export interface CreateCancellationPolicyDto {
  name: string;
  description?: string;
  refundPercent: number;
  hoursBeforeCheckIn: number;
  active?: boolean;
}

export interface UpdateCancellationPolicyDto {
  name?: string;
  description?: string;
  refundPercent?: number;
  hoursBeforeCheckIn?: number;
  active?: boolean;
}

export interface CancellationPolicy {
  id: string;
  partnerId: string;
  name: string;
  description: string | null;
  refundPercent: number;
  hoursBeforeCheckIn: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Booking
export interface QueryBookingDto {
  status?: BookingStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  totalPrice: number;
  status: BookingStatus;
  paymentIntentId: string | null;
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
  room?: Room;
  user?: User;
}

// Paginated Response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
