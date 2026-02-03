// Mock booking data generator for admin interface
export interface MockBooking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  hotelName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nightCount: number;
  guestCount: number;
  totalPrice: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

const vietnameseNames = [
  "Nguyễn Văn An", "Trần Thị Bình", "Lê Hoàng Minh", "Phạm Thanh Thảo",
  "Hoàng Quốc Việt", "Vũ Thị Hương", "Đặng Minh Tuấn", "Bùi Thị Lan",
  "Ngô Văn Hùng", "Đỗ Thị Mai", "Lý Quang Hải", "Phan Thị Nga",
  "Trương Văn Nam", "Đinh Thị Oanh", "Võ Minh Phúc", "Dương Thị Quỳnh"
];

const internationalNames = [
  "John Smith", "Emily Johnson", "Michael Brown", "Sarah Davis",
  "David Wilson", "Lisa Anderson", "James Taylor", "Jennifer Martinez"
];

const hotels = [
  "Zen Inn Hà Nội", "Zen Inn Đà Nẵng", "Zen Inn Hồ Chí Minh",
  "Zen Inn Phú Quốc", "Zen Inn Nha Trang", "Zen Inn Đà Lạt"
];

const rooms = [
  "Deluxe Ocean View", "Superior Twin", "Standard Double",
  "Executive Suite", "Luxury Suite", "Family Room",
  "Premium King", "Garden View Room"
];

const statuses: MockBooking["status"][] = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
const paymentStatuses: MockBooking["paymentStatus"][] = ["PENDING", "COMPLETED", "FAILED", "REFUNDED"];
const paymentMethods = ["CASH", "SEPAY", "BANK_TRANSFER", "VNPAY"];

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateMockBookings(count: number = 50): MockBooking[] {
  const bookings: MockBooking[] = [];
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const threeMonthsLater = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

  for (let i = 0; i < count; i++) {
    const isVietnamese = Math.random() > 0.3;
    const guestName = isVietnamese ? randomItem(vietnameseNames) : randomItem(internationalNames);
    const checkIn = randomDate(threeMonthsAgo, threeMonthsLater);
    const nightCount = Math.floor(Math.random() * 7) + 1;
    const checkOut = new Date(checkIn.getTime() + nightCount * 24 * 60 * 60 * 1000);
    const pricePerNight = Math.floor(Math.random() * 2000000) + 800000;
    const subtotal = pricePerNight * nightCount;
    const taxes = Math.round(subtotal * 0.1);
    const totalPrice = subtotal + taxes;
    
    const status = randomItem(statuses);
    const paymentStatus = status === "CANCELLED" ? "REFUNDED" : 
                         status === "PENDING" ? "PENDING" : "COMPLETED";
    
    const createdAt = new Date(checkIn.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    
    bookings.push({
      id: `ZEN-${Date.now()}-${i}`,
      guestName,
      guestEmail: guestName.toLowerCase().replace(/\s+/g, ".") + "@example.com",
      guestPhone: isVietnamese ? `+84 ${Math.floor(Math.random() * 900000000) + 100000000}` : 
                                  `+${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      hotelName: randomItem(hotels),
      roomName: randomItem(rooms),
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      nightCount,
      guestCount: Math.floor(Math.random() * 4) + 1,
      totalPrice,
      status,
      paymentStatus,
      paymentMethod: randomItem(paymentMethods),
      createdAt: createdAt.toISOString(),
      updatedAt: new Date(createdAt.getTime() + Math.random() * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
