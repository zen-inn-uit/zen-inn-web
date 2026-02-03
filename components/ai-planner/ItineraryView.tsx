'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trip, TripDay, TripActivity } from '@/types/ai-planner/trip.types';
import { MapPin, Clock, Info, CheckCircle, RefreshCcw, Bookmark, Map as MapIcon, Plane, Car, Utensils, Star, Activity } from 'lucide-react';

interface ItineraryViewProps {
  trip: Trip;
}

const TABS = ['Tổng quan', 'Từng ngày', 'Lưu trú', 'Hoạt động', 'Di chuyển & bản đồ', 'Thông tin chi tiêu'];

// Dynamic import for Map to avoid SSR issues
import dynamic from 'next/dynamic';
const TripMap = dynamic(() => import('./TripMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-100 animate-pulse rounded-3xl flex items-center justify-center text-slate-400">Loading Map...</div>
});

export function ItineraryView({ trip }: ItineraryViewProps) {
  const [activeTab, setActiveTab] = useState('Từng ngày');
  const [activeDay, setActiveDay] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<TripActivity | null>(null);

  // Get all activities grouped by type
  const allActivities = trip.days.flatMap(day => day.activities);
  const stayActivities = allActivities.filter(a => a.type === 'CHECK_IN' || a.type === 'CHECK_OUT');
  const experienceActivities = allActivities.filter(a => 
    a.type !== 'CHECK_IN' && a.type !== 'CHECK_OUT' && a.type !== 'TRANSPORTATION'
  );
  
  // Calculate budget insights
  const parsePrice = (priceStr: string): number => {
    if (!priceStr || priceStr.toLowerCase().includes('miễn phí') || priceStr.toLowerCase().includes('đã bao gồm')) return 0;
    const match = priceStr.match(/[\d,]+/);
    if (!match) return 0;
    return parseInt(match[0].replace(/,/g, ''), 10);
  };
  
  const totalEstimatedCost = allActivities.reduce((sum, act) => sum + parsePrice(act.price || '0'), 0);
  const diningCost = allActivities.filter(a => a.type === 'DINING').reduce((sum, act) => sum + parsePrice(act.price || '0'), 0);
  const experienceCost = allActivities.filter(a => a.type === 'EXPERIENCE').reduce((sum, act) => sum + parsePrice(act.price || '0'), 0);
  const transportCost = allActivities.filter(a => a.type === 'TRANSPORTATION').reduce((sum, act) => sum + parsePrice(act.price || '0'), 0);
  const accommodationCost = stayActivities.reduce((sum, act) => sum + parsePrice(act.price || '0'), 0);
  
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

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
          {activeTab === 'Tổng quan' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#6B5B3D] to-[#5A4D34] text-white p-8 rounded-3xl">
                <h2 className="text-3xl font-bold mb-2">{trip.destination}</h2>
                <p className="text-white/80">
                  {new Date(trip.checkIn).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long' })} - {new Date(trip.checkOut).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <div className="flex gap-6 mt-6">
                  <div>
                    <p className="text-white/60 text-sm">Số khách</p>
                    <p className="text-2xl font-bold">{trip.adults + trip.children}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Số ngày</p>
                    <p className="text-2xl font-bold">{trip.days.length}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Hoạt động</p>
                    <p className="text-2xl font-bold">{allActivities.length}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trip.days.map((day) => (
                  <div key={day.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-lg text-[#6B5B3D] mb-3">Ngày {day.dayNumber}</h3>
                    <p className="text-sm text-slate-600 mb-3">{new Date(day.date).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                    <div className="space-y-2">
                      {day.activities.slice(0, 3).map((act) => (
                        <div key={act.id} className="text-xs text-slate-500 flex items-center gap-2">
                          <MapPin size={12} className="text-[#6B5B3D]" />
                          <span className="truncate">{act.name}</span>
                        </div>
                      ))}
                      {day.activities.length > 3 && (
                        <p className="text-xs text-slate-400">+{day.activities.length - 3} hoạt động khác</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day-by-day Tab */}
          {activeTab === 'Từng ngày' && (
            <div className="space-y-12">
              <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar pb-2">
                {trip.days.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => setActiveDay(day.dayNumber)}
                    className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
                      activeDay === day.dayNumber 
                        ? 'bg-[#6B5B3D] text-white shadow-lg scale-105' 
                        : 'bg-white border border-slate-200 text-slate-500 hover:border-[#6B5B3D]/50'
                    }`}
                  >
                    Ngày {day.dayNumber}
                  </button>
                ))}
              </div>

              {trip.days.filter(d => d.dayNumber === activeDay).map((day, idx) => (
                <div key={day.id} className="relative">
                  <h3 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-3">
                    {idx === 0 && activeDay === 1 ? 'Đến nơi & Khám phá' : `Khám phá ${trip.destination.split(',')[0]}`}
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
          {activeTab === 'Lưu trú' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Chỗ ở</h2>
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
                            {activity.price && (
                              <span className="font-medium text-[#6B5B3D]">{activity.price}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">Chưa có thông tin chỗ ở.</p>
              )}
            </div>
          )}

          {/* Experiences Tab */}
          {activeTab === 'Hoạt động' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Hoạt động & Trải nghiệm</h2>
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
                <p className="text-slate-500">Chưa có hoạt động nào.</p>
              )}
            </div>
          )}

          {/* Transport & map Tab */}
          {activeTab === 'Di chuyển & bản đồ' && (
            <div className="space-y-8">
              <div className="bg-slate-900 text-white p-8 rounded-[32px] overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Tổng quan Di chuyển</h3>
                  <p className="text-slate-400">Cách tốt nhất để di chuyển tại {trip.destination}</p>
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
          
          {/* Budget Insights Tab */}
          {activeTab === 'Thông tin chi tiêu' && (
            <div className="space-y-8">
              <div className="bg-white border-2 border-[#6B5B3D] rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[#6B5B3D] mb-2">Tổng chi phí ước tính</h2>
                <p className="text-5xl font-bold text-slate-900 mt-4">{formatVND(totalEstimatedCost)}</p>
                <p className="text-slate-600 mt-2">Cho {trip.adults + trip.children} người × {trip.days.length} ngày</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Utensils className="text-slate-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Ẩm thực</h3>
                      <p className="text-sm text-slate-500">Bữa ăn & đồ uống</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{formatVND(diningCost)}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500">
                      {allActivities.filter(a => a.type === 'DINING').length} bữa ăn
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Star className="text-slate-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Trải nghiệm</h3>
                      <p className="text-sm text-slate-500">Hoạt động & vui chơi</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{formatVND(experienceCost)}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500">
                      {allActivities.filter(a => a.type === 'EXPERIENCE' || a.type === 'ACTIVITY' || a.type === 'RELAXATION').length} hoạt động
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Car className="text-slate-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Di chuyển</h3>
                      <p className="text-sm text-slate-500">Xe & vận chuyển</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{formatVND(transportCost)}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500">
                      {allActivities.filter(a => a.type === 'TRANSPORTATION').length} chuyến đi
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="text-slate-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Lưu trú</h3>
                      <p className="text-sm text-slate-500">Khách sạn & phòng</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{formatVND(accommodationCost)}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500">
                      {stayActivities.length} đêm
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Info size={18} className="text-[#6B5B3D]" />
                  Thông tin bổ sung
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#6B5B3D] font-bold">•</span>
                    <span>Chi phí trên chỉ mang tính chất tham khảo và có thể thay đổi theo thời điểm.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6B5B3D] font-bold">•</span>
                    <span>Ngân sách: <strong>{trip.budget}</strong> (Tiết kiệm / Vừa phải / Cao cấp)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6B5B3D] font-bold">•</span>
                    <span>Sở thích: {trip.preferences?.join(', ') || 'Không có'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6B5B3D] font-bold">•</span>
                    <span>Chi phí trung bình mỗi người mỗi ngày: <strong>{formatVND(totalEstimatedCost / (trip.adults + trip.children) / trip.days.length)}</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Map Sticky View - Only show on Day-by-day tab */}
        {activeTab === 'Từng ngày' && (
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div className="flex items-center justify-between px-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <MapIcon size={18} className="text-[#6B5B3D]" />
                  Điểm đánh dấu
                </h4>
                <span className="text-xs font-bold text-[#6B5B3D] bg-[#6B5B3D]/10 px-2 py-1 rounded-md">Ngày {activeDay}</span>
              </div>
              <div className="h-[400px]">
                <TripMap trip={trip} activeDay={activeDay} selectedActivity={selectedActivity} />
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {selectedActivity 
                    ? `Đang xem: ${selectedActivity.name}`
                    : `Các điểm đánh dấu hiển thị ${trip.days.find(d => d.dayNumber === activeDay)?.activities.length} hoạt động được lên kế hoạch cho ngày này.`
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
                  <MapPin size={14} /> {activity.location || 'Gần đây'}
                </span>
                {activity.price && (
                  <span className="font-medium text-slate-700">{activity.price}</span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all" title="Lưu hoạt động">
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
                Tùy chọn ăn chay
              </button>
            </div>
            
            <button className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-transparent hover:border-slate-100 transition-all">
              <RefreshCcw size={14} />
              Thay đổi với AI
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
