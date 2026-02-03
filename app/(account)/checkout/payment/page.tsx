"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ChatButton from "@/components/ui/chat-button";
import { useBooking } from "@/contexts/booking-context";
import { customerAPI } from "@/lib/api/customer-api";

type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "EXPIRED";

export default function CheckoutPaymentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { bookingDetails, clearBooking } = useBooking();
    
    const [status, setStatus] = useState<PaymentStatus>("PENDING");
    const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const hasProcessedPaid = useRef(false);
    const pollingInterval = useRef<NodeJS.Timeout | null>(null);

    // Get booking ID from URL or context
    const bookingId = searchParams.get("bookingId") || bookingDetails?.bookingId;

    // Redirect if no booking ID
    useEffect(() => {
        if (!bookingId) {
            router.replace('/');
        }
    }, [bookingId, router]);

    // Fetch booking details
    useEffect(() => {
        if (!bookingId) return;

        const fetchBooking = async () => {
            try {
                const response = await customerAPI.getBookingById(bookingId);
                setBooking(response.booking);
                
                // Check initial payment status
                if (response.booking.paymentStatus === 'COMPLETED') {
                    setStatus('PAID');
                } else if (response.booking.paymentStatus === 'FAILED') {
                    setStatus('FAILED');
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch booking:', error);
                setLoading(false);
                alert('Failed to load booking details');
                router.replace('/');
            }
        };

        fetchBooking();
    }, [bookingId, router]);

    // Countdown timer
    useEffect(() => {
        if (timeRemaining <= 0) {
            setStatus("EXPIRED");
            return;
        }

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    setStatus("EXPIRED");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining]);

    // Poll payment status
    useEffect(() => {
        if (status !== "PENDING" || !bookingId) return;

        pollingInterval.current = setInterval(async () => {
            try {
                const response = await customerAPI.getBookingById(bookingId);
                
                if (response.booking.paymentStatus === 'COMPLETED') {
                    setStatus('PAID');
                    if (pollingInterval.current) {
                        clearInterval(pollingInterval.current);
                    }
                } else if (response.booking.paymentStatus === 'FAILED') {
                    setStatus('FAILED');
                    if (pollingInterval.current) {
                        clearInterval(pollingInterval.current);
                    }
                }
            } catch (error) {
                console.error('Failed to poll payment status:', error);
            }
        }, 3000); // Poll every 3 seconds

        return () => {
            if (pollingInterval.current) {
                clearInterval(pollingInterval.current);
            }
        };
    }, [status, bookingId]);

    // Handle redirects based on status
    useEffect(() => {
        if (status === "PAID") {
            router.replace(`/checkout/success?bookingId=${bookingId}`);
        } else if (status === "FAILED") {
            router.replace(`/checkout/failure?bookingId=${bookingId}&reason=payment_failed`);
        } else if (status === "EXPIRED") {
            router.replace(`/checkout/expired?bookingId=${bookingId}`);
        }
    }, [status, router, bookingId]);

    // Handle "I've paid" button click
    const handlePaidClick = () => {
        if (!hasProcessedPaid.current && status === "PENDING") {
            hasProcessedPaid.current = true;
            // Force a status check
            if (bookingId) {
                customerAPI.getBookingById(bookingId).then(response => {
                    if (response.booking.paymentStatus === 'COMPLETED') {
                        setStatus('PAID');
                    }
                });
            }
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    if (loading || !booking) {
        return (
            <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
                <main className="max-w-4xl mx-auto px-4 md:px-6 py-16">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
                        <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                            Loading payment details...
                        </p>
                    </div>
                </main>
                <ChatButton />
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>

            <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
                {/* Status pill */}
                <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                        Waiting for payment…
                    </span>
                </div>

                {/* Page title */}
                <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                    Complete your payment
                </h1>

                {/* Main content - 2 column layout */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left column - QR Code or Redirect */}
                    <div className="flex-1 flex flex-col items-center md:items-start">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 w-full max-w-md">
                            {booking.paymentUrl ? (
                                <div className="space-y-6 flex flex-col items-center text-center">
                                    <div className="p-4 bg-blue-50 rounded-full mb-2">
                                        <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Thanh toán qua VNPay</h3>
                                    <p className="text-gray-600 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                                        Vui lòng nhấn vào nút bên dưới để chuyển tiếp sang cổng thanh toán của VNPay. Hệ thống hỗ trợ Thẻ ATM, QRCode và Thẻ Quốc tế.
                                    </p>
                                    
                                    <a 
                                        href={booking.paymentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-4 text-white rounded-xl font-bold text-lg shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
                                        style={{ fontFamily: 'var(--font-body)', backgroundColor: 'var(--color-primary)' }}
                                    >
                                        Thanh toán với VNPay
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                    
                                    <p className="text-xs text-gray-400 mt-4 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                                        Bạn sẽ được chuyển hướng an toàn. Đừng đóng trình duyệt này cho đến khi nhận được thông báo thành công.
                                    </p>
                                </div>
                            ) : (
                                <div className="relative w-full aspect-square mb-4 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-200">
                                    <div className="text-center p-6">
                                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent mx-auto mb-4"></div>
                                        <p className="text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                                            Đang khởi tạo thanh toán...
                                        </p>
                                        <p className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-body)' }}>
                                            Vui lòng đợi trong giây lát
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right column - Payment details and actions */}
                    <div className="w-full md:w-[400px] flex-shrink-0">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                            {/* Amount */}
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                                    Amount to pay
                                </div>
                                <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                    {booking.totalPrice.toLocaleString('vi-VN')} VNĐ
                                </div>
                            </div>

                            {/* Order code / Reference */}
                            <div className="mb-6">
                                <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                                    Booking ID
                                </div>
                                <div className="text-base font-mono font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                    {booking.id}
                                </div>
                            </div>

                            {/* Countdown timer */}
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <div className="text-center">
                                    <div className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: timeRemaining < 60 ? '#ef4444' : 'var(--color-primary)' }}>
                                        {formatTime(timeRemaining)}
                                    </div>
                                    <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                                        This payment request expires in 5 minutes.
                                    </p>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="space-y-3">
                                <button
                                    type="button"
                                    onClick={handlePaidClick}
                                    className="w-full py-3 rounded-lg font-bold hover:opacity-90 transition-colors"
                                    style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h5)', backgroundColor: 'var(--color-primary)', color: '#ffffff' }}
                                >
                                    I've paid
                                </button>
                                <Link
                                    href="/checkout/review"
                                    className="block w-full py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors text-center"
                                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}
                                >
                                    Cancel payment
                                </Link>
                            </div>
                        </div>
                    </div>
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

