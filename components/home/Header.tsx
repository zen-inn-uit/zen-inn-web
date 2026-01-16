'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Menu, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context';

export const Header = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitial = () => {
    if (!user?.email) return null;
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      borderBottom: '1px solid #EBEBEB'
    }}>
      {/* logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <Image
          src="/logo-primary.png"
          alt="Zen Inn Logo"
          width={100}
          height={32}
          style={{ objectFit: 'contain' }}
        />
      </Link>

      {/* right menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/partner" style={{ fontSize: '14px', fontWeight: '600', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
          Zen Inn your home
        </Link>
        <Globe size={18} style={{ cursor: 'pointer' }} />

        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid #DDDDDD',
              borderRadius: '21px',
              padding: '6px 8px 6px 12px',
              cursor: 'pointer',
              background: 'white'
            }}
          >
            <Menu size={16} />
            <div style={{
              background: '#6B5B3D',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {user ? (
                <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>{getInitial()}</span>
              ) : (
                <User size={18} color="white" />
              )}
            </div>
          </button>

          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              right: 0,
              marginTop: '8px',
              width: '200px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              border: '1px solid #EBEBEB',
              padding: '8px 0',
              zIndex: 50
            }}>
              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    style={{ display: 'block', padding: '10px 16px', fontSize: '14px', color: '#333', textDecoration: 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/bookings"
                    onClick={() => setDropdownOpen(false)}
                    style={{ display: 'block', padding: '10px 16px', fontSize: '14px', color: '#333', textDecoration: 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    My Bookings
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setDropdownOpen(false)}
                    style={{ display: 'block', padding: '10px 16px', fontSize: '14px', color: '#333', textDecoration: 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    Wishlist
                  </Link>
                  <div style={{ borderTop: '1px solid #EBEBEB', margin: '8px 0' }} />
                  <button
                    onClick={() => { logout(); setDropdownOpen(false); }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: '14px', color: '#333', background: 'transparent', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setDropdownOpen(false)}
                    style={{ display: 'block', padding: '10px 16px', fontSize: '14px', color: '#333', textDecoration: 'none', fontWeight: '600' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setDropdownOpen(false)}
                    style={{ display: 'block', padding: '10px 16px', fontSize: '14px', color: '#333', textDecoration: 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
