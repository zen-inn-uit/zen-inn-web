import type { HotelDTO } from '../dto/hotel.dto';

export const hotelsApi = {
  getHotels: async (): Promise<HotelDTO[]> => {
    // Mock data - replace with actual API call
    return [
      {
        id: '1',
        name: 'Grand Plaza Hotel',
        description: 'Luxury 5-star hotel in the heart of the city',
        address: '123 Main Street',
        city: 'Ho Chi Minh City',
        country: 'Vietnam',
        phone: '+84 28 1234 5678',
        email: 'info@grandplaza.com',
        website: 'https://grandplaza.com',
        rating: 4.8,
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        ],
        amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa'],
        checkInTime: '14:00',
        checkOutTime: '12:00',
        totalRooms: 150,
        availableRooms: 45,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-07T00:00:00Z',
      },
      {
        id: '2',
        name: 'Riverside Resort',
        description: 'Beautiful resort by the river',
        address: '456 River Road',
        city: 'Da Nang',
        country: 'Vietnam',
        phone: '+84 236 1234 5678',
        email: 'info@riverside.com',
        rating: 4.5,
        images: [
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
        ],
        amenities: ['WiFi', 'Pool', 'Beach Access', 'Restaurant'],
        checkInTime: '15:00',
        checkOutTime: '11:00',
        totalRooms: 80,
        availableRooms: 20,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-07T00:00:00Z',
      },
    ];
  },
};
