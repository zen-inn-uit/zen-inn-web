"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import ChatButton from "@/components/ui/chat-button";
import CheckoutFormSection from "@/components/checkout/CheckoutFormSection";
import CheckoutReviewSummaryCard from "@/components/checkout/CheckoutReviewSummaryCard";
import Link from "next/link";

// Mock booking data (same as checkout/details)
const mockBooking = {
    hotelName: "Zen Inn Luxury Resort",
    hotelImage: "/auth-bg.png",
    roomName: "Deluxe Room",
    checkIn: "2024-12-15",
    checkOut: "2024-12-18",
    guests: "2 guests, 1 room",
    pricePerNight: 125,
    nights: 3,
    subtotal: 375,
    taxes: 45,
    total: 420,
    specialRequests: "Late check-in requested"
};

export default function CheckoutReviewPage() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVC, setCardCVC] = useState("");
    const [cardName, setCardName] = useState("");
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);

    const handleConfirmBooking = () => {
        if (agreedToPolicy) {
            const pid = `pid_${Date.now()}`;
            router.push(`/checkout/payment?pid=${pid}`);
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
            <header>
                <Navbar />
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                {/* Main content - 2 column layout */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left column - Form sections */}
                    <div className="flex-1 min-w-0">
                        {/* Review your booking */}
                        <CheckoutFormSection title="Review your booking">
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Hotel
                                    </div>
                                    <div className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                                        {mockBooking.hotelName}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Room type
                                    </div>
                                    <div className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                                        {mockBooking.roomName}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Dates
                                    </div>
                                    <div className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                                        {new Date(mockBooking.checkIn).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {new Date(mockBooking.checkOut).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Guests
                                    </div>
                                    <div className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                                        {mockBooking.guests}
                                    </div>
                                </div>
                                {mockBooking.specialRequests && (
                                    <div>
                                        <div className="text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                            Special requests
                                        </div>
                                        <div className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                                            {mockBooking.specialRequests}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <Link
                                    href="/checkout/details"
                                    className="text-sm font-medium text-accent hover:underline"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    Edit details
                                </Link>
                            </div>
                        </CheckoutFormSection>

                        {/* Payment method */}
                        <CheckoutFormSection title="Payment method">
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center cursor-pointer mb-3">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={paymentMethod === "card"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4 border-gray-300 text-accent focus:ring-accent cursor-pointer"
                                            style={{ accentColor: 'var(--color-accent)' }}
                                        />
                                        <span className="ml-3 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                            Credit / Debit card
                                        </span>
                                    </label>
                                    {paymentMethod === "card" && (
                                        <div className="ml-7 space-y-4 mt-4">
                                            <div>
                                                <label htmlFor="cardNumber" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                                    Card number
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cardNumber"
                                                    value={cardNumber}
                                                    onChange={(e) => setCardNumber(e.target.value)}
                                                    placeholder="1234 5678 9012 3456"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="cardExpiry" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                                        Expiry
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="cardExpiry"
                                                        value={cardExpiry}
                                                        onChange={(e) => setCardExpiry(e.target.value)}
                                                        placeholder="MM/YY"
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="cardCVC" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                                        CVC
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="cardCVC"
                                                        value={cardCVC}
                                                        onChange={(e) => setCardCVC(e.target.value)}
                                                        placeholder="123"
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="cardName" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                                    Name on card
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cardName"
                                                    value={cardName}
                                                    onChange={(e) => setCardName(e.target.value)}
                                                    placeholder="John Doe"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="property"
                                            checked={paymentMethod === "property"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4 border-gray-300 text-accent focus:ring-accent cursor-pointer"
                                            style={{ accentColor: 'var(--color-accent)' }}
                                        />
                                        <span className="ml-3 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                            Pay at property
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <p className="text-xs text-gray-600 mt-4" style={{ fontFamily: 'var(--font-body)' }}>
                                No payment will be charged until you confirm.
                            </p>
                        </CheckoutFormSection>

                        {/* Cancellation & house rules */}
                        <CheckoutFormSection title="Cancellation & house rules">
                            <div className="space-y-4 mb-6">
                                <div>
                                    <div className="text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Cancellation policy
                                    </div>
                                    <p className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                                        Free cancellation before 24 hours of check-in. Cancellation after this time will result in a charge of the first night.
                                    </p>
                                </div>
                                <div>
                                    <div className="text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Check-in / Check-out
                                    </div>
                                    <p className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                                        Check-in: From 3:00 PM • Check-out: Until 11:00 AM
                                    </p>
                                </div>
                                <div>
                                    <div className="text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        House rules
                                    </div>
                                    <ul className="text-sm text-gray-700 space-y-1" style={{ fontFamily: 'var(--font-body)' }}>
                                        <li>• No smoking allowed</li>
                                        <li>• Pets are welcome (charges may apply)</li>
                                        <li>• Quiet hours: 10 PM - 7 AM</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <label className="flex items-start cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={agreedToPolicy}
                                        onChange={(e) => setAgreedToPolicy(e.target.checked)}
                                        className="w-4 h-4 mt-1 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer flex-shrink-0"
                                        style={{ accentColor: 'var(--color-accent)' }}
                                    />
                                    <span className="ml-3 text-sm" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        I agree to the cancellation policy and house rules *
                                    </span>
                                </label>
                            </div>
                        </CheckoutFormSection>

                        {/* Final action area */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <Link
                                    href="/checkout/details"
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 underline"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    Back
                                </Link>
                                <div className="flex-1 sm:flex-none text-center sm:text-right">
                                    <button
                                        type="button"
                                        onClick={handleConfirmBooking}
                                        disabled={!agreedToPolicy}
                                        className={`w-full sm:w-auto px-8 py-3 rounded-lg font-bold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all ${
                                            agreedToPolicy ? '' : 'opacity-50 cursor-not-allowed'
                                        }`}
                                        style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--color-form)', fontSize: 'var(--fs-h5)', color: 'white' }}
                                    >
                                        Confirm booking
                                    </button>
                                    <p className="text-xs text-gray-500 mt-3" style={{ fontFamily: 'var(--font-body)' }}>
                                        You will be charged after confirmation
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Summary card */}
                    <div className="w-full md:w-[320px] flex-shrink-0">
                        <CheckoutReviewSummaryCard
                            hotelName={mockBooking.hotelName}
                            hotelImage={mockBooking.hotelImage}
                            roomName={mockBooking.roomName}
                            checkIn={mockBooking.checkIn}
                            checkOut={mockBooking.checkOut}
                            guests={mockBooking.guests}
                            pricePerNight={mockBooking.pricePerNight}
                            nights={mockBooking.nights}
                            subtotal={mockBooking.subtotal}
                            taxes={mockBooking.taxes}
                            total={mockBooking.total}
                        />
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

