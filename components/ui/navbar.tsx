"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Globe, Menu, User, Sparkles, MessageCircle, Heart } from 'lucide-react';
import AirbnbSearch from "./airbnb-search";
import { useAuth } from "@/contexts/auth-context";
import { PartnerRegistrationForm } from "./partner-registration-form";
import { useRouter } from "next/navigation";
import { chatApi } from "@/lib/chat.api";

interface NavbarProps {
  showSearch?: boolean;
}

export default function Navbar({ showSearch = true }: NavbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [partnerFormOpen, setPartnerFormOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const partnerRef = useRef<HTMLDivElement>(null);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (partnerRef.current && !partnerRef.current.contains(e.target as Node)) {
        setPartnerFormOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load unread message count
  useEffect(() => {
    if (!user) return;

    const loadUnreadCount = () => {
      chatApi
        .getUnreadCount()
        .then((res: any) => {
          // Response interceptor already unwraps data
          const count = res.unreadCount ?? res.data?.unreadCount ?? 0;
          setUnreadCount(count);
        })
        .catch((err) => console.error('Failed to load unread count:', err));
    };

    loadUnreadCount();

    // Poll every 30 seconds
    const interval = setInterval(loadUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const getInitial = () => {
    if (!user?.email) return null;
    return user.email.charAt(0).toUpperCase();
  };

  const handlePartnerSuccess = () => {
    setPartnerFormOpen(false);
    alert('Đăng ký đối tác thành công! Vui lòng chờ quản trị viên duyệt hồ sơ.');
    router.push('/partner');
  };

  const handlePartnerClick = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (user.role === 'PARTNER') {
      router.push('/partner');
      return;
    }
    
    setPartnerFormOpen(!partnerFormOpen);
  };

  return (
    <header style={{
      borderBottom: '1px solid #EBEBEB',
      background: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        maxWidth: '1760px',
        margin: '0 auto'
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
          <div style={{ position: 'relative' }} ref={partnerRef}>
            <button 
              onClick={handlePartnerClick}
              style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                cursor: 'pointer', 
                border: 'none',
                background: 'transparent',
                color: '#222222',
                padding: '8px 12px',
                borderRadius: '8px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f7f7f7'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Zen Inn your home
            </button>
            
            {partnerFormOpen && (
              <PartnerRegistrationForm 
                onSuccess={handlePartnerSuccess}
                onCancel={() => setPartnerFormOpen(false)}
              />
            )}
          </div>

          <Link
            href="/ai-planner"
            style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              cursor: 'pointer', 
              border: 'none',
              background: 'transparent',
              color: '#6B5B3D',
              padding: '8px 12px',
              borderRadius: '8px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F9F7F4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Sparkles size={16} />
            AI Planner
          </Link>

          {/* Wishlist Icon */}
          {user && (
            <Link
              href="/wishlist"
              style={{
                position: 'relative',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f7f7f7'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Heart size={20} style={{ cursor: 'pointer' }} />
            </Link>
          )}

          {/* Messages Icon with Badge */}
          {user && (
            <Link
              href="/messages"
              style={{
                position: 'relative',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f7f7f7'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <MessageCircle size={20} style={{ cursor: 'pointer' }} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    background: '#ef4444',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    borderRadius: '9999px',
                    minWidth: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 4px'
                  }}
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Link>
          )}

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
                      href="/ai-planner"
                      onClick={() => setDropdownOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', fontSize: '14px', color: '#6B5B3D', textDecoration: 'none', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#F9F7F4'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <Sparkles size={14} />
                      AI Trip Planner
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
                    <Link
                      href="/settings"
                      onClick={() => setDropdownOpen(false)}
                      style={{ display: 'block', padding: '10px 16px', fontSize: '14px', color: '#333', textDecoration: 'none' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      Settings
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
      </div>

      {/* search bar */}
      {showSearch && (
        <div style={{ padding: '0 40px 24px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '850px' }}>
            <AirbnbSearch />
          </div>
        </div>
      )}
    </header>
  );
}
