'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trip, TripDay, TripActivity } from '@/types/ai-planner/trip.types';
import { MapPin, Clock, Info, CheckCircle, RefreshCcw, Bookmark, Map as MapIcon, Plane, Car, Utensils, Star, Activity } from 'lucide-react';

interface ItineraryViewProps {
  trip: Trip;
}

const TABS = ['Overview', 'Day-by-day', 'Stays', 'Experiences', 'Transport & map'];

// Dynamic import for Map to avoid SSR issues
import dynamic from 'next/dynamic';
const TripMap = dynamic(() => import('./TripMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-100 animate-pulse rounded-3xl flex items-center justify-center text-slate-400">Loading Map...</div>
});

export function ItineraryView({ trip }: ItineraryViewProps) {
  const [activeTab, setActiveTab] = useState('Day-by-day');
  const [activeDay, setActiveDay] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<TripActivity | null>(null);

  // Get all activities grouped by type
  const allActivities = trip.days.flatMap(day => day.activities);
  const stayActivities = allActivities.filter(a => a.type === 'CHECK_IN' || a.type === 'CHECK_OUT');
  const experienceActivities = allActivities.filter(a => 
    a.type !== 'CHECK_IN' && a.type !== 'CHECK_OUT' && a.type !== 'TRANSPORTATION'
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Tabs */}
      <div className="flex border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar gap-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all relative ${
              activeTab === tab ? 'text-[#6B5B3D]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTabOutline" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6B5B3D]"
              />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          {/* Overview Tab */}
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#6B5B3D] to-[#5A4D34] text-white p-8 rounded-3xl">
                <h2 className="text-3xl font-bold mb-2">{trip.destination}</h2>
                <p className="text-white/80">
                  {new Date(trip.checkIn).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {new Date(trip.checkOut).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <div className="flex gap-6 mt-6">
                  <div>
                    <p className="text-white/60 text-sm">Travelers</p>
                    <p className="text-2xl font-bold">{trip.adults + trip.children}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Days</p>
                    <p className="text-2xl font-bold">{trip.days.length}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Activities</p>
                    <p className="text-2xl font-bold">{allActivities.length}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trip.days.map((day) => (
                  <div key={day.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-lg text-[#6B5B3D] mb-3">Day {day.dayNumber}</h3>
                    <p className="text-sm text-slate-600 mb-3">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                    <div className="space-y-2">
                      {day.activities.slice(0, 3).map((act) => (
                        <div key={act.id} className="text-xs text-slate-500 flex items-center gap-2">
                          <MapPin size={12} className="text-[#6B5B3D]" />
                          <span className="truncate">{act.name}</span>
                        </div>
                      ))}
                      {day.activities.length > 3 && (
                        <p className="text-xs text-slate-400">+{day.activities.length - 3} more</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day-by-day Tab */}
          {activeTab === 'Day-by-day' && (
            <div className="space-y-12">
              <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar pb-2">
                {trip.days.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => setActiveDay(day.dayNumber)}
                    className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                      activeDay === day.dayNumber 
                        ? 'bg-[#6B5B3D] text-white shadow-lg scale-105' 
                        : 'bg-white border border-slate-200 text-slate-500 hover:border-[#6B5B3D]/50'
                    }`}
                  >
                    Day {day.dayNumber}
                  </button>
                ))}
              </div>

              {trip.days.filter(d => d.dayNumber === activeDay).map((day, idx) => (
                <div key={day.id} className="relative">
                  <h3 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-3">
                    {idx === 0 && activeDay === 1 ? 'Arrival & Discovery' : `Exploring ${trip.destination.split(',')[0]}`}
                  </h3>
                  
                  <div className="space-y-8 relative border-l-2 border-slate-100 ml-6 pl-10">
                    {day.activities.map((activity, actIdx) => (
                      <ActivityCard 
                        key={activity.id} 
                        activity={activity} 
                        index={actIdx}
                        onSelect={() => setSelectedActivity(activity)}
                        isSelected={selectedActivity?.id === activity.id}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stays Tab */}
          {activeTab === 'Stays' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Accommodation</h2>
              {stayActivities.length > 0 ? (
                <div className="space-y-4">
                  {stayActivities.map((activity) => (
                    <div key={activity.id} className="bg-white border border-slate-200 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#6B5B3D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="text-[#6B5B3D]" size={24} />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-lg text-slate-900">{activity.name}</h3>
                          <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                          <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {activity.time}
                            </span>
                            {activity.location && (
                              <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {activity.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">No accommodation information available.</p>
              )}
            </div>
          )}

          {/* Experiences Tab */}
          {activeTab === 'Experiences' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Activities & Experiences</h2>
              {experienceActivities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experienceActivities.map((activity) => {
                    const Icon = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 text-slate-400">
                            {Icon}
                          </div>
                          <div className="flex-grow min-w-0">
                            <h3 className="font-bold text-slate-900 truncate">{activity.name}</h3>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{activity.description}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                              <span>{activity.time}</span>
                              {activity.price && <span className="font-medium text-[#6B5B3D]">{activity.price}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-500">No experiences available.</p>
              )}
            </div>
          )}

          {/* Transport & map Tab */}
          {activeTab === 'Transport & map' && (
            <div className="space-y-8">
              <div className="bg-slate-900 text-white p-8 rounded-[32px] overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Transport Overview</h3>
                  <p className="text-slate-400">Best ways to get around {trip.destination}</p>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-20">
                  <Car size={80} />
                </div>
              </div>
              <div className="h-[500px]">
                <TripMap trip={trip} activeDay={activeDay} selectedActivity={selectedActivity} />
              </div>
            </div>
          )}
        </div>

        {/* Map Sticky View - Only show on Day-by-day tab */}
        {activeTab === 'Day-by-day' && (
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div className="flex items-center justify-between px-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <MapIcon size={18} className="text-[#6B5B3D]" />
                  Map Markers
                </h4>
                <span className="text-xs font-bold text-[#6B5B3D] bg-[#6B5B3D]/10 px-2 py-1 rounded-md">Day {activeDay}</span>
              </div>
              <div className="h-[400px]">
                <TripMap trip={trip} activeDay={activeDay} selectedActivity={selectedActivity} />
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {selectedActivity 
                    ? `Focused on: ${selectedActivity.name}`
                    : `Markers show locations for ${trip.days.find(d => d.dayNumber === activeDay)?.activities.length} activities planned for this day.`
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ActivityCard({ activity, index, onSelect, isSelected }: { 
  activity: TripActivity; 
  index: number;
  onSelect?: () => void;
  isSelected?: boolean;
}) {
  const Icon = getActivityIcon(activity.type);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative cursor-pointer"
      onClick={onSelect}
    >
      {/* Time marker */}
      <div className="absolute -left-12 top-0 transform -translate-x-full">
        <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap uppercase tracking-wider">
          {activity.time}
        </span>
      </div>
      
      {/* Small dot on line */}
      <div className="absolute -left-[32.5px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-slate-200 group-hover:border-rose-500 transition-colors z-10 shadow-sm" />

      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 p-6">
        <div className="w-full md:w-32 h-32 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 relative">
          {activity.imageUrl ? (
            <img src={activity.imageUrl} alt={activity.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              {Icon}
            </div>
          )}
        </div>
        
        <div className="flex-grow flex flex-col">
          <div className="flex justify-between items-start gap-4 mb-2">
            <div>
              <h4 className="font-bold text-slate-900 text-lg group-hover:text-rose-600 transition-colors">
                {activity.name}
              </h4>
              <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {activity.location || 'Nearby'}
                </span>
                {activity.price && (
                  <span className="font-medium text-slate-700">Approx. {activity.price}</span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all" title="Save activity">
                <Bookmark size={18} />
              </button>
            </div>
          </div>
          
          <p className="text-slate-500 text-sm line-clamp-2 mt-2 leading-relaxed">
            {activity.description}
          </p>

          <div className="mt-auto pt-6 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-slate-50 text-slate-500 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-colors">
                Find vegetarian options
              </button>
            </div>
            
            <button className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-transparent hover:border-slate-100 transition-all">
              <RefreshCcw size={14} />
              Swap with AI
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function getActivityIcon(type: string) {
  switch (type) {
    case 'DINING': return <Utensils size={32} />;
    case 'TRANSPORTATION': return <Car size={32} />;
    case 'CHECK_IN':
    case 'CHECK_OUT': return <CheckCircle size={32} />;
    case 'RELAXATION': return <MapPin size={32} />;
    case 'EXPERIENCE': return <Star size={32} />;
    default: return <Activity size={32} />;
  }
}
