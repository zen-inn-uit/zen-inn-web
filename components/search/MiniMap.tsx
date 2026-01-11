"use client";

import Image from "next/image";

export default function MiniMap() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6" style={{ height: '200px', position: 'relative' }}>
            {/* Map placeholder image */}
            <div className="relative w-full h-full bg-gray-100">
                <Image
                    src="/map-placeholder.png"
                    alt="Map view"
                    fill
                    className="object-cover"
                    sizes="320px"
                />
            </div>

            {/* "Google" label overlay bottom-left */}
            <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-600 shadow-sm" style={{ fontFamily: 'var(--font-body)' }}>
                Google
            </div>

            {/* Centered "Show on map" button with pin icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button
                    type="button"
                    className="bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2 border border-gray-200 pointer-events-auto"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                >
                    {/* Pin icon */}
                    <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        style={{ color: 'var(--color-accent)' }}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span style={{ color: 'var(--color-form)', fontWeight: 500 }}>Show on map</span>
                </button>
            </div>
        </div>
    );
}

