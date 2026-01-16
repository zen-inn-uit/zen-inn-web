import { Listing } from '../types/home';

export const listings: Listing[] = [
  {
    id: 1,
    slug: 'luxury-villa-with-private-pool',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
    title: 'Luxury Villa with Private Pool',
    distance: '12 km away from Da Nang',
    date: 'Dec 24-29',
    price: '150€',
    rating: 4.95,
    host: 'Nguyen Van A',
    badge: 'Superhost',
    bedrooms: 3,
    guests: 6,
    reviews: 128,
    description: 'A beautiful luxury villa located in the heart of Da Nang, featuring a private swimming pool and modern amenities.'
  },
  {
    id: 2,
    slug: 'modern-apartment-with-sea-view',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
    title: 'Modern Apartment with Sea View',
    distance: '2 km away from Nha Trang Beach',
    date: 'Jan 10-15',
    price: '85€',
    rating: 4.88,
    host: 'Tran Thi B',
    badge: 'New',
    bedrooms: 1,
    guests: 2,
    reviews: 45,
    description: 'Enjoy the stunning sunrise from your balcony in this modern seafront apartment in Nha Trang.'
  },
  {
    id: 3,
    slug: 'cozy-mountain-lodge',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    title: 'Cozy Mountain Lodge',
    distance: '5 km away from Sapa Center',
    date: 'Feb 14-19',
    price: '60€',
    rating: 4.75,
    host: 'Le Van C',
    badge: 'Best Value',
    bedrooms: 2,
    guests: 4,
    reviews: 89,
    description: 'Experience the chilly weather and beautiful rice terraces from this cozy wooden lodge in Sapa.'
  },
  {
    id: 4,
    slug: 'boutique-hotel-in-old-quarter',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    title: 'Boutique Hotel in Old Quarter',
    distance: '0.1 km away from Hoan Kiem Lake',
    date: 'Nov 29-Dec 02',
    price: '95€',
    rating: 4.90,
    host: 'Pham Van D',
    badge: 'Historic',
    bedrooms: 1,
    guests: 2,
    reviews: 210,
    description: 'A charming boutique hotel located in the heart of Hanoi Old Quarter, within walking distance to Hoan Kiem Lake.'
  },
  {
    id: 5,
    slug: 'traditional-wooden-house',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    title: 'Traditional Wooden House',
    distance: '1.5 km away from Hoi An Ancient Town',
    date: 'Oct 02-07',
    price: '75€',
    rating: 4.82,
    host: 'Bui Thi E',
    badge: 'Authentic',
    bedrooms: 2,
    guests: 4,
    reviews: 132,
    description: 'Live like a local in this beautifully preserved traditional wooden house near Hoi An Ancient Town.'
  },
  {
    id: 6,
    slug: 'phu-quoc-beachfront-bungalow',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    title: 'Phu Quoc Beachfront Bungalow',
    distance: '0.01 km away from Long Beach',
    date: 'Dec 15-20',
    price: '120€',
    rating: 4.92,
    host: 'Miles Morales',
    badge: 'Beachfront',
    bedrooms: 1,
    guests: 2,
    reviews: 67,
    description: 'Step directly onto the white sand from your doorstep in this bungalow at one of Phu Quoc\'s best beaches.'
  },
  {
    id: 7,
    slug: 'penthouse-apartment-with-city-view',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
    title: 'Penthouse Apartment with City View',
    distance: '0.5 km away from Ben Thanh Market',
    date: 'Nov 20-25',
    price: '200€',
    rating: 4.85,
    host: 'Jack Samurai',
    badge: 'Luxury',
    bedrooms: 3,
    guests: 6,
    reviews: 58,
    description: 'A spacious and luxurious penthouse with 360-degree views of Ho Chi Minh City skyline.'
  },
  {
    id: 8,
    slug: 'heritage-villa-in-dalat',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    title: 'Heritage Villa in Dalat',
    distance: '3.2 km away from Dalat Flower Park',
    date: 'Oct 20-25',
    price: '110€',
    rating: 4.78,
    host: 'Alfredo Linguini',
    badge: 'Pet-friendly',
    bedrooms: 4,
    guests: 8,
    reviews: 94,
    description: 'A French-style heritage villa surrounded by pine forests and flower gardens in the misty city of Dalat.'
  }
];

export const planningTabs = [
  { label: 'Bãi Biển', data: [
    { name: 'Vũng Tàu', distance: 'Cách đây 73 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
    { name: 'Mũi Né', distance: 'Cách đây 175 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
    { name: 'Côn Đảo', distance: 'Cách đây 238 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
    { name: 'Phú Quốc', distance: 'Cách đây 299 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
    { name: 'Quy Nhơn', distance: 'Cách đây 432 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
    { name: 'Hội An', distance: 'Cách đây 592 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' }
  ]},
  { label: 'Nhiệt Ẩm', data: [
    { name: 'Hà Nội', distance: 'Cách đây 120 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
    { name: 'Huế', distance: 'Cách đây 250 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
    { name: 'Đà Nẵng', distance: 'Cách đây 320 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
    { name: 'Nha Trang', distance: 'Cách đây 410 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
    { name: 'Cần Thơ', distance: 'Cách đây 180 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
    { name: 'Phan Thiết', distance: 'Cách đây 220 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' }
  ]},
  { label: 'Thiên Hiểm Lịch Sử', data: [
    { name: 'Hội An', distance: 'Cách đây 592 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
    { name: 'Huế', distance: 'Cách đây 250 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
    { name: 'Hà Nội', distance: 'Cách đây 120 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
    { name: 'Ninh Bình', distance: 'Cách đây 95 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
    { name: 'Mỹ Sơn', distance: 'Cách đây 610 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
    { name: 'Cù Lao Chàm', distance: 'Cách đây 605 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' }
  ]},
  { label: 'Chợ & Mua Sắm', data: [
    { name: 'TP. HCM', distance: 'Cách đây 15 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
    { name: 'Hà Nội', distance: 'Cách đây 120 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
    { name: 'Đà Nẵng', distance: 'Cách đây 320 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
    { name: 'Cần Thơ', distance: 'Cách đây 180 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
    { name: 'Hải Phòng', distance: 'Cách đây 105 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
    { name: 'Biên Hòa', distance: 'Cách đây 35 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' }
  ]},
  { label: 'Sang Trọng & Thư Giãn', data: [
    { name: 'Đà Lạt', distance: 'Cách đây 305 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
    { name: 'Phú Quốc', distance: 'Cách đây 299 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
    { name: 'Nha Trang', distance: 'Cách đây 410 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' },
    { name: 'Côn Đảo', distance: 'Cách đây 238 km', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop' },
    { name: 'Hội An', distance: 'Cách đây 592 km', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&h=200&fit=crop' },
    { name: 'Vũng Tàu', distance: 'Cách đây 73 km', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&h=200&fit=crop' }
  ]}
];
