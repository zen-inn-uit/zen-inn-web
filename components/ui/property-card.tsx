'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import Link from 'next/link';

interface PropertyCardProps {
    id: string;
    imageUrl: string;
    location: string;
    distance?: string;
    availableDates: string;
    price: number;
    rating?: number;
    isGuestFavourite?: boolean;
}

export default function PropertyCard({
    id,
    imageUrl,
    location,
    distance,
    availableDates,
    price,
    rating,
    isGuestFavourite = false,
}: PropertyCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <Link href={`/hotels/${id}`} className="group cursor-pointer">
            <div className="relative">
                {/* Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                    <Image
                        src={imageUrl}
                        alt={location}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Wishlist button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsWishlisted(!isWishlisted);
                        }}
                        className="absolute top-3 right-3 z-10 p-2 hover:scale-110 transition-transform"
                        aria-label="Add to wishlist"
                    >
                        <Heart
                            className={cn(
                                "w-6 h-6 stroke-2",
                                isWishlisted
                                    ? "fill-primary stroke-primary"
                                    : "fill-black/30 stroke-white"
                            )}
                        />
                    </button>

                    {/* Guest favourite badge */}
                    {isGuestFavourite && (
                        <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 shadow-md">
                            <span className="text-xs font-semibold text-gray-800">Guest favourite</span>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="space-y-1">
                    <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-900 truncate flex-1">
                            {location}
                        </h3>
                        {rating && (
                            <div className="flex items-center gap-1 ml-2">
                                <Star className="w-4 h-4 fill-gray-900 stroke-gray-900" />
                                <span className="text-sm font-medium text-gray-900">{rating.toFixed(1)}</span>
                            </div>
                        )}
                    </div>

                    {distance && (
                        <p className="text-sm text-gray-600">{distance}</p>
                    )}

                    <p className="text-sm text-gray-600">{availableDates}</p>

                    <div className="pt-1">
                        <span className="font-semibold text-gray-900">${price}</span>
                        <span className="text-sm text-gray-600"> night</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}
