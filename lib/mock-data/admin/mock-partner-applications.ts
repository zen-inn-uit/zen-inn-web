// Mock partner application data for admin approval
export interface PartnerApplication {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  businessType: "HOTEL" | "RESORT" | "HOSTEL" | "APARTMENT";
  numberOfRooms: number;
  description: string;
  taxId: string;
  businessLicense: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

const vietnameseBusinessNames = [
  "Khách sạn Hòa Bình", "Khách sạn Thiên Đường", "Resort Biển Xanh",
  "Khách sạn Mặt Trời", "Nhà nghỉ Ánh Dương", "Khách sạn Phương Nam",
  "Resort Đại Dương", "Khách sạn Sao Mai", "Căn hộ Hoàng Gia",
  "Khách sạn Thanh Bình", "Resort Núi Rừng", "Khách sạn Hương Sen",
  "Nhà nghỉ Bình Minh", "Khách sạn Vạn Xuân", "Resort Thiên Thai"
];

const ownerNames = [
  "Nguyễn Văn Hùng", "Trần Thị Lan", "Lê Quang Minh", "Phạm Thị Hoa",
  "Hoàng Văn Nam", "Vũ Thị Thu", "Đặng Minh Tuấn", "Bùi Thị Nga",
  "Ngô Văn Phong", "Đỗ Thị Linh", "Lý Quang Hải", "Phan Thị Mai",
  "Trương Văn Sơn", "Đinh Thị Oanh", "Võ Minh Phúc"
];

const cities = [
  "Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Nha Trang",
  "Phú Quốc", "Đà Lạt", "Hội An", "Vũng Tàu",
  "Huế", "Quy Nhơn", "Phan Thiết", "Hạ Long"
];

const businessTypes: PartnerApplication["businessType"][] = [
  "HOTEL", "RESORT", "HOSTEL", "APARTMENT"
];

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateMockPartnerApplications(count: number = 30): PartnerApplication[] {
  const applications: PartnerApplication[] = [];
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  for (let i = 0; i < count; i++) {
    const businessName = randomItem(vietnameseBusinessNames);
    const ownerName = randomItem(ownerNames);
    const city = randomItem(cities);
    const businessType = randomItem(businessTypes);
    const submittedAt = randomDate(threeMonthsAgo, now);
    
    // 60% pending, 30% approved, 10% rejected
    const statusRand = Math.random();
    const status: PartnerApplication["status"] = 
      statusRand > 0.4 ? "PENDING" : statusRand > 0.1 ? "APPROVED" : "REJECTED";
    
    const application: PartnerApplication = {
      id: `PA-${Date.now()}-${i}`,
      businessName,
      ownerName,
      email: ownerName.toLowerCase().replace(/\s+/g, ".") + "@business.vn",
      phone: `+84 ${Math.floor(Math.random() * 900000000) + 100000000}`,
      address: `${Math.floor(Math.random() * 500) + 1} Đường ${["Lê Lợi", "Trần Hưng Đạo", "Nguyễn Huệ", "Hai Bà Trưng"][Math.floor(Math.random() * 4)]}`,
      city,
      businessType,
      numberOfRooms: Math.floor(Math.random() * 100) + 10,
      description: `${businessName} là một ${businessType === "HOTEL" ? "khách sạn" : businessType === "RESORT" ? "resort" : businessType === "HOSTEL" ? "nhà nghỉ" : "căn hộ"} cao cấp tại ${city}, cung cấp dịch vụ chất lượng với ${Math.floor(Math.random() * 100) + 10} phòng nghỉ hiện đại.`,
      taxId: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      businessLicense: `BL-${Date.now()}-${i}`,
      status,
      submittedAt: submittedAt.toISOString(),
    };

    if (status !== "PENDING") {
      application.reviewedAt = new Date(submittedAt.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();
      application.reviewedBy = "Admin User";
      if (status === "REJECTED") {
        application.rejectionReason = randomItem([
          "Thiếu giấy tờ pháp lý",
          "Thông tin không chính xác",
          "Không đáp ứng tiêu chuẩn chất lượng",
          "Địa chỉ kinh doanh không hợp lệ"
        ]);
      }
    }

    applications.push(application);
  }

  return applications.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}
