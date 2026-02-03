// Mock revenue data generator for admin interface
export interface DailyRevenue {
  date: string;
  revenue: number;
  bookings: number;
}

export interface RevenueByHotel {
  hotelName: string;
  revenue: number;
  bookings: number;
  percentage: number;
}

export interface RevenueByPaymentMethod {
  method: string;
  revenue: number;
  bookings: number;
  percentage: number;
}

export interface MockRevenueData {
  dailyRevenue: DailyRevenue[];
  revenueByHotel: RevenueByHotel[];
  revenueByPaymentMethod: RevenueByPaymentMethod[];
  totalRevenue: number;
  totalBookings: number;
  averageBookingValue: number;
}

const hotels = [
  "Zen Inn Hà Nội",
  "Zen Inn Đà Nẵng",
  "Zen Inn Hồ Chí Minh",
  "Zen Inn Phú Quốc",
  "Zen Inn Nha Trang",
  "Zen Inn Đà Lạt"
];

const paymentMethods = [
  { name: "CASH", weight: 0.4 },
  { name: "SEPAY", weight: 0.3 },
  { name: "BANK_TRANSFER", weight: 0.2 },
  { name: "VNPAY", weight: 0.1 },
];

export function generateMockRevenue(days: number = 365): MockRevenueData {
  const dailyRevenue: DailyRevenue[] = [];
  const now = new Date();
  let totalRevenue = 0;
  let totalBookings = 0;

  // Generate daily revenue for the past N days
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    
    // Add seasonal variation (higher in summer months)
    const month = date.getMonth();
    const seasonalFactor = month >= 5 && month <= 8 ? 1.5 : 1.0;
    
    // Add weekly variation (higher on weekends)
    const dayOfWeek = date.getDay();
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 1.3 : 1.0;
    
    // Base revenue with random variation
    const baseRevenue = 50000000 + Math.random() * 30000000;
    const revenue = Math.round(baseRevenue * seasonalFactor * weekendFactor);
    const bookings = Math.floor(revenue / 2500000); // Average booking value ~2.5M VND
    
    dailyRevenue.push({
      date: date.toISOString().split('T')[0],
      revenue,
      bookings,
    });
    
    totalRevenue += revenue;
    totalBookings += bookings;
  }

  // Generate revenue by hotel
  const revenueByHotel: RevenueByHotel[] = hotels.map(hotelName => {
    const hotelRevenue = Math.floor(totalRevenue * (0.1 + Math.random() * 0.15));
    const hotelBookings = Math.floor(totalBookings * (0.1 + Math.random() * 0.15));
    return {
      hotelName,
      revenue: hotelRevenue,
      bookings: hotelBookings,
      percentage: 0, // Will calculate after
    };
  });

  // Normalize percentages
  const hotelTotalRevenue = revenueByHotel.reduce((sum, h) => sum + h.revenue, 0);
  revenueByHotel.forEach(h => {
    h.percentage = (h.revenue / hotelTotalRevenue) * 100;
  });

  // Sort by revenue descending
  revenueByHotel.sort((a, b) => b.revenue - a.revenue);

  // Generate revenue by payment method
  const revenueByPaymentMethod: RevenueByPaymentMethod[] = paymentMethods.map(pm => {
    const methodRevenue = Math.floor(totalRevenue * pm.weight);
    const methodBookings = Math.floor(totalBookings * pm.weight);
    return {
      method: pm.name,
      revenue: methodRevenue,
      bookings: methodBookings,
      percentage: pm.weight * 100,
    };
  });

  return {
    dailyRevenue,
    revenueByHotel,
    revenueByPaymentMethod,
    totalRevenue,
    totalBookings,
    averageBookingValue: Math.round(totalRevenue / totalBookings),
  };
}
