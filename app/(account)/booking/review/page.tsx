"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface BookingData {
  roomId: string;
  roomName: string;
  hotelName: string;
  hotelImage: string;
  checkIn: string;
  checkOut: string;
  nightCount: number;
  guestCount: number;
  pricePerNight: number;
  subtotal: number;
  taxes: number;
  totalPrice: number;
}

export default function BookingReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Mock booking data from URL params or default
  const [bookingData] = useState<BookingData>({
    roomId: searchParams.get("roomId") || "room-1",
    roomName: searchParams.get("roomName") || "Deluxe Ocean View",
    hotelName: searchParams.get("hotelName") || "Zen Inn Đà Nẵng",
    hotelImage: searchParams.get("hotelImage") || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    checkIn: searchParams.get("checkIn") || "2026-02-15",
    checkOut: searchParams.get("checkOut") || "2026-02-18",
    nightCount: parseInt(searchParams.get("nightCount") || "3"),
    guestCount: parseInt(searchParams.get("guestCount") || "2"),
    pricePerNight: parseInt(searchParams.get("pricePerNight") || "1200000"),
    subtotal: 0,
    taxes: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    // Calculate prices
    const subtotal = bookingData.pricePerNight * bookingData.nightCount;
    const taxes = Math.round(subtotal * 0.1); // 10% tax
    const totalPrice = subtotal + taxes;
    
    bookingData.subtotal = subtotal;
    bookingData.taxes = taxes;
    bookingData.totalPrice = totalPrice;
  }, [bookingData]);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleConfirmBooking = async () => {
    if (!guestName || !guestEmail || !guestPhone) {
      setError("Vui lòng điền đầy đủ thông tin khách hàng");
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API call with mock data
    setTimeout(() => {
      // Simulate random conflict (10% chance)
      if (Math.random() < 0.1) {
        setError("Phòng này đang được xử lý bởi khách hàng khác. Vui lòng thử lại sau vài giây.");
        setLoading(false);
        return;
      }

      // Success - create mock booking ID and redirect
      const bookingId = `ZEN-${Date.now()}`;
      router.push(`/booking/success/${bookingId}?` + new URLSearchParams({
        roomName: bookingData.roomName,
        hotelName: bookingData.hotelName,
        hotelImage: bookingData.hotelImage,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        nightCount: bookingData.nightCount.toString(),
        guestCount: bookingData.guestCount.toString(),
        totalPrice: bookingData.totalPrice.toString(),
        guestName,
        guestEmail,
      }).toString());
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-white to-[#FDFBF7]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3d2e1f] mb-2">Xác nhận đặt phòng</h1>
          <p className="text-[#6B5B3D]">Vui lòng kiểm tra thông tin và hoàn tất đặt phòng</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hotel & Room Info */}
            <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#3d2e1f] mb-4">Thông tin phòng</h2>
              <div className="flex gap-4">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={bookingData.hotelImage}
                    alt={bookingData.hotelName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#3d2e1f] text-lg mb-1">{bookingData.hotelName}</h3>
                  <p className="text-[#8B6F47] font-medium mb-3">{bookingData.roomName}</p>
                  <div className="space-y-2 text-sm text-[#6B5B3D]">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Nhận phòng: {formatDate(bookingData.checkIn)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Trả phòng: {formatDate(bookingData.checkOut)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{bookingData.nightCount} đêm • {bookingData.guestCount} khách</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Information Form */}
            <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#3d2e1f] mb-4">Thông tin khách hàng</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#6B5B3D] mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B5B3D] mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent"
                    placeholder="nguyenvana@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B5B3D] mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent"
                    placeholder="+84 901 234 567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B5B3D] mb-2">
                    Yêu cầu đặc biệt (tùy chọn)
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent resize-none"
                    placeholder="Ví dụ: Phòng tầng cao, không hút thuốc..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm sticky top-8">
              <h2 className="text-xl font-bold text-[#3d2e1f] mb-4">Chi tiết giá</h2>
              
              <div className="space-y-3 mb-4 pb-4 border-b border-[#E5D5C3]">
                <div className="flex justify-between text-[#6B5B3D]">
                  <span>{formatVND(bookingData.pricePerNight)} × {bookingData.nightCount} đêm</span>
                  <span>{formatVND(bookingData.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#6B5B3D]">
                  <span>Thuế và phí (10%)</span>
                  <span>{formatVND(bookingData.taxes)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-[#3d2e1f]">Tổng cộng</span>
                <span className="text-2xl font-bold text-[#8B6F47]">{formatVND(bookingData.totalPrice)}</span>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                  {error.includes("khách hàng khác") && (
                    <button
                      onClick={handleConfirmBooking}
                      className="mt-3 w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors text-sm font-medium"
                    >
                      Thử lại
                    </button>
                  )}
                </div>
              )}

              {/* Confirm Button */}
              <button
                onClick={handleConfirmBooking}
                disabled={loading}
                className="w-full px-6 py-4 bg-[#8B6F47] hover:bg-[#6B5B3D] text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Đang xử lý...
                  </span>
                ) : (
                  "Xác nhận đặt phòng"
                )}
              </button>

              <p className="text-xs text-[#A0826D] text-center mt-4">
                ℹ️ Không cần thanh toán trước. Đặt phòng sẽ được xác nhận ngay lập tức.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
