'use client';

import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Listing } from '../../types/home';

interface ListingPopupProps {
  listing: Listing;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const ListingPopup = ({ listing, onClose, onMouseEnter, onMouseLeave }: ListingPopupProps) => {
  return (
    <div
      data-popup="true"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        left: `${listing.position?.x || 0}px`,
        top: `${listing.position?.y || 0}px`,
        width: '400px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        zIndex: 1000,
        animation: 'popupFadeIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        overflow: 'hidden',
        pointerEvents: 'auto'
      }}
    >
      <img
        src={listing.image}
        alt={listing.title}
        style={{
          width: '100%',
          height: '220px',
          objectFit: 'cover'
        }}
      />
      
      <div style={{ padding: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          marginBottom: '8px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            margin: 0,
            color: '#222222',
            lineHeight: '1.2'
          }}>{listing.title}</h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: '#f7f7f7',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            <Star size={14} fill="#222222" stroke="#222222" />
            <span style={{ fontSize: '14px', fontWeight: '700' }}>{listing.rating}</span>
          </div>
        </div>

        <div style={{ fontSize: '13px', color: '#717171', marginBottom: '12px' }}>
          {listing.reviews} reviews • {listing.distance}
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          fontSize: '14px', 
          color: '#222222', 
          marginBottom: '16px',
          padding: '12px 0',
          borderTop: '1px solid #f0f0f0',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <span><strong>{listing.guests}</strong> guests</span>
          <span><strong>{listing.bedrooms}</strong> bedrooms</span>
          <span><strong>{listing.price}</strong>/night</span>
        </div>

        <p style={{
          fontSize: '14px',
          color: '#484848',
          margin: '0 0 20px 0',
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>{listing.description}</p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '14px', color: '#717171' }}>
            Hosted by <strong>{listing.host}</strong>
          </div>
          <button
            onClick={() => window.location.href = `/hotels/${listing.slug}`}
            style={{
              background: '#6B5B3D',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.1s active, opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
