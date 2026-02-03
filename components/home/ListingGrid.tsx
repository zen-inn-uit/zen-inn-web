'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Listing } from '../../types/home';
import { PropertyCard } from './PropertyCard';
import { ListingPopup } from './ListingPopup';
import { hotelApi, HotelSearchItem } from '@/lib/api/hotel-api';

export const ListingGrid = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch featured hotels on mount
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const hotels = await hotelApi.getFeaturedHotels(10);
        
        // Transform HotelSearchItem to Listing format
        const transformedListings: Listing[] = hotels.map((hotel: HotelSearchItem) => ({
          id: hotel.id,
          slug: hotel.slug || hotel.id, // Use slug from API, fallback to ID
          image: hotel.thumbnailUrl ? [hotel.thumbnailUrl] : ['/auth-bg.png'],
          title: hotel.name,
          location: `${hotel.city}`,
          price: hotel.startingPrice || 0,
          rating: hotel.rating || 0,
          reviews: hotel.reviewCount,
          description: hotel.address,
          guests: hotel.maxGuests || undefined,
          bedrooms: hotel.bedroomCount || undefined,
        }));

        setListings(transformedListings);
      } catch (error) {
        console.error('Failed to fetch featured hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Block scrolling when popup is active
  useEffect(() => {
    if (selectedListing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedListing]);

  const handleMouseEnter = (listing: Listing, e: React.MouseEvent) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const popupWidth = 400;
    
    const spaceOnRight = windowWidth - rect.right;
    const showOnLeft = spaceOnRight < popupWidth + 20;
    
    const x = showOnLeft ? rect.left - popupWidth - 10 : rect.right + 10;
    const y = rect.top;
    
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    
    hoverTimerRef.current = setTimeout(() => {
      setSelectedListing({ ...listing, position: { x, y } });
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    
    closeTimerRef.current = setTimeout(() => {
      setSelectedListing(null);
    }, 200);
  };

  const handlePopupMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #6B5B3D', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '16px', color: '#717171' }}>Đang tải khách sạn...</p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px' }}>
      <div 
        className="stagger-fade-in"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }}
      >
        {listings.map((listing) => (
          <PropertyCard
            key={listing.id}
            listing={listing}
            onMouseEnter={(e) => handleMouseEnter(listing, e)}
            onMouseLeave={handleMouseLeave}
            onClick={() => window.location.href = `/hotels/${listing.slug}`}
          />
        ))}
      </div>

      {selectedListing && (
        <ListingPopup
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
};
