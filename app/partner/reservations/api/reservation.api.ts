import type { 
  ReservationDTO, 
  CreateReservationDTO, 
  UpdateReservationDTO 
} from '../dto/reservation.dto';
import axiosInstance from '../../../../lib/api/axios';

export const reservationApi = {
  getAll: (): Promise<ReservationDTO[]> => 
    axiosInstance.get('/partner/bookings'),

  getById: (id: string): Promise<ReservationDTO> => 
    axiosInstance.get(`/partner/reservations/${id}`),

  create: (data: CreateReservationDTO): Promise<ReservationDTO> => 
    axiosInstance.post('/partner/reservations', data),

  update: (id: string, data: UpdateReservationDTO): Promise<ReservationDTO> => 
    axiosInstance.patch(`/partner/reservations/${id}`, data),

  cancel: (id: string): Promise<ReservationDTO> => 
    reservationApi.update(id, { status: 'CANCELLED' }),

  confirm: (id: string): Promise<ReservationDTO> => 
    reservationApi.update(id, { status: 'CONFIRMED' }),
};
