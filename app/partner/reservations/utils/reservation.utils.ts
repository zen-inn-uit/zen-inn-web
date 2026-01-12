import type { ReservationDTO, ReservationStatus } from '../dto/reservation.dto';

/**
 * Get color classes for reservation status badge
 */
export function getStatusColor(status: ReservationStatus): string {
  switch (status) {
    case 'CONFIRMED':
      return 'bg-green-100 text-green-700';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-700';
    case 'CANCELLED':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
}

/**
 * Format date range for display
 */
export function formatDateRange(checkIn: string, checkOut: string): string {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  return `${formatDate(checkIn)} - ${formatDate(checkOut)}`;
}

/**
 * Calculate number of nights
 */
export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Filter reservations by search term
 */
export function filterReservations(
  reservations: ReservationDTO[], 
  searchTerm: string
): ReservationDTO[] {
  if (!searchTerm) return reservations;
  
  const term = searchTerm.toLowerCase();
  return reservations.filter(r => 
    r.id.toLowerCase().includes(term) ||
    r.guest.name.toLowerCase().includes(term) ||
    r.room.toLowerCase().includes(term) ||
    r.status.toLowerCase().includes(term)
  );
}

/**
 * Sort reservations by date
 */
export function sortReservations(
  reservations: ReservationDTO[], 
  direction: 'asc' | 'desc' = 'desc'
): ReservationDTO[] {
  return [...reservations].sort((a, b) => {
    const dateA = new Date(a.checkInDate).getTime();
    const dateB = new Date(b.checkInDate).getTime();
    return direction === 'asc' ? dateA - dateB : dateB - dateA;
  });
}
