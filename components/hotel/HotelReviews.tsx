"use client";

interface Review {
    name: string;
    country: string;
    rating: number;
    text: string;
    date: string;
}

interface HotelReviewsProps {
    overallRating: number;
    reviewCount: number;
    reviews: Review[];
}

export default function HotelReviews({ overallRating, reviewCount, reviews }: HotelReviewsProps) {
    const ratingBreakdown = [
        { stars: 5, count: Math.floor(reviewCount * 0.6) },
        { stars: 4, count: Math.floor(reviewCount * 0.25) },
        { stars: 3, count: Math.floor(reviewCount * 0.1) },
        { stars: 2, count: Math.floor(reviewCount * 0.03) },
        { stars: 1, count: Math.floor(reviewCount * 0.02) },
    ];

    return (
        <div className="mb-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                    Guest Reviews
                </h2>

                {/* Overall rating */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="text-center">
                        <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                            {overallRating.toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                            {reviewCount} reviews
                        </div>
                    </div>

                    {/* Rating breakdown */}
                    <div className="flex-1 space-y-2">
                        {[...ratingBreakdown].reverse().map((item) => {
                            const percentage = (item.count / reviewCount) * 100;
                            return (
                                <div key={item.stars} className="flex items-center gap-3">
                                    <span className="text-sm w-12" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                        {item.stars} stars
                                    </span>
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-accent rounded-full"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600 w-12 text-right" style={{ fontFamily: 'var(--font-body)' }}>
                                        {item.count}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Review cards */}
            <div className="space-y-4">
                {reviews.map((review, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                    {review.name}
                                </div>
                                <div className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                                    {review.country} • {review.date}
                                </div>
                            </div>
                            <div className="bg-accent/20 rounded-lg px-3 py-1">
                                <div className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                    {review.rating.toFixed(1)}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}>
                            {review.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

