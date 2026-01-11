import { z } from 'zod';

export const cancellationPolicySchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên chính sách'),
  description: z.string().optional(),
  freeCancellationHours: z.number().min(0, 'Giờ tối thiểu là 0'),
  refundablePercent: z.number().min(0, 'Phần trăm thấp nhất là 0').max(100, 'Phần trăm cao nhất là 100'),
  noShowRefundPercent: z.number().min(0).max(100),
  modificationAllowed: z.boolean(),
  modificationFeePercent: z.number().min(0).max(100),
});

export type CancellationPolicyFormData = z.infer<typeof cancellationPolicySchema>;
