"use client";

import { useState } from "react";

export default function SearchBar() {
    const [location, setLocation] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("2");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // UI only - no API call needed
        console.log({ location, checkIn, checkOut, guests });
    };

    return (
        <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-md p-4 mb-4">
            <div className="flex flex-col md:flex-row gap-4 items-end">
                {/* Location field */}
                <div className="flex-1 w-full">
                    <label htmlFor="location" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Where are you going?"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                    />
                </div>

                {/* Date range */}
                <div className="flex-1 w-full">
                    <label htmlFor="checkIn" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                        Check-in / Check-out
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="date"
                            id="checkIn"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                        />
                        <input
                            type="date"
                            id="checkOut"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                        />
                    </div>
                </div>

                {/* Guests/Rooms */}
                <div className="flex-1 w-full md:w-auto">
                    <label htmlFor="guests" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                        Guests / Rooms
                    </label>
                    <input
                        type="text"
                        id="guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        placeholder="2 guests, 1 room"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
                    />
                </div>

                {/* Search button */}
                <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 rounded-lg text-white font-bold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all"
                    style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--color-form)', fontSize: 'var(--fs-h5)' }}
                >
                    Search
                </button>
            </div>
        </form>
    );
}

