"use client";

import CategoryCard from "../helpers/category-card";
import { useRef } from "react";

export default function CategoriesSection() {
    const categories = [
        { id: 1, name: "Hotels", imageUrl: "/category1.png", bgColor: "#f5f0eb" },
        { id: 2, name: "Villas", imageUrl: "/category2.png", bgColor: "#eef5eb" },
        { id: 3, name: "Apartments", imageUrl: "/category3.png", bgColor: "#f5ebeb" },
        { id: 4, name: "Cabins", imageUrl: "/category4.png", bgColor: "#f5f0eb" },
        { id: 5, name: "Resorts", imageUrl: "/category5.png", bgColor: "#ebf1f5" },
        { id: 6, name: "Homestays", imageUrl: "/category6.png", bgColor: "#f5f0eb" },
    ];

    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const containerWidth = scrollRef.current.offsetWidth;
            const scrollAmount = containerWidth;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex flex-col items-center py-4 mt-2 px-10 w-full overflow-hidden">
            <div className="flex justify-between items-center w-full max-w-7xl">
                <h1 className="font-display text-secondary text-3xl">Browse by categories</h1>
                <button 
                    className="flex justify-center items-center hover:bg-[#daa470] hover:text-white transition-colors text-xl font-medium"
                    style={{
                        width: '221px',
                        height: '58px',
                        padding: '13px 0px',
                        border: '2px solid #F5E1BF',
                        borderRadius: '20.0833px',
                        color: '#F5E1BF'
                    }}
                >
                    View more
                </button>
            </div>
            
            <div className="flex justify-center w-full mt-6">
                <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 gap-6">
                    {
                        categories.map((category) => (
                            <div key={category.id} className="snap-start flex-shrink-0">
                                <CategoryCard 
                                    name={category.name} 
                                    imageUrl={category.imageUrl}
                                    bgColor={category.bgColor}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
