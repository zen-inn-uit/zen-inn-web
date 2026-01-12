import { partnerAPI } from '@/lib/api/partner-api';
import { CancellationPolicyDTO } from '../dto/cancellation-policy.dto';

export const cancellationPoliciesApi = {
  getPolicies: async (): Promise<CancellationPolicyDTO[]> => {
    return partnerAPI.listPolicies();
  },
  
  createPolicy: async (data: any): Promise<CancellationPolicyDTO> => {
    return partnerAPI.createPolicy(data);
  }
};
