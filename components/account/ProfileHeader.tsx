"use client";

import Link from "next/link";

interface ProfileHeaderProps {
    name: string;
}

export default function ProfileHeader({ name }: ProfileHeaderProps) {
    // Extract first name from full name
    const firstName = name.split(" ")[0] || name;

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            {/* Left: Avatar + Greeting */}
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <span className="text-2xl font-bold text-gray-600" style={{ fontFamily: 'var(--font-display)' }}>
                        {firstName.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                        Hi, {firstName}
                    </h2>
                    <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                        How you doing?
                    </p>
                </div>
            </div>

            {/* Right: Pill buttons */}
            <div className="flex gap-3">
                <Link
                    href="/wishlist"
                    className="px-6 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}
                >
                    Wishlist
                </Link>
                <Link
                    href="/bookings"
                    className="px-6 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}
                >
                    My Bookings
                </Link>
            </div>
        </div>
    );
}

