"use client";

import Image from "next/image";

interface ConfirmedGalleryProps {
    images: string[];
    hotelName: string;
}

export default function ConfirmedGallery({ images, hotelName }: ConfirmedGalleryProps) {
    const mainImage = images[0] || "/auth-bg.png";
    const sideImages = images.slice(1, 3); // 2 small images
    const thumbnailImages = images.slice(3, 6); // 3 thumbnails for the row
    const remainingPhotos = images.length > 6 ? images.length - 6 : 0;

    return (
        <div className="mb-8">
            {/* Main gallery grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

                {/* Side images grid */}
                <div className="grid grid-cols-1 gap-4">
                    {sideImages.map((image, index) => (
                        <div key={index} className="relative w-full h-32 md:h-44 rounded-xl overflow-hidden">
                            <Image
                                src={image}
                                alt={`${hotelName} - View ${index + 2}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 150px"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Thumbnails row */}
            {thumbnailImages.length > 0 && (
                <div className="flex gap-4">
                    {thumbnailImages.map((image, index) => (
                        <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src={image}
                                alt={`${hotelName} - Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </div>
                    ))}
                    {remainingPhotos > 0 && (
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center">
                            <span className="text-xs font-medium text-white bg-black/50 px-2 py-1 rounded" style={{ fontFamily: 'var(--font-body)' }}>
                                +{remainingPhotos} photos
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

