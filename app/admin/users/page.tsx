"use client";

import { useState, useEffect } from "react";
import { generateMockUsers, MockUser } from "@/lib/mock-data/admin/mock-users";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<MockUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<MockUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const mockUsers = generateMockUsers(150);
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = [...users];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term) ||
          u.phone.includes(term)
      );
    }

    if (roleFilter !== "ALL") {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((u) => u.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, statusFilter, users]);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const roleColors: Record<string, string> = {
    CUSTOMER: "bg-blue-100 text-blue-800",
    PARTNER: "bg-purple-100 text-purple-800",
    ADMIN: "bg-red-100 text-red-800",
  };

  const roleLabels: Record<string, string> = {
    CUSTOMER: "Khách hàng",
    PARTNER: "Đối tác",
    ADMIN: "Quản trị viên",
  };

  const statusColors: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-800",
    INACTIVE: "bg-gray-100 text-gray-800",
    SUSPENDED: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, string> = {
    ACTIVE: "Hoạt động",
    INACTIVE: "Không hoạt động",
    SUSPENDED: "Đã khóa",
  };

  const stats = {
    total: users.length,
    customers: users.filter((u) => u.role === "CUSTOMER").length,
    partners: users.filter((u) => u.role === "PARTNER").length,
    admins: users.filter((u) => u.role === "ADMIN").length,
    active: users.filter((u) => u.status === "ACTIVE").length,
  };

  const handleExportCSV = () => {
    const csv = [
      ["Tên", "Email", "Số điện thoại", "Vai trò", "Trạng thái", "Ngày đăng ký", "Đăng nhập cuối"],
      ...filteredUsers.map((u) => [
        u.name,
        u.email,
        u.phone,
        roleLabels[u.role],
        statusLabels[u.status],
        formatDate(u.registeredAt),
        formatDate(u.lastLogin),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `users_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#8B6F47] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3d2e1f] mb-2">Quản lý người dùng</h1>
          <p className="text-[#6B5B3D]">Quản lý tất cả người dùng trong hệ thống</p>
        </div>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white border border-[#E5D5C3] rounded-lg p-4">
          <p className="text-sm text-[#6B5B3D] mb-1">Tổng cộng</p>
          <p className="text-2xl font-bold text-[#3d2e1f]">{stats.total}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700 mb-1">Khách hàng</p>
          <p className="text-2xl font-bold text-blue-800">{stats.customers}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-700 mb-1">Đối tác</p>
          <p className="text-2xl font-bold text-purple-800">{stats.partners}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700 mb-1">Quản trị</p>
          <p className="text-2xl font-bold text-red-800">{stats.admins}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700 mb-1">Hoạt động</p>
          <p className="text-2xl font-bold text-green-800">{stats.active}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#6B5B3D] mb-2">Tìm kiếm</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tên, email, số điện thoại..."
              className="w-full px-4 py-2 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6B5B3D] mb-2">Vai trò</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-4 py-2 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
            >
              <option value="ALL">Tất cả</option>
              <option value="CUSTOMER">Khách hàng</option>
              <option value="PARTNER">Đối tác</option>
              <option value="ADMIN">Quản trị viên</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6B5B3D] mb-2">Trạng thái</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
            >
              <option value="ALL">Tất cả</option>
              <option value="ACTIVE">Hoạt động</option>
              <option value="INACTIVE">Không hoạt động</option>
              <option value="SUSPENDED">Đã khóa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-[#E5D5C3] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5EFE7]">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Người dùng</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Liên hệ</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Vai trò</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Trạng thái</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Đăng ký</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Đặt phòng</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-[#E5D5C3] hover:bg-[#F5EFE7] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#8B6F47] to-[#6B5B3D] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-[#3d2e1f]">{user.name}</p>
                        <p className="text-xs text-[#6B5B3D]">{user.id.substring(0, 12)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-[#3d2e1f]">{user.email}</p>
                    <p className="text-xs text-[#6B5B3D]">{user.phone}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleColors[user.role]}`}>
                      {roleLabels[user.role]}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[user.status]}`}>
                      {statusLabels[user.status]}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#6B5B3D]">{formatDate(user.registeredAt)}</td>
                  <td className="py-3 px-4 text-sm text-[#6B5B3D]">{user.bookingCount} lần</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDetailModal(true);
                      }}
                      className="text-[#8B6F47] hover:text-[#6B5B3D] font-medium text-sm"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6B5B3D]">Không tìm thấy người dùng nào</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E5D5C3] flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-[#3d2e1f]">Chi tiết người dùng</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-[#6B5B3D] hover:text-[#3d2e1f]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-[#8B6F47] to-[#6B5B3D] rounded-full flex items-center justify-center text-white font-bold text-3xl">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#3d2e1f]">{selectedUser.name}</h3>
                  <p className="text-sm text-[#6B5B3D]">{selectedUser.email}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#3d2e1f] mb-4">Thông tin tài khoản</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#6B5B3D]">ID người dùng</p>
                    <p className="font-mono text-sm text-[#3d2e1f]">{selectedUser.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Số điện thoại</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Vai trò</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${roleColors[selectedUser.role]}`}>
                      {roleLabels[selectedUser.role]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Trạng thái</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[selectedUser.status]}`}>
                      {statusLabels[selectedUser.status]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Ngày đăng ký</p>
                    <p className="font-medium text-[#3d2e1f]">{formatDate(selectedUser.registeredAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Đăng nhập cuối</p>
                    <p className="font-medium text-[#3d2e1f]">{formatDate(selectedUser.lastLogin)}</p>
                  </div>
                </div>
              </div>

              {selectedUser.role === "CUSTOMER" && (
                <div className="border-t border-[#E5D5C3] pt-6">
                  <h3 className="text-lg font-bold text-[#3d2e1f] mb-4">Thống kê đặt phòng</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#6B5B3D]">Số lần đặt phòng</p>
                      <p className="text-2xl font-bold text-[#3d2e1f]">{selectedUser.bookingCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B5B3D]">Tổng chi tiêu</p>
                      <p className="text-2xl font-bold text-[#8B6F47]">{formatVND(selectedUser.totalSpent)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="border-t border-[#E5D5C3] pt-6">
                <h3 className="text-lg font-bold text-[#3d2e1f] mb-4">Hành động quản lý</h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Suspend/Activate Account */}
                  {selectedUser.status === "ACTIVE" ? (
                    <button
                      onClick={() => {
                        if (confirm(`Bạn có chắc chắn muốn khóa tài khoản của ${selectedUser.name}?`)) {
                          setUsers(prev =>
                            prev.map(u =>
                              u.id === selectedUser.id ? { ...u, status: "SUSPENDED" as const } : u
                            )
                          );
                          setSelectedUser({ ...selectedUser, status: "SUSPENDED" as const });
                        }
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Khóa tài khoản
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (confirm(`Bạn có chắc chắn muốn mở khóa tài khoản của ${selectedUser.name}?`)) {
                          setUsers(prev =>
                            prev.map(u =>
                              u.id === selectedUser.id ? { ...u, status: "ACTIVE" as const } : u
                            )
                          );
                          setSelectedUser({ ...selectedUser, status: "ACTIVE" as const });
                        }
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      Mở khóa tài khoản
                    </button>
                  )}

                  {/* Change Role */}
                  <button
                    onClick={() => {
                      const newRole = prompt(
                        `Thay đổi vai trò cho ${selectedUser.name}\nNhập vai trò mới (CUSTOMER, PARTNER, ADMIN):`,
                        selectedUser.role
                      );
                      if (newRole && ["CUSTOMER", "PARTNER", "ADMIN"].includes(newRole.toUpperCase())) {
                        const role = newRole.toUpperCase() as "CUSTOMER" | "PARTNER" | "ADMIN";
                        setUsers(prev =>
                          prev.map(u =>
                            u.id === selectedUser.id ? { ...u, role } : u
                          )
                        );
                        setSelectedUser({ ...selectedUser, role });
                      } else if (newRole) {
                        alert("Vai trò không hợp lệ! Vui lòng nhập: CUSTOMER, PARTNER hoặc ADMIN");
                      }
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Đổi vai trò
                  </button>

                  {/* Delete Account */}
                  <button
                    onClick={() => {
                      const confirmText = prompt(
                        `⚠️ CẢNH BÁO: Xóa tài khoản là hành động KHÔNG THỂ HOÀN TÁC!\n\nNhập "${selectedUser.email}" để xác nhận xóa tài khoản:`
                      );
                      if (confirmText === selectedUser.email) {
                        setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
                        setShowDetailModal(false);
                        alert(`Đã xóa tài khoản ${selectedUser.name}`);
                      } else if (confirmText) {
                        alert("Email không khớp. Hủy xóa tài khoản.");
                      }
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all col-span-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Xóa tài khoản vĩnh viễn
                  </button>
                </div>

                {/* Warning Note */}
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    <strong>⚠️ Lưu ý:</strong> Các thay đổi chỉ áp dụng trong phiên làm việc hiện tại (mock data). 
                    Trong môi trường thực tế, các hành động này sẽ được ghi nhận vào database và có thể yêu cầu xác thực bổ sung.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
