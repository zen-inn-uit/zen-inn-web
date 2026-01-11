"use client";

interface BookingSummaryCardProps {
    pricePerNight: number;
    totalPrice: number;
    nights: number;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
}

export default function BookingSummaryCard({
    pricePerNight,
    totalPrice,
    nights,
    checkIn,
    checkOut,
    guests = "2 guests, 1 room"
}: BookingSummaryCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-4">
            {/* Price section */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-baseline justify-between mb-2">
                    <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                        ${pricePerNight.toFixed(0)}
                    </span>
                    <span className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-body)' }}>
                        per night
                    </span>
                </div>
                <div className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                    ${totalPrice.toFixed(0)} for {nights} nights
                </div>
            </div>

            {/* Date fields */}
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                    Check-in / Check-out
                </label>
                <div className="flex gap-2">
                    <input
                        type="date"
                        value={checkIn || ""}
                        readOnly
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed"
                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                    />
                    <input
                        type="date"
                        value={checkOut || ""}
                        readOnly
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed"
                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                    />
                </div>
            </div>

            {/* Guests/Rooms */}
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                    Guests / Rooms
                </label>
                <input
                    type="text"
                    value={guests}
                    readOnly
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                />
            </div>

            {/* Reserve button */}
            <button
                type="button"
                className="w-full py-3 rounded-lg text-white font-bold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all"
                style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--color-form)', fontSize: 'var(--fs-h5)' }}
            >
                Reserve
            </button>

            <p className="text-xs text-center text-gray-500 mt-4" style={{ fontFamily: 'var(--font-body)' }}>
                You won't be charged yet
            </p>
        </div>
    );
}

