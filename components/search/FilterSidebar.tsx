"use client";

import { useState } from "react";

interface FilterSidebarProps {
    className?: string;
}

export default function FilterSidebar({ className = "" }: FilterSidebarProps) {
    const [priceRange, setPriceRange] = useState(150);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [minRating, setMinRating] = useState(0);
    const [minScore, setMinScore] = useState(0);

    const propertyTypes = ["Hotel", "Resort", "Villa", "Apartment", "Hostel"];
    const facilities = ["Breakfast included", "WiFi", "Pool", "Parking", "Gym", "Spa"];

    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const toggleFacility = (facility: string) => {
        setSelectedFacilities(prev =>
            prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
        );
    };

    return (
        <aside className={`bg-gray-50 rounded-xl p-6 h-fit sticky top-4 ${className}`} style={{ fontFamily: 'var(--font-body)' }}>
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                Filters
            </h2>

            {/* Sort by dropdown */}
            <div className="mb-6">
                <label htmlFor="sort" className="block mb-2 text-sm font-medium" style={{ color: '#60463d' }}>
                    Sort by
                </label>
                <select
                    id="sort"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
                    style={{ fontSize: 'var(--fs-body)' }}
                >
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating: High to Low</option>
                    <option>Distance</option>
                </select>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            {/* Price slider */}
            <div className="mb-6">
                <label className="block mb-4 text-sm font-medium" style={{ color: '#60463d' }}>
                    Price per night: ${priceRange}
                </label>
                <input
                    type="range"
                    min="50"
                    max="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                    style={{ 
                        accentColor: 'var(--color-accent)'
                    }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>$50</span>
                    <span>$500</span>
                </div>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            {/* Property type checkboxes */}
            <div className="mb-6">
                <h3 className="text-base font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                    Property type
                </h3>
                <div className="space-y-3">
                    {propertyTypes.map(type => (
                        <label key={type} className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedTypes.includes(type)}
                                onChange={() => toggleType(type)}
                                className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer"
                                style={{ accentColor: 'var(--color-accent)' }}
                            />
                            <span className="ml-2 text-sm" style={{ fontSize: 'var(--fs-body)', color: '#60463d' }}>
                                {type}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            {/* Facilities checkboxes */}
            <div className="mb-6">
                <h3 className="text-base font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                    Facilities
                </h3>
                <div className="space-y-3">
                    {facilities.map(facility => (
                        <label key={facility} className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedFacilities.includes(facility)}
                                onChange={() => toggleFacility(facility)}
                                className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer"
                                style={{ accentColor: 'var(--color-accent)' }}
                            />
                            <span className="ml-2 text-sm" style={{ fontSize: 'var(--fs-body)', color: '#60463d' }}>
                                {facility}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            {/* Star rating */}
            <div className="mb-6">
                <h3 className="text-base font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                    Star rating
                </h3>
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                        <label key={rating} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="rating"
                                checked={minRating === rating}
                                onChange={() => setMinRating(rating)}
                                className="w-4 h-4 border-gray-300 text-accent focus:ring-accent cursor-pointer"
                                style={{ accentColor: 'var(--color-accent)' }}
                            />
                            <span className="ml-2 text-sm" style={{ fontSize: 'var(--fs-body)', color: '#60463d' }}>
                                {rating} stars
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            {/* Review score */}
            <div className="mb-6">
                <h3 className="text-base font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                    Minimum review score
                </h3>
                <div className="space-y-2">
                    {[9, 8, 7, 6, 5, 0].map(score => (
                        <label key={score} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="score"
                                checked={minScore === score}
                                onChange={() => setMinScore(score)}
                                className="w-4 h-4 border-gray-300 text-accent focus:ring-accent cursor-pointer"
                                style={{ accentColor: 'var(--color-accent)' }}
                            />
                            <span className="ml-2 text-sm" style={{ fontSize: 'var(--fs-body)', color: '#60463d' }}>
                                {score === 0 ? "Any" : `${score}+`}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            {/* Breakfast included */}
            <div className="mb-6">
                <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer"
                        style={{ accentColor: 'var(--color-accent)' }}
                    />
                    <span className="ml-2 text-sm font-medium" style={{ fontSize: 'var(--fs-body)', color: '#60463d' }}>
                        Breakfast included
                    </span>
                </label>
            </div>
        </aside>
    );
}

