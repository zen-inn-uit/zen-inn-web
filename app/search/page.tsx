'use client';

import React, { Suspense, useState } from 'react';
import { Header } from '../../components/home/Header';
import { SearchSection } from '../../components/home/SearchSection';
import { listings } from '../../data/mock';
import { Listing } from '../../types/home';
import { PropertyCard } from '../../components/home/PropertyCard';
import { ListingPopup } from '../../components/home/ListingPopup';
import FilterSidebar from '../../components/search/FilterSidebar';

export default function SearchPage() {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [closeTimer, setCloseTimer] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (listing: Listing, e: React.MouseEvent) => {
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
      setSelectedListing({ ...listing, position: { x, y } });
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
      {/* Main Container */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        background: '#FFFFFF',
        borderRadius: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        overflow: 'hidden'
      }}>
        <Header />
        <Suspense fallback={<div style={{ padding: '24px 40px' }}>Loading search...</div>}>
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
                {listings.length} stays found
              </h1>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px'
            }}>
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
