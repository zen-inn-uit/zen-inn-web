"use client";

import { useState, useEffect } from "react";
import { generateMockBookings } from "@/lib/mock-data/admin/mock-bookings";
import { generateMockUsers } from "@/lib/mock-data/admin/mock-users";
import { generateMockRevenue } from "@/lib/mock-data/admin/mock-revenue";
import { generateMockPartnerApplications } from "@/lib/mock-data/admin/mock-partner-applications";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalPartners: 0,
    pendingPartners: 0,
    activeHotels: 0,
    totalCustomers: 0,
  });
  const [revenueData, setRevenueData] = useState<any>(null);
  const [userGrowthData, setUserGrowthData] = useState<any[]>([]);
  const [partnerData, setPartnerData] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const bookings = generateMockBookings(100);
      const users = generateMockUsers(150);
      const revenue = generateMockRevenue(30);
      const partnerApps = generateMockPartnerApplications(30);

      const partners = users.filter(u => u.role === "PARTNER");
      const customers = users.filter(u => u.role === "CUSTOMER");

      setStats({
        totalRevenue: revenue.totalRevenue,
        totalBookings: bookings.length,
        totalUsers: users.length,
        totalPartners: partners.length,
        pendingPartners: partnerApps.filter(p => p.status === "PENDING").length,
        activeHotels: 6,
        totalCustomers: customers.length,
      });

      setRevenueData(revenue);

      // User growth over last 6 months
      const months = ["Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12", "Tháng 1"];
      const growthData = months.map((month, index) => ({
        month,
        customers: Math.floor(customers.length * (0.5 + (index * 0.1))),
        partners: Math.floor(partners.length * (0.4 + (index * 0.12))),
      }));
      setUserGrowthData(growthData);

      // Partner status distribution
      const partnerStatusData = [
        { name: "Active", value: partners.filter(p => p.status === "ACTIVE").length, color: "#10b981" },
        { name: "Inactive", value: partners.filter(p => p.status === "INACTIVE").length, color: "#6b7280" },
        { name: "Suspended", value: partners.filter(p => p.status === "SUSPENDED").length, color: "#ef4444" },
      ];
      setPartnerData(partnerStatusData);

      // Recent activities (mix of bookings and partner approvals)
      // Use only recent items (last 24 hours)
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      
      const recentBookings = bookings
        .filter(b => new Date(b.createdAt) > oneDayAgo)
        .slice(0, 3)
        .map(b => ({
          type: "booking",
          title: `Đặt phòng mới tại ${b.hotelName}`,
          description: `${b.guestName} - ${b.roomName}`,
          time: b.createdAt,
        }));

      const recentPartnerApps = partnerApps
        .filter(p => p.status === "PENDING" && new Date(p.submittedAt) > oneDayAgo)
        .slice(0, 2)
        .map(p => ({
          type: "partner",
          title: `Đơn đăng ký đối tác mới`,
          description: `${p.businessName} - ${p.city}`,
          time: p.submittedAt,
        }));

      const activities = [...recentBookings, ...recentPartnerApps]
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, 5);

      setRecentActivities(activities);
      setLoading(false);
    }, 500);
  }, []);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
  };

  const formatVNDShort = (amount: number) => {
    if (amount >= 1000000000) {
      return (amount / 1000000000).toFixed(1) + "B";
    } else if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + "M";
    }
    return new Intl.NumberFormat("vi-VN").format(amount);
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    // Handle future dates or invalid dates
    if (diffMs < 0) return "Vừa xong";
    
    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString("vi-VN");
  };

  if (loading || !revenueData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#8B6F47] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#3d2e1f] mb-2">Platform Dashboard</h1>
        <p className="text-[#6B5B3D]">Tổng quan quản lý nền tảng Zen Inn</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-200 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mb-1">{formatVNDShort(stats.totalRevenue)}</p>
          <p className="text-sm text-green-700">Tổng doanh thu</p>
        </div>

        {/* Total Partners */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            {stats.pendingPartners > 0 && (
              <span className="text-xs font-semibold text-orange-600 bg-orange-200 px-2 py-1 rounded-full">
                {stats.pendingPartners} chờ duyệt
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-blue-900 mb-1">{stats.totalPartners}</p>
          <p className="text-sm text-blue-700">Đối tác hoạt động</p>
        </div>

        {/* Total Users */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-purple-600 bg-purple-200 px-2 py-1 rounded-full">+8.3%</span>
          </div>
          <p className="text-2xl font-bold text-purple-900 mb-1">{stats.totalCustomers}</p>
          <p className="text-sm text-purple-700">Khách hàng</p>
        </div>

        {/* Total Bookings */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-orange-600 bg-orange-200 px-2 py-1 rounded-full">+15.2%</span>
          </div>
          <p className="text-2xl font-bold text-orange-900 mb-1">{stats.totalBookings}</p>
          <p className="text-sm text-orange-700">Tổng đặt phòng</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#3d2e1f] mb-6">Tăng trưởng người dùng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5D5C3" />
              <XAxis dataKey="month" stroke="#6B5B3D" />
              <YAxis stroke="#6B5B3D" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FDFBF7",
                  border: "1px solid #E5D5C3",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="customers" stroke="#8B6F47" strokeWidth={2} name="Khách hàng" />
              <Line type="monotone" dataKey="partners" stroke="#3b82f6" strokeWidth={2} name="Đối tác" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Partner Status Distribution */}
        <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#3d2e1f] mb-6">Trạng thái đối tác</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={partnerData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {partnerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Hotel */}
        <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-bold text-[#3d2e1f] mb-6">Top khách sạn theo doanh thu</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData.revenueByHotel.slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5D5C3" />
              <XAxis 
                dataKey="hotelName" 
                stroke="#6B5B3D"
                tick={{ fontSize: 12 }}
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#6B5B3D" tickFormatter={(value) => formatVNDShort(value)} />
              <Tooltip
                formatter={(value: any) => formatVND(value)}
                contentStyle={{
                  backgroundColor: "#FDFBF7",
                  border: "1px solid #E5D5C3",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#8B6F47" name="Doanh thu" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#3d2e1f] mb-6">Hoạt động gần đây</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-[#F5EFE7] rounded-lg hover:bg-[#E5D5C3] transition-colors">
              <div className="flex-1">
                <p className="font-semibold text-[#3d2e1f]">{activity.title}</p>
                <p className="text-sm text-[#6B5B3D]">{activity.description}</p>
              </div>
              <div className="text-xs text-[#6B5B3D] whitespace-nowrap">{formatDateTime(activity.time)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
