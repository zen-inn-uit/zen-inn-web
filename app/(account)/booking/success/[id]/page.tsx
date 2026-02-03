"use client";

import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BookingSuccessPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingId = params.id as string;
  const [showConfetti, setShowConfetti] = useState(false);

  const bookingData = {
    id: bookingId,
    roomName: searchParams.get("roomName") || "Deluxe Ocean View",
    hotelName: searchParams.get("hotelName") || "Zen Inn Đà Nẵng",
    hotelImage: searchParams.get("hotelImage") || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    checkIn: searchParams.get("checkIn") || "2026-02-15",
    checkOut: searchParams.get("checkOut") || "2026-02-18",
    nightCount: parseInt(searchParams.get("nightCount") || "3"),
    guestCount: parseInt(searchParams.get("guestCount") || "2"),
    totalPrice: parseInt(searchParams.get("totalPrice") || "3960000"),
    guestName: searchParams.get("guestName") || "Khách hàng",
    guestEmail: searchParams.get("guestEmail") || "",
  };

  useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

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

  const displayBookingId = bookingId.substring(0, 12).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-white to-[#FDFBF7]/50 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ["#8B6F47", "#6B5B3D", "#E5D5C3", "#F5EFE7"][Math.floor(Math.random() * 4)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#3d2e1f] mb-3">Đặt phòng thành công!</h1>
          <p className="text-lg text-[#6B5B3D]">Cảm ơn bạn đã tin tưởng Zen Inn</p>
        </div>

        {/* Booking ID Card */}
        <div className="bg-gradient-to-r from-[#8B6F47] to-[#6B5B3D] rounded-xl p-6 mb-8 text-white shadow-xl">
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">Mã đặt phòng của bạn</p>
            <p className="text-3xl font-bold tracking-wider">#{displayBookingId}</p>
            <p className="text-sm opacity-90 mt-2">Vui lòng lưu lại mã này để tra cứu</p>
          </div>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-[#3d2e1f] mb-6">Thông tin đặt phòng</h2>
          
          <div className="flex gap-6 mb-6 pb-6 border-b border-[#E5D5C3]">
            <div className="relative w-40 h-40 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={bookingData.hotelImage}
                alt={bookingData.hotelName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#3d2e1f] mb-2">{bookingData.hotelName}</h3>
              <p className="text-lg text-[#8B6F47] font-medium mb-4">{bookingData.roomName}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F5EFE7] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#8B6F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#A0826D]">Nhận phòng</p>
                    <p className="font-medium text-[#3d2e1f]">{formatDate(bookingData.checkIn)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F5EFE7] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#8B6F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#A0826D]">Trả phòng</p>
                    <p className="font-medium text-[#3d2e1f]">{formatDate(bookingData.checkOut)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F5EFE7] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#8B6F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#A0826D]">Số đêm</p>
                    <p className="font-medium text-[#3d2e1f]">{bookingData.nightCount} đêm</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F5EFE7] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#8B6F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#A0826D]">Số khách</p>
                    <p className="font-medium text-[#3d2e1f]">{bookingData.guestCount} người</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center py-4 bg-[#F5EFE7] rounded-lg px-6">
            <span className="text-lg font-bold text-[#3d2e1f]">Tổng thanh toán</span>
            <span className="text-2xl font-bold text-[#8B6F47]">{formatVND(bookingData.totalPrice)}</span>
          </div>
        </div>

        {/* Email Confirmation */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 mb-2">Email xác nhận đã được gửi</h3>
              <p className="text-blue-800 text-sm">
                Chúng tôi đã gửi email xác nhận đặt phòng đến <span className="font-semibold">{bookingData.guestEmail}</span>. 
                Vui lòng kiểm tra hộp thư của bạn.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-[#3d2e1f] mb-4">📌 Các bước tiếp theo</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#8B6F47] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
              <p className="text-[#6B5B3D]">Kiểm tra email xác nhận và lưu lại thông tin đặt phòng</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#8B6F47] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
              <p className="text-[#6B5B3D]">Mang theo CMND/CCCD khi làm thủ tục nhận phòng</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#8B6F47] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
              <p className="text-[#6B5B3D]">Liên hệ khách sạn nếu bạn cần thay đổi hoặc hủy đặt phòng</p>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/bookings"
            className="flex-1 px-6 py-4 bg-[#8B6F47] hover:bg-[#6B5B3D] text-white rounded-lg font-bold text-center transition-all shadow-lg hover:shadow-xl"
          >
            Xem đặt phòng của tôi
          </Link>
          <Link
            href="/"
            className="flex-1 px-6 py-4 bg-white border-2 border-[#E5D5C3] hover:bg-[#F5EFE7] text-[#6B5B3D] rounded-lg font-bold text-center transition-all"
          >
            Về trang chủ
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
}
