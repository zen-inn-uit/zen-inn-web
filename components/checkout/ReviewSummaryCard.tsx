"use client";

interface ReviewSummaryCardProps {
    rating: number;
    reviewCount: number;
    ratingLabel: string;
    quote: string;
    reviewerName: string;
    reviewerCountry: string;
}

export default function ReviewSummaryCard({
    rating,
    reviewCount,
    ratingLabel,
    quote,
    reviewerName,
    reviewerCountry
}: ReviewSummaryCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}>
                    {ratingLabel}
                </span>
                <div className="text-right">
                    <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                        {rating.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                        {reviewCount} reviews
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
                <p className="text-sm italic mb-3" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                    "{quote}"
                </p>
                <div className="text-xs text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                    {reviewerName}, {reviewerCountry}
                </div>
            </div>
        </div>
    );
}
