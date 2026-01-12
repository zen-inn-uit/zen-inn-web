import { z } from 'zod';

export const ratePlanSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên gói giá/chiến dịch'),
  description: z.string().optional(),
  rateCode: z.string().optional(),
  basePrice: z.number().min(0, 'Giá không được âm'),
  minLos: z.number().min(1, 'Số đêm ở tối thiểu là 1'),
  maxLos: z.number().min(1).optional(),
  validFrom: z.string().min(1, 'Vui lòng chọn ngày bắt đầu'),
  validUntil: z.string().min(1, 'Vui lòng chọn ngày kết thúc'),
  refundablePercent: z.number().min(0).max(100),
  depositRequired: z.boolean(),
  depositPercent: z.number().min(0).max(100),
  includesBreakfast: z.boolean(),
  includesDinner: z.boolean(),
  includesParking: z.boolean(),
  otherInclusions: z.string().optional(),
  minGuestCount: z.number().min(1),
  maxGuestCount: z.number().optional(),
  modificationAllowed: z.boolean(),
  modificationFee: z.number().min(0),
  rateType: z.enum(['BAR', 'CORPORATE', 'LONG_STAY', 'CAMPAIGN']),
  active: z.boolean(),
  roomId: z.string().optional(),
  cancellationPolicyId: z.string().optional(),
  hotelId: z.string().optional(),
}).refine((data) => {
  const start = new Date(data.validFrom);
  const end = new Date(data.validUntil);
  return start < end;
}, {
  message: "Ngày bắt đầu phải nhỏ hơn ngày kết thúc",
  path: ["validUntil"],
});

export type RatePlanFormData = z.infer<typeof ratePlanSchema>;
