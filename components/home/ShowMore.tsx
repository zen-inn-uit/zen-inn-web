'use client';

import React from 'react';

export const ShowMore = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '20px 40px 40px'
    }}>
      <button 
        onClick={() => window.location.href = '/search'}
        style={{
          background: '#6B5B3D',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '14px 24px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.85';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Xem thêm
      </button>
    </div>
  );
};
