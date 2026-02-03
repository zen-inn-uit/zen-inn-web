"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatButton from "@/components/ui/chat-button";
import CheckoutFormSection from "@/components/checkout/CheckoutFormSection";
import CheckoutReviewSummaryCard from "@/components/checkout/CheckoutReviewSummaryCard";
import Link from "next/link";
import { useBooking } from "@/contexts/booking-context";
import { customerAPI } from "@/lib/api/customer-api";

export default function CheckoutReviewPage() {
    const router = useRouter();
    const { bookingDetails, updateBookingDetails, isBookingInProgress, setIsBookingInProgress} = useBooking();
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Redirect if no booking details
    useEffect(() => {
        if (!bookingDetails) {
            router.replace('/');
        }
    }, [bookingDetails, router]);

    // Show loading while redirecting
    if (!bookingDetails) {
        return null;
    }

    const handleConfirmBooking = async () => {
        if (!agreedToPolicy || !bookingDetails) return;
        
        setIsBookingInProgress(true);
        setError(null);
        
        try {
            // Reserve booking via API (bypass payment)
            const response = await customerAPI.reserveBooking({
                roomId: bookingDetails.roomId,
                ratePlanId: bookingDetails.ratePlanId,
                checkIn: bookingDetails.checkIn,
                checkOut: bookingDetails.checkOut,
                guestName: bookingDetails.guestName!,
                guestEmail: bookingDetails.guestEmail!,
                guestPhone: bookingDetails.guestPhone!,
                guestCount: bookingDetails.guestCount,
                specialRequests: bookingDetails.specialRequests,
            });

            // Success - Update booking details
            updateBookingDetails({
                bookingId: response.booking.id,
            });

            // Redirect to success page immediately
            router.push(`/checkout/success?bookingId=${response.booking.id}`);
        } catch (error: any) {
            console.error('Failed to create booking:', error);
            setIsBookingInProgress(false);
            
            // Handle specific error cases
            let errorMessage = 'Đặt phòng thất bại. Vui lòng thử lại.';
            
            if (error.response?.status === 409 || error.response?.status === 400) {
                // ConflictException or BadRequestException from backend
                errorMessage = error.response?.data?.message || 'Hiện phòng này đã hết, vui lòng chọn phòng khác.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            setError(errorMessage);
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                {/* Main content - 2 column layout */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left column - Form sections */}
                    <div className="flex-1 min-w-0">
                        {/* Review your booking */}
                        <CheckoutFormSection title="Review your booking">
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Hotel
                                    </div>
                                    <div className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                                        {bookingDetails.hotelName}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Room type
                                    </div>
                                    <div className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                                        {bookingDetails.roomName}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Dates
                                    </div>
                                    <div className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                                        {new Date(bookingDetails.checkIn).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {new Date(bookingDetails.checkOut).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Guests
                                    </div>
                                    <div className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                                        {bookingDetails.guestCount} guests
                                    </div>
                                </div>
                                {bookingDetails.specialRequests && (
                                    <div>
                                        <div className="text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                            Special requests
                                        </div>
                                        <div className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                                            {bookingDetails.specialRequests}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <Link
                                    href="/checkout/details"
                                    className="text-sm font-medium text-accent hover:underline"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    Edit details
                                </Link>
                            </div>
                        </CheckoutFormSection>

                        {/* Important Notice - No Payment Required */}
                        <CheckoutFormSection title="Xác nhận đặt phòng">
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                <div className="flex items-start">
                                    <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h4 className="text-sm font-semibold text-blue-900 mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                                            Không cần thanh toán trước
                                        </h4>
                                        <p className="text-sm text-blue-800" style={{ fontFamily: 'var(--font-body)' }}>
                                            Đặt phòng của bạn sẽ được xác nhận ngay lập tức. Thanh toán tại khách sạn khi nhận phòng.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CheckoutFormSection>

                        {/* Cancellation & house rules */}
                        <CheckoutFormSection title="Cancellation & house rules">
                            <div className="space-y-4 mb-6">
                                <div>
                                    <div className="text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Cancellation policy
                                    </div>
                                    <p className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                                        Free cancellation before 24 hours of check-in. Cancellation after this time will result in a charge of the first night.
                                    </p>
                                </div>
                                <div>
                                    <div className="text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Check-in / Check-out
                                    </div>
                                    <p className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                                        Check-in: From 3:00 PM • Check-out: Until 11:00 AM
                                    </p>
                                </div>
                                <div>
                                    <div className="text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        House rules
                                    </div>
                                    <ul className="text-sm text-gray-700 space-y-1" style={{ fontFamily: 'var(--font-body)' }}>
                                        <li>• No smoking allowed</li>
                                        <li>• Pets are welcome (charges may apply)</li>
                                        <li>• Quiet hours: 10 PM - 7 AM</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <label className="flex items-start cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={agreedToPolicy}
                                        onChange={(e) => setAgreedToPolicy(e.target.checked)}
                                        className="w-4 h-4 mt-1 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer flex-shrink-0"
                                        style={{ accentColor: 'var(--color-accent)' }}
                                    />
                                    <span className="ml-3 text-sm" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        I agree to the cancellation policy and house rules *
                                    </span>
                                </label>
                            </div>
                        </CheckoutFormSection>

                        {/* Error Message */}
                        {error && (
                            <div className="border-l-4 p-6 rounded-r-xl mb-6" style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: '#ef4444' }}>
                                <div className="flex items-start">
                                    <svg className="w-7 h-7 mr-4 flex-shrink-0 mt-1" style={{ color: '#ef4444' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="text-base font-bold mb-2" style={{ fontFamily: 'var(--font-body)', color: '#ef4444' }}>
                                            {error}
                                        </p>
                                        <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: '#dc2626' }}>
                                            💡 Gợi ý: Thử chọn ngày khác hoặc loại phòng khác
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Final action area */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <Link
                                    href="/checkout/details"
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 underline"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    Quay lại
                                </Link>
                                <div className="flex-1 sm:flex-none text-center sm:text-right">
                                    <button
                                        type="button"
                                        onClick={handleConfirmBooking}
                                        disabled={!agreedToPolicy || isBookingInProgress}
                                        className={`w-full sm:w-auto px-8 py-3 rounded-lg font-bold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all ${
                                            (agreedToPolicy && !isBookingInProgress) ? '' : 'opacity-50 cursor-not-allowed'
                                        }`}
                                        style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--color-primary)', fontSize: 'var(--fs-h5)', color: '#ffffff' }}
                                    >
                                        {isBookingInProgress ? 'Đang xử lý...' : 'Xác nhận đặt phòng'}
                                    </button>
                                    <p className="text-xs text-gray-500 mt-3" style={{ fontFamily: 'var(--font-body)' }}>
                                        Không cần thanh toán. Booking sẽ được xác nhận ngay.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Summary card */}
                    <div className="w-full md:w-[320px] flex-shrink-0">
                        <CheckoutReviewSummaryCard
                            hotelName={bookingDetails.hotelName}
                            hotelImage={bookingDetails.hotelImage}
                            roomName={bookingDetails.roomName}
                            checkIn={bookingDetails.checkIn}
                            checkOut={bookingDetails.checkOut}
                            guests={`${bookingDetails.guestCount} guests`}
                            pricePerNight={bookingDetails.pricePerNight}
                            nights={bookingDetails.nights}
                            subtotal={bookingDetails.subtotal}
                            taxes={bookingDetails.taxes}
                            total={bookingDetails.total}
                        />
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

