import { z } from 'zod';

export const createHotelSchema = z.object({
  name: z.string()
    .min(3, 'Tên khách sạn phải có ít nhất 3 ký tự')
    .max(200, 'Tên khách sạn quá dài (tối đa 200 ký tự)'),
  address: z.string()
    .min(5, 'Địa chỉ phải có ít nhất 5 ký tự')
    .max(255, 'Địa chỉ quá dài'),
  city: z.string()
    .min(2, 'Thành phố/Tỉnh phải có ít nhất 2 ký tự')
    .max(100, 'Tên thành phố quá dài'),
  country: z.string()
    .min(2, 'Quốc gia phải có ít nhất 2 ký tự')
    .max(100, 'Tên quốc gia quá dài'),
  starRating: z.number()
    .min(1, 'Đánh giá tối thiểu là 1 sao')
    .max(5, 'Đánh giá tối đa là 5 sao')
    .optional(),
  phone: z.string()
    .max(50, 'Số điện thoại quá dài')
    .optional(),
  description: z.string()
    .max(2000, 'Mô tả quá dài')
    .optional(),
  images: z.string().optional(), // Store as comma separated string or handle in form
});

export type CreateHotelFormData = z.infer<typeof createHotelSchema>;
