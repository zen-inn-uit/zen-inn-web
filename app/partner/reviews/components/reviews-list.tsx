'use client';

import { useState, useEffect } from 'react';
import { reviewsApi } from '../api/review.api';
import { ReviewItemDTO, QueryReviewsDTO } from '../dto/review.dto';
import { ReviewCard } from './review-card';
import { HotelDTO } from '../../hotels/dto/hotel.dto';

interface ReviewsListProps {
  hotels: HotelDTO[];
}

export function ReviewsList({ hotels }: ReviewsListProps) {
  const [reviews, setReviews] = useState<ReviewItemDTO[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedRating, setSelectedRating] = useState<number | undefined>();
  const [selectedHotel, setSelectedHotel] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const [ratingCounts, setRatingCounts] = useState<Record<number, number>>({
    5: 0, 4: 0, 3: 0, 2: 0, 1: 0
  });

  useEffect(() => {
    loadReviews();
  }, [selectedRating, selectedHotel, searchQuery, page]);

  useEffect(() => {
    loadRatingCounts();
  }, []);

  const loadRatingCounts = async () => {
    try {
      const stats = await reviewsApi.getStats();
      // This is a simplified version - ideally backend should return counts per rating
      // For now we'll just show total
    } catch (error) {
      console.error('Failed to load rating counts:', error);
    }
  };

  const loadReviews = async () => {
    setLoading(true);
    try {
      const query: QueryReviewsDTO = {
        page,
        limit,
      };

      if (selectedRating) query.rating = selectedRating;
      if (selectedHotel) query.hotelId = selectedHotel;
      if (searchQuery) query.search = searchQuery;

      const response = await reviewsApi.getReviews(query);
      setReviews(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReplySuccess = () => {
    loadReviews(); // Reload to show updated reply
  };

  const renderStarFilter = (rating: number) => {
    const isActive = selectedRating === rating;
    return (
      <button
        key={rating}
        onClick={() => setSelectedRating(isActive ? undefined : rating)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
          isActive
            ? 'bg-[#8B7355] text-white border-[#8B7355]'
            : 'bg-white text-gray-700 border-gray-300 hover:border-[#8B7355]'
        }`}
      >
        <span className="font-medium">{rating}</span>
        <svg className={`w-5 h-5 ${isActive ? 'text-yellow-300' : 'text-yellow-400'}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
        {ratingCounts[rating] > 0 && (
          <span className={`text-sm ${isActive ? 'text-white' : 'text-gray-500'}`}>
            ({ratingCounts[rating]})
          </span>
        )}
      </button>
    );
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>
        
        {/* Star Rating Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Rating
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRating(undefined)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                !selectedRating
                  ? 'bg-[#8B7355] text-white border-[#8B7355]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#8B7355]'
              }`}
            >
              All Ratings
            </button>
            {[5, 4, 3, 2, 1].map(rating => renderStarFilter(rating))}
          </div>
        </div>

        {/* Hotel Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Hotel
          </label>
          <select
            value={selectedHotel || ''}
            onChange={(e) => setSelectedHotel(e.target.value || undefined)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
          >
            <option value="">All Hotels</option>
            {hotels.map(hotel => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search in Comments
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1); // Reset to first page on search
            }}
            placeholder="Search by comment text..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
          />
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-medium">{reviews.length}</span> of{' '}
          <span className="font-medium">{total}</span> reviews
        </p>
        {(selectedRating || selectedHotel || searchQuery) && (
          <button
            onClick={() => {
              setSelectedRating(undefined);
              setSelectedHotel(undefined);
              setSearchQuery('');
              setPage(1);
            }}
            className="text-sm text-[#8B7355] hover:text-[#6B5B3D] font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355]"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
          <p className="text-gray-500">
            {selectedRating || selectedHotel || searchQuery
              ? 'Try adjusting your filters'
              : 'Reviews will appear here once customers leave feedback'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} onReplySuccess={handleReplySuccess} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 rounded-lg transition-colors ${
                    page === pageNum
                      ? 'bg-[#8B7355] text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
