"use client";

import { useState, useEffect } from "react";
import { generateMockBookings, MockBooking } from "@/lib/mock-data/admin/mock-bookings";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<MockBooking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<MockBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [hotelFilter, setHotelFilter] = useState<string>("ALL");
  const [selectedBooking, setSelectedBooking] = useState<MockBooking | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const mockBookings = generateMockBookings(100);
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = [...bookings];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.id.toLowerCase().includes(term) ||
          b.guestName.toLowerCase().includes(term) ||
          b.guestEmail.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    // Hotel filter
    if (hotelFilter !== "ALL") {
      filtered = filtered.filter((b) => b.hotelName === hotelFilter);
    }

    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter, hotelFilter, bookings]);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-green-100 text-green-800",
    COMPLETED: "bg-blue-100 text-blue-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, string> = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    COMPLETED: "Hoàn thành",
    CANCELLED: "Đã hủy",
  };

  const hotels = Array.from(new Set(bookings.map((b) => b.hotelName)));

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "PENDING").length,
    confirmed: bookings.filter((b) => b.status === "CONFIRMED").length,
    completed: bookings.filter((b) => b.status === "COMPLETED").length,
    cancelled: bookings.filter((b) => b.status === "CANCELLED").length,
  };

  const handleExportCSV = () => {
    const csv = [
      ["Mã đặt phòng", "Khách hàng", "Email", "Khách sạn", "Phòng", "Nhận phòng", "Trả phòng", "Tổng tiền", "Trạng thái"],
      ...filteredBookings.map((b) => [
        b.id,
        b.guestName,
        b.guestEmail,
        b.hotelName,
        b.roomName,
        formatDate(b.checkIn),
        formatDate(b.checkOut),
        b.totalPrice.toString(),
        statusLabels[b.status],
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `bookings_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#8B6F47] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3d2e1f] mb-2">Quản lý đặt phòng</h1>
          <p className="text-[#6B5B3D]">Quản lý tất cả các đặt phòng trong hệ thống</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-6 py-3 bg-[#8B6F47] hover:bg-[#6B5B3D] text-white rounded-lg font-bold transition-all shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Xuất CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white border border-[#E5D5C3] rounded-lg p-4">
          <p className="text-sm text-[#6B5B3D] mb-1">Tổng cộng</p>
          <p className="text-2xl font-bold text-[#3d2e1f]">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-700 mb-1">Chờ xác nhận</p>
          <p className="text-2xl font-bold text-yellow-800">{stats.pending}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700 mb-1">Đã xác nhận</p>
          <p className="text-2xl font-bold text-green-800">{stats.confirmed}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700 mb-1">Hoàn thành</p>
          <p className="text-2xl font-bold text-blue-800">{stats.completed}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700 mb-1">Đã hủy</p>
          <p className="text-2xl font-bold text-red-800">{stats.cancelled}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#6B5B3D] mb-2">Tìm kiếm</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Mã đặt phòng, tên khách, email..."
              className="w-full px-4 py-2 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6B5B3D] mb-2">Trạng thái</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
            >
              <option value="ALL">Tất cả</option>
              <option value="PENDING">Chờ xác nhận</option>
              <option value="CONFIRMED">Đã xác nhận</option>
              <option value="COMPLETED">Hoàn thành</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6B5B3D] mb-2">Khách sạn</label>
            <select
              value={hotelFilter}
              onChange={(e) => setHotelFilter(e.target.value)}
              className="w-full px-4 py-2 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
            >
              <option value="ALL">Tất cả</option>
              {hotels.map((hotel) => (
                <option key={hotel} value={hotel}>
                  {hotel}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-[#E5D5C3] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5EFE7]">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Mã đặt phòng</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Khách hàng</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Khách sạn</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Phòng</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Nhận phòng</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Tổng tiền</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Trạng thái</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-[#E5D5C3] hover:bg-[#F5EFE7] transition-colors">
                  <td className="py-3 px-4 text-sm font-mono text-[#3d2e1f]">#{booking.id.slice(-6)}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-[#3d2e1f]">{booking.guestName}</p>
                      <p className="text-xs text-[#6B5B3D]">{booking.guestEmail}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#6B5B3D]">{booking.hotelName}</td>
                  <td className="py-3 px-4 text-sm text-[#6B5B3D]">{booking.roomName}</td>
                  <td className="py-3 px-4 text-sm text-[#6B5B3D]">{formatDate(booking.checkIn)}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-[#8B6F47]">{formatVND(booking.totalPrice)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusColors[booking.status]}`}>
                      {statusLabels[booking.status]}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowDetailModal(true);
                      }}
                      className="text-[#8B6F47] hover:text-[#6B5B3D] font-medium text-sm"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6B5B3D]">Không tìm thấy đặt phòng nào</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E5D5C3] flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-[#3d2e1f]">Chi tiết đặt phòng</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-[#6B5B3D] hover:text-[#3d2e1f]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#3d2e1f] mb-4">Thông tin đặt phòng</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Mã đặt phòng</p>
                    <p className="font-mono text-sm text-[#3d2e1f]">#{selectedBooking.id.slice(-8)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Trạng thái</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[selectedBooking.status]}`}>
                      {statusLabels[selectedBooking.status]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Khách sạn</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedBooking.hotelName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Loại phòng</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedBooking.roomName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Nhận phòng</p>
                    <p className="font-medium text-[#3d2e1f]">{formatDate(selectedBooking.checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Trả phòng</p>
                    <p className="font-medium text-[#3d2e1f]">{formatDate(selectedBooking.checkOut)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Số đêm</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedBooking.nightCount} đêm</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Số khách</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedBooking.guestCount} người</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E5D5C3] pt-6">
                <h3 className="text-lg font-bold text-[#3d2e1f] mb-4">Thông tin khách hàng</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Họ và tên</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedBooking.guestName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Email</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedBooking.guestEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Số điện thoại</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedBooking.guestPhone}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E5D5C3] pt-6">
                <h3 className="text-lg font-bold text-[#3d2e1f] mb-4">Thông tin thanh toán</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Tổng tiền</p>
                    <p className="text-xl font-bold text-[#8B6F47]">{formatVND(selectedBooking.totalPrice)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Phương thức</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedBooking.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Trạng thái thanh toán</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedBooking.paymentStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Ngày đặt</p>
                    <p className="font-medium text-[#3d2e1f]">{formatDate(selectedBooking.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
