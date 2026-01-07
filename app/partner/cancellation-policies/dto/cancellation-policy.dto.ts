export interface CancellationPolicyDTO {
  id: string;
  name: string;
  description?: string;
  freeCancellationHours: number;
  refundablePercent: number;
  noShowRefundPercent: number;
  modificationAllowed: boolean;
  modificationFeePercent: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
