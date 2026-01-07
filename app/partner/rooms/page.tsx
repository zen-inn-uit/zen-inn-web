import { roomsApi } from './api/rooms.api';
import { RoomsList } from './components/rooms-list';

export default async function RoomsPage() {
  const rooms = await roomsApi.getRooms();

  return <RoomsList initialRooms={rooms} />;
}
