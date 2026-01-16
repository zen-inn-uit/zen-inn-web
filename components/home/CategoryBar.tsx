'use client';

import React from 'react';

const categories = [
  { name: 'Hotels', icon: '🏨' },
  { name: 'Resorts', icon: '🏝️' },
  { name: 'Villas', icon: '🏡' },
  { name: 'Beach', icon: '🌊' },
  { name: 'Mountains', icon: '⛰️' },
  { name: 'City center', icon: '🏙️' },
  { name: 'Countryside', icon: '🌾' },
  { name: 'Lake view', icon: '🏞️' },
  { name: 'Amazing pools', icon: '🏊' },
  { name: 'Luxury', icon: '💎' },
  { name: 'Budget', icon: '💰' },
  { name: 'Family', icon: '👨‍👩‍👧' }
];

export const CategoryBar = () => {
  return (
    <div style={{
      display: 'flex',
      gap: '32px',
      padding: '20px 40px',
      overflowX: 'auto',
      borderBottom: '1px solid #EBEBEB',
      background: 'white'
    }}>
      {categories.map((cat, idx) => (
        <div key={idx} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          opacity: idx === 0 ? 1 : 0.6,
          borderBottom: idx === 0 ? '2px solid #6B5B3D' : 'none',
          paddingBottom: '8px',
          minWidth: 'fit-content'
        }}>
          <span style={{ fontSize: '24px' }}>{cat.icon}</span>
          <span style={{ fontSize: '12px', fontWeight: '600' }}>{cat.name}</span>
        </div>
      ))}
    </div>
  );
};
