"use client";

interface RoomCardProps {
    name: string;
    bedInfo: string;
    capacity: string;
    cancellationPolicy: string;
    pricePerNight: number;
    totalPrice: number;
    nights: number;
    onSelect?: () => void;
}

export default function RoomCard({
    name,
    bedInfo,
    capacity,
    cancellationPolicy,
    pricePerNight,
    totalPrice,
    nights,
    onSelect
}: RoomCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Left section - Room info */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                        {name}
                    </h3>
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {bedInfo}
                        </div>
                        <div className="flex items-center text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {capacity}
                        </div>
                    </div>
                    <span
                        className="inline-block px-2 py-1 bg-green-50 text-green-600 rounded-md text-xs font-medium"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        ✓ {cancellationPolicy}
                    </span>
                </div>

                {/* Right section - Price and button */}
                <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                            {pricePerNight.toLocaleString('vi-VN')} VNĐ <span className="text-xs">per night</span>
                        </div>
                        <div className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                            {totalPrice.toLocaleString('vi-VN')} VNĐ
                        </div>
                        <div className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                            for {nights} nights
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onSelect}
                        className="px-6 py-2.5 rounded-lg text-white font-bold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
                        style={{ 
                            fontFamily: 'var(--font-display)', 
                            backgroundColor: 'var(--color-primary)',
                            fontSize: '14px',
                            boxShadow: '0 2px 4px rgba(107, 91, 61, 0.2)'
                        }}
                    >
                        Select
                    </button>
                </div>
            </div>
        </div>
    );
}
