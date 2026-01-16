'use client';

import React from 'react';
import { Header } from '../components/home/Header';
import { SearchSection } from '../components/home/SearchSection';
import { QuickPlanning } from '../components/home/QuickPlanning';
import { ListingGrid } from '../components/home/ListingGrid';
import { TrendingDestinations } from '../components/home/TrendingDestinations';
import { PropertyTypes } from '../components/home/PropertyTypes';
import { ExploreVietnam } from '../components/home/ExploreVietnam';
import { ShowMore } from '../components/home/ShowMore';
import { Suspense } from 'react';

export default function Home() {
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
        <Header />
        <Suspense fallback={null}>
          <SearchSection />
        </Suspense>
        <QuickPlanning />
        <ListingGrid />
        <TrendingDestinations />
        <PropertyTypes />
        <ExploreVietnam />
        <ShowMore />
      </div>

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

        @keyframes popupFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
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