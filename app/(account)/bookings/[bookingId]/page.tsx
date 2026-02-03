"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { customerAPI, CustomerBooking } from "@/lib/api/customer-api";
import { BookingStatus } from "@/lib/api/types";
import Image from "next/image";
import Link from "next/link";

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

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<CustomerBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetail();
    }
  }, [bookingId]);

  const fetchBookingDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await customerAPI.getBookingById(bookingId);
      setBooking(response.booking);
    } catch (err: any) {
      console.error("Error fetching booking detail:", err);
      setError(
        err.response?.data?.message ||
          "Không thể tải chi tiết đặt phòng. Vui lòng thử lại sau."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-light via-white to-cream-light/50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent border-t-transparent"></div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-light via-white to-cream-light/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-800 font-medium">
                {error || "Không tìm thấy đặt phòng"}
              </p>
            </div>
            <button
              onClick={() => router.push("/bookings")}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Quay lại danh sách đặt phòng
            </button>
          </div>
        </div>
      </div>
    );
  }

  const hotel = booking.room?.hotel;
  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

  const thumbnailUrl = hotel?.thumbnailUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80";

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-white to-cream-light/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Quay lại
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-secondary mb-2">
              Chi tiết đặt phòng
            </h1>
            <p className="text-gray-600">Mã đặt phòng: {booking.id}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              statusColors[booking.status]
            }`}
          >
            {statusLabels[booking.status]}
          </span>
        </div>

        {/* Hotel Info Card */}
        {hotel && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-80 h-64">
                <Image
                  src={thumbnailUrl}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                  priority
                />
              </div>
              <div className="p-6 flex-1">
                <h2 className="text-2xl font-display text-secondary mb-2">
                  {hotel.name}
                </h2>
                <p className="text-gray-600 flex items-center gap-2 mb-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {hotel.address}, {hotel.city}
                </p>
                <Link
                  href={`/hotels/${hotel.slug || hotel.id}`}
                  className="inline-block px-6 py-2 border-2 border-accent text-accent rounded-lg hover:bg-accent/5 transition-colors font-medium"
                >
                  Xem thông tin khách sạn
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Booking Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Check-in/Check-out */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-display text-secondary mb-4">
              Thời gian lưu trú
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nhận phòng</p>
                  <p className="font-semibold text-secondary">
                    {formatDate(checkInDate)}
                  </p>
                  <p className="text-sm text-gray-600">Sau 14:00</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trả phòng</p>
                  <p className="font-semibold text-secondary">
                    {formatDate(checkOutDate)}
                  </p>
                  <p className="text-sm text-gray-600">Trước 12:00</p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-gray-600">
                  Tổng thời gian lưu trú:{" "}
                  <span className="font-semibold text-accent">
                    {nights} đêm
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Room & Guest Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-display text-secondary mb-4">
              Thông tin phòng & khách
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Loại phòng</p>
                <p className="font-semibold text-secondary">
                  {booking.room?.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Số lượng khách</p>
                <p className="font-semibold text-secondary">
                  {booking.guestCount} người
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tên khách</p>
                <p className="font-semibold text-secondary">
                  {booking.guestName || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold text-secondary">
                  {booking.guestEmail || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Số điện thoại</p>
                <p className="font-semibold text-secondary">
                  {booking.guestPhone || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-display text-secondary mb-4">
            Thông tin thanh toán
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Giá phòng ({nights} đêm)</span>
              <span className="font-semibold" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                {formatVND(booking.totalPrice)}
              </span>
            </div>
            <div className="pt-3 border-t-2" style={{ borderColor: 'var(--color-primary)' }}>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                  Tổng cộng
                </span>
                <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                  {formatVND(booking.totalPrice)}
                </span>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Phương thức thanh toán</span>
                <span className="font-medium">{booking.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-500">Trạng thái thanh toán</span>
                <span className="font-medium">{booking.paymentStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Metadata */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-display text-secondary mb-4">
            Thông tin đặt phòng
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Ngày đặt</p>
              <p className="font-medium">{formatDateTime(booking.createdAt)}</p>
            </div>
            <div>
              <p className="text-gray-500">Cập nhật lần cuối</p>
              <p className="font-medium">{formatDateTime(booking.updatedAt)}</p>
            </div>
            {booking.transactionId && (
              <div>
                <p className="text-gray-500">Mã giao dịch</p>
                <p className="font-medium font-mono">{booking.transactionId}</p>
              </div>
            )}
            {booking.paymentIntentId && (
              <div>
                <p className="text-gray-500">Payment Intent ID</p>
                <p className="font-medium font-mono text-xs">
                  {booking.paymentIntentId}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}