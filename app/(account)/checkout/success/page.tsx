"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ChatButton from "@/components/ui/chat-button";
import { customerAPI, CustomerBooking } from "@/lib/api/customer-api";
import Link from "next/link";

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const bookingId = searchParams.get('bookingId');
    
    const [booking, setBooking] = useState<CustomerBooking | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!bookingId) {
            router.replace('/');
            return;
        }
        
        fetchBookingDetails();
    }, [bookingId]);

    const fetchBookingDetails = async () => {
        try {
            const response = await customerAPI.getBookingById(bookingId!);
            setBooking(response.booking);
        } catch (err: any) {
            console.error('Failed to load booking:', err);
            setError('Không thể tải thông tin booking');
        } finally {
            setLoading(false);
        }
    };

    const formatVND = (amount: number) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateNights = () => {
        if (!booking) return 0;
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);
        return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f5f0' }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                    <p style={{ fontFamily: 'var(--font-body)' }}>Đang tải thông tin booking...</p>
                </div>
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f5f0' }}>
                <div className="text-center">
                    <p className="text-red-600 mb-4" style={{ fontFamily: 'var(--font-body)' }}>{error || 'Không tìm thấy booking'}</p>
                    <Link href="/" className="text-accent underline" style={{ fontFamily: 'var(--font-body)' }}>
                        Về trang chủ
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-5xl mx-auto px-4 md:px-6 py-12">
                {/* Success Icon */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6" style={{ backgroundColor: 'var(--color-primary)' }}>
                        <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                        Đặt phòng thành công!
                    </h1>
                    <p className="text-xl mb-2" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                        Mã đặt phòng: <strong>#{booking.id.substring(0, 12).toUpperCase()}</strong>
                    </p>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-body)' }}>
                        Trạng thái: <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
                            ✓ {booking.status}
                        </span>
                    </p>
                </div>

                {/* Booking Details Card */}
                <div className="rounded-3xl shadow-xl overflow-hidden mb-8" style={{ border: '3px solid var(--color-primary)' }}>
                    {/* Hotel Header */}
                    <div className="text-white p-8" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)' }}>
                        <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                            {booking.room?.hotel.name}
                        </h2>
                        <p className="text-white/90 text-base flex items-center" style={{ fontFamily: 'var(--font-body)' }}>
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {booking.room?.hotel.city} • {booking.room?.hotel.address}
                        </p>
                    </div>

                    {/* Details Grid */}
                    <div className="bg-white p-8">
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            {/* Room Info */}
                            <div className="p-6 rounded-2xl" style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.05)', border: '2px solid var(--color-primary)' }}>
                                <label className="text-xs font-bold uppercase tracking-wider mb-3 block" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                                    Loại phòng
                                </label>
                                <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                    {booking.room?.name}
                                </p>
                            </div>

                            {/* Guest Info */}
                            <div className="p-6 rounded-2xl" style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.05)', border: '2px solid var(--color-primary)' }}>
                                <label className="text-xs font-bold uppercase tracking-wider mb-3 block" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                                    Thông tin khách
                                </label>
                                <p className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                    {booking.guestName}
                                </p>
                                <p className="text-sm mb-1" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)', opacity: 0.8 }}>
                                    {booking.guestEmail}
                                </p>
                                <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)', opacity: 0.8 }}>
                                    {booking.guestPhone}
                                </p>
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid md:grid-cols-3 gap-6 py-8 border-y-4" style={{ borderColor: 'var(--color-primary)' }}>
                            <div className="text-center p-4">
                                <label className="text-xs font-bold uppercase tracking-wider mb-3 block" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                                    Nhận phòng
                                </label>
                                <p className="text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                    {new Date(booking.checkIn).getDate()}
                                </p>
                                <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                                    {formatDate(booking.checkIn)}
                                </p>
                                <p className="text-xs font-medium" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-accent)' }}>
                                    Từ 14:00
                                </p>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-primary)' }}>
                                    <div className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                                        {calculateNights()}
                                    </div>
                                    <p className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>
                                        đêm
                                    </p>
                                </div>
                            </div>

                            <div className="text-center p-4">
                                <label className="text-xs font-bold uppercase tracking-wider mb-3 block" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                                    Trả phòng
                                </label>
                                <p className="text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                    {new Date(booking.checkOut).getDate()}
                                </p>
                                <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                                    {formatDate(booking.checkOut)}
                                </p>
                                <p className="text-xs font-medium" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-accent)' }}>
                                    Trước 12:00
                                </p>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mt-8 flex items-center justify-between rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)' }}>
                            <div>
                                <p className="text-base text-white/90 mb-2 font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
                                    Tổng chi phí
                                </p>
                                <p className="text-sm text-white/80" style={{ fontFamily: 'var(--font-body)' }}>
                                    {booking.guestCount} khách • {calculateNights()} đêm
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                    {formatVND(booking.totalPrice)}
                                </p>
                                <p className="text-sm text-white/90 mt-2 font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
                                    💳 Thanh toán tại khách sạn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Email Confirmation Notice */}
                <div className="rounded-2xl p-8 mb-8" style={{ border: '3px solid var(--color-primary)', backgroundColor: 'rgba(var(--color-primary-rgb), 0.05)' }}>
                    <div className="flex items-start">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center mr-5 flex-shrink-0" style={{ backgroundColor: 'var(--color-primary)' }}>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                📧 Email xác nhận đã được gửi
                            </h3>
                            <p className="text-base mb-2 font-semibold" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                                Chúng tôi đã gửi email xác nhận đến: <strong>{booking.guestEmail}</strong>
                            </p>
                            <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)', opacity: 0.8 }}>
                                Vui lòng kiểm tra hộp thư đến (hoặc thư spam). Email chứa đầy đủ thông tin đặt phòng của bạn.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="rounded-2xl shadow-lg p-8 mb-8" style={{ border: '3px solid var(--color-primary)', backgroundColor: 'white' }}>
                    <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                        📌 Bước tiếp theo
                    </h3>
                    <ul className="space-y-5">
                        <li className="flex items-start">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full mr-4 flex-shrink-0 text-lg font-bold text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
                                1
                            </span>
                            <span className="text-base font-semibold pt-1" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                                Kiểm tra email xác nhận và lưu lại mã booking
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full mr-4 flex-shrink-0 text-lg font-bold text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
                                2
                            </span>
                            <span className="text-base font-semibold pt-1" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                                Mang theo CMND/CCCD khi nhận phòng
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full mr-4 flex-shrink-0 text-lg font-bold text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
                                3
                            </span>
                            <span className="text-base font-semibold pt-1" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                                Đến khách sạn trước 14:00 ngày {formatDate(booking.checkIn)}
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full mr-4 flex-shrink-0 text-lg font-bold text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
                                4
                            </span>
                            <span className="text-base font-semibold pt-1" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                                Thanh toán tại quầy lễ tân khách sạn
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/bookings"
                        className="px-10 py-5 rounded-2xl font-bold text-white hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all text-center shadow-lg text-xl"
                        style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--color-primary)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
                    >
                        📋 Xem danh sách booking
                    </Link>
                    <Link
                        href="/"
                        className="px-10 py-5 rounded-2xl font-bold border-3 hover:text-white focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all text-center shadow-lg text-xl"
                        style={{ 
                            fontFamily: 'var(--font-display)', 
                            borderWidth: '3px',
                            borderColor: 'var(--color-primary)', 
                            color: 'var(--color-primary)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.10)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        🏠 Về trang chủ
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer id="footer" className="py-12 px-6 mt-20 bg-brand/10">
                <div className="max-w-7xl mx-auto">
                    <div className="border-t-2 border-[var(--color-primary)] pt-4 text-center">
                        <p className="text-secondary" style={{ fontFamily: 'var(--font-body)' }}>
                            &copy; {new Date().getFullYear()} Zen Inn. Powered by <span className="text-accent">Group 15</span>.<br />All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Floating chat button */}
            <ChatButton />
        </div>
    );
}

