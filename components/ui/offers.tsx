"use client";

import OfferCard from "../helpers/offer-card";
import { useRef } from "react";

export function OffersSection() {
    const offers = [
        { id: 1, title: "Go for a good time, not a long time", description: "Get 20% off on your next booking!", imageUrl: "/offer1.jpg" },
        { id: 2, title: "Quick escape plans", description: "Book 3 nights and get the 4th night free!", imageUrl: "/offer2.jpg" },
        { id: 3, title: "Free breakfast included", description: "Free breakfast with every booking!", imageUrl: "/offer3.jpg" },
        { id: 4, title: "Extended stay discounts", description: "Stay longer and save more with our extended stay discounts!", imageUrl: "/offer4.jpg" },
    ]

    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const containerWidth = scrollRef.current.offsetWidth;
            const scrollAmount = containerWidth;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex flex-col items-start py-4 px-10 w-full overflow-hidden">
            <h1 className="font-display text-secondary text-3xl text-center">Special Offers</h1>
            <p className="text-secondary text-center mt-0 font-medium">Promotions, deals and special offers for you!</p>
            
            <div className="relative w-full">
                <button 
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                    aria-label="Previous offer"
                >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide mt-6 pb-4 w-full gap-4">
                    {
                        offers.map((offer) => (
                            <div key={offer.id} className="snap-start">
                                <OfferCard title={offer.title} description={offer.description} imageUrl={offer.imageUrl} />
                            </div>
                        ))
                    }
                </div>

                <button 
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                    aria-label="Next offer"
                >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}