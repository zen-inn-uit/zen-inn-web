'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export const SearchSection = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    rooms: ''
  });

  useEffect(() => {
    setFormData({
      location: searchParams.get('location') || '',
      checkIn: searchParams.get('checkIn') || '',
      checkOut: searchParams.get('checkOut') || '',
      guests: searchParams.get('guests') || '',
      rooms: searchParams.get('rooms') || ''
    });
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (formData.location) params.set('location', formData.location);
    if (formData.checkIn) params.set('checkIn', formData.checkIn);
    if (formData.checkOut) params.set('checkOut', formData.checkOut);
    if (formData.guests) params.set('guests', formData.guests);
    if (formData.rooms) params.set('rooms', formData.rooms);
    
    window.location.href = `/search?${params.toString()}`;
  };

  return (
    <div style={{
      padding: '24px 40px',
      borderBottom: '1px solid #EBEBEB',
      background: 'white',
      display: 'flex',
      justifyContent: 'center'
    }}>
      {/* Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #DDDDDD',
        borderRadius: '8px',
        padding: '12px 16px',
        gap: '16px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
        background: 'white'
      }}>
        {/* Location */}
        <input
          type="text"
          placeholder="Where are you going?"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: '#222222',
            background: 'transparent',
            minWidth: '200px'
          }}
        />

        <div style={{ width: '1px', height: '40px', background: '#EBEBEB' }}></div>

        {/* Check-in */}
        <input
          type="date"
          placeholder="Check-in"
          value={formData.checkIn}
          onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: '#222222',
            background: 'transparent',
            minWidth: '140px'
          }}
        />

        <div style={{ width: '1px', height: '40px', background: '#EBEBEB' }}></div>

        {/* Check-out */}
        <input
          type="date"
          placeholder="Check-out"
          value={formData.checkOut}
          onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: '#222222',
            background: 'transparent',
            minWidth: '140px'
          }}
        />

        <div style={{ width: '1px', height: '40px', background: '#EBEBEB' }}></div>

        {/* Guests */}
        <input
          type="number"
          placeholder="Guests"
          min="1"
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: '#222222',
            background: 'transparent',
            width: '80px'
          }}
        />

        <div style={{ width: '1px', height: '40px', background: '#EBEBEB' }}></div>

        {/* Rooms */}
        <input
          type="number"
          placeholder="Rooms"
          min="1"
          value={formData.rooms}
          onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: '#222222',
            background: 'transparent',
            width: '80px'
          }}
        />

        <div style={{ width: '1px', height: '40px', background: '#EBEBEB' }}></div>

        {/* Search Button */}
        <button 
          onClick={handleSearch}
          style={{
            background: '#6B5B3D',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Search
        </button>
      </div>
    </div>
  );
};
