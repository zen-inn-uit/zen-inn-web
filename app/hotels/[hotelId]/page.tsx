<<<<<<< HEAD
export function HotelDetailPage({ params }: { params: { hotelId: string } }) {
    return (
        <div className="py-20 px-6">
            <h1 className="font-display text-secondary text-4xl text-center">Hotel Detail Page</h1>
            <p className="text-accent text-center mt-4">Hotel ID: {params.hotelId}</p>
            <p className="text-accent text-center mt-2">View and manage hotel details here.</p>
        </div>
    );
}
=======
"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import ChatButton from "@/components/ui/chat-button";
import SearchBar from "@/components/search/SearchBar";
import MiniMap from "@/components/search/MiniMap";
import Breadcrumbs from "@/components/hotel/Breadcrumbs";
import WishlistButton from "@/components/hotel/WishlistButton";
import HotelGallery from "@/components/hotel/HotelGallery";
import BookingSummaryCard from "@/components/hotel/BookingSummaryCard";
import RoomList from "@/components/hotel/RoomList";
import HotelPolicies from "@/components/hotel/HotelPolicies";
import HotelReviews from "@/components/hotel/HotelReviews";

const getMockHotel = (hotelId: string) => {
    const images = ["/auth-bg.png", "/auth-bg.png", "/auth-bg.png"];
    
    return {
        id: hotelId,
        name: "Zen Inn Luxury Resort",
        location: "Bali, Indonesia",
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

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
            <header>
                <Navbar />
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                {/* Search bar */}
                <SearchBar />

                {/* Breadcrumbs */}
                <Breadcrumbs hotelName={hotel.name} location={hotel.location} />

                {/* Title and rating */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex-1 flex items-start gap-4">
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                {hotel.name}
                            </h1>
                            <p className="text-lg text-gray-600" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}>
                                {hotel.location}
                            </p>
                        </div>
                        {/* Wishlist button */}
                        <div className="mt-2">
                            <WishlistButton />
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                        <div className="bg-accent/20 rounded-lg px-4 py-3 text-center">
                            <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                {hotel.rating.toFixed(1)}
                            </div>
                            <div className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                                {hotel.reviewCount} reviews
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <HotelGallery images={hotel.images} hotelName={hotel.name} />

                {/* Main content grid */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left column - Content */}
                    <div className="flex-1 min-w-0">
                        {/* Description */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                About this property
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}>
                                {hotel.description}
                            </p>

                            {/* Facilities */}
                            <div>
                                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                    Facilities
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {hotel.facilities.map((facility, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center px-3 py-2 bg-secondary/30 rounded-lg"
                                            style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)', color: '#60463d' }}
                                        >
                                            <span>{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Rooms section */}
                        <RoomList rooms={hotel.rooms} />

                        {/* Policies */}
                        <HotelPolicies />

                        {/* Reviews */}
                        <HotelReviews
                            overallRating={hotel.rating}
                            reviewCount={hotel.reviewCount}
                            reviews={hotel.reviews}
                        />
                    </div>

                    {/* Right column - Booking card and map */}
                    <div className="w-full md:w-[420px] flex-shrink-0 space-y-6">
                        <BookingSummaryCard
                            pricePerNight={hotel.pricePerNight}
                            totalPrice={hotel.totalPrice}
                            nights={hotel.nights}
                            checkIn={hotel.checkIn}
                            checkOut={hotel.checkOut}
                            guests={hotel.guests}
                        />
                        <MiniMap />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer id="footer" className="py-12 px-6 mt-20 bg-brand/10">
                <div className="max-w-7xl mx-auto">
                    <div className="border-t-2 border-[var(--color-primary)] pt-4 text-center">
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

>>>>>>> main
