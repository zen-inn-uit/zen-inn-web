"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// ==================== TYPES ====================
export interface BookingDetails {
  // Room & Hotel Info
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  hotelCity: string;
  hotelAddress: string;
  roomId: string;
  roomName: string;
  ratePlanId?: string;
  
  // Dates & Guests
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  guestCount: number;
  nights: number;
  
  // Pricing
  pricePerNight: number;
  subtotal: number;
  taxes: number;
  total: number;
  
  // Guest Details
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  specialRequests?: string;
  
  // Payment
  paymentMethod?: 'VNPAY' | 'SEPAY' | 'CASH' | 'CARD';
  
  // Booking Result
  bookingId?: string;
  paymentUrl?: string;
}

interface BookingContextType {
  bookingDetails: BookingDetails | null;
  setBookingDetails: (details: BookingDetails | null) => void;
  updateBookingDetails: (updates: Partial<BookingDetails>) => void;
  clearBooking: () => void;
  isBookingInProgress: boolean;
  setIsBookingInProgress: (inProgress: boolean) => void;
}

// ==================== CONTEXT ====================
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// ==================== PROVIDER ====================
interface BookingProviderProps {
  children: ReactNode;
}

export function BookingProvider({ children }: BookingProviderProps) {
  const [bookingDetails, setBookingDetailsState] = useState<BookingDetails | null>(null);
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);

  const setBookingDetails = useCallback((details: BookingDetails | null) => {
    setBookingDetailsState(details);
    
    // Persist to sessionStorage for page refreshes
    if (details) {
      sessionStorage.setItem('zen-inn-booking', JSON.stringify(details));
    } else {
      sessionStorage.removeItem('zen-inn-booking');
    }
  }, []);

  const updateBookingDetails = useCallback((updates: Partial<BookingDetails>) => {
    setBookingDetailsState(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      sessionStorage.setItem('zen-inn-booking', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearBooking = useCallback(() => {
    setBookingDetailsState(null);
    setIsBookingInProgress(false);
    sessionStorage.removeItem('zen-inn-booking');
  }, []);

  // Restore from sessionStorage on mount
  React.useEffect(() => {
    const stored = sessionStorage.getItem('zen-inn-booking');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as BookingDetails;
        setBookingDetailsState(parsed);
      } catch (error) {
        console.error('Failed to restore booking from session:', error);
        sessionStorage.removeItem('zen-inn-booking');
      }
    }
  }, []);

  const value: BookingContextType = {
    bookingDetails,
    setBookingDetails,
    updateBookingDetails,
    clearBooking,
    isBookingInProgress,
    setIsBookingInProgress,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

// ==================== HOOK ====================
export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
