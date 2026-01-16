'use client';

import React from 'react';

const cities = [
  { name: 'TP. Hồ Chí Minh', properties: '6,224 chỗ nghỉ', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
  { name: 'Hà Nội', properties: '5,368 chỗ nghỉ', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
  { name: 'Vũng Tàu', properties: '1,773 chỗ nghỉ', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
  { name: 'Đà Nẵng', properties: '2,161 chỗ nghỉ', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
  { name: 'Đà Lạt', properties: '1,747 chỗ nghỉ', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
  { name: 'Nha Trang', properties: '1,029 chỗ nghỉ', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' }
];

export const ExploreVietnam = () => {
  return (
    <div style={{ padding: '40px', borderBottom: '1px solid #EBEBEB' }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '8px',
        color: '#222222'
      }}>Khám phá Việt Nam</h2>
      <p style={{
        fontSize: '16px',
        color: '#717171',
        marginBottom: '32px'
      }}>Các điểm đến phổ biến này có nhiều điều chờ đón bạn</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '12px',
        overflowX: 'auto'
      }}>
        {cities.map((city, idx) => (
          <div
            key={idx}
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <img
              src={city.image}
              alt={city.name}
              style={{
                width: '100%',
                height: '120px',
                objectFit: 'cover'
              }}
            />
            <div style={{ padding: '12px' }}>
              <h3 style={{
                fontSize: '15px',
                fontWeight: '600',
                margin: '0 0 4px 0',
                color: '#222222'
              }}>{city.name}</h3>
              <p style={{
                fontSize: '13px',
                color: '#717171',
                margin: 0
              }}>{city.properties}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
