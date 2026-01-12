"use client";

import Image from "next/image";

interface CheckoutReviewSummaryCardProps {
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

export default function CheckoutReviewSummaryCard({
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
}: CheckoutReviewSummaryCardProps) {
    return (
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
                    <span>${pricePerNight.toFixed(0)} × {nights} nights</span>
                    <span>${subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                    <span>Taxes and fees</span>
                    <span>${taxes.toFixed(0)}</span>
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline mb-6">
                <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                    Total
                </span>
                <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                    ${total.toFixed(0)}
                </span>
            </div>

            {/* Secure checkout */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure checkout</span>
                </div>
            </div>
        </div>
    );
}

