'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Trip, TripActivity } from '@/types/ai-planner/trip.types';

// Fix Leaflet icon issue in Next.js
const fixLeafletIcon = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
};

interface TripMapProps {
  trip: Trip;
  activeDay?: number;
  selectedActivity?: TripActivity | null;
}

// Mock coordinates for Da Lat locations to demonstrate markers
const LOCATION_COORDS: Record<string, [number, number]> = {
  'Hotel Colline, Da Lat': [11.9429, 108.4379],
  'Xuan Huong Lake': [11.9392, 108.4447],
  'Da Lat Night Market': [11.9431, 108.4380],
  'Cau Dat Tea Hill': [11.8398, 108.5702],
  'Trai Mat, Da Lat': [11.9392, 108.4870],
  'Tu Tu Mushroom Hotpot': [11.9348, 108.4419],
  '72 Nguyen Trai': [11.9482, 108.4518],
};

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 14); // Zoom in a bit when focusing
  }, [center, map]);
  return null;
}

export default function TripMap({ trip, activeDay = 1, selectedActivity }: TripMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fixLeafletIcon();
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-slate-100 animate-pulse rounded-3xl" />;

  const dayActivities = trip.days.find(d => d.dayNumber === activeDay)?.activities || [];
  
  // Get all markers for the active day
  const markers = dayActivities
    .map(act => ({
      ...act,
      coords: LOCATION_COORDS[act.location || ''] || [11.9416, 108.4383] // Default to Da Lat center
    }))
    .filter(m => m.coords);

  // If an activity is selected, center on it; otherwise use first marker or default
  let center: [number, number] = [11.9416, 108.4383];
  if (selectedActivity) {
    const selectedMarker = markers.find(m => m.id === selectedActivity.id);
    if (selectedMarker) {
      center = selectedMarker.coords;
    }
  } else if (markers.length > 0) {
    center = markers[0].coords;
  }

  return (
    <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-inner border border-slate-200">
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={center} />
        {markers.map((marker, idx) => (
          <Marker key={marker.id} position={marker.coords}>
            <Popup>
              <div className="p-1">
                <h4 className="font-bold text-slate-800 m-0">{marker.name}</h4>
                <p className="text-xs text-slate-500 m-0 mt-1">{marker.time}</p>
                <p className="text-xs m-0 mt-1">{marker.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
