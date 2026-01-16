'use client';

import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Listing } from '../../types/home';

interface PropertyCardProps {
  listing: Listing;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
  onClick: () => void;
}

export const PropertyCard = ({ listing, onMouseEnter, onMouseLeave, onClick }: PropertyCardProps) => {
  return (
    <div 
      style={{ cursor: 'pointer', position: 'relative' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div style={{ position: 'relative', aspectRatio: '1/1', marginBottom: '12px' }}>
        <img 
          src={listing.image} 
          alt={listing.title}
          style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: '12px', 
            objectFit: 'cover' 
          }}
        />
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <Heart size={24} color="white" fill="rgba(0,0,0,0.3)" />
        </div>
        {listing.badge && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {listing.badge}
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#222222', margin: 0 }}>{listing.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Star size={12} fill="#222222" stroke="#222222" />
          <span style={{ fontSize: '14px' }}>{listing.rating}</span>
        </div>
      </div>
      <p style={{ fontSize: '14px', color: '#717171', margin: '2px 0' }}>{listing.distance}</p>
      <p style={{ fontSize: '14px', color: '#717171', margin: '2px 0' }}>{listing.date}</p>
      <p style={{ fontSize: '15px', color: '#222222', margin: '6px 0 0 0', fontWeight: '600' }}>
        {listing.price} <span style={{ fontWeight: '400' }}>night</span>
      </p>
    </div>
  );
};
