import { z } from 'zod';

export const createRoomSchema = z.object({
  name: z.string()
    .min(1, 'Tên phòng là bắt buộc')
    .max(100, 'Tên phòng quá dài (tối đa 100 ký tự)'),
  description: z.string().optional(),
  roomType: z.string()
    .min(1, 'Loại phòng là bắt buộc'),
  capacity: z.number()
    .min(1, 'Sức chứa phải ít nhất 1 người')
    .max(10, 'Sức chứa không được vượt quá 10 người'),
  price: z.number()
    .min(0, 'Giá phải lớn hơn hoặc bằng 0'),
  totalCount: z.number()
    .min(0, 'Tổng số phòng phải lớn hơn hoặc bằng 0'),
  availableCount: z.number()
    .min(0, 'Số phòng trống phải lớn hơn hoặc bằng 0'),
  amenities: z.string().optional(),
  images: z.string().optional(),
}).refine((data) => data.availableCount <= data.totalCount, {
  message: 'Số phòng trống không được vượt quá tổng số phòng',
  path: ['availableCount'],
});

export type CreateRoomFormData = z.infer<typeof createRoomSchema>;
