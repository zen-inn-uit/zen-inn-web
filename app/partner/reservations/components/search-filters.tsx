'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function SearchAndFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [filterStatus, setFilterStatus] = useState(searchParams.get('status') || 'All Status');
  const [selectedDate, setSelectedDate] = useState(searchParams.get('date') || '');

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'All Status') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex-1 relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search guest, ID, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && updateFilters({ q: searchTerm })}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5D5C3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>
      
      <select
        value={filterStatus}
        onChange={(e) => {
          setFilterStatus(e.target.value);
          updateFilters({ status: e.target.value });
        }}
        className="px-4 py-2.5 bg-white border border-[#E5D5C3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand"
      >
        <option>All Status</option>
        <option>CONFIRMED</option>
        <option>PENDING</option>
        <option>CANCELLED</option>
      </select>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => {
          setSelectedDate(e.target.value);
          updateFilters({ date: e.target.value });
        }}
        className="px-4 py-2.5 bg-white border border-[#E5D5C3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand"
      />



      {isPending && (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-brand border-t-transparent"></div>
      )}
    </div>
  );
}
