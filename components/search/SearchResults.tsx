'use client';

import { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import HotelCard from "./HotelCard";

interface Hotel {
    id: string;
    slug?: string;
    name: string;
    location: string;
    image: string;
    pricePerNight: number;
    totalPrice: number;
    rating: number;
    reviewCount: number;
    tags: string[];
    nights: number;
}

export default function SearchResults({ hotels }: { hotels: Hotel[] }) {
    const [showFilters, setShowFilters] = useState(false);
    const resultsCount = hotels.length;

    return (
        <>
            {/* Results summary */}
            <p className="text-base mb-4" style={{ fontFamily: 'var(--font-body)', color: '#60463d', fontSize: 'var(--fs-h5)' }}>
                <strong>{resultsCount} stays found</strong>
            </p>

            {/* Main content - Two column layout */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Filter sidebar */}
                <div className="w-full md:w-[320px] flex-shrink-0">
                    {/* Mobile filter toggle button */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden w-full mb-4 px-4 py-3 bg-white rounded-lg border border-gray-300 font-medium hover:bg-gray-50 transition-colors"
                        style={{ fontFamily: 'var(--font-body)', color: 'var(--color-form)' }}
                    >
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>
                    
                    {/* Filter sidebar - hidden on mobile unless toggled */}
                    <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
                        <FilterSidebar />
                    </div>
                </div>

                {/* Results list */}
                <div className="flex-1 min-w-0">
                    <div className="space-y-6">
                        {hotels.map(hotel => (
                            <HotelCard
                                key={hotel.id}
                                id={hotel.id}
                                slug={hotel.slug}
                                name={hotel.name}
                                location={hotel.location}
                                image={hotel.image}
                                pricePerNight={hotel.pricePerNight}
                                totalPrice={hotel.totalPrice}
                                rating={hotel.rating}
                                reviewCount={hotel.reviewCount}
                                tags={hotel.tags}
                                nights={hotel.nights}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
