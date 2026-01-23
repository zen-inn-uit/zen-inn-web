export interface Listing {
  id: string;
  slug: string;
  image: string[];
  title: string;
  location: string;
  date?: string;
  price: string | number;
  rating: number;
  host?: string;
  badge?: string;
  position?: { x: number; y: number };
  bedrooms?: number;
  guests?: number;
  description?: string;
  reviews?: number;
  distance?: string;
  type?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  isFavorite?: boolean;
}
