"use client";

import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import ChatButton from "@/components/ui/chat-button";
import SearchBar from "@/components/search/SearchBar";
import FilterSidebar from "@/components/search/FilterSidebar";
import HotelCard from "@/components/search/HotelCard";

const mockHotels = [
    {
        id: "1",
        name: "Zen Inn Luxury Resort",
        location: "Bali, Indonesia",
        image: "/auth-bg.png", // Using existing image as placeholder
        pricePerNight: 125,
        totalPrice: 375,
        rating: 4.8,
        reviewCount: 234,
        tags: ["Breakfast included", "Free cancellation"],
        nights: 3
    },
    {
        id: "2",
        name: "Serenity Beach Hotel",
        location: "Phuket, Thailand",
        image: "/auth-bg.png",
        pricePerNight: 95,
        totalPrice: 285,
        rating: 4.6,
        reviewCount: 189,
        tags: ["WiFi", "Pool", "Free cancellation"],
        nights: 3
    },
    {
        id: "3",
        name: "Mountain View Villa",
        location: "Kyoto, Japan",
        image: "/auth-bg.png",
        pricePerNight: 145,
        totalPrice: 435,
        rating: 4.9,
        reviewCount: 312,
        tags: ["Breakfast included", "Spa"],
        nights: 3
    },
    {
        id: "4",
        name: "Coastal Paradise Resort",
        location: "Maldives",
        image: "/auth-bg.png",
        pricePerNight: 220,
        totalPrice: 660,
        rating: 4.7,
        reviewCount: 156,
        tags: ["Breakfast included", "Pool", "Gym", "Free cancellation"],
        nights: 3
    },
    {
        id: "5",
        name: "Urban Zen Hotel",
        location: "Tokyo, Japan",
        image: "/auth-bg.png",
        pricePerNight: 110,
        totalPrice: 330,
        rating: 4.5,
        reviewCount: 278,
        tags: ["WiFi", "Gym", "Parking"],
        nights: 3
    },
    {
        id: "6",
        name: "Tropical Garden Resort",
        location: "Phuket, Thailand",
        image: "/auth-bg.png",
        pricePerNight: 85,
        totalPrice: 255,
        rating: 4.4,
        reviewCount: 142,
        tags: ["Breakfast included", "Pool", "WiFi"],
        nights: 3
    },
    {
        id: "7",
        name: "Riverside Retreat",
        location: "Kyoto, Japan",
        image: "/auth-bg.png",
        pricePerNight: 130,
        totalPrice: 390,
        rating: 4.8,
        reviewCount: 201,
        tags: ["Breakfast included", "Spa", "Free cancellation"],
        nights: 3
    },
    {
        id: "8",
        name: "Luxury Spa Resort",
        location: "Bali, Indonesia",
        image: "/auth-bg.png",
        pricePerNight: 165,
        totalPrice: 495,
        rating: 4.9,
        reviewCount: 298,
        tags: ["Breakfast included", "Spa", "Pool", "Gym"],
        nights: 3
    }
];

export default function SearchPage() {
    const [showFilters, setShowFilters] = useState(false);
    const resultsCount = mockHotels.length;

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
            <header>
                <Navbar />
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                {/* Search bar section */}
                <div className="mb-6">
                    <SearchBar />
                    
                    {/* Results summary */}
                    <p className="text-base mt-4" style={{ fontFamily: 'var(--font-body)', color: '#60463d', fontSize: 'var(--fs-h5)' }}>
                        <strong>{resultsCount} stays found</strong>
                    </p>
                </div>

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
                            {mockHotels.map(hotel => (
                                <HotelCard
                                    key={hotel.id}
                                    id={hotel.id}
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
            </main>

            {/* Footer - Reuse from home page pattern */}
            <footer id="footer" className="py-12 px-6 mt-20 bg-brand/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between md:flex-row flex-col items-center md:items-start space-y-6 md:space-y-0">
                        <div className="flex flex-col items-center md:items-start space-y-6">
                            <p className="text-accent" style={{ fontFamily: 'var(--font-body)' }}>
                                Find the true pleasure in life
                            </p>
                        </div>
                    </div>
                    <div className="border-t-2 border-[var(--color-primary)] mt-10 pt-4 text-center">
                        <p className="text-secondary" style={{ fontFamily: 'var(--font-body)' }}>
                            &copy; {new Date().getFullYear()} Zen Inn. Powered by <span className="text-accent">Group 15</span>.<br />All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Floating chat button */}
            <ChatButton />
        </div>
    );
}

