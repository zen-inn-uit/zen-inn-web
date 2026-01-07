export interface RoomDTO {
  id: string;
  name: string;
  description: string;
  roomType: string;
  capacity: number;
  price: number;
  size: string;
  bedType: string;
  images: string[];
  amenities: string[];
  availableCount: number;
  totalCount: number;
  hotel: {
    id: string;
    name: string;
  };
}
