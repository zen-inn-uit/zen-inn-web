import { StatsCards } from './components/stats-cards';
import { RoomAvailability } from './components/room-availability';
import { ReservationsChart } from './components/reservations-chart';
import { RevenueChart } from './components/revenue-chart';
import { dashboardApi } from './api/dashboard.api';
import { PageContainer } from '@/components/ui/page-container';

async function getDashboardData() {
  try {
    const stats = {
      newBookings: { value: 840, change: 8.70, isUp: true },
      checkIns: { value: 231, change: 3.56, isUp: true },
      checkOuts: { value: 124, change: -1.06, isUp: false },
      totalRevenue: { value: 123980, change: 5.70, isUp: true },
    };
    
    const availability = {
      occupied: 18,
      reserved: 5,
      available: 2,
      notReady: 0,
    };

    const reservationStats = [
      { date: '19 Jun', booked: 45, cancelled: 12 },
      { date: '20 Jun', booked: 52, cancelled: 8 },
      { date: '21 Jun', booked: 38, cancelled: 15 },
      { date: '22 Jun', booked: 61, cancelled: 5 },
      { date: '23 Jun', booked: 49, cancelled: 10 },
      { date: '24 Jun', booked: 55, cancelled: 7 },
      { date: '25 Jun', booked: 42, cancelled: 11 },
    ];

    return { stats, availability, reservationStats };
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    return null;
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  
  if (!data) return <div>Error loading dashboard</div>;

  return (
    <PageContainer className="p-8">
      <h1 className="text-2xl font-bold text-[#3d2e1f] mb-8">Dashboard</h1>
      
      <StatsCards stats={data.stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-1">
          <RoomAvailability data={data.availability} />
        </div>
        <div className="lg:col-span-2">
          <ReservationsChart data={data.reservationStats} />
        </div>
      </div>

      <div className="mt-6">
        <RevenueChart />
      </div>
    </PageContainer>
  );
}
