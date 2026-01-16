'use client';

import React, { useState } from 'react';
import { Search, Menu, User, Globe, Heart, Share, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [selectedListing, setSelectedListing] = useState(null);

  const listings = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
      title: 'Family Home in City Center',
      distance: '231 kilometers away',
      date: 'Oct 24-29',
      price: '85€',
      rating: 4.89,
      host: 'Carl Fredricksen',
      badge: 'Pet-friendly'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop',
      title: 'Smelly Cabin in the Swamps',
      distance: '5027 kilometers away',
      date: 'Oct 02-25',
      price: '156€',
      rating: 1.74,
      host: 'Shrek',
      badge: 'No donkeys allowed'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
      title: "Gothel's Lovely Tower Room",
      distance: '64 kilometers away',
      date: 'Nov 04-17',
      price: '103€',
      rating: 4.10,
      host: 'Gothel',
      badge: 'Checkout policy restrictions'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop',
      title: '1475 Luck Hoof Avenue',
      distance: '1.3 kilometers away',
      date: 'Nov 29-02',
      price: '165€',
      rating: 4.33,
      host: 'Bojack Horseman',
      badge: 'Superhost'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
      title: 'The Pink Palace Apartments',
      distance: '7.2 kilometers away',
      date: 'Oct 02-25',
      price: '62€',
      rating: 3.89,
      host: 'Other Mother',
      badge: "Best of countryside's nightlife"
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
      title: 'Brooklyn Tiny Bedroom',
      distance: '0.3 kilometers away',
      date: 'Nov 04-17',
      price: '35€',
      rating: 4.2,
      host: 'Miles Morales',
      badge: 'Occasional cobwebs'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop',
      title: 'Peaceful palace in the mountains',
      distance: '12 kilometers away',
      date: 'Nov 20-13',
      price: '209€',
      rating: 4.88,
      host: 'Jack, Samurai Jack',
      badge: ''
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
      title: "Linguini's apartment",
      distance: '3.2 kilometers away',
      date: 'Oct 20-07',
      price: '73€',
      rating: 4.88,
      host: 'Alfredo Linguini',
      badge: 'Just one petit mouse problem'
    }
  ];

  const categories = [
    { name: 'Hotels', icon: '🏨' },
    { name: 'Resorts', icon: '�️' },
    { name: 'Villas', icon: '🏡' },
    { name: 'Beach', icon: '🌊' },
    { name: 'Mountains', icon: '⛰️' },
    { name: 'City center', icon: '🏙️' },
    { name: 'Countryside', icon: '�' },
    { name: 'Lake view', icon: '🏞️' },
    { name: 'Amazing pools', icon: '�' },
    { name: 'Luxury', icon: '💎' },
    { name: 'Budget', icon: '💰' },
    { name: 'Family', icon: '👨‍👩‍�' }
  ];

  return (
    <div style={{
      fontFamily: "'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: '#F7F7F7',
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Main Container */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        background: '#FFFFFF',
        borderRadius: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        overflow: 'hidden'
      }}>
        {/* Header */}
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

          {/* Search Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #DDDDDD',
            borderRadius: '40px',
            padding: '8px 16px',
            gap: '16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.08)';
          }}>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Anywhere</span>
            <div style={{ width: '1px', height: '24px', background: '#DDDDDD' }}></div>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Any week</span>
            <div style={{ width: '1px', height: '24px', background: '#DDDDDD' }}></div>
            <span style={{ fontSize: '14px', color: '#717171' }}>Add guests</span>
            <div style={{
              background: '#6B5B3D',
              borderRadius: '50%',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Search size={16} color="white" />
            </div>
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
            </div>
          </div>
        </header>


        {/* Quick Planning Section - MOVED UP */}
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
            overflowX: 'auto'
          }}>
            {[
              { label: 'Bãi Biển', data: [
                { name: 'Vũng Tàu', distance: 'Cách đây 73 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
                { name: 'Mũi Né', distance: 'Cách đây 175 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
                { name: 'Côn Đảo', distance: 'Cách đây 238 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
                { name: 'Phú Quốc', distance: 'Cách đây 299 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
                { name: 'Quy Nhơn', distance: 'Cách đây 432 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
                { name: 'Hội An', distance: 'Cách đây 592 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' }
              ]},
              { label: 'Nhiệt Ẩm', data: [
                { name: 'Hà Nội', distance: 'Cách đây 120 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
                { name: 'Huế', distance: 'Cách đây 250 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
                { name: 'Đà Nẵng', distance: 'Cách đây 320 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
                { name: 'Nha Trang', distance: 'Cách đây 410 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
                { name: 'Cần Thơ', distance: 'Cách đây 180 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
                { name: 'Phan Thiết', distance: 'Cách đây 220 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' }
              ]},
              { label: 'Thiên Hiểm Lịch Sử', data: [
                { name: 'Hội An', distance: 'Cách đây 592 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
                { name: 'Huế', distance: 'Cách đây 250 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
                { name: 'Hà Nội', distance: 'Cách đây 120 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
                { name: 'Ninh Bình', distance: 'Cách đây 95 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
                { name: 'Mỹ Sơn', distance: 'Cách đây 610 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
                { name: 'Cù Lao Chàm', distance: 'Cách đây 605 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' }
              ]},
              { label: 'Chợ & Mua Sắm', data: [
                { name: 'TP. HCM', distance: 'Cách đây 15 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
                { name: 'Hà Nội', distance: 'Cách đây 120 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
                { name: 'Đà Nẵng', distance: 'Cách đây 320 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
                { name: 'Cần Thơ', distance: 'Cách đây 180 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
                { name: 'Hải Phòng', distance: 'Cách đây 105 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
                { name: 'Biên Hòa', distance: 'Cách đây 35 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' }
              ]},
              { label: 'Sang Trọng & Thư Giãn', data: [
                { name: 'Đà Lạt', distance: 'Cách đây 305 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
                { name: 'Phú Quốc', distance: 'Cách đây 299 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
                { name: 'Nha Trang', distance: 'Cách đây 410 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
                { name: 'Côn Đảo', distance: 'Cách đây 238 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
                { name: 'Hội An', distance: 'Cách đây 592 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
                { name: 'Vũng Tàu', distance: 'Cách đây 73 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' }
              ]},
              { label: 'Đi săn & Viễn Thảo', data: [
                { name: 'Sapa', distance: 'Cách đây 380 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
                { name: 'Mộc Châu', distance: 'Cách đây 210 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
                { name: 'Đà Lạt', distance: 'Cách đây 305 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
                { name: 'Tam Đảo', distance: 'Cách đây 85 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
                { name: 'Tây Nguyên', distance: 'Cách đây 550 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
                { name: 'Hà Giang', distance: 'Cách đây 320 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' }
              ]},
              { label: 'Tour Ẩm Thực', data: [
                { name: 'TP. HCM', distance: 'Cách đây 15 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
                { name: 'Hà Nội', distance: 'Cách đây 120 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
                { name: 'Hội An', distance: 'Cách đây 592 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
                { name: 'Huế', distance: 'Cách đây 250 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
                { name: 'Cần Thơ', distance: 'Cách đây 180 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
                { name: 'Đà Nẵng', distance: 'Cách đây 320 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' }
              ]}
            ].map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedListing(null)} // Using setSelectedListing as a workaround to trigger re-render
                style={{
                  background: idx === 0 ? '#6B5B3D' : 'transparent',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: idx === 0 ? 'white' : '#717171',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (idx !== 0) {
                    e.currentTarget.style.background = '#6B5B3D';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (idx !== 0) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#717171';
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Destinations - Show first tab data */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '12px'
          }}>
            {[
              { name: 'Vũng Tàu', distance: 'Cách đây 73 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
              { name: 'Mũi Né', distance: 'Cách đây 175 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
              { name: 'Côn Đảo', distance: 'Cách đây 238 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
              { name: 'Phú Quốc', distance: 'Cách đây 299 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
              { name: 'Quy Nhơn', distance: 'Cách đây 432 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
              { name: 'Hội An', distance: 'Cách đây 592 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' }
            ].map((dest, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  border: '1px solid #EBEBEB'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  style={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: '10px' }}>
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: '0 0 4px 0',
                    color: '#222222'
                  }}>{dest.name}</h3>
                  <p style={{
                    fontSize: '12px',
                    color: '#717171',
                    margin: 0
                  }}>{dest.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
          padding: '40px'
        }}>
          {listings.map((listing) => (
            <div
              key={listing.id}
              style={{
                cursor: 'pointer',
                animation: 'fadeInUp 0.6s ease-out',
                animationDelay: `${listing.id * 0.1}s`,
                animationFillMode: 'both'
              }}
              onClick={() => setSelectedListing(listing)}
            >
              {/* Image */}
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '1/1',
                marginBottom: '12px'
              }}>
                <img
                  src={listing.image}
                  alt={listing.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: '50%',
                  padding: '8px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)'
                }}>
                  <Heart size={18} />
                </div>
              </div>

              {/* Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4px' }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  margin: 0,
                  color: '#222222'
                }}>{listing.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} fill="#222222" stroke="#222222" />
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>{listing.rating}</span>
                </div>
              </div>

              <p style={{
                fontSize: '14px',
                color: '#717171',
                margin: '4px 0'
              }}>{listing.distance}</p>

              <p style={{
                fontSize: '14px',
                color: '#717171',
                margin: '4px 0'
              }}>{listing.date}</p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '8px'
              }}>
                <p style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#222222',
                  margin: 0
                }}>{listing.price} night</p>
              </div>

              {/* Host info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '8px',
                paddingTop: '8px',
                borderTop: '1px solid #EBEBEB'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {listing.host[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '13px',
                    color: '#222222',
                    margin: 0,
                    fontWeight: '500'
                  }}>{listing.host}</p>
                  {listing.badge && (
                    <p style={{
                      fontSize: '12px',
                      color: '#717171',
                      margin: 0
                    }}>{listing.badge}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Destinations Section */}
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
            {/* TP. Hồ Chí Minh - Large */}
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              gridRow: 'span 2'
            }}>
              <img
                src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop"
                alt="TP. Hồ Chí Minh"
                style={{
                  width: '100%',
                  height: '180px',
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
                <span style={{ fontSize: '16px', fontWeight: '600' }}>TP. Hồ Chí Minh</span>
                <span style={{ fontSize: '16px' }}>✈️</span>
              </div>
            </div>

            {/* Hà Nội - Large */}
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              gridRow: 'span 2'
            }}>
              <img
                src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop"
                alt="Hà Nội"
                style={{
                  width: '100%',
                  height: '100%',
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
                <span style={{ fontSize: '16px', fontWeight: '600' }}>Hà Nội</span>
                <span style={{ fontSize: '16px' }}>✈️</span>
              </div>
            </div>

            {/* Vũng Tàu */}
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer'
            }}>
              <img
                src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop"
                alt="Vũng Tàu"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'white',
                padding: '6px 12px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Vũng Tàu</span>
                <span style={{ fontSize: '14px' }}>✈️</span>
              </div>
            </div>

            {/* Đà Nẵng */}
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer'
            }}>
              <img
                src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&h=300&fit=crop"
                alt="Đà Nẵng"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'white',
                padding: '6px 12px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Đà Nẵng</span>
                <span style={{ fontSize: '14px' }}>✈️</span>
              </div>
            </div>

            {/* Đà Lạt */}
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer'
            }}>
              <img
                src="https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop"
                alt="Đà Lạt"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'white',
                padding: '6px 12px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Đà Lạt</span>
                <span style={{ fontSize: '14px' }}>✈️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Property Types Section */}
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
            {[
              { name: 'Khách sạn', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=300&fit=crop' },
              { name: 'Căn hộ', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=300&fit=crop' },
              { name: 'Các resort', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=300&fit=crop' },
              { name: 'Các biệt thự', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&h=300&fit=crop' }
            ].map((type, idx) => (
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

        {/* Explore Vietnam Section */}
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
            {[
              { name: 'TP. Hồ Chí Minh', properties: '6,224 chỗ nghỉ', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
              { name: 'Hà Nội', properties: '5,368 chỗ nghỉ', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
              { name: 'Vũng Tàu', properties: '1,773 chỗ nghỉ', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
              { name: 'Đà Nẵng', properties: '2,161 chỗ nghỉ', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
              { name: 'Đà Lạt', properties: '1,747 chỗ nghỉ', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
              { name: 'Nha Trang', properties: '1,029 chỗ nghỉ', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' }
            ].map((city, idx) => (
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


        {/* Show more button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px 40px 40px'
        }}>
          <button style={{
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
          }}>
            Show more
          </button>
        </div>
      </div>

      {/* Detail Panel - Slides in from right */}
      {selectedListing && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '480px',
            height: '100vh',
            background: 'white',
            boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
            zIndex: 1000,
            animation: 'slideInRight 0.4s ease-out',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedListing(null)}
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 10
            }}
          >
            ✕
          </button>

          {/* Detail content */}
          <img
            src={selectedListing.image}
            alt={selectedListing.title}
            style={{
              width: '100%',
              height: '320px',
              objectFit: 'cover'
            }}
          />

          <div style={{ padding: '32px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              marginBottom: '16px'
            }}>
              <div>
                <h2 style={{
                  fontSize: '26px',
                  fontWeight: '600',
                  margin: '0 0 8px 0'
                }}>{selectedListing.title}</h2>
                <p style={{
                  fontSize: '16px',
                  color: '#717171',
                  margin: 0
                }}>{selectedListing.distance}</p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 12px',
                background: '#F7F7F7',
                borderRadius: '8px'
              }}>
                <Star size={16} fill="#222222" stroke="#222222" />
                <span style={{ fontSize: '15px', fontWeight: '600' }}>{selectedListing.rating}</span>
              </div>
            </div>

            <div style={{
              padding: '24px 0',
              borderTop: '1px solid #EBEBEB',
              borderBottom: '1px solid #EBEBEB'
            }}>
              <p style={{
                fontSize: '18px',
                fontWeight: '600',
                margin: '0 0 12px 0'
              }}>Entire home hosted by {selectedListing.host}</p>
              <p style={{
                fontSize: '16px',
                color: '#717171',
                margin: 0
              }}>6 guests · 2 bedrooms · 3 beds · 2.5 baths</p>
            </div>

            <div style={{
              padding: '24px 0',
              borderBottom: '1px solid #EBEBEB'
            }}>
              <p style={{
                fontSize: '16px',
                color: '#222222',
                lineHeight: '1.6',
                margin: 0
              }}>
                Your dates are €191 less than the avg. nightly rate over the last 3 months.
              </p>
            </div>

            <button style={{
              width: '100%',
              background: '#6B5B3D',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '24px',
              boxShadow: '0 2px 8px rgba(107, 91, 61, 0.3)',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.85';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}>
              Reserve - €{selectedListing.price.replace('€', '')} night
            </button>
          </div>
        </div>
      )}

      {/* Backdrop for detail panel */}
      {selectedListing && (
        <div
          onClick={() => setSelectedListing(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease-out'
          }}
        />
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}