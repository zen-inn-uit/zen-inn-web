"use client";

interface BookingConfirmedHeaderProps {
    hotelName: string;
    location: string;
    checkIn: string;
    checkOut: string;
    confirmationNumber: string;
    totalPrice: number;
}

export default function BookingConfirmedHeader({
    hotelName,
    location,
    checkIn,
    checkOut,
    confirmationNumber,
    totalPrice
}: BookingConfirmedHeaderProps) {
    return (
        <div className="mb-8">
            {/* Status tag */}
            <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                    Confirmed
                </span>
            </div>

            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                {/* Left: Message and dates */}
                <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                        Your booking in {hotelName} is confirmed.
                    </h1>
                    <div className="space-y-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)', color: '#60463d' }}>
                        <p>
                            {new Date(checkIn).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {new Date(checkOut).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p>
                            Confirmation number: <strong>{confirmationNumber}</strong>
                        </p>
                    </div>
                </div>

                {/* Right: Button group and price */}
                <div className="flex flex-col items-start md:items-end gap-4">
                    <div className="flex flex-col gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-sm font-medium"
                            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-form)' }}
                        >
                            Print full version
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-sm font-medium"
                            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-form)' }}
                        >
                            Save confirmation to phone
                        </button>
                    </div>
                    <div className="px-4 py-2 bg-accent/20 rounded-full">
                        <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                            Total price: ${totalPrice.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

