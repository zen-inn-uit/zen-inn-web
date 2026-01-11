"use client";

import ExploreCard from "../helpers/explore-card";
import { useRef } from "react";

export default function ExploreSection() {
    const destinations = [
        { id: 1, name: "Sapa", properties: "1,300 properties", imageUrl: "/sapa.jpg" },
        { id: 2, name: "Sapa", properties: "1,300 properties", imageUrl: "/sapa.jpg" },
        { id: 3, name: "Sapa", properties: "1,300 properties", imageUrl: "/sapa.jpg" },
        { id: 4, name: "Sapa", properties: "1,300 properties", imageUrl: "/sapa.jpg" },
        { id: 5, name: "Sapa", properties: "1,300 properties", imageUrl: "/sapa.jpg" },
        { id: 6, name: "Sapa", properties: "1,300 properties", imageUrl: "/sapa.jpg" },
        { id: 7, name: "Sapa", properties: "1,300 properties", imageUrl: "/sapa.jpg" },
    ];

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
            <h1 className="font-display text-secondary text-3xl">Explore Vietnam</h1>
            <p className="text-secondary mt-0 font-medium">Promotions, deals and special offers for you!</p>
            
            <div className="relative w-full">
                <button 
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                    aria-label="Previous destination"
                >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide mt-6 pb-4 w-full gap-4">
                    {
                        destinations.map((destination) => (
                            <div key={destination.id} className="snap-start flex-shrink-0">
                                <ExploreCard 
                                    name={destination.name} 
                                    properties={destination.properties} 
                                    imageUrl={destination.imageUrl} 
                                />
                            </div>
                        ))
                    }
                </div>

                <button 
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                    aria-label="Next destination"
                >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}