"use client";

import { useState, useEffect } from 'react';
import { reviewsApi } from './api/review.api';
import { ReviewStats } from './components/review-stats';
import { OverallRating } from './components/overall-rating';
import { CountryDistribution } from './components/country-distribution';
import { ReviewsList } from './components/reviews-list';
import { PageContainer } from '@/components/ui/page-container';
import { partnerAPI } from '@/lib/api/partner-api';
import type { ReviewStatsDTO, RatingBreakdownDTO, CountryReviewDTO } from './dto/review.dto';

export default function ReviewsPage() {
  const [stats, setStats] = useState<ReviewStatsDTO | null>(null);
  const [ratings, setRatings] = useState<RatingBreakdownDTO[]>([]);
  const [countries, setCountries] = useState<CountryReviewDTO[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [statsData, ratingsData, countriesData, hotelsData] = await Promise.all([
          reviewsApi.getStats().catch(err => {
            console.error('Failed to fetch stats:', err);
            return { positive: 0, negative: 0, overallRating: 0, totalReviews: 0 };
          }),
          reviewsApi.getRatingBreakdown().catch(err => {
            console.error('Failed to fetch ratings:', err);
            return [];
          }),
          reviewsApi.getCountryReviews().catch(err => {
            console.error('Failed to fetch countries:', err);
            return [];
          }),
          partnerAPI.listHotels().catch(err => {
            console.error('Failed to fetch hotels:', err);
            return [];
          }),
        ]);

        setStats(statsData);
        setRatings(ratingsData);
        setCountries(countriesData);
        setHotels(hotelsData);
      } catch (err: any) {
        console.error('Failed to load reviews page:', err);
        setError(err.message || 'Failed to load reviews data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <PageContainer className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-9 w-32 bg-muted/50 rounded animate-pulse mb-2" />
            <div className="h-5 w-64 bg-muted/30 rounded animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border p-6 h-48 animate-pulse">
            <div className="h-6 w-40 bg-muted/50 rounded mb-4" />
            <div className="h-20 bg-muted/30 rounded" />
          </div>
          <div className="bg-white rounded-xl border p-6 h-48 animate-pulse">
            <div className="h-6 w-40 bg-muted/50 rounded mb-4" />
            <div className="h-20 bg-muted/30 rounded" />
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6 h-96 animate-pulse mb-8">
          <div className="h-6 w-48 bg-muted/50 rounded mb-4" />
          <div className="h-80 bg-muted/30 rounded" />
        </div>

        <div>
          <div className="h-8 w-40 bg-muted/50 rounded mb-6 animate-pulse" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl border p-6 h-32 animate-pulse">
                <div className="h-20 bg-muted/30 rounded" />
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer className="p-8">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-red-500 text-lg font-semibold mb-2">Lỗi tải dữ liệu</div>
            <p className="text-slate-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <PageContainer className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3d2e1f] font-outfit">Reviews</h1>
          <p className="text-slate-500 mt-1">Manage customer reviews and feedback</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ReviewStats positive={stats.positive} negative={stats.negative} />
        <OverallRating rating={stats.overallRating} totalReviews={stats.totalReviews} breakdown={ratings} />
      </div>

      <div className="mb-8">
        <CountryDistribution data={countries} />
      </div>

      {/* Reviews List with Filters */}
      <div>
        <h2 className="text-2xl font-bold text-[#3d2e1f] mb-6">All Reviews</h2>
        <ReviewsList hotels={hotels} />
      </div>
    </PageContainer>
  );
}
