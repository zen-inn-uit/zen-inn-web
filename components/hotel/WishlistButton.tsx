"use client";

import { useState } from "react";

export default function WishlistButton() {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleClick = () => {
        setIsWishlisted(!isWishlisted);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="w-14 h-14 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:border-accent hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
            <svg
                className="w-7 h-7"
                fill={isWishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: isWishlisted ? '#ef4444' : '#60463d' }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        </button>
    );
}

