export interface Listing {
  id: number;
  slug: string;
  image: string;
  title: string;
  distance: string;
  date: string;
  price: string;
  rating: number;
  host: string;
  badge: string;
  position?: { x: number; y: number };
  bedrooms?: number;
  guests?: number;
  description?: string;
  reviews?: number;
}
