import { PageContainer } from '@/components/ui/page-container';
import { partnerAPI } from '@/lib/api/partner-api';
import { BookingCalendar } from './components/booking-calendar';

export default async function InventoryPage() {
  const hotels = await partnerAPI.listHotels();

  return (
    <PageContainer className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 font-outfit">Lịch phòng</h1>
        <p className="text-slate-500 mt-2 font-medium">Theo dõi tình trạng đặt phòng và quản lý booking</p>
      </div>

      <BookingCalendar hotels={hotels} />
    </PageContainer>
  );
}
