'use client';

import React, { useState } from 'react';
import { planningTabs } from '../../data/mock';

export const QuickPlanning = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ padding: '40px', borderBottom: '1px solid #EBEBEB' }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '8px',
        color: '#222222'
      }}>Lên kế hoạch dễ dàng và nhanh chóng</h2>
      <p style={{
        fontSize: '14px',
        color: '#717171',
        marginBottom: '20px'
      }}>Khám phá các điểm đến hàng đầu theo cách bạn thích ở Việt Nam</p>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '16px',
        borderBottom: '1px solid #EBEBEB',
        marginBottom: '20px',
        overflowX: 'auto',
        paddingBottom: '12px'
      }}>
        {planningTabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            style={{
              background: activeTab === idx ? '#6B5B3D' : 'transparent',
              border: 'none',
              borderRadius: '5px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '600',
              color: activeTab === idx ? 'white' : '#717171',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              marginBottom: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== idx) {
                e.currentTarget.style.background = '#6B5B3D';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== idx) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#717171';
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Destinations - Show active tab data */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '24px'
      }}>
        {planningTabs[activeTab].data.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <img 
              src={item.image} 
              alt={item.name}
              style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#222222' }}>{item.name}</div>
              <div style={{ fontSize: '13px', color: '#717171' }}>{item.distance}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
