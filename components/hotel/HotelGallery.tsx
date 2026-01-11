"use client";

import Image from "next/image";
import { useState } from "react";

interface HotelGalleryProps {
    images: string[];
    hotelName: string;
}

export default function HotelGallery({ images, hotelName }: HotelGalleryProps) {
    const [mainImage, setMainImage] = useState(images[0] || "/auth-bg.png");

    const thumbnailImages = images.slice(1, 5); // Show up to 4 thumbnails

    return (
        <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Main image */}
                <div className="md:col-span-2">
                    <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden">
                        <Image
                            src={mainImage}
                            alt={`${hotelName} - Main view`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 66vw"
                            priority
                        />
                    </div>
                </div>

                {/* Thumbnail grid */}
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                    {thumbnailImages.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setMainImage(image)}
                            className="relative w-full h-32 md:h-44 rounded-xl overflow-hidden hover:opacity-90 transition-opacity border-2 border-transparent hover:border-accent"
                        >
                            <Image
                                src={image}
                                alt={`${hotelName} - View ${index + 2}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 150px"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

