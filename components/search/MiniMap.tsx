"use client";

import { useState } from "react";

interface MiniMapProps {
    hotelName?: string;
    address?: string;
    city?: string;
    country?: string;
}

export default function MiniMap({ 
    hotelName = "Zen Inn Luxury Resort",
    address = "Bali",
    city = "Bali",
    country = "Indonesia"
}: MiniMapProps) {
    const [isMapExpanded, setIsMapExpanded] = useState(false);
    
    // Create search query for Google Maps
    const fullAddress = `${hotelName}, ${address}, ${city}, ${country}`;
    const encodedAddress = encodeURIComponent(fullAddress);
    const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=15`;
    const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ height: isMapExpanded ? '400px' : '280px', position: 'relative', transition: 'height 0.3s ease' }}>
            {/* Google Maps iframe */}
            <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing ${hotelName}`}
            />

            {/* Location info overlay */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md max-w-[calc(100%-2rem)]">
                <h3 className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                    {hotelName}
                </h3>
                <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                    {address}, {city}
                </p>
            </div>

            {/* Action buttons overlay */}
            <div className="absolute bottom-4 right-4 flex gap-2">
                {/* Expand/Collapse button */}
                <button
                    type="button"
                    onClick={() => setIsMapExpanded(!isMapExpanded)}
                    className="bg-white px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '12px' }}
                    title={isMapExpanded ? "Collapse map" : "Expand map"}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: 'var(--color-primary)' }}
                    >
                        {isMapExpanded ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        )}
                    </svg>
                </button>

                {/* View on Google Maps button */}
                <a
                    href={mapLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2 border border-gray-200"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '12px' }}
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
                    <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>View on Maps</span>
                </a>
            </div>
        </div>
    );
}
