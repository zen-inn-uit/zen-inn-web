import { z } from 'zod';

const bedSchema = z.object({
  bedType: z.enum(['SINGLE', 'DOUBLE', 'QUEEN', 'KING', 'TWIN', 'BUNK']),
  quantity: z.number().min(1, 'Số lượng giường phải ít nhất 1'),
});

const amenitySchema = z.object({
  name: z.string().min(1, 'Tên tiện nghi là bắt buộc'),
  category: z.enum(['ROOM_FEATURE', 'BATHROOM', 'ENTERTAINMENT', 'CONVENIENCE', 'SAFETY', 'ACCESSIBILITY']),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export const createRoomSchema = z.object({
  hotelId: z.string().min(1, 'Khách sạn là bắt buộc'),
  name: z.string()
    .min(1, 'Tên phòng là bắt buộc')
    .max(100, 'Tên phòng quá dài (tối đa 100 ký tự)'),
  description: z.string().optional(),
  roomType: z.string()
    .min(1, 'Loại phòng là bắt buộc'),
  capacity: z.number()
    .min(1, 'Sức chứa phải ít nhất 1 người')
    .max(10, 'Sức chứa không được vượt quá 10 người'),
  area: z.number()
    .min(0, 'Diện tích phải lớn hơn 0')
    .optional(),
  totalCount: z.number()
    .min(0, 'Tổng số phòng phải lớn hơn hoặc bằng 0'),
  availableCount: z.number()
    .min(0, 'Số phòng trống phải lớn hơn hoặc bằng 0'),
  images: z.string().optional(),
  beds: z.array(bedSchema).optional(),
  amenities: z.array(amenitySchema).optional(),
  cancellationPolicyId: z.string().optional(),
  ratePlanId: z.string().min(1, 'Gói giá là bắt buộc'),
}).refine((data) => data.availableCount <= data.totalCount, {
  message: 'Số phòng trống không được vượt quá tổng số phòng',
  path: ['availableCount'],
});

export type CreateRoomFormData = z.infer<typeof createRoomSchema>;
