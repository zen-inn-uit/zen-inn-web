import { Trip, ActivityType, TripBudget } from './trip.types';

export const MOCK_TRIP: Trip = {
  id: 'mock-trip-123',
  destination: 'Da Lat, Vietnam',
  checkIn: '2026-05-01T00:00:00Z',
  checkOut: '2026-05-04T00:00:00Z',
  adults: 2,
  children: 0,
  budget: TripBudget.MODERATE,
  preferences: ['Relaxing', 'Nature', 'Romantic'],
  createdAt: new Date().toISOString(),
  days: [
    {
      id: 'day-1',
      dayNumber: 1,
      date: '2026-05-01T00:00:00Z',
      activities: [
        {
          id: 'act-1-1',
          name: 'Arrival & Check-in at Colline Hotel',
          description: 'Check into your boutique stay and freshen up after the journey. Enjoy the panoramic views of the city.',
          time: '02:00 PM',
          type: ActivityType.CHECK_IN,
          location: 'Hotel Colline, Da Lat',
          price: 'Included',
          imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400',
        },
        {
          id: 'act-1-2',
          name: 'Stroll around Xuan Huong Lake',
          description: 'A peaceful walk around the heart of Da Lat. Perfect for photos and enjoying the cool breeze.',
          time: '04:30 PM',
          type: ActivityType.ACTIVITY,
          location: 'Xuan Huong Lake',
          price: 'Free',
          imageUrl: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=400',
        },
        {
          id: 'act-1-3',
          name: 'Dinner at Da Lat Night Market',
          description: 'Sample local street food like grilled rice paper (Banh Trang Nuong) and hot soy milk.',
          time: '07:00 PM',
          type: ActivityType.DINING,
          location: 'Da Lat Night Market',
          price: '₹500 - ₹1,000',
          imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400',
        }
      ]
    },
    {
      id: 'day-2',
      dayNumber: 2,
      date: '2026-05-02T00:00:00Z',
      activities: [
        {
          id: 'act-2-1',
          name: 'Early Morning at Cau Dat Tea Hill',
          description: 'Catch the sunrise and the "cloud hunting" experience at the vast green tea plantations.',
          time: '05:30 AM',
          type: ActivityType.EXPERIENCE,
          location: 'Cau Dat Tea Hill',
          price: 'Free',
          imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=400',
        },
        {
          id: 'act-2-2',
          name: 'Linh Phuoc Pagoda visit',
          description: 'Explore the "Glass Pagoda" famous for its intricate mosaics made from broken pottery.',
          time: '10:00 AM',
          type: ActivityType.ACTIVITY,
          location: 'Trai Mat, Da Lat',
          price: 'Free',
          imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=400',
        },
        {
          id: 'act-2-3',
          name: 'Lunch at Forest Mushroom Hotpot',
          description: 'Taste the famous specialized mushroom hotpot, a signature dish of the highlands.',
          time: '12:30 PM',
          type: ActivityType.DINING,
          location: 'Tu Tu Mushroom Hotpot',
          price: '₹1,500 - ₹2,500',
        },
        {
          id: 'act-2-4',
          name: 'Sunset Coffee at Still Cafe',
          description: 'Relax in this Japanese-style complex with multiple small cafes and beautiful decor.',
          time: '04:00 PM',
          type: ActivityType.RELAXATION,
          location: '72 Nguyen Trai',
          price: '₹400 - ₹800',
        }
      ]
    }
  ]
};
