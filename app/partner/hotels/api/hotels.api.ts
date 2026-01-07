import type { HotelDTO } from '../dto/hotel.dto';

export const hotelsApi = {
  getHotels: async (): Promise<HotelDTO[]> => {
    // Mock data - replace with actual API call
    return [
      {
        id: '1',
        name: 'Grand Plaza Hotel',
        description: 'Khách sạn 5 sao sang trọng tọa lạc tại trung tâm thành phố với view toàn cảnh tuyệt đẹp. Grand Plaza mang đến trải nghiệm nghỉ dưỡng đẳng cấp với dịch vụ chuyên nghiệp, hồ bơi vô cực và hệ thống nhà hàng cao cấp.',
        address: '123 Main Street',
        city: 'Ho Chi Minh City',
        country: 'Vietnam',
        phone: '+84 28 1234 5678',
        email: 'info@grandplaza.com',
        website: 'https://grandplaza.com',
        rating: 4.8,
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
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
        description: 'Khu nghỉ dưỡng yên bình bên bờ sông với không gian xanh mát và khí hậu trong lành. Riverside Resort là điểm đến lý tưởng cho những ai muốn tìm kiếm sự thư giãn và gần gũi với thiên nhiên.',
        address: '456 River Road',
        city: 'Da Nang',
        country: 'Vietnam',
        phone: '+84 236 1234 5678',
        email: 'info@riverside.com',
        rating: 4.5,
        images: [
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
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
