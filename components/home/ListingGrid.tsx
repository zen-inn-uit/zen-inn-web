'use client';

import React, { useState, useRef, useEffect } from 'react';
import { listings } from '../../data/mock';
import { Listing } from '../../types/home';
import { PropertyCard } from './PropertyCard';
import { ListingPopup } from './ListingPopup';

export const ListingGrid = () => {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <div style={{ padding: '40px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
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
