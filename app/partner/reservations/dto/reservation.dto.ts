export interface ReservationDTO {
  id: string;
  guest: GuestDTO;
  room: string;
  request: string;
  duration: string;
  checkInDate: string;
  checkOutDate: string;
  status: ReservationStatus;
}

export interface GuestDTO {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface ReservationFilters {
  status?: ReservationStatus | 'All Status';
  search?: string;
  dateRange?: {
    from: string;
    to: string;
  };
}

export interface CreateReservationDTO {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  specialRequests?: string;
}

export interface UpdateReservationDTO {
  status?: ReservationStatus;
  specialRequests?: string;
}
