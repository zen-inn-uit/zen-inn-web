"use client";

import { useState, useEffect } from "react";
import { generateMockRevenue, MockRevenueData } from "@/lib/mock-data/admin/mock-revenue";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminRevenuePage() {
  const [revenueData, setRevenueData] = useState<MockRevenueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<number>(30); // days

  useEffect(() => {
    setTimeout(() => {
      const data = generateMockRevenue(365);
      setRevenueData(data);
      setLoading(false);
    }, 500);
  }, []);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { notation: "compact" }).format(amount) + " VND";
  };

  const formatVNDFull = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
  };

  const handleExportCSV = () => {
    if (!revenueData) return;

    const csv = [
      ["Ngày", "Doanh thu", "Số đặt phòng"],
      ...revenueData.dailyRevenue.slice(-dateRange).map((d) => [
        d.date,
        d.revenue.toString(),
        d.bookings.toString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `revenue_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  if (loading || !revenueData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#8B6F47] border-t-transparent"></div>
      </div>
    );
  }

  const chartData = revenueData.dailyRevenue.slice(-dateRange).map((d) => ({
    date: new Date(d.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
    revenue: d.revenue,
    bookings: d.bookings,
  }));

  const COLORS = ["#8B6F47", "#6B5B3D", "#A0826D", "#E5D5C3", "#F5EFE7", "#FDFBF7"];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3d2e1f] mb-2">Quản lý doanh thu</h1>
          <p className="text-[#6B5B3D]">Theo dõi và phân tích doanh thu hệ thống</p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(Number(e.target.value))}
            className="px-4 py-2 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
          >
            <option value={7}>7 ngày</option>
            <option value={30}>30 ngày</option>
            <option value={90}>90 ngày</option>
            <option value={365}>1 năm</option>
          </select>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-6 py-3 bg-[#8B6F47] hover:bg-[#6B5B3D] text-white rounded-lg font-bold transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Xuất CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-[#6B5B3D] mb-1">Tổng doanh thu</p>
          <p className="text-2xl font-bold text-[#3d2e1f]">{formatVNDFull(revenueData.totalRevenue)}</p>
        </div>

        <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-[#6B5B3D] mb-1">Tổng đặt phòng</p>
          <p className="text-2xl font-bold text-[#3d2e1f]">{revenueData.totalBookings}</p>
        </div>

        <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-[#6B5B3D] mb-1">Giá trị trung bình</p>
          <p className="text-2xl font-bold text-[#3d2e1f]">{formatVNDFull(revenueData.averageBookingValue)}</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-[#3d2e1f] mb-6">Biểu đồ doanh thu</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5D5C3" />
            <XAxis dataKey="date" stroke="#6B5B3D" />
            <YAxis stroke="#6B5B3D" tickFormatter={(value) => formatVND(value)} />
            <Tooltip
              formatter={(value: any) => formatVNDFull(value)}
              contentStyle={{
                backgroundColor: "#FDFBF7",
                border: "1px solid #E5D5C3",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8B6F47"
              strokeWidth={3}
              name="Doanh thu"
              dot={{ fill: "#8B6F47", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue by Hotel */}
        <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#3d2e1f] mb-6">Doanh thu theo khách sạn</h2>
          <div className="space-y-4">
            {revenueData.revenueByHotel.map((hotel, index) => (
              <div key={hotel.hotelName}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#3d2e1f]">{hotel.hotelName}</span>
                  <span className="text-sm font-bold text-[#8B6F47]">{formatVNDFull(hotel.revenue)}</span>
                </div>
                <div className="w-full bg-[#F5EFE7] rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${hotel.percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#6B5B3D]">{hotel.bookings} đặt phòng</span>
                  <span className="text-xs text-[#6B5B3D]">{hotel.percentage.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Payment Method */}
        <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#3d2e1f] mb-6">Doanh thu theo phương thức thanh toán</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData.revenueByPaymentMethod}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ method, percentage }) => `${method} (${percentage.toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="revenue"
              >
                {revenueData.revenueByPaymentMethod.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => formatVNDFull(value)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-3">
            {revenueData.revenueByPaymentMethod.map((pm, index) => (
              <div key={pm.method} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-[#3d2e1f]">{pm.method}</span>
                </div>
                <span className="text-sm font-semibold text-[#8B6F47]">{formatVNDFull(pm.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
