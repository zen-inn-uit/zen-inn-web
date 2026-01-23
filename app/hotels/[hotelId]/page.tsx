"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import ChatButton from "@/components/ui/chat-button";
import MiniMap from "@/components/search/MiniMap";
import Breadcrumbs from "@/components/hotel/Breadcrumbs";
import WishlistButton from "@/components/hotel/WishlistButton";
import BookingSummaryCard from "@/components/hotel/BookingSummaryCard";
import RoomList from "@/components/hotel/RoomList";
import HotelPolicies from "@/components/hotel/HotelPolicies";
import HotelReviews from "@/components/hotel/HotelReviews";
import { ImageViewer } from "@/components/ui/image-viewer";
import { hotelApi, HotelDetailResponse } from "@/lib/api/hotel-api";

export default function HotelDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const hotelId = params.hotelId as string;
    
    const [hotelData, setHotelData] = useState<HotelDetailResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);

    useEffect(() => {
        const fetchHotelDetail = async () => {
            try {
                setLoading(true);
                const checkIn = searchParams.get('checkIn') || undefined;
                const checkOut = searchParams.get('checkOut') || undefined;
                const adults = searchParams.get('adults') ? parseInt(searchParams.get('adults')!) : undefined;
                const rooms = searchParams.get('rooms') ? parseInt(searchParams.get('rooms')!) : undefined;

                const data = await hotelApi.getHotelDetail(hotelId, {
                    checkIn,
                    checkOut,
                    adults,
                    rooms,
                });
                setHotelData(data);
            } catch (err: any) {
                console.error('Failed to fetch hotel detail:', err);
                setError(err.message || 'Failed to load hotel details');
            } finally {
                setLoading(false);
            }
        };

        fetchHotelDetail();
    }, [hotelId, searchParams]);

    const handleSelectRoom = (roomIndex: number) => {
        setSelectedRoomIndex(roomIndex);
    };

    const handleImageClick = (index: number) => {
        setCurrentImageIndex(index);
        setShowAllPhotos(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <header>
                    <Navbar showSearch={false} />
                </header>
                <main className="max-w-[1140px] mx-auto px-4 md:px-6 pt-24">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B5B3D]"></div>
                            <p className="mt-4 text-gray-600">Đang tải thông tin khách sạn...</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (error || !hotelData) {
        return (
            <div className="min-h-screen bg-white">
                <header>
                    <Navbar showSearch={false} />
                </header>
                <main className="max-w-[1140px] mx-auto px-4 md:px-6 pt-24">
                    <div className="text-center py-12">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy khách sạn</h1>
                        <p className="text-gray-600">{error || 'Khách sạn này không tồn tại hoặc đã bị xóa.'}</p>
                    </div>
                </main>
            </div>
        );
    }

    const { hotel, rooms: hotelRooms } = hotelData;

    // Transform rooms for components that expect the old format
    const transformedRooms = hotelRooms.map(room => ({
        name: room.roomName,
        bedInfo: room.bedInfo || 'N/A',
        capacity: `${room.maxGuests} guests`,
        cancellationPolicy: room.refundable ? 'Free cancellation' : room.cancellationPolicyText || 'Non-refundable',
        pricePerNight: room.pricePerNight || 0,
        totalPrice: (room.pricePerNight || 0) * 3, // TODO: Calculate based on actual nights
        nights: 3, // TODO: Get from search params
    }));

    return (
        <div className="min-h-screen bg-white">
            <header>
                <Navbar showSearch={false} />
            </header>

            <main>
                {/* Breadcrumbs */}
                <div className="max-w-[1140px] mx-auto px-4 md:px-6 pt-4">
                    <Breadcrumbs hotelName={hotel.name} location={`${hotel.city}, ${hotel.country || ''}`} />
                </div>

                {/* Photo Gallery - Booking.com style */}
                <div className="max-w-[1140px] mx-auto px-4 md:px-6 mt-4 animate-fade-in">
                    <div className="grid grid-cols-4 gap-2 h-[420px] rounded-lg overflow-hidden">
                        {/* Main large photo - left side */}
                        <div className="col-span-2 row-span-2 relative group cursor-pointer image-hover-zoom" onClick={() => handleImageClick(0)}>
                            <img 
                                src={hotel.images[0]} 
                                alt={hotel.name}
                                className="w-full h-full object-cover transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                        </div>
                        
                        {/* Right side - 4 smaller photos in 2x2 grid */}
                        {hotel.images.slice(1, 5).map((img, idx) => (
                            <div key={idx} className="relative group cursor-pointer image-hover-zoom" onClick={() => handleImageClick(idx + 1)}>
                                <img 
                                    src={img} 
                                    alt={`${hotel.name} - ${idx + 2}`}
                                    className="w-full h-full object-cover transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                                {idx === 3 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <button 
                                            className="bg-white px-4 py-2 rounded-md text-sm font-semibold button-hover-lift transition-all"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowAllPhotos(true);
                                            }}
                                        >
                                            Show all photos
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main content area */}
                <div className="max-w-[1140px] mx-auto px-4 md:px-6 mt-8">
                    <div className="flex gap-8">
                        {/* Left column - Main content */}
                        <div className="flex-1 min-w-0">
                            {/* Title and rating */}
                            <div className="flex items-start justify-between mb-4 animate-fade-in-up">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-[#003B95] text-white px-2 py-1 rounded text-xs font-bold animate-scale-in">
                                            Hotel
                                        </span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-[#FEBB02] transition-transform hover:scale-125" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#262626' }}>
                                        {hotel.name}
                                    </h1>
                                    <p className="text-sm mb-2" style={{ color: '#006CE4' }}>
                                        📍 {hotel.address}, {hotel.city} - <span className="underline cursor-pointer hover:text-[#0057B8] transition-colors">Show on map</span>
                                    </p>
                                </div>
                                <WishlistButton />
                            </div>

                            {/* Description */}
                            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: '#262626' }}>
                                    About this property
                                </h2>
                                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '14px' }}>
                                    {hotel.description}
                                </p>
                            </div>

                            {/* Facilities */}
                            <div className="mb-8 pb-8 border-b border-gray-200 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: '#262626' }}>
                                    Most popular facilities
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 stagger-fade-in">
                                    {hotel.facilities.map((facility, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm transition-smooth hover:translate-x-1">
                                            <svg className="w-5 h-5 text-[#008009]" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Rooms section */}
                            <div className="mb-8">
                                <RoomList rooms={transformedRooms} onSelectRoom={handleSelectRoom} />
                            </div>

                            {/* Reviews */}
                            <div className="mb-8">
                                <HotelReviews
                                    overallRating={hotel.rating || 0}
                                    reviewCount={hotel.reviewCount}
                                    reviews={[]}
                                />
                            </div>

                            {/* Policies */}
                            <div className="mb-8">
                                <HotelPolicies />
                            </div>

                            {/* Location */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: '#262626' }}>
                                    Location
                                </h2>
                                <MiniMap 
                                    hotelName={hotel.name}
                                    address={hotel.address}
                                    city={hotel.city}
                                    country={hotel.country || ''}
                                />
                            </div>
                        </div>

                        {/* Right column - Sticky booking card */}
                        <div className="hidden lg:block w-[380px] flex-shrink-0">
                            <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
                                <BookingSummaryCard
                                    rooms={transformedRooms}
                                    nights={3}
                                    checkIn={searchParams.get('checkIn') || ''}
                                    checkOut={searchParams.get('checkOut') || ''}
                                    guests={`${searchParams.get('adults') || 2} guests, ${searchParams.get('rooms') || 1} room`}
                                    selectedRoomIndex={selectedRoomIndex}
                                    onRoomChange={setSelectedRoomIndex}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer id="footer" className="py-12 px-6 mt-20 bg-[#F5F5F5]">
                <div className="max-w-[1140px] mx-auto">
                    <div className="border-t-2 border-[var(--color-primary)] pt-4 text-center">
                        <p className="text-secondary" style={{ fontFamily: 'var(--font-body)' }}>
                            &copy; {new Date().getFullYear()} Zen Inn. Powered by <span className="text-accent">Group 15</span>.<br />All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Floating chat button */}
            <ChatButton />

            {/* Image Viewer Modal */}
            <ImageViewer
                isOpen={showAllPhotos}
                onClose={() => setShowAllPhotos(false)}
                images={hotel.images}
                currentIndex={currentImageIndex}
                onIndexChange={setCurrentImageIndex}
                title={hotel.name}
                description={`${hotel.city}, ${hotel.country || ''}`}
            />
        </div>
    );
}
