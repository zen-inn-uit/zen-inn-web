"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/contexts/booking-context";

interface Room {
    id: string;
    name: string;
    bedInfo: string;
    capacity: string;
    cancellationPolicy: string;
    pricePerNight: number;
    totalPrice: number;
    nights: number;
}

interface BookingSummaryCardProps {
    hotelId: string;
    hotelName: string;
    hotelImage: string;
    hotelCity: string;
    hotelAddress: string;
    rooms: Room[];
    checkIn?: string;
    checkOut?: string;
    guests?: string;
    nights: number;
    selectedRoomIndex?: number;
    onRoomChange?: (index: number) => void;
}

// Guest Selector Component
function GuestSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);

    const guestText = `${adults + children} guest${adults + children > 1 ? 's' : ''}, ${rooms} room${rooms > 1 ? 's' : ''}`;

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-2.5 py-2 rounded-lg border border-gray-300 focus:border-[#0071C2] focus:outline-none transition-colors text-xs text-left flex items-center justify-between"
                style={{ fontFamily: 'var(--font-body)', color: '#262626' }}
            >
                <span>{guestText}</span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50 animate-popup">
                    <div className="space-y-3">
                        {/* Adults */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium" style={{ color: '#262626' }}>Adults</span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setAdults(Math.max(1, adults - 1))}
                                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#0071C2] transition-colors"
                                    disabled={adults <= 1}
                                >
                                    <span className="text-sm">−</span>
                                </button>
                                <span className="w-6 text-center text-xs">{adults}</span>
                                <button
                                    type="button"
                                    onClick={() => setAdults(Math.min(10, adults + 1))}
                                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#0071C2] transition-colors"
                                >
                                    <span className="text-sm">+</span>
                                </button>
                            </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium" style={{ color: '#262626' }}>Children</span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setChildren(Math.max(0, children - 1))}
                                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#0071C2] transition-colors"
                                    disabled={children <= 0}
                                >
                                    <span className="text-sm">−</span>
                                </button>
                                <span className="w-6 text-center text-xs">{children}</span>
                                <button
                                    type="button"
                                    onClick={() => setChildren(Math.min(10, children + 1))}
                                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#0071C2] transition-colors"
                                >
                                    <span className="text-sm">+</span>
                                </button>
                            </div>
                        </div>

                        {/* Rooms */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium" style={{ color: '#262626' }}>Rooms</span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#0071C2] transition-colors"
                                    disabled={rooms <= 1}
                                >
                                    <span className="text-sm">−</span>
                                </button>
                                <span className="w-6 text-center text-xs">{rooms}</span>
                                <button
                                    type="button"
                                    onClick={() => setRooms(Math.min(5, rooms + 1))}
                                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#0071C2] transition-colors"
                                >
                                    <span className="text-sm">+</span>
                                </button>
                            </div>
                        </div>

                        {/* Done button */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="w-full py-1.5 rounded-lg text-white font-medium text-xs hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: 'var(--color-primary)' }}
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function BookingSummaryCard({
    hotelId,
    hotelName,
    hotelImage,
    hotelCity,
    hotelAddress,
    rooms,
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    guests = "2 guests, 1 room",
    nights: initialNights,
    selectedRoomIndex: externalSelectedRoomIndex = 0,
    onRoomChange
}: BookingSummaryCardProps) {
    const router = useRouter();
    const { setBookingDetails } = useBooking();
    const [internalSelectedRoomIndex, setInternalSelectedRoomIndex] = useState(externalSelectedRoomIndex);
    const [checkIn, setCheckIn] = useState(initialCheckIn || "");
    const [checkOut, setCheckOut] = useState(initialCheckOut || "");
    
    // Sync external room selection changes
    useEffect(() => {
        setInternalSelectedRoomIndex(externalSelectedRoomIndex);
    }, [externalSelectedRoomIndex]);
    
    // Calculate nights based on dates
    const calculateNights = (start: string, end: string): number => {
        if (!start || !end) return initialNights;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate.getTime() - startDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : initialNights;
    };

    const nights = calculateNights(checkIn, checkOut);
    const selectedRoom = rooms[internalSelectedRoomIndex];
    const totalPrice = selectedRoom.pricePerNight * nights;

    const handleRoomChange = (index: number) => {
        setInternalSelectedRoomIndex(index);
        onRoomChange?.(index);
    };

    const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCheckIn = e.target.value;
        setCheckIn(newCheckIn);
        // Auto-adjust checkout if it's before or same as checkin
        if (checkOut && newCheckIn >= checkOut) {
            const nextDay = new Date(newCheckIn);
            nextDay.setDate(nextDay.getDate() + 1);
            setCheckOut(nextDay.toISOString().split('T')[0]);
        }
    };

    const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCheckOut = e.target.value;
        // Only update if checkout is after checkin
        if (checkIn && newCheckOut > checkIn) {
            setCheckOut(newCheckOut);
        }
    };

    const handleReserveNow = () => {
        // Validate dates
        if (!checkIn || !checkOut) {
            alert('Please select check-in and check-out dates');
            return;
        }

        const selectedRoom = rooms[internalSelectedRoomIndex];
        const nights = calculateNights(checkIn, checkOut);
        const subtotal = selectedRoom.pricePerNight * nights;
        const taxes = subtotal * 0.1; // 10% tax
        const total = subtotal + taxes;

        // Save booking details to context
        setBookingDetails({
            hotelId,
            hotelName,
            hotelImage,
            hotelCity,
            hotelAddress,
            roomId: selectedRoom.id,
            roomName: selectedRoom.name,
            checkIn,
            checkOut,
            guestCount: 2, // TODO: Get from GuestSelector
            nights,
            pricePerNight: selectedRoom.pricePerNight,
            subtotal,
            taxes,
            total,
        });

        // Navigate to checkout
        router.push('/checkout/details');
    };

    return (
        <div className="bg-white rounded-xl border border-gray-300 shadow-lg p-4 max-h-[calc(100vh-8rem)] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#CBD5E0 #F7FAFC' }}>
            {/* Custom scrollbar styles */}
            <style jsx>{`
                div::-webkit-scrollbar {
                    width: 6px;
                }
                div::-webkit-scrollbar-track {
                    background: #F7FAFC;
                    border-radius: 3px;
                }
                div::-webkit-scrollbar-thumb {
                    background: #CBD5E0;
                    border-radius: 3px;
                }
                div::-webkit-scrollbar-thumb:hover {
                    background: #A0AEC0;
                }
            `}</style>

            {/* Price section */}
            <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#262626' }}>
                        {selectedRoom.pricePerNight.toLocaleString('vi-VN')} VNĐ
                    </span>
                    <span className="text-xs text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                        / night
                    </span>
                </div>
                <div className="text-xs text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                    {totalPrice.toLocaleString('vi-VN')} VNĐ total for {nights} {nights > 1 ? 'nights' : 'night'}
                </div>
            </div>

            {/* Room selection */}
            <div className="mb-3">
                <label className="block mb-1.5 text-xs font-semibold" style={{ fontFamily: 'var(--font-body)', color: '#262626' }}>
                    Select room type
                </label>
                <select
                    value={internalSelectedRoomIndex}
                    onChange={(e) => handleRoomChange(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-lg border border-gray-300 focus:border-[#0071C2] focus:outline-none transition-colors text-sm"
                    style={{ fontFamily: 'var(--font-body)', color: '#262626' }}
                >
                    {rooms.map((room, index) => (
                        <option key={index} value={index}>
                            {room.name} - {room.pricePerNight.toLocaleString('vi-VN')} VNĐ/night
                        </option>
                    ))}
                </select>
                {/* Room details */}
                <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 space-y-1" style={{ fontFamily: 'var(--font-body)' }}>
                        <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>{selectedRoom.bedInfo}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>{selectedRoom.capacity}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-green-600">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{selectedRoom.cancellationPolicy}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Date fields */}
            <div className="mb-3">
                <label className="block mb-1.5 text-xs font-semibold" style={{ fontFamily: 'var(--font-body)', color: '#262626' }}>
                    Check-in / Check-out
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="date"
                        value={checkIn}
                        onChange={handleCheckInChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-2.5 py-2 rounded-lg border border-gray-300 focus:border-[#0071C2] focus:outline-none transition-colors text-xs"
                        style={{ fontFamily: 'var(--font-body)', color: '#262626' }}
                    />
                    <input
                        type="date"
                        value={checkOut}
                        onChange={handleCheckOutChange}
                        min={checkIn || new Date().toISOString().split('T')[0]}
                        className="w-full px-2.5 py-2 rounded-lg border border-gray-300 focus:border-[#0071C2] focus:outline-none transition-colors text-xs"
                        style={{ fontFamily: 'var(--font-body)', color: '#262626' }}
                    />
                </div>
            </div>

            {/* Guests */}
            <div className="mb-4">
                <label className="block mb-1.5 text-xs font-semibold" style={{ fontFamily: 'var(--font-body)', color: '#262626' }}>
                    Guests
                </label>
                <GuestSelector />
            </div>

            {/* Reserve button */}
            <button
                type="button"
                onClick={handleReserveNow}
                className="block w-full py-2.5 rounded-lg text-white font-bold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-center shadow-md hover:shadow-lg text-sm"
                style={{ 
                    fontFamily: 'var(--font-display)', 
                    backgroundColor: 'var(--color-primary)', 
                    boxShadow: '0 2px 4px rgba(107, 91, 61, 0.2)'
                }}
            >
                Reserve Now
            </button>

            <p className="text-xs text-center text-gray-500 mt-2" style={{ fontFamily: 'var(--font-body)' }}>
                You won't be charged yet
            </p>

            {/* Price breakdown */}
            <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold mb-2 text-xs" style={{ fontFamily: 'var(--font-display)', color: '#262626' }}>
                    Price breakdown
                </h4>
                <div className="space-y-1.5 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                    <div className="flex justify-between text-gray-600">
                        <span>{selectedRoom.pricePerNight.toLocaleString('vi-VN')} VNĐ × {nights} {nights > 1 ? 'nights' : 'night'}</span>
                        <span>{totalPrice.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-1.5 border-t border-gray-200" style={{ color: '#262626' }}>
                        <span>Total</span>
                        <span>{totalPrice.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
