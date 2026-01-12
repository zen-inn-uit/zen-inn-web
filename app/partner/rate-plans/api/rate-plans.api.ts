import { partnerAPI } from '@/lib/api/partner-api';
import { RatePlanDTO } from '../dto/rate-plan.dto';

export const ratePlansApi = {
  getRatePlans: async (roomId?: string): Promise<RatePlanDTO[]> => {
    if (roomId) {
      // For now, if roomId is provided, we still fetch all and filter or we can call specific room API
      // But based on the current usage in RatePlansPage, we need all partner rate plans
      return partnerAPI.listPartnerRatePlans();
    }
    return partnerAPI.listPartnerRatePlans();
  },
  
  createRatePlan: async (hotelId: string, roomId: string, data: any): Promise<RatePlanDTO> => {
    return partnerAPI.createRatePlan(hotelId, roomId, data);
  }
};
