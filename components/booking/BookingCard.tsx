"use client";

import { CustomerBooking } from "@/lib/api/customer-api";
import { BookingStatus } from "@/lib/api/types";
import Image from "next/image";
import Link from "next/link";

interface BookingCardProps {
  booking: CustomerBooking;
}

const statusColors: Record<BookingStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
  CONFIRMED: "bg-green-100 text-green-800 border-green-300",
  CANCELLED: "bg-red-100 text-red-800 border-red-300",
  COMPLETED: "bg-blue-100 text-blue-800 border-blue-300",
};

const statusLabels: Record<BookingStatus, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  CANCELLED: "Đã hủy",
  COMPLETED: "Hoàn thành",
};

export default function BookingCard({ booking }: BookingCardProps) {
  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: 'short',
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

  const hotel = booking.room?.hotel;
  const thumbnailUrl = hotel?.thumbnailUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Hotel Image */}
        <div className="relative w-full md:w-72 h-48 md:h-auto flex-shrink-0">
          <Image
            src={thumbnailUrl}
            alt={hotel?.name || "Hotel"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 288px"
            priority
          />
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-md ${
                statusColors[booking.status]
              }`}
            >
              {statusLabels[booking.status]}
            </span>
          </div>
        </div>

        {/* Booking Details */}
        <div className="flex-1 p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                {hotel?.name || "Hotel"}
              </h3>
              <p className="text-sm flex items-center gap-1" style={{ color: 'var(--color-primary)', opacity: 0.7 }}>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {hotel?.city || "N/A"}
              </p>
            </div>
            <div className="text-right p-3 rounded-lg" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)' }}>
              <p className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                {formatVND(booking.totalPrice)}
              </p>
              <p className="text-xs text-white/90 font-medium">Tổng giá</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {/* Check-in */}
            <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.08)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-primary)' }}>
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium mb-0.5" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)', opacity: 0.6 }}>Nhận phòng</p>
                <p className="font-semibold text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                  {formatDate(checkInDate)}
                </p>
              </div>
            </div>

            {/* Check-out */}
            <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.08)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-primary)' }}>
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium mb-0.5" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)', opacity: 0.6 }}>Trả phòng</p>
                <p className="font-semibold text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                  {formatDate(checkOutDate)}
                </p>
              </div>
            </div>

            {/* Nights & Guests */}
            <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.08)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-primary)' }}>
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium mb-0.5" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)', opacity: 0.6 }}>
                  {nights} đêm • {booking.guestCount} khách
                </p>
                <p className="font-semibold text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                  {booking.room?.name || "Phòng"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <Link
              href={`/bookings/${booking.id}`}
              className="flex-1 text-center px-5 py-2.5 text-white rounded-lg hover:opacity-90 transition-all font-semibold text-sm"
              style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--color-primary)' }}
            >
              Chi tiết đặt phòng
            </Link>
            {hotel && (
              <Link
                href={`/hotels/${hotel.slug || hotel.id}`}
                className="flex-1 text-center px-5 py-2.5 rounded-lg hover:opacity-90 transition-all font-semibold text-sm"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  color: 'var(--color-primary)',
                  backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)'
                }}
              >
                Xem khách sạn
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
