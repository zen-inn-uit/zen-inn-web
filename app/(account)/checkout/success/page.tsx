"use client";

import Navbar from "@/components/ui/navbar";
import ChatButton from "@/components/ui/chat-button";
import SearchBar from "@/components/search/SearchBar";
import BookingConfirmedHeader from "@/components/checkout/BookingConfirmedHeader";
import ConfirmedGallery from "@/components/checkout/ConfirmedGallery";
import ReviewSummaryCard from "@/components/checkout/ReviewSummaryCard";
import MiniMap from "@/components/search/MiniMap";

// Mock booking data
const mockBooking = {
    hotelName: "Dolphin Hotel Nha Trang",
    location: "Nha Trang, Vietnam",
    images: ["/auth-bg.png", "/auth-bg.png", "/auth-bg.png", "/auth-bg.png", "/auth-bg.png", "/auth-bg.png", "/auth-bg.png"],
    checkIn: "2024-12-15",
    checkOut: "2024-12-18",
    confirmationNumber: "ZN202412151234",
    totalPrice: 420.00,
    rating: 9.3,
    reviewCount: 1247,
    ratingLabel: "Wonderful",
    reviewQuote: "Amazing stay! The location is perfect and the staff is very friendly.",
    reviewerName: "Sarah Johnson",
    reviewerCountry: "United States",
    facilities: ["Free WiFi", "Pool", "Breakfast included", "Parking"]
};

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
            <header>
                <Navbar />
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                {/* Search bar */}
                <div className="mb-6">
                    <SearchBar />
                </div>

                {/* Confirmation header */}
                <BookingConfirmedHeader
                    hotelName={mockBooking.hotelName}
                    location={mockBooking.location}
                    checkIn={mockBooking.checkIn}
                    checkOut={mockBooking.checkOut}
                    confirmationNumber={mockBooking.confirmationNumber}
                    totalPrice={mockBooking.totalPrice}
                />

                {/* Main content - 2 column layout */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left column - Gallery */}
                    <div className="flex-1 min-w-0">
                        <ConfirmedGallery images={mockBooking.images} hotelName={mockBooking.hotelName} />
                    </div>

                    {/* Right column - Cards */}
                    <div className="w-full md:w-[320px] flex-shrink-0 space-y-6">
                        {/* Review/Score card */}
                        <ReviewSummaryCard
                            rating={mockBooking.rating}
                            reviewCount={mockBooking.reviewCount}
                            ratingLabel={mockBooking.ratingLabel}
                            quote={mockBooking.reviewQuote}
                            reviewerName={mockBooking.reviewerName}
                            reviewerCountry={mockBooking.reviewerCountry}
                        />

                        {/* Facilities highlight card */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <div className="flex items-center justify-between">
                                <span className="text-base font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                    {mockBooking.facilities[0]}
                                </span>
                                <span className="px-2 py-1 bg-secondary/50 rounded-md text-xs font-medium" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-form)' }}>
                                    +{mockBooking.facilities.length - 1}
                                </span>
                            </div>
                        </div>

                        {/* Mini map card */}
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

