import { SearchAndFilters } from './components/search-filters';
import { ReservationList } from './components/reservation-list';
import { PageContainer } from '@/components/ui/page-container';
import { ReservationDTO } from './dto/reservation.dto';

const MOCK_RESERVATIONS: ReservationDTO[] = [
  {
    id: 'ZEN-2024-001',
    guest: { 
      name: 'Nguyễn Văn Anh', 
      avatar: 'NA',
      email: 'anh.nguyen@gmail.com',
      phone: '0901234567'
    },
    room: 'Deluxe Ocean View - 302',
    request: 'Yêu cầu phòng tầng cao, không hút thuốc',
    duration: '3 đêm',
    checkInDate: '2024-06-19',
    checkOutDate: '2024-06-22',
    status: 'CONFIRMED',
  },
  {
    id: 'ZEN-2024-002',
    guest: { 
      name: 'Trần Thị Bình', 
      avatar: 'TB',
      email: 'binh.tran@yahoo.com',
      phone: '0912345678'
    },
    room: 'Standard Double - 105',
    request: 'None',
    duration: '2 đêm',
    checkInDate: '2024-06-20',
    checkOutDate: '2024-06-22',
    status: 'PENDING',
  },
  {
    id: 'ZEN-2024-003',
    guest: { 
      name: 'Lê Hoàng Minh', 
      avatar: 'LM',
      email: 'minh.le@outlook.com',
      phone: '0987654321'
    },
    room: 'Luxury Suite - 501',
    request: 'Kỷ niệm ngày cưới, cần trang trí giường',
    duration: '5 đêm',
    checkInDate: '2024-06-19',
    checkOutDate: '2024-06-24',
    status: 'PENDING',
  },
  {
    id: 'ZEN-2024-004',
    guest: { 
      name: 'Phạm Thanh Thảo', 
      avatar: 'PT',
      email: 'thao.pham@gmail.com',
      phone: '0933445566'
    },
    room: 'Superior Twin - 208',
    request: 'Check-in muộn lúc 8:00 PM',
    duration: '1 đêm',
    checkInDate: '2024-06-19',
    checkOutDate: '2024-06-20',
    status: 'CANCELLED',
  },
  {
    id: 'ZEN-2024-005',
    guest: { 
      name: 'James Wilson', 
      avatar: 'JW',
      email: 'james.wilson@example.com',
      phone: '+44 20 7946 0958'
    },
    room: 'Executive Suite - 402',
    request: 'Airport pickup required',
    duration: '4 đêm',
    checkInDate: '2024-06-21',
    checkOutDate: '2024-06-25',
    status: 'CONFIRMED',
  }
];

export default async function ReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; date?: string }>;
}) {
  const { q, status, date } = await searchParams;

  // Simulate API filtering with mock data
  let filteredData = [...MOCK_RESERVATIONS];

  if (status && status !== 'All Status') {
    filteredData = filteredData.filter(r => r.status === status);
  }

  if (q) {
    const term = q.toLowerCase();
    filteredData = filteredData.filter(
      (r) =>
        r.guest.name.toLowerCase().includes(term) ||
        r.id.toLowerCase().includes(term) ||
        r.room.toLowerCase().includes(term)
    );
  }

  if (date) {
    filteredData = filteredData.filter(
      (r) => r.checkInDate === date || r.checkOutDate === date
    );
  }

  return (
    <PageContainer className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#3d2e1f] font-outfit">Danh sách đặt phòng</h1>
          <p className="text-slate-500 mt-1">Quản lý các yêu cầu đặt phòng từ khách hàng và cập nhật tình trạng</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5D5C3] rounded-xl text-sm font-bold text-[#6B5B3D] hover:bg-[#FDFBF9] transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Xuất file
          </button>
        </div>
      </div>
      
      <SearchAndFilters />
      <ReservationList initialData={filteredData} />
    </PageContainer>
  );
}
