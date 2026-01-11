import { BookingStatus } from "@/lib/api/types";

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
  room?: any;
  user?: any;
}
