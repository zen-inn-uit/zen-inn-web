'use client';

import React from 'react';

const destinations = [
  { name: 'TP. Hồ Chí Minh', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop' },
  { name: 'Hà Nội', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop' },
  { name: 'Vũng Tàu', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop' },
  { name: 'Đà Nẵng', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&h=300&fit=crop' },
  { name: 'Đà Lạt', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop' }
];

export const TrendingDestinations = () => {
  return (
    <div style={{ padding: '40px', borderBottom: '1px solid #EBEBEB' }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '8px',
        color: '#222222'
      }}>Điểm đến đang thịnh hành</h2>
      <p style={{
        fontSize: '14px',
        color: '#717171',
        marginBottom: '20px'
      }}>Các lựa chọn phổ biến nhất cho du khách đến Việt Nam</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        {destinations.map((dest, idx) => (
          <div key={idx} style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            cursor: 'pointer',
            gridRow: idx < 2 ? 'span 2' : 'span 1'
          }}>
            <img
              src={dest.image}
              alt={dest.name}
              style={{
                width: '100%',
                height: idx < 2 ? '412px' : '200px',
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '16px', fontWeight: '600' }}>{dest.name}</span>
              <span style={{ fontSize: '16px' }}>✈️</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
