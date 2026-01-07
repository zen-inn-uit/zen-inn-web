export interface HotelDTO {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email?: string;
  website?: string;
  rating?: number;
  images?: string[];
  amenities?: string[];
  checkInTime?: string;
  checkOutTime?: string;
  totalRooms: number;
  availableRooms: number;
  createdAt: string;
  updatedAt: string;
}
