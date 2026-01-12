"use client";

export default function HotelPolicies() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                Policies & House Rules
            </h2>

            <div className="space-y-6">
                {/* Check-in / Check-out */}
                <div>
                    <div className="flex items-center mb-3">
                        <svg className="w-5 h-5 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                            Check-in / Check-out
                        </h3>
                    </div>
                    <div className="ml-7 space-y-1" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)', color: '#60463d' }}>
                        <p>Check-in: From 3:00 PM</p>
                        <p>Check-out: Until 11:00 AM</p>
                    </div>
                </div>

                {/* Cancellation */}
                <div>
                    <div className="flex items-center mb-3">
                        <svg className="w-5 h-5 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                            Cancellation
                        </h3>
                    </div>
                    <div className="ml-7" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)', color: '#60463d' }}>
                        <p>Free cancellation before 24 hours of check-in</p>
                    </div>
                </div>

                {/* Smoking */}
                <div>
                    <div className="flex items-center mb-3">
                        <svg className="w-5 h-5 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                            Smoking
                        </h3>
                    </div>
                    <div className="ml-7" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)', color: '#60463d' }}>
                        <p>No smoking allowed</p>
                    </div>
                </div>

                {/* Pets */}
                <div>
                    <div className="flex items-center mb-3">
                        <svg className="w-5 h-5 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                            Pets
                        </h3>
                    </div>
                    <div className="ml-7" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)', color: '#60463d' }}>
                        <p>Pets are welcome (charges may apply)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

