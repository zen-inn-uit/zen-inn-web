import { ProfileCard } from './components/profile-card';
import { BookingInfoCard } from './components/booking-info-card';
import { RoomInfoCard } from './components/room-info-card';
import { BookingHistoryCard } from './components/booking-history-card';
import { BackButton } from './components/back-button';
import { PageContainer } from '@/components/ui/page-container';

export default async function GuestProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // High quality mock data for demonstration
  const guestData = {
    id: id || 'ZEN-2024-001',
    guest: {
      name: 'Nguyễn Văn Anh',
      email: 'anh.nguyen@gmail.com',
      phone: '0901 234 567',
      avatar: 'NA',
      dob: '15 Tháng 06, 1990',
      gender: 'Male',
      nationality: 'Việt Nam',
      passport: 'B1234567',
    },
    booking: {
      id: id || 'ZEN-2024-001',
      date: '17 Tháng 06, 2024, 09:45 AM',
      roomType: 'Deluxe Ocean View',
      roomNumber: '302',
      guests: 2,
      request: 'Yêu cầu phòng tầng cao, không hút thuốc, check-in sớm.',
      checkInDate: '2024-06-19',
      checkInTime: '02:00 PM',
      checkOutDate: '2024-06-22',
      checkOutTime: '12:00 PM',
      duration: '3 đêm',
      status: 'CONFIRMED',
      notes: 'Khách hàng thân thiết, cần chuẩn bị thêm trái cây chào mừng.',
    },
    room: {
      name: 'Phòng Deluxe Hướng Biển',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
      size: '45 m²',
      bedType: '1 Giường King lớn',
      capacity: 2,
    },
    price: {
      room: 4500000,
      extras: 500000,
      vat: 500000,
      cityTax: 0,
      total: 5500000,
    },
    amenities: ['Bữa sáng Buffet', 'Wi-Fi tốc độ cao', 'Sử dụng Hồ bơi & Gym', 'Nước uống chào mừng'],
    bookingHistory: [
      {
        id: 'ZEN-2023-882',
        date: '12 Tháng 11, 2023',
        time: '10:30 AM',
        roomType: 'Superior Twin',
        roomNumber: 'Phòng 205',
        checkIn: '15 Tháng 11, 2023',
        checkOut: '17 Tháng 11, 2023',
        guests: '2 Khách',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400',
      },
      {
        id: 'ZEN-2023-145',
        date: '05 Tháng 04, 2023',
        time: '02:15 PM',
        roomType: 'Standard Double',
        roomNumber: 'Phòng 102',
        checkIn: '10 Tháng 04, 2023',
        checkOut: '11 Tháng 04, 2023',
        guests: '1 Khách',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
      },
    ],
  };

  return (
    <PageContainer className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <BackButton />
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-red-200 text-red-600 rounded-xl text-sm font-bold hover:bg-red-50 transition-all">
            Hủy đặt phòng
          </button>
          <button className="px-4 py-2 bg-brand text-white rounded-xl text-sm font-bold hover:bg-[#6B5B3D] transition-all">
            In hóa đơn
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#3d2e1f] font-outfit">Hồ sơ & Chi tiết đặt phòng</h1>
        <p className="text-slate-500 mt-1">Thông tin chi tiết về khách hàng và các dịch vụ đi kèm</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <ProfileCard guest={guestData.guest} />
          </div>

          <div className="lg:col-span-5">
            <BookingInfoCard 
              booking={guestData.booking} 
              amenities={guestData.amenities}
            />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <RoomInfoCard room={guestData.room} price={guestData.price} />
          </div>
        </div>

        <div className="mt-8">
          <BookingHistoryCard history={guestData.bookingHistory} />
        </div>
      </div>
    </PageContainer>
  );
}
