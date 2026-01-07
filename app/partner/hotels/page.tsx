import { hotelsApi } from './api/hotels.api';
import { HotelsList } from './components/hotels-list';

export default async function HotelsPage() {
  const hotels = await hotelsApi.getHotels();

  return <HotelsList initialHotels={hotels} />;
}
