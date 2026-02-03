"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Mock user data
  const [name, setName] = useState("Nguyễn Văn A");
  const [email, setEmail] = useState("nguyenvana@example.com");
  const [phone, setPhone] = useState("+84 901 234 567");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSaveProfile = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-white to-[#FDFBF7]/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3d2e1f] mb-2">Cài đặt tài khoản</h1>
          <p className="text-[#6B5B3D]">Quản lý thông tin cá nhân và tùy chọn của bạn</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-fade-in">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-800 font-medium">Đã lưu thay đổi thành công!</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Information */}
          <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#3d2e1f] mb-6">Thông tin cá nhân</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6B5B3D] mb-2">Họ và tên</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B5B3D] mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B5B3D] mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="px-6 py-3 bg-[#8B6F47] hover:bg-[#6B5B3D] text-white rounded-lg font-bold transition-all disabled:opacity-50"
              >
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#3d2e1f] mb-6">Đổi mật khẩu</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6B5B3D] mb-2">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B5B3D] mb-2">Mật khẩu mới</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B5B3D] mb-2">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent"
                />
              </div>
              <button
                onClick={handleChangePassword}
                disabled={loading || !currentPassword || !newPassword || !confirmPassword}
                className="px-6 py-3 bg-[#8B6F47] hover:bg-[#6B5B3D] text-white rounded-lg font-bold transition-all disabled:opacity-50"
              >
                {loading ? "Đang cập nhật..." : "Đổi mật khẩu"}
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white border border-[#E5D5C3] rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#3d2e1f] mb-6">Tùy chọn thông báo</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#3d2e1f]">Thông báo qua Email</p>
                  <p className="text-sm text-[#6B5B3D]">Nhận thông báo về đặt phòng và ưu đãi qua email</p>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    emailNotifications ? "bg-[#8B6F47]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      emailNotifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#3d2e1f]">Thông báo qua SMS</p>
                  <p className="text-sm text-[#6B5B3D]">Nhận thông báo quan trọng qua tin nhắn SMS</p>
                </div>
                <button
                  onClick={() => setSmsNotifications(!smsNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    smsNotifications ? "bg-[#8B6F47]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      smsNotifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white border-2 border-red-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-red-600 mb-4">Vùng nguy hiểm</h2>
            <p className="text-[#6B5B3D] mb-4">
              Xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu của bạn. Hành động này không thể hoàn tác.
            </p>
            <button
              onClick={() => {
                if (confirm("Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!")) {
                  alert("Tính năng xóa tài khoản đang được phát triển");
                }
              }}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all"
            >
              Xóa tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
