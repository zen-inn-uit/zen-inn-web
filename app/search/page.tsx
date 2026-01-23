'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/ui/navbar';
import { SearchSection } from '../../components/home/SearchSection';
import { PropertyCard } from '../../components/home/PropertyCard';
import { ListingPopup } from '../../components/home/ListingPopup';
import FilterSidebar from '../../components/search/FilterSidebar';
import { hotelApi, HotelSearchItem } from '../../lib/api/hotel-api';
import { Listing } from '../../types/home';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState<HotelSearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [closeTimer, setCloseTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);
      try {
        const city = searchParams.get('location');
        const checkIn = searchParams.get('checkIn');
        const checkOut = searchParams.get('checkOut');
        const adults = searchParams.get('guests');
        const rooms = searchParams.get('rooms');

        const response = await hotelApi.searchHotels({
          city: city || undefined,
          checkIn: checkIn || undefined,
          checkOut: checkOut || undefined,
          adults: adults ? parseInt(adults) : undefined,
          rooms: rooms ? parseInt(rooms) : undefined,
          sortBy: 'recommended'
        });
        setHotels(response.items);
      } catch (err) {
        console.error('Failed to fetch hotels:', err);
        setError('Failed to load hotels. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams]);

  const handleMouseEnter = (hotel: HotelSearchItem, e: React.MouseEvent) => {
    if (closeTimer) clearTimeout(closeTimer);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const popupWidth = 400;
    
    const spaceOnRight = windowWidth - rect.right;
    const showOnLeft = spaceOnRight < popupWidth + 20;
    
    const x = showOnLeft ? rect.left - popupWidth - 10 : rect.right + 10;
    const y = rect.top;
    
    if (hoverTimer) clearTimeout(hoverTimer);
    
    const timer = setTimeout(() => {
      // Convert HotelSearchItem to Listing type for the popup
      const listing: Listing = {
        id: hotel.id,
        title: hotel.name,
        slug: hotel.id, // Assuming ID as slug for now, or fetch slug if available
        location: hotel.city,
        price: hotel.startingPrice || 0,
        rating: hotel.rating || 0,
        reviews: hotel.reviewCount,
        image: hotel.thumbnailUrl ? [hotel.thumbnailUrl] : [],
        type: 'Hotel', // Default type
        beds: 0, // Placeholder
        baths: 0, // Placeholder
        sqft: 0, // Placeholder
        isFavorite: false,
        position: { x, y }
      };
      setSelectedListing(listing);
    }, 1000);
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    
    const timer = setTimeout(() => {
      setSelectedListing(null);
    }, 200);
    setCloseTimer(timer);
  };

  const handlePopupMouseEnter = () => {
    if (closeTimer) clearTimeout(closeTimer);
  };

  return (
    <div style={{
      fontFamily: "'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: '#F7F7F7',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        background: '#FFFFFF',
        borderRadius: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        overflow: 'hidden'
      }}>
        <Navbar showSearch={false} />
        <Suspense fallback={<div style={{ padding: '24px 40px' }}>Loading search bar...</div>}>
          <SearchSection />
        </Suspense>
        
        <div style={{ display: 'flex', padding: '40px', gap: '40px' }}>
          {/* Left Sidebar - Filters */}
          <div style={{ width: '320px', flexShrink: 0 }}>
            <FilterSidebar />
          </div>

          {/* Right Content - Results */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#222222', margin: 0 }}>
                {loading ? 'Searching...' : `${hotels.length} stays found`}
              </h1>
            </div>

            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} style={{ height: '350px', background: '#f0f0f0', borderRadius: '16px', animation: 'pulse 1.5s infinite' }}></div>
                ))}
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#FF385C' }}>{error}</div>
            ) : hotels.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600' }}>No results found</h2>
                <p style={{ color: '#717171', marginTop: '8px' }}>Try adjusting your search filters.</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                {hotels.map((hotel) => (
                  <PropertyCard
                    key={hotel.id}
                    listing={{
                      id: hotel.id,
                      title: hotel.name,
                      slug: hotel.id,
                      location: hotel.city,
                      price: hotel.startingPrice || 0,
                      rating: hotel.rating || 0,
                      reviews: hotel.reviewCount,
                      image: hotel.thumbnailUrl ? [hotel.thumbnailUrl] : [],
                      type: 'Hotel',
                      beds: 0,
                      baths: 0,
                      sqft: 0,
                      isFavorite: false
                    }}
                    onMouseEnter={(e) => handleMouseEnter(hotel, e)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => window.location.href = `/hotels/${hotel.id}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedListing && (
        <ListingPopup
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes popupFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

