export interface DashboardStatsDTO {
  newBookings: StatDTO;
  checkIns: StatDTO;
  checkOuts: StatDTO;
  totalRevenue: StatDTO;
}

export interface StatDTO {
  value: number;
  change: number;
  isUp: boolean;
}

export interface RoomAvailabilityDTO {
  occupied: number;
  reserved: number;
  available: number;
  notReady: number;
}

export interface ReservationStatsDTO {
  date: string;
  booked: number;
  cancelled: number;
}

export interface PlatformDataDTO {
  name: string;
  value: number;
  color: string;
}

export interface RatingCategoryDTO {
  category: string;
  score: number;
}

export interface TaskDTO {
  id: string;
  date: string;
  title: string;
  color: string;
}

export interface ActivityDTO {
  id: string;
  time: string;
  title: string;
  description: string;
  color: string;
}

export interface BookingListItemDTO {
  id: string;
  guest: string;
  room: string;
  roomNumber: string;
  duration: string;
  checkIn: string;
  checkOut: string;
  status: string;
}
