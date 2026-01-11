import { CreateBedDto } from './room-bed.dto';
import { CreateAmenityDto } from './room-amenity.dto';

export interface CreateRoomDto {
  name: string;
  description?: string;
  roomType: string;
  capacity: number;
  area?: number;
  availableCount: number;
  totalCount: number;
  images?: string[];
  beds?: CreateBedDto[];
  amenities?: CreateAmenityDto[];
  ratePlanId?: string;
  cancellationPolicyId?: string;
}
