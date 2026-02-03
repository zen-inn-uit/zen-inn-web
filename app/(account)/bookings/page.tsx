"use client";

import { useEffect, useState } from "react";
import { customerAPI, CustomerBooking } from "@/lib/api/customer-api";
import { BookingStatus } from "@/lib/api/types";
import BookingCard from "@/components/booking/BookingCard";

const statusTabs = [
  { label: "Tất cả", value: undefined },
  { label: "Chờ xác nhận", value: BookingStatus.PENDING },
  { label: "Đã xác nhận", value: BookingStatus.CONFIRMED },
  { label: "Hoàn thành", value: BookingStatus.COMPLETED },
  { label: "Đã hủy", value: BookingStatus.CANCELLED },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<BookingStatus | undefined>(
    undefined
  );
  const [total, setTotal] = useState(0);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);

  // Mock data for testing
  const mockBookings: CustomerBooking[] = [
    {
      id: "booking-1",
      userId: "user-1",
      roomId: "room-1",
      checkIn: "2026-02-15T00:00:00.000Z",
      checkOut: "2026-02-18T00:00:00.000Z",
      guestCount: 2,
      totalPrice: 3600000,
      status: BookingStatus.CONFIRMED,
      paymentIntentId: "pi_123",
      transactionId: "txn_123",
      paymentMethod: "SEPAY",
      paymentStatus: "COMPLETED",
      guestName: "Nguyễn Văn A",
      guestEmail: "nguyenvana@example.com",
      guestPhone: "0901234567",
      createdAt: "2026-01-15T10:30:00.000Z",
      updatedAt: "2026-01-15T10:30:00.000Z",
      room: {
        id: "room-1",
        name: "Deluxe Ocean View",
        hotel: {
          id: "hotel-1",
          name: "Zen Inn Đà Nẵng",
          city: "Đà Nẵng",
          address: "123 Võ Nguyên Giáp, Sơn Trà",
          thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        },
      },
    },
    {
      id: "booking-2",
      userId: "user-1",
      roomId: "room-2",
      checkIn: "2026-03-01T00:00:00.000Z",
      checkOut: "2026-03-03T00:00:00.000Z",
      guestCount: 3,
      totalPrice: 2400000,
      status: BookingStatus.PENDING,
      paymentIntentId: null,
      transactionId: null,
      paymentMethod: "BANK_TRANSFER",
      paymentStatus: "PENDING",
      guestName: "Trần Thị B",
      guestEmail: "tranthib@example.com",
      guestPhone: "0912345678",
      createdAt: "2026-01-20T14:20:00.000Z",
      updatedAt: "2026-01-20T14:20:00.000Z",
      room: {
        id: "room-2",
        name: "Superior Twin",
        hotel: {
          id: "hotel-2",
          name: "Zen Inn Hà Nội",
          city: "Hà Nội",
          address: "45 Hàng Bài, Hoàn Kiếm",
          thumbnailUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
        },
      },
    },
    {
      id: "booking-3",
      userId: "user-1",
      roomId: "room-3",
      checkIn: "2026-01-10T00:00:00.000Z",
      checkOut: "2026-01-12T00:00:00.000Z",
      guestCount: 2,
      totalPrice: 1800000,
      status: BookingStatus.COMPLETED,
      paymentIntentId: "pi_456",
      transactionId: "txn_456",
      paymentMethod: "SEPAY",
      paymentStatus: "COMPLETED",
      guestName: "Lê Văn C",
      guestEmail: "levanc@example.com",
      guestPhone: "0923456789",
      createdAt: "2026-01-05T09:15:00.000Z",
      updatedAt: "2026-01-12T12:00:00.000Z",
      room: {
        id: "room-3",
        name: "Standard Double",
        hotel: {
          id: "hotel-3",
          name: "Zen Inn Phú Quốc",
          city: "Phú Quốc",
          address: "78 Trần Hưng Đạo, Dương Đông",
          thumbnailUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        },
      },
    },
  ];

  useEffect(() => {
    fetchBookings();
  }, [activeStatus, useMockData]);

  const fetchBookings = async () => {
    if (useMockData) {
      setLoading(true);
      setTimeout(() => {
        setBookings(mockBookings.filter(b => !activeStatus || b.status === activeStatus));
        setTotal(mockBookings.length);
        setLoading(false);
      }, 500);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await customerAPI.getMyBookings({
        status: activeStatus,
        limit: 50,
      });
      setBookings(response.items);
      setTotal(response.meta.total);
    } catch (err: any) {
      console.error("Error fetching bookings:", err);
      setError(
        err.response?.data?.message ||
          "Không thể tải danh sách đặt phòng. Vui lòng thử lại sau."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-white to-cream-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl text-secondary mb-2">
                Đặt phòng của tôi
              </h1>
              <p className="text-gray-600">
                Quản lý và theo dõi tất cả các đặt phòng của bạn
              </p>
            </div>
            <button
              onClick={() => setUseMockData(!useMockData)}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              {useMockData ? "Dùng API thật" : "Dùng Mock Data"}
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {statusTabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveStatus(tab.value)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  activeStatus === tab.value
                    ? "bg-accent text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <div className="flex items-center gap-3">
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
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && (!bookings || bookings.length === 0) && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-display text-secondary mb-2">
              Chưa có đặt phòng nào
            </h3>
            <p className="text-gray-600 mb-6">
              {activeStatus
                ? "Không tìm thấy đặt phòng nào với trạng thái này"
                : "Bạn chưa có đặt phòng nào. Hãy khám phá các khách sạn tuyệt vời!"}
            </p>
            <a
              href="/search"
              className="inline-block px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
            >
              Khám phá khách sạn
            </a>
          </div>
        )}

        {/* Bookings List */}
        {!loading && !error && bookings && bookings.length > 0 && (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Tìm thấy <span className="font-semibold text-accent">{total}</span> đặt phòng
              </p>
            </div>
            <div className="space-y-6">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
