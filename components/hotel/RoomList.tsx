"use client";

import RoomCard from "./RoomCard";

interface Room {
    name: string;
    bedInfo: string;
    capacity: string;
    cancellationPolicy: string;
    pricePerNight: number;
    totalPrice: number;
    nights: number;
}

interface RoomListProps {
    rooms: Room[];
}

export default function RoomList({ rooms }: RoomListProps) {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                Available Rooms
            </h2>
            <div className="space-y-4">
                {rooms.map((room, index) => (
                    <RoomCard
                        key={index}
                        name={room.name}
                        bedInfo={room.bedInfo}
                        capacity={room.capacity}
                        cancellationPolicy={room.cancellationPolicy}
                        pricePerNight={room.pricePerNight}
                        totalPrice={room.totalPrice}
                        nights={room.nights}
                    />
                ))}
            </div>
        </div>
    );
}

