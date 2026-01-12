import { CancellationPolicyDTO } from '../../cancellation-policies/dto/cancellation-policy.dto';

export interface RatePlanDTO {
  id: string;
  name: string;
  description?: string;
  rateCode?: string;
  basePrice: number;
  minLos: number;
  maxLos?: number;
  validFrom: string;
  validUntil: string;
  refundablePercent: number;
  depositRequired: boolean;
  depositPercent: number;
  includesBreakfast: boolean;
  includesDinner: boolean;
  includesParking: boolean;
  otherInclusions?: string;
  minGuestCount: number;
  maxGuestCount?: number;
  modificationAllowed: boolean;
  modificationFee: number;
  rateType: 'BAR' | 'CORPORATE' | 'LONG_STAY' | 'CAMPAIGN';
  active: boolean;
  roomId: string;
  cancellationPolicyId?: string;
  cancellationPolicy?: CancellationPolicyDTO;
  createdAt: string;
  updatedAt: string;
}
