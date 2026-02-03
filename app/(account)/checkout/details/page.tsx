"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatButton from "@/components/ui/chat-button";
import CheckoutFormSection from "@/components/checkout/CheckoutFormSection";
import CheckoutSummaryCard from "@/components/checkout/CheckoutSummaryCard";
import { useBooking } from "@/contexts/booking-context";
import Link from "next/link";

export default function CheckoutDetailsPage() {
    const router = useRouter();
    const { bookingDetails, updateBookingDetails } = useBooking();
    
    // Redirect if no booking details
    useEffect(() => {
        if (!bookingDetails) {
            router.replace('/');
        }
    }, [bookingDetails, router]);

    // Show loading while redirecting
    if (!bookingDetails) {
        return null;
    }

    const [formData, setFormData] = useState({
        firstName: bookingDetails.guestName?.split(' ')[0] || "",
        lastName: bookingDetails.guestName?.split(' ').slice(1).join(' ') || "",
        email: bookingDetails.guestEmail || "",
        phone: bookingDetails.guestPhone || "",
        country: "",
        address: "",
        city: "",
        postalCode: ""
    });

    const [arrivalTime, setArrivalTime] = useState("15:00");
    const [specialRequests, setSpecialRequests] = useState(bookingDetails.specialRequests || "");
    const [addOns, setAddOns] = useState<string[]>([]);
    const [travelingForWork, setTravelingForWork] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const toggleAddOn = (addOn: string) => {
        setAddOns(prev =>
            prev.includes(addOn) ? prev.filter(a => a !== addOn) : [...prev, addOn]
        );
    };

    const handleContinue = () => {
        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.country) {
            alert('Please fill in all required fields');
            return;
        }

        // Save guest details to booking context
        updateBookingDetails({
            guestName: `${formData.firstName} ${formData.lastName}`.trim(),
            guestEmail: formData.email,
            guestPhone: formData.phone,
            specialRequests: specialRequests || undefined,
        });

        // Navigate to review page
        router.push('/checkout/review');
    };

    const addOnsList = [
        "Airport transfer",
        "Early check-in",
        "Late check-out",
        "Breakfast package",
        "Spa package"
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                {/* Hotel summary header */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                {bookingDetails.hotelName}
                            </h1>
                            <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                                {bookingDetails.roomName} • {new Date(bookingDetails.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(bookingDetails.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main content - 2 column layout */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left column - Form sections */}
                    <div className="flex-1 min-w-0">
                        {/* Enter your details */}
                        <CheckoutFormSection title="Enter your details">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        First name *
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Last name *
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="country" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Country/Region *
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
                                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                                    >
                                        <option value="">Select a country</option>
                                        <option value="US">United States</option>
                                        <option value="VN">Vietnam</option>
                                        <option value="SG">Singapore</option>
                                        <option value="ID">Indonesia</option>
                                        <option value="TH">Thailand</option>
                                        <option value="JP">Japan</option>
                                        <option value="AU">Australia</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Address (optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        City (optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="postalCode" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        Postal code (optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                                    />
                                </div>
                            </div>
                        </CheckoutFormSection>

                        {/* Your arrival time */}
                        <CheckoutFormSection title="Your arrival time">
                            <div>
                                <label htmlFor="arrivalTime" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                    Estimated arrival time
                                </label>
                                <input
                                    type="time"
                                    id="arrivalTime"
                                    value={arrivalTime}
                                    onChange={(e) => setArrivalTime(e.target.value)}
                                    className="w-full md:w-auto px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                                />
                                <p className="text-sm text-gray-600 mt-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}>
                                    Check-in is available from 3:00 PM. Let us know if you'll be arriving earlier or later.
                                </p>
                            </div>
                        </CheckoutFormSection>

                        {/* Special requests */}
                        <CheckoutFormSection title="Special requests">
                            <textarea
                                id="specialRequests"
                                value={specialRequests}
                                onChange={(e) => setSpecialRequests(e.target.value)}
                                rows={4}
                                placeholder="Any special requests or requirements..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                            />
                        </CheckoutFormSection>

                        {/* Add to your stay */}
                        <CheckoutFormSection title="Add to your stay">
                            <div className="space-y-3">
                                {addOnsList.map((addOn) => (
                                    <label key={addOn} className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={addOns.includes(addOn)}
                                            onChange={() => toggleAddOn(addOn)}
                                            className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer"
                                            style={{ accentColor: 'var(--color-accent)' }}
                                        />
                                        <span className="ml-3 text-sm" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                            {addOn}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </CheckoutFormSection>

                        {/* Traveling for work */}
                        <CheckoutFormSection title="Traveling for work?">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={travelingForWork}
                                    onChange={(e) => setTravelingForWork(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer"
                                    style={{ accentColor: 'var(--color-accent)' }}
                                />
                                <span className="ml-3 text-sm" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                    I'm traveling for work
                                </span>
                            </label>
                        </CheckoutFormSection>

                        {/* General requests / policies */}
                        <CheckoutFormSection title="General requests / policies">
                            <div className="space-y-3 text-sm" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)', color: '#60463d' }}>
                                <p>
                                    By proceeding, you agree to our Terms of Service and Privacy Policy. 
                                    Your reservation is subject to the hotel's cancellation policy.
                                </p>
                                <p>
                                    We'll send you a confirmation email with all the details of your booking.
                                </p>
                            </div>
                        </CheckoutFormSection>

                        {/* Continue button */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <Link
                                    href="/"
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 underline"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    Back to home
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleContinue}
                                    className="w-full sm:w-auto px-8 py-3 rounded-lg font-bold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all"
                                    style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--color-primary)', fontSize: 'var(--fs-h5)', color: '#ffffff' }}
                                >
                                    Continue to review
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Summary card */}
                    <div className="w-full md:w-[320px] flex-shrink-0">
                        <CheckoutSummaryCard
                            hotelName={bookingDetails.hotelName}
                            hotelImage={bookingDetails.hotelImage}
                            roomName={bookingDetails.roomName}
                            checkIn={bookingDetails.checkIn}
                            checkOut={bookingDetails.checkOut}
                            guests={`${bookingDetails.guestCount} guests`}
                            pricePerNight={bookingDetails.pricePerNight}
                            nights={bookingDetails.nights}
                            subtotal={bookingDetails.subtotal}
                            taxes={bookingDetails.taxes}
                            total={bookingDetails.total}
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

