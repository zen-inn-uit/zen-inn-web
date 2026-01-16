'use client';

import { useState } from 'react';
import PropertyCard from './property-card';
import { MapPin } from 'lucide-react';

export default function PropertyGrid() {
    const [showMap, setShowMap] = useState(false);

    // Mock data - replace with actual API call
    const properties = [
        {
            id: '1',
            imageUrl: '/sapa.jpg',
            location: 'Gurugram, India',
            distance: '43 kilometres away',
            availableDates: '1–6 Nov',
            price: 28800,
            rating: 5.0,
            isGuestFavourite: false,
        },
        {
            id: '2',
            imageUrl: '/offer1.jpg',
            location: 'Reru, India',
            distance: '347 kilometres away',
            availableDates: '11–16 Nov',
            price: 31953,
            rating: 5.0,
            isGuestFavourite: true,
        },
        {
            id: '3',
            imageUrl: '/offer2.jpg',
            location: 'Jaipur, India',
            distance: '236 kilometres away',
            availableDates: '1–6 Nov',
            price: 26088,
            rating: 4.8,
            isGuestFavourite: false,
        },
        {
            id: '4',
            imageUrl: '/offer3.jpg',
            location: 'Kalwara, India',
            distance: '251 kilometres away',
            availableDates: '1–6 Nov',
            price: 17346,
            rating: 5.0,
            isGuestFavourite: false,
        },
        {
            id: '5',
            imageUrl: '/offer4.jpg',
            location: 'Sapa, Vietnam',
            distance: '120 kilometres away',
            availableDates: '15–20 Dec',
            price: 45000,
            rating: 4.9,
            isGuestFavourite: true,
        },
        {
            id: '6',
            imageUrl: '/category1.png',
            location: 'Hanoi, Vietnam',
            distance: '5 kilometres away',
            availableDates: '10–15 Jan',
            price: 35000,
            rating: 4.7,
            isGuestFavourite: false,
        },
        {
            id: '7',
            imageUrl: '/category2.png',
            location: 'Da Nang, Vietnam',
            distance: '80 kilometres away',
            availableDates: '20–25 Jan',
            price: 52000,
            rating: 4.9,
            isGuestFavourite: true,
        },
        {
            id: '8',
            imageUrl: '/category3.png',
            location: 'Hoi An, Vietnam',
            distance: '95 kilometres away',
            availableDates: '5–10 Feb',
            price: 38000,
            rating: 4.8,
            isGuestFavourite: false,
        },
    ];

    return (
        <div className="max-w-[1760px] mx-auto px-6 lg:px-10 py-8">
            {/* Property Grid - 8 items per row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-6 gap-y-10">
                {properties.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                ))}
            </div>

            {/* Show map button */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
                <button
                    onClick={() => setShowMap(!showMap)}
                    className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 font-medium text-sm border-0"
                >
                    <MapPin className="w-4 h-4" />
                    <span>Show map</span>
                </button>
            </div>

            {/* Pagination or Load More */}
            <div className="mt-12 flex justify-center">
                <button className="px-8 py-3 bg-primary hover:opacity-85 text-white rounded-full font-semibold transition-all duration-200 shadow-sm hover:shadow-md border-0">
                    Load more
                </button>
            </div>
        </div>
    );
}
