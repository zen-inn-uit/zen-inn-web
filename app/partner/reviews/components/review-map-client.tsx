'use client';

import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CountryReviewDTO } from '../dto/review.dto';
import { useEffect } from 'react';

const fixLeafletIcon = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
};

interface MapControllerProps {
  center?: [number, number];
}

function MapController({ center }: MapControllerProps) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 5, {
        duration: 2,
        easeLinearity: 0.25
      });
    }
  }, [center, map]);
  return null;
}

interface ReviewMapProps {
  data: CountryReviewDTO[];
  selectedLocation?: [number, number];
}

export default function ReviewMap({ data, selectedLocation }: ReviewMapProps) {
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  const validData = data.filter(d => d.lat !== undefined && d.lng !== undefined);

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <MapController center={selectedLocation} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {validData.map((item, idx) => (
          <CircleMarker
            key={idx}
            center={[item.lat!, item.lng!]}
            radius={Math.sqrt(item.count) + 4}
            pathOptions={{
              color: '#8B6F47',
              fillColor: '#8B6F47',
              fillOpacity: 0.4,
              weight: 1
            }}
          >
            <Popup>
              <div className="p-2 min-w-[120px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#3D2E1F]">{item.country}</span>
                  <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">{item.percentage}%</span>
                </div>
                <div className="text-xs text-slate-500">{item.count.toLocaleString()} reviews</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      
      <div className="absolute top-4 right-4 z-[1000] bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#E5D5C3] shadow-sm pointer-events-none">
        <div className="flex items-center gap-2 text-[10px] font-bold text-[#6B5B3D] uppercase tracking-wider">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          Interactive View Enabled
        </div>
      </div>
    </div>
  );
}
