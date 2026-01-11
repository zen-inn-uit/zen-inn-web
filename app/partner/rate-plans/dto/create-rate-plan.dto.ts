export interface CreateRatePlanDto {
  name: string;
  rateCode: string;
  basePrice: number;
  validFrom: string;
  validUntil: string;
  cancellationPolicyId?: string;
  refundablePercent?: number;
  includesBreakfast?: boolean;
  active?: boolean;
}
