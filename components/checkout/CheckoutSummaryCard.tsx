"use client";

import Image from "next/image";
import Link from "next/link";

interface CheckoutSummaryCardProps {
    hotelName: string;
    hotelImage: string;
    roomName: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    pricePerNight: number;
    nights: number;
    subtotal: number;
    taxes: number;
    total: number;
}

export default function CheckoutSummaryCard({
    hotelName,
    hotelImage,
    roomName,
    checkIn,
    checkOut,
    guests,
    pricePerNight,
    nights,
    subtotal,
    taxes,
    total
}: CheckoutSummaryCardProps) {
    const formatVND = (amount: number) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
    };

    return (
        <div className="space-y-6">
            {/* Main summary card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-4">
                {/* Hotel info */}
                <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={hotelImage}
                            alt={hotelName}
                            fill
                            className="object-cover"
                            sizes="80px"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                            {hotelName}
                        </h3>
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}>
                            {roomName}
                        </p>
                    </div>
                </div>

                {/* Booking details */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                    <div>
                        <div className="text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                            Check-in / Check-out
                        </div>
                        <div className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                            {new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                            Guests
                        </div>
                        <div className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                            {guests}
                        </div>
                    </div>
                </div>

                {/* Price breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between text-sm" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                        <span>{formatVND(pricePerNight)} × {nights} đêm</span>
                        <span>{formatVND(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                        <span>Thuế và phí</span>
                        <span>{formatVND(taxes)}</span>
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline mb-6">
                    <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                        Tổng cộng
                    </span>
                    <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                        {formatVND(total)}
                    </span>
                </div>

                {/* CTA button */}
                <Link
                    href="/checkout/review"
                    className="block w-full py-3 rounded-lg text-accent font-bold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all text-center"
                    style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--color-form)', fontSize: 'var(--fs-h5)' }}
                >
                    Next: Final details
                </Link>

                <p className="text-xs text-center text-gray-500 mt-4" style={{ fontFamily: 'var(--font-body)' }}>
                    Không cần thanh toán trước
                </p>
            </div>

            {/* Additional info cards */}
            <div className="space-y-3">
                <div className="bg-secondary/20 rounded-xl border border-gray-200 p-4">
                    <div className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                        We price match
                    </div>
                    <p className="text-xs text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                        Found a better price? We'll match it.
                    </p>
                </div>
                <div className="bg-secondary/20 rounded-xl border border-gray-200 p-4">
                    <div className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                        No prepayment needed
                    </div>
                    <p className="text-xs text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                        Pay at the property
                    </p>
                </div>
            </div>
        </div>
    );
}

