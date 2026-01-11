import { PageContainer } from '@/components/ui/page-container';
import { RoomForm } from '../../components/room-form';
import { partnerAPI } from '@/lib/api/partner-api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface EditRoomPageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export default async function EditRoomPage({ params }: EditRoomPageProps) {
  const { roomId } = await params;
  
  try {
    const [hotels, room, policies, ratePlans] = await Promise.all([
      partnerAPI.listHotels(),
      partnerAPI.getRoomById(roomId),
      partnerAPI.listPolicies(),
      partnerAPI.listPartnerRatePlans(),
    ]);

    if (!room) {
      return notFound();
    }

    return (
      <PageContainer className="p-8">
        <div className="mb-8">
          <Link
            href="/partner/rooms"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 transition-colors group w-fit"
          >
            <div className="p-2 rounded-lg bg-white border border-slate-100 group-hover:border-slate-300 transition-all shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="font-bold text-sm">Quay lại danh sách phòng</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 font-outfit">Chỉnh sửa phòng</h1>
          <p className="text-slate-500 mt-2">{room.name} - {room.hotel?.name}</p>
        </div>

        <RoomForm 
          hotels={hotels} 
          policies={policies} 
          ratePlans={ratePlans}
          initialData={room} 
        />
      </PageContainer>
    );
  } catch (error) {
    console.error('Error fetching room for edit:', error);
    return (
      <PageContainer className="p-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 font-outfit">Không tìm thấy phòng</h2>
          <p className="text-slate-500 mb-8">Phòng bạn đang tìm kiếm không tồn tại hoặc bạn không có quyền truy cập</p>
          <Link href="/partner/rooms" className="px-8 py-3 bg-brand text-white rounded-xl font-bold text-sm shadow-lg">
             Quay lại danh sách
          </Link>
        </div>
      </PageContainer>
    );
  }
}
