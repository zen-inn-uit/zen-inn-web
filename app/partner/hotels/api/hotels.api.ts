import { partnerAPI } from '@/lib/api/partner-api';
import type { HotelDTO } from '../dto/hotel.dto';

export const hotelsApi = {
  getHotels: async (): Promise<HotelDTO[]> => {
    return partnerAPI.listHotels();
  },
};
