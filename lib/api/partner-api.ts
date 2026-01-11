import {
  Partner,
  UpsertPartnerDto,
  CreateKycDocDto,
  KycDocument,
} from '@/app/partner/profile/dto/partner.dto';
import {
  HotelDTO as Hotel,
} from '@/app/partner/hotels/dto/hotel.dto';
import { CreateHotelDto } from '@/app/partner/hotels/dto/create-hotel.dto';
import { CreateRoomDto } from '@/app/partner/rooms/dto/create-room.dto';
import { RoomDTO as Room } from '@/app/partner/rooms/dto/room.dto';
import { CreateRatePlanDto } from '@/app/partner/rate-plans/dto/create-rate-plan.dto';
import { RatePlanDTO as RatePlan } from '@/app/partner/rate-plans/dto/rate-plan.dto';
import { CreateCancellationPolicyDto } from '@/app/partner/cancellation-policies/dto/create-cancellation-policy.dto';
import { CancellationPolicyDTO as CancellationPolicy } from '@/app/partner/cancellation-policies/dto/cancellation-policy.dto';
import { Booking, QueryBookingDto } from '@/app/partner/reservations/dto/booking.dto';
import axiosInstance from './axios';

export const partnerAPI = {
  upsertPartnerProfile: (data: UpsertPartnerDto) =>
    axiosInstance.post<any, Partner>('/partners/me', data),

  getPartnerProfile: () =>
    axiosInstance.get<any, Partner>('/partners/me'),

  uploadKycDocument: (data: CreateKycDocDto) =>
    axiosInstance.post<any, KycDocument>('/partners/me/kyc/docs', data),

  listKycDocuments: () =>
    axiosInstance.get<any, KycDocument[]>('/partners/me/kyc/docs'),

  createHotel: (data: CreateHotelDto) =>
    axiosInstance.post<any, Hotel>('/partners/hotels', data),

  listHotels: () =>
    axiosInstance.get<any, Hotel[]>('/partners/hotels'),

  getHotel: (id: string) =>
    axiosInstance.get<any, Hotel>(`/partners/hotels/${id}`),

  updateHotel: (id: string, data: Partial<CreateHotelDto>) =>
    axiosInstance.patch<any, Hotel>(`/partners/hotels/${id}`, data),

  deleteHotel: (id: string) =>
    axiosInstance.delete<any, { success: boolean }>(`/partners/hotels/${id}`),

  createRoom: (hotelId: string, data: CreateRoomDto) =>
    axiosInstance.post<any, Room>(`/partners/hotels/${hotelId}/rooms`, data),

  listRooms: (hotelId: string) =>
    axiosInstance.get<any, Room[]>(`/partners/hotels/${hotelId}/rooms`),

  getRoom: (hotelId: string, roomId: string) =>
    axiosInstance.get<any, Room>(`/partners/hotels/${hotelId}/rooms/${roomId}`),

  updateRoom: (hotelId: string, roomId: string, data: any) =>
    axiosInstance.patch<any, Room>(`/partners/hotels/${hotelId}/rooms/${roomId}`, data),

  deleteRoom: (hotelId: string, roomId: string) =>
    axiosInstance.delete<any, { success: boolean }>(`/partners/hotels/${hotelId}/rooms/${roomId}`),

  getInventory: (hotelId: string, roomId: string) =>
    axiosInstance.get<any, { data: Room }>(`/partners/hotels/${hotelId}/rooms/${roomId}/inventory`),

  updateInventory: (hotelId: string, roomId: string, data: any) =>
    axiosInstance.patch<any, { data: Room; message: string }>(`/partners/hotels/${hotelId}/rooms/${roomId}/inventory`, data),

  createRatePlan: (hotelId: string, roomId: string, data: CreateRatePlanDto) =>
    axiosInstance.post<any, RatePlan>(`/partners/hotels/${hotelId}/rooms/${roomId}/rate-plans`, data),

  listRatePlans: (hotelId: string, roomId: string) =>
    axiosInstance.get<any, RatePlan[]>(`/partners/hotels/${hotelId}/rooms/${roomId}/rate-plans`),

  getRatePlan: (hotelId: string, roomId: string, ratePlanId: string) =>
    axiosInstance.get<any, RatePlan>(`/partners/hotels/${hotelId}/rooms/${roomId}/rate-plans/${ratePlanId}`),

  updateRatePlan: (hotelId: string, roomId: string, ratePlanId: string, data: any) =>
    axiosInstance.patch<any, RatePlan>(`/partners/hotels/${hotelId}/rooms/${roomId}/rate-plans/${ratePlanId}`, data),

  deleteRatePlan: (hotelId: string, roomId: string, ratePlanId: string) =>
    axiosInstance.delete<any, { success: boolean; message: string }>(`/partners/hotels/${hotelId}/rooms/${roomId}/rate-plans/${ratePlanId}`),

  assignCancellationPolicy: (hotelId: string, roomId: string, ratePlanId: string, cancellationPolicyId: string | null) =>
    axiosInstance.patch<any, RatePlan>(`/partners/hotels/${hotelId}/rooms/${roomId}/rate-plans/${ratePlanId}/cancellation-policy`, { cancellationPolicyId }),

  createPolicy: (data: CreateCancellationPolicyDto) =>
    axiosInstance.post<any, CancellationPolicy>('/partners/cancellation-policies', data),

  listPolicies: () =>
    axiosInstance.get<any, CancellationPolicy[]>('/partners/cancellation-policies'),

  getPolicy: (id: string) =>
    axiosInstance.get<any, CancellationPolicy>(`/partners/cancellation-policies/${id}`),

  updatePolicy: (id: string, data: Partial<CreateCancellationPolicyDto>) =>
    axiosInstance.patch<any, CancellationPolicy>(`/partners/cancellation-policies/${id}`, data),

  deletePolicy: (id: string) =>
    axiosInstance.delete<any, { success: boolean }>((`/partners/cancellation-policies/${id}`)),

  getPartnerBookings: (query?: QueryBookingDto) => {
    return axiosInstance.get<any, Booking[]>('/partners/bookings', { params: query });
  },

  // Upload a single base64 image to Cloudinary
  uploadBase64Image: (image: string, folder?: string) =>
    axiosInstance.post<any, { url: string }>('/assets/upload-image', {
      image,
      folder: folder || 'hotels',
    }),

  // Upload multiple base64 images to Cloudinary
  uploadBase64Images: (images: string[], folder?: string) =>
    axiosInstance.post<any, { urls: string[] }>('/assets/upload-images', {
      images,
      folder: folder || 'hotels',
    }),
};
