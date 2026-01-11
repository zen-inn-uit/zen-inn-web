export interface CreateCancellationPolicyDto {
  name: string;
  description?: string;
  refundPercent: number;
  hoursBeforeCheckIn: number;
  active?: boolean;
}
