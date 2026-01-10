"use client";

import Image from "next/image";
import Link from "next/link";

interface HotelCardProps {
    id: string;
    name: string;
    location: string;
    image: string;
    pricePerNight: number;
    totalPrice: number;
    rating: number;
    reviewCount: number;
    tags?: string[];
    nights?: number;
}

export default function HotelCard({
    id,
    name,
    location,
    image,
    pricePerNight,
    totalPrice,
    rating,
    reviewCount,
    tags = [],
    nights = 1
}: HotelCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex flex-col md:flex-row">
                {/* Image thumbnail */}
                <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 256px"
                    />
                </div>

                {/* Card content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                        {/* Header row with name and rating */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                    {name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}>
                                    {location}
                                </p>
                            </div>
                            {/* Rating box */}
                            <div className="ml-4 text-right bg-accent/20 rounded-lg px-3 py-2 flex-shrink-0">
                                <div className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                    {rating.toFixed(1)}
                                </div>
                                <div className="text-xs text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                                    {reviewCount} reviews
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-secondary/50 rounded-md text-xs"
                                        style={{ fontFamily: 'var(--font-body)', color: 'var(--color-form)', fontSize: 'var(--fs-body)' }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer with price and CTA */}
                    <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                        <div>
                            <div className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}>
                                ${pricePerNight.toFixed(0)} <span className="text-xs">per night</span>
                            </div>
                            <div className="text-lg font-bold mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                ${totalPrice.toFixed(0)} <span className="text-sm font-normal text-gray-500">for {nights} nights</span>
                            </div>
                        </div>
                        <Link
                            href={`/hotels/${id}`}
                            className="px-6 py-2 rounded-lg text-white font-bold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all"
                            style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--color-form)', fontSize: 'var(--fs-h5)' }}
                        >
                            See availability
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

