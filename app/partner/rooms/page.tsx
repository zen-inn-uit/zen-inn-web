import { partnerAPI } from '@/lib/api/partner-api';
import { AllRoomsList } from './components/all-rooms-list';

export const dynamic = 'force-dynamic';

export default async function PartnerRoomsPage() {
  try {
    const [hotels, rooms] = await Promise.all([
      partnerAPI.listHotels(),
      partnerAPI.listAllPartnerRooms(),
    ]);

    return <AllRoomsList hotels={hotels} initialRooms={rooms} />;
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    return (
      <div className="p-8 text-center bg-red-50 text-red-600 rounded-xl m-8 border border-red-100 font-medium">
        Lỗi khi tải danh sách phòng. Vui lòng thử lại sau.
      </div>
    );
  }
}
