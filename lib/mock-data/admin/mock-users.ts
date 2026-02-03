// Mock user data generator for admin interface
export interface MockUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "CUSTOMER" | "PARTNER" | "ADMIN";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  registeredAt: string;
  lastLogin: string;
  bookingCount: number;
  totalSpent: number;
}

const vietnameseNames = [
  "Nguyễn Văn An", "Trần Thị Bình", "Lê Hoàng Minh", "Phạm Thanh Thảo",
  "Hoàng Quốc Việt", "Vũ Thị Hương", "Đặng Minh Tuấn", "Bùi Thị Lan",
  "Ngô Văn Hùng", "Đỗ Thị Mai", "Lý Quang Hải", "Phan Thị Nga",
  "Trương Văn Nam", "Đinh Thị Oanh", "Võ Minh Phúc", "Dương Thị Quỳnh",
  "Cao Thị Hà", "Tô Văn Khoa", "Lâm Thị Linh", "Hồ Văn Mạnh",
  "Chu Thị Nhung", "Mai Văn Phong", "Tạ Thị Quyên", "Lưu Văn Sơn"
];

const internationalNames = [
  "John Smith", "Emily Johnson", "Michael Brown", "Sarah Davis",
  "David Wilson", "Lisa Anderson", "James Taylor", "Jennifer Martinez",
  "Robert Garcia", "Maria Rodriguez", "William Lee", "Patricia White",
  "Richard Harris", "Linda Clark", "Thomas Lewis", "Barbara Walker"
];

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateMockUsers(count: number = 100): MockUser[] {
  const users: MockUser[] = [];
  const now = new Date();
  const twoYearsAgo = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000);

  // Role distribution: 85% customers, 12% partners, 3% admins
  const roleDistribution: MockUser["role"][] = [
    ...Array(85).fill("CUSTOMER"),
    ...Array(12).fill("PARTNER"),
    ...Array(3).fill("ADMIN"),
  ];

  for (let i = 0; i < count; i++) {
    const isVietnamese = Math.random() > 0.25;
    const name = isVietnamese ? randomItem(vietnameseNames) : randomItem(internationalNames);
    const role = roleDistribution[i % roleDistribution.length];
    const registeredAt = randomDate(twoYearsAgo, now);
    const lastLogin = randomDate(registeredAt, now);
    
    // Status distribution: 90% active, 7% inactive, 3% suspended
    const statusRand = Math.random();
    const status: MockUser["status"] = statusRand > 0.1 ? "ACTIVE" : statusRand > 0.03 ? "INACTIVE" : "SUSPENDED";
    
    const bookingCount = role === "CUSTOMER" ? Math.floor(Math.random() * 20) : 0;
    const totalSpent = bookingCount * (Math.floor(Math.random() * 5000000) + 1000000);

    users.push({
      id: `user-${Date.now()}-${i}`,
      name,
      email: name.toLowerCase().replace(/\s+/g, ".") + "@example.com",
      phone: isVietnamese ? `+84 ${Math.floor(Math.random() * 900000000) + 100000000}` :
                            `+${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      role,
      status,
      registeredAt: registeredAt.toISOString(),
      lastLogin: lastLogin.toISOString(),
      bookingCount,
      totalSpent,
    });
  }

  return users.sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime());
}
