'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    icon: string;
}

export default function CategoryFilters() {
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [showTotalBeforeTaxes, setShowTotalBeforeTaxes] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const categories: Category[] = [
        { id: 'icons', name: 'Icons', icon: '🏛️' },
        { id: 'pools', name: 'Amazing pools', icon: '🏊' },
        { id: 'farms', name: 'Farms', icon: '🚜' },
        { id: 'views', name: 'Amazing views', icon: '🏔️' },
        { id: 'lakefront', name: 'Lakefront', icon: '🏞️' },
        { id: 'caves', name: 'Caves', icon: '🕳️' },
        { id: 'rooms', name: 'Rooms', icon: '🛏️' },
        { id: 'cabins', name: 'Cabins', icon: '🏕️' },
        { id: 'countryside', name: 'Countryside', icon: '🌾' },
        { id: 'treehouses', name: 'Treehouses', icon: '🌳' },
        { id: 'beach', name: 'Beach', icon: '🏖️' },
        { id: 'design', name: 'Design', icon: '✨' },
    ];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
            <div className="max-w-[1760px] mx-auto px-6 lg:px-10">
                <div className="flex items-center justify-between py-4">
                    {/* Categories scroll container */}
                    <div className="flex-1 relative">
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-4 h-4 text-gray-700" />
                        </button>

                        <div
                            ref={scrollRef}
                            className="flex gap-8 overflow-x-auto scrollbar-hide px-12 scroll-smooth"
                        >
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={cn(
                                        "flex flex-col items-center gap-2 py-3 px-2 border-b-2 transition-all whitespace-nowrap flex-shrink-0",
                                        activeCategory === category.id
                                            ? "border-primary text-gray-900"
                                            : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
                                    )}
                                >
                                    <span className="text-2xl">{category.icon}</span>
                                    <span className="text-xs font-medium">{category.name}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-700" />
                        </button>
                    </div>

                    {/* Filters and toggle */}
                    <div className="flex items-center gap-3 ml-6">
                        <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:border-gray-900 transition-colors">
                            <SlidersHorizontal className="w-4 h-4" />
                            <span className="text-xs font-semibold">Filters</span>
                        </button>

                        <button
                            onClick={() => setShowTotalBeforeTaxes(!showTotalBeforeTaxes)}
                            className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:border-gray-900 transition-colors"
                        >
                            <span className="text-xs font-semibold whitespace-nowrap">
                                Display total before taxes
                            </span>
                            <div
                                className={cn(
                                    "w-10 h-6 rounded-full transition-colors relative",
                                    showTotalBeforeTaxes ? "bg-primary" : "bg-gray-300"
                                )}
                            >
                                <div
                                    className={cn(
                                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                                        showTotalBeforeTaxes ? "translate-x-5" : "translate-x-1"
                                    )}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}
