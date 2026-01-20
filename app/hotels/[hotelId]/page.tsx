"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import ChatButton from "@/components/ui/chat-button";
import MiniMap from "@/components/search/MiniMap";
import Breadcrumbs from "@/components/hotel/Breadcrumbs";
import WishlistButton from "@/components/hotel/WishlistButton";
import BookingSummaryCard from "@/components/hotel/BookingSummaryCard";
import RoomList from "@/components/hotel/RoomList";
import HotelPolicies from "@/components/hotel/HotelPolicies";
import HotelReviews from "@/components/hotel/HotelReviews";
import { ImageViewer } from "@/components/ui/image-viewer";
import { useState } from "react";

const getMockHotel = (hotelId: string) => {
    const images = ["/auth-bg.png", "/auth-bg.png", "/auth-bg.png", "/auth-bg.png", "/auth-bg.png"];
    
    return {
        id: hotelId,
        name: "Zen Inn Luxury Resort",
        location: "Bali, Indonesia",
        address: "Jl. Raya Ubud No. 88",
        city: "Ubud, Bali",
        country: "Indonesia",
        images,
        rating: 4.8,
        reviewCount: 234,
        pricePerNight: 125,
        totalPrice: 375,
        nights: 3,
        description: "Experience the perfect blend of luxury and tranquility at Zen Inn Luxury Resort. Nestled in the heart of Bali, our resort offers breathtaking views, world-class amenities, and exceptional service. Each room is thoughtfully designed to provide comfort and serenity, making your stay unforgettable.",
        facilities: [
            "Breakfast included",
            "Free WiFi",
            "Swimming pool",
            "Spa & Wellness",
            "Fitness center",
            "Parking",
            "Airport shuttle",
            "24/7 Reception"
        ],
        highlights: [
            "Beach front",
            "Free parking",
            "Family rooms",
            "Non-smoking rooms"
        ],
        rooms: [
            {
                name: "Deluxe Room",
                bedInfo: "1 King bed",
                capacity: "2 guests",
                cancellationPolicy: "Free cancellation",
                pricePerNight: 125,
                totalPrice: 375,
                nights: 3
            },
            {
                name: "Superior Suite",
                bedInfo: "1 King bed, Sofa bed",
                capacity: "4 guests",
                cancellationPolicy: "Free cancellation",
                pricePerNight: 185,
                totalPrice: 555,
                nights: 3
            },
            {
                name: "Ocean View Villa",
                bedInfo: "1 King bed, 1 Queen bed",
                capacity: "4 guests",
                cancellationPolicy: "Non-refundable",
                pricePerNight: 280,
                totalPrice: 840,
                nights: 3
            },
            {
                name: "Presidential Suite",
                bedInfo: "2 King beds",
                capacity: "6 guests",
                cancellationPolicy: "Free cancellation",
                pricePerNight: 450,
                totalPrice: 1350,
                nights: 3
            },
            {
                name: "Garden Bungalow",
                bedInfo: "1 Queen bed",
                capacity: "2 guests",
                cancellationPolicy: "Free cancellation",
                pricePerNight: 95,
                totalPrice: 285,
                nights: 3
            }
        ],
        reviews: [
            {
                name: "Sarah Johnson",
                country: "United States",
                rating: 5.0,
                text: "Absolutely stunning resort! The staff was incredibly welcoming and the facilities were top-notch. The breakfast was delicious and the pool area was perfect for relaxation. Highly recommend!",
                date: "2 weeks ago"
            },
            {
                name: "Michael Chen",
                country: "Singapore",
                rating: 4.5,
                text: "Great location and beautiful views. The room was spacious and clean. Only minor issue was the WiFi speed in some areas, but overall a wonderful stay.",
                date: "1 month ago"
            },
            {
                name: "Emma Thompson",
                country: "Australia",
                rating: 5.0,
                text: "Perfect getaway destination! The spa services were amazing and the food was exceptional. The staff went above and beyond to make our anniversary special. Will definitely return!",
                date: "3 weeks ago"
            }
        ],
        checkIn: "2024-12-15",
        checkOut: "2024-12-18",
        guests: "2 guests, 1 room"
    };
};

export default function HotelDetailPage() {
    const params = useParams();
    const hotelId = params.hotelId as string;
    const hotel = getMockHotel(hotelId);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);

    const handleSelectRoom = (roomIndex: number) => {
        setSelectedRoomIndex(roomIndex);
    };

    const handleImageClick = (index: number) => {
        setCurrentImageIndex(index);
        setShowAllPhotos(true);
    };

    return (
        <div className="min-h-screen bg-white">
            <header>
                <Navbar showSearch={false} />
            </header>

            <main>
                {/* Breadcrumbs */}
                <div className="max-w-[1140px] mx-auto px-4 md:px-6 pt-4">
                    <Breadcrumbs hotelName={hotel.name} location={hotel.location} />
                </div>

                {/* Photo Gallery - Booking.com style */}
                <div className="max-w-[1140px] mx-auto px-4 md:px-6 mt-4">
                    <div className="grid grid-cols-4 gap-2 h-[420px] rounded-lg overflow-hidden">
                        {/* Main large photo - left side */}
                        <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => handleImageClick(0)}>
                            <img 
                                src={hotel.images[0]} 
                                alt={hotel.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                        </div>
                        
                        {/* Right side - 4 smaller photos in 2x2 grid */}
                        {hotel.images.slice(1, 5).map((img, idx) => (
                            <div key={idx} className="relative group cursor-pointer" onClick={() => handleImageClick(idx + 1)}>
                                <img 
                                    src={img} 
                                    alt={`${hotel.name} - ${idx + 2}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                                {idx === 3 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <button 
                                            className="bg-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowAllPhotos(true);
                                            }}
                                        >
                                            Show all photos
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main content area */}
                <div className="max-w-[1140px] mx-auto px-4 md:px-6 mt-8">
                    <div className="flex gap-8">
                        {/* Left column - Main content */}
                        <div className="flex-1 min-w-0">
                            {/* Title and rating */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-[#003B95] text-white px-2 py-1 rounded text-xs font-bold">
                                            Hotel
                                        </span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-[#FEBB02]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#262626' }}>
                                        {hotel.name}
                                    </h1>
                                    <p className="text-sm mb-2" style={{ color: '#006CE4' }}>
                                        📍 {hotel.address}, {hotel.city} - <span className="underline cursor-pointer">Show on map</span>
                                    </p>
                                </div>
                                <WishlistButton />
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: '#262626' }}>
                                    About this property
                                </h2>
                                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '14px' }}>
                                    {hotel.description}
                                </p>
                            </div>

                            {/* Facilities */}
                            <div className="mb-8 pb-8 border-b border-gray-200">
                                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: '#262626' }}>
                                    Most popular facilities
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {hotel.facilities.map((facility, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm">
                                            <svg className="w-5 h-5 text-[#008009]" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Rooms section */}
                            <div className="mb-8">
                                <RoomList rooms={hotel.rooms} onSelectRoom={handleSelectRoom} />
                            </div>

                            {/* Reviews */}
                            <div className="mb-8">
                                <HotelReviews
                                    overallRating={hotel.rating}
                                    reviewCount={hotel.reviewCount}
                                    reviews={hotel.reviews}
                                />
                            </div>

                            {/* Policies */}
                            <div className="mb-8">
                                <HotelPolicies />
                            </div>

                            {/* Location */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: '#262626' }}>
                                    Location
                                </h2>
                                <MiniMap 
                                    hotelName={hotel.name}
                                    address={hotel.address}
                                    city={hotel.city}
                                    country={hotel.country}
                                />
                            </div>
                        </div>

                        {/* Right column - Sticky booking card */}
                        <div className="hidden lg:block w-[380px] flex-shrink-0">
                            <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
                                <BookingSummaryCard
                                    rooms={hotel.rooms}
                                    nights={hotel.nights}
                                    checkIn={hotel.checkIn}
                                    checkOut={hotel.checkOut}
                                    guests={hotel.guests}
                                    selectedRoomIndex={selectedRoomIndex}
                                    onRoomChange={setSelectedRoomIndex}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer id="footer" className="py-12 px-6 mt-20 bg-[#F5F5F5]">
                <div className="max-w-[1140px] mx-auto">
                    <div className="border-t-2 border-[var(--color-primary)] pt-4 text-center">
                        <p className="text-secondary" style={{ fontFamily: 'var(--font-body)' }}>
                            &copy; {new Date().getFullYear()} Zen Inn. Powered by <span className="text-accent">Group 15</span>.<br />All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Floating chat button */}
            <ChatButton />

            {/* Image Viewer Modal */}
            <ImageViewer
                isOpen={showAllPhotos}
                onClose={() => setShowAllPhotos(false)}
                images={hotel.images}
                currentIndex={currentImageIndex}
                onIndexChange={setCurrentImageIndex}
                title={hotel.name}
                description={hotel.location}
            />
        </div>
    );
}
