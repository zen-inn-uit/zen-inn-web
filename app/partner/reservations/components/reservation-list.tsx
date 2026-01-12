'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import type { ReservationDTO } from '../dto/reservation.dto';
import { getStatusColor, formatDateRange } from '../utils/reservation.utils';
import { partnerAPI } from '@/lib/api/partner-api';
import { BookingStatus } from '@/lib/api/types';

interface ReservationListProps {
  initialData: ReservationDTO[];
}

export function ReservationList({ initialData }: ReservationListProps) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateStatus = async (id: string, newStatus: BookingStatus) => {
    try {
      setUpdatingId(id);
      await partnerAPI.updateBookingStatus(id, newStatus);
      
      // Update local state for immediate feedback
      setData(prev => prev.map(r => r.id === id ? { ...r, status: newStatus as any } : r));
      
      // Refresh to ensure server state is in sync
      router.refresh();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update reservation status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (data.length === 0) {
    return (
      <div className="bg-white border border-[#E5D5C3] rounded-xl p-12 text-center">
        <div className="w-16 h-16 bg-[#F5EFE7] rounded-full flex items-center justify-center mx-auto mb-4 text-[#C9A882]">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[#3d2e1f] font-outfit mb-2">No Reservations Found</h3>
        <p className="text-slate-500 max-w-sm mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E5D5C3] rounded-xl overflow-hidden relative shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#F5EFE7]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#6B5B3D] uppercase tracking-wider">
                Guest & ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#6B5B3D] uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#6B5B3D] uppercase tracking-wider">
                Request
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#6B5B3D] uppercase tracking-wider">
                Stay
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#6B5B3D] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-[#6B5B3D] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5D5C3]">
            {data.map((reservation) => (
              <tr 
                key={reservation.id}
                onClick={() => router.push(`/partner/reservations/${reservation.id}`)}
                className={`transition-colors cursor-pointer ${
                  updatingId === reservation.id ? 'bg-slate-50 opacity-70' : 'hover:bg-[#FDFBF9]'
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C9A882] flex items-center justify-center flex-shrink-0 shadow-inner">
                      <span className="text-sm font-bold text-white">{reservation.guest.avatar}</span>
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#3d2e1f] hover:text-brand transition-colors">
                        {reservation.guest.name}
                      </div>
                      <div className="text-[10px] font-mono font-medium text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 mt-1 inline-block">
                        {reservation.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-[#3d2e1f]">{reservation.room}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-slate-500 max-w-[150px] truncate" title={reservation.request}>
                    {reservation.request}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-[#3d2e1f]">
                    {formatDateRange(reservation.checkInDate, reservation.checkOutDate)}
                  </div>
                  <div className="text-[10px] font-bold text-[#C9A882] mt-0.5">
                    {reservation.duration.toUpperCase()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusColor(reservation.status)}`}>
                    {reservation.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/partner/reservations/${reservation.id}`}
                      className="p-2 text-[#6B5B3D] hover:bg-brand/10 hover:text-brand rounded-lg transition-all"
                      title="Chi tiết"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>

                    {reservation.status === 'PENDING' && (
                      <button
                        onClick={() => updateStatus(reservation.id, BookingStatus.CONFIRMED)}
                        disabled={!!updatingId}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                        title="Xác nhận"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    )}

                    {(reservation.status === 'PENDING' || reservation.status === 'CONFIRMED') && (
                      <button
                        onClick={() => updateStatus(reservation.id, BookingStatus.CANCELLED)}
                        disabled={!!updatingId}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Hủy bỏ"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

