'use client';

import React from 'react';

const types = [
  { name: 'Khách sạn', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=300&fit=crop' },
  { name: 'Căn hộ', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=300&fit=crop' },
  { name: 'Các resort', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=300&fit=crop' },
  { name: 'Các biệt thự', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&h=300&fit=crop' }
];

export const PropertyTypes = () => {
  return (
    <div style={{ padding: '40px', borderBottom: '1px solid #EBEBEB' }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '20px',
        color: '#222222'
      }}>Tìm theo loại chỗ nghỉ</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px'
      }}>
        {types.map((type, idx) => (
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
              src={type.image}
              alt={type.name}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover'
              }}
            />
            <div style={{
              padding: '16px',
              background: '#F7F7F7'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                margin: 0,
                color: '#222222'
              }}>{type.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
