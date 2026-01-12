import type { 
  DashboardStatsDTO,
  RoomAvailabilityDTO,
  ReservationStatsDTO,
  PlatformDataDTO,
  RatingCategoryDTO,
  TaskDTO,
  ActivityDTO,
  BookingListItemDTO
} from '../dto/dashboard.dto';
import axiosInstance from '../../../../lib/api/axios';

export const dashboardApi = {
  getStats: (): Promise<DashboardStatsDTO> => 
    axiosInstance.get('/partner/dashboard/stats'),

  getRoomAvailability: (): Promise<RoomAvailabilityDTO> => 
    axiosInstance.get('/partner/dashboard/room-availability'),

  getReservationStats: (): Promise<ReservationStatsDTO[]> => 
    axiosInstance.get('/partner/dashboard/reservation-stats'),

  getPlatformData: (): Promise<PlatformDataDTO[]> => 
    axiosInstance.get('/partner/dashboard/platform-data'),

  getRatingCategories: (): Promise<RatingCategoryDTO[]> => 
    axiosInstance.get('/partner/dashboard/ratings'),

  getTasks: (): Promise<TaskDTO[]> => 
    axiosInstance.get('/partner/dashboard/tasks'),

  getActivities: (): Promise<ActivityDTO[]> => 
    axiosInstance.get('/partner/dashboard/activities'),

  getBookingList: (): Promise<BookingListItemDTO[]> => 
    axiosInstance.get('/partner/dashboard/bookings'),
};
