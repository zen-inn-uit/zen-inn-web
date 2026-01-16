'use client';

import { ReviewItemDTO } from '../dto/review.dto';
import { useState } from 'react';
import { reviewsApi } from '../api/review.api';

interface ReviewCardProps {
  review: ReviewItemDTO;
  onReplySuccess?: () => void;
}

export function ReviewCard({ review, onReplySuccess }: ReviewCardProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState(review.reply || '');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;
    
    setSubmitting(true);
    try {
      await reviewsApi.replyToReview(review.id, replyText);
      setIsReplying(false);
      onReplySuccess?.();
    } catch (error) {
      console.error('Failed to reply:', error);
      alert('Failed to submit reply');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B7355] to-[#6B5B3D] flex items-center justify-center text-white font-bold text-sm">
            {review.guest.avatar || getInitials(review.guest.name)}
          </div>
          
          {/* Guest Info */}
          <div>
            <h3 className="font-bold text-gray-900">{review.guest.name}</h3>
            <p className="text-sm text-gray-500">{review.guest.email}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(review.date).toLocaleDateString('vi-VN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-end">
          {renderStars(review.rating)}
          <span className="text-sm text-gray-500 mt-1">{review.rating}/5</span>
        </div>
      </div>

      {/* Hotel & Room Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Hotel:</span> {review.hotel.name}
        </p>
        {review.room && (
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Room:</span> {review.room.name}
          </p>
        )}
      </div>

      {/* Comment */}
      {review.comment && (
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
        </div>
      )}

      {/* Partner Reply */}
      {review.reply && !isReplying && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <span className="font-medium text-blue-900">Partner Reply</span>
            {review.repliedAt && (
              <span className="text-xs text-blue-600 ml-auto">
                {new Date(review.repliedAt).toLocaleDateString('vi-VN')}
              </span>
            )}
          </div>
          <p className="text-gray-700">{review.reply}</p>
          <button
            onClick={() => setIsReplying(true)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Edit Reply
          </button>
        </div>
      )}

      {/* Reply Form */}
      {(isReplying || !review.reply) && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {review.reply ? 'Edit Reply' : 'Reply to Review'}
          </label>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent resize-none"
            rows={3}
            placeholder="Write your reply here..."
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSubmitReply}
              disabled={submitting || !replyText.trim()}
              className="px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#6B5B3D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {submitting ? 'Submitting...' : review.reply ? 'Update Reply' : 'Submit Reply'}
            </button>
            {isReplying && review.reply && (
              <button
                onClick={() => {
                  setIsReplying(false);
                  setReplyText(review.reply || '');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
