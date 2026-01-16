'use client';

import React from 'react';
import { Globe, Menu, User } from 'lucide-react';
import Link from 'next/link';

export const Header = () => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      borderBottom: '1px solid #EBEBEB'
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="#6B5B3D">
          <path d="M16 1s-10 8-10 15c0 5.5 4.5 10 10 10s10-4.5 10-10c0-7-10-15-10-15zm0 22c-3.9 0-7-3.1-7-7 0-4.5 5-9.5 7-11.5 2 2 7 7 7 11.5 0 3.9-3.1 7-7 7z"/>
        </svg>
        <span style={{
          fontSize: '22px',
          fontWeight: '700',
          color: '#6B5B3D',
          letterSpacing: '-0.5px'
        }}>zen inn</span>
      </div>

      {/* Right Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Zen Inn your home</span>
        <Globe size={18} style={{ cursor: 'pointer' }} />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid #DDDDDD',
          borderRadius: '21px',
          padding: '6px 8px 6px 12px',
          cursor: 'pointer'
        }}>
          <Menu size={16} />
          <Link href="/profile">
            <div style={{
              background: '#6B5B3D',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={18} color="white" />
            </div>
          </Link>
          
        </div>
      </div>
    </header>
  );
};
