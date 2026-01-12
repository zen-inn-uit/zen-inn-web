export interface RoomDTO {
  id: string;
  hotelId: string;
  name: string;
  description: string;
  roomType: string;
  capacity: number;
  area: number;
  images: string[];
  availableCount: number;
  totalCount: number;
  cancellationPolicyId?: string;
  hotel: {
    id: string;
    name: string;
  };
  beds: Array<{
    id: string;
    bedType: string;
    quantity: number;
  }>;
  amenities: Array<{
    id: string;
    name?: string;
    category?: string;
    amenity?: {
      id: string;
      name: string;
      category: string;
    };
  }>;
  ratePlans: Array<{
    id: string;
    name: string;
    basePrice: number;
    rateType?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}
