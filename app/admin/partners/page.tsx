"use client";

import { useState, useEffect } from "react";
import { generateMockPartnerApplications, PartnerApplication } from "@/lib/mock-data/admin/mock-partner-applications";

export default function AdminPartnersPage() {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<PartnerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("PENDING");
  const [cityFilter, setCityFilter] = useState<string>("ALL");
  const [selectedApplication, setSelectedApplication] = useState<PartnerApplication | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const mockApplications = generateMockPartnerApplications(30);
      setApplications(mockApplications);
      setFilteredApplications(mockApplications.filter(a => a.status === "PENDING"));
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = [...applications];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.businessName.toLowerCase().includes(term) ||
          a.ownerName.toLowerCase().includes(term) ||
          a.email.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }

    if (cityFilter !== "ALL") {
      filtered = filtered.filter((a) => a.city === cityFilter);
    }

    setFilteredApplications(filtered);
  }, [searchTerm, statusFilter, cityFilter, applications]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, string> = {
    PENDING: "Chờ duyệt",
    APPROVED: "Đã duyệt",
    REJECTED: "Từ chối",
  };

  const businessTypeLabels: Record<string, string> = {
    HOTEL: "Khách sạn",
    RESORT: "Resort",
    HOSTEL: "Nhà nghỉ",
    APARTMENT: "Căn hộ",
  };

  const cities = Array.from(new Set(applications.map((a) => a.city)));

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "PENDING").length,
    approved: applications.filter((a) => a.status === "APPROVED").length,
    rejected: applications.filter((a) => a.status === "REJECTED").length,
  };

  const handleApprove = (application: PartnerApplication) => {
    if (confirm(`Bạn có chắc chắn muốn phê duyệt đối tác "${application.businessName}"?`)) {
      setApplications(prev =>
        prev.map(a =>
          a.id === application.id
            ? { ...a, status: "APPROVED" as const, reviewedAt: new Date().toISOString(), reviewedBy: "Admin User" }
            : a
        )
      );
      setShowDetailModal(false);
    }
  };

  const handleReject = () => {
    if (!selectedApplication || !rejectionReason.trim()) {
      alert("Vui lòng nhập lý do từ chối");
      return;
    }

    setApplications(prev =>
      prev.map(a =>
        a.id === selectedApplication.id
          ? {
              ...a,
              status: "REJECTED" as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: "Admin User",
              rejectionReason: rejectionReason,
            }
          : a
      )
    );
    setShowRejectModal(false);
    setShowDetailModal(false);
    setRejectionReason("");
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#3d2e1f] mb-2">Phê duyệt đối tác</h1>
        <p className="text-[#6B5B3D]">Quản lý và phê duyệt đơn đăng ký đối tác mới</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-[#E5D5C3] rounded-lg p-4">
          <p className="text-sm text-[#6B5B3D] mb-1">Tổng cộng</p>
          <p className="text-2xl font-bold text-[#3d2e1f]">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-700 mb-1">Chờ duyệt</p>
          <p className="text-2xl font-bold text-yellow-800">{stats.pending}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700 mb-1">Đã duyệt</p>
          <p className="text-2xl font-bold text-green-800">{stats.approved}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700 mb-1">Từ chối</p>
          <p className="text-2xl font-bold text-red-800">{stats.rejected}</p>
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
              placeholder="Tên doanh nghiệp, chủ sở hữu, email..."
              className="w-full px-4 py-2 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6B5B3D] mb-2">Trạng thái</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
            >
              <option value="ALL">Tất cả</option>
              <option value="PENDING">Chờ duyệt</option>
              <option value="APPROVED">Đã duyệt</option>
              <option value="REJECTED">Từ chối</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6B5B3D] mb-2">Thành phố</label>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-4 py-2 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
            >
              <option value="ALL">Tất cả</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white border border-[#E5D5C3] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5EFE7]">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Doanh nghiệp</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Chủ sở hữu</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Loại hình</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Thành phố</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Số phòng</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Ngày nộp</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Trạng thái</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B5B3D]">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id} className="border-b border-[#E5D5C3] hover:bg-[#F5EFE7] transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-[#3d2e1f]">{application.businessName}</p>
                      <p className="text-xs text-[#6B5B3D]">{application.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm text-[#3d2e1f]">{application.ownerName}</p>
                      <p className="text-xs text-[#6B5B3D]">{application.phone}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#6B5B3D]">{businessTypeLabels[application.businessType]}</td>
                  <td className="py-3 px-4 text-sm text-[#6B5B3D]">{application.city}</td>
                  <td className="py-3 px-4 text-sm text-[#6B5B3D]">{application.numberOfRooms} phòng</td>
                  <td className="py-3 px-4 text-sm text-[#6B5B3D]">{formatDate(application.submittedAt)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[application.status]}`}>
                      {statusLabels[application.status]}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        setSelectedApplication(application);
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

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6B5B3D]">Không tìm thấy đơn đăng ký nào</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E5D5C3] flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-[#3d2e1f]">Chi tiết đơn đăng ký</h2>
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
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[selectedApplication.status]}`}>
                  {statusLabels[selectedApplication.status]}
                </span>
                {selectedApplication.status === "PENDING" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(selectedApplication)}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-all"
                    >
                      Phê duyệt
                    </button>
                    <button
                      onClick={() => {
                        setShowRejectModal(true);
                      }}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all"
                    >
                      Từ chối
                    </button>
                  </div>
                )}
              </div>

              {/* Business Information */}
              <div>
                <h3 className="text-lg font-bold text-[#3d2e1f] mb-4">Thông tin doanh nghiệp</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Tên doanh nghiệp</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedApplication.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Loại hình</p>
                    <p className="font-medium text-[#3d2e1f]">{businessTypeLabels[selectedApplication.businessType]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Mã số thuế</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedApplication.taxId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Giấy phép kinh doanh</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedApplication.businessLicense}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-[#6B5B3D]">Địa chỉ</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedApplication.address}, {selectedApplication.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Số phòng</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedApplication.numberOfRooms} phòng</p>
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div className="border-t border-[#E5D5C3] pt-6">
                <h3 className="text-lg font-bold text-[#3d2e1f] mb-4">Thông tin chủ sở hữu</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Họ và tên</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedApplication.ownerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Email</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Số điện thoại</p>
                    <p className="font-medium text-[#3d2e1f]">{selectedApplication.phone}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-[#E5D5C3] pt-6">
                <h3 className="text-lg font-bold text-[#3d2e1f] mb-4">Mô tả</h3>
                <p className="text-[#6B5B3D]">{selectedApplication.description}</p>
              </div>

              {/* Application Info */}
              <div className="border-t border-[#E5D5C3] pt-6">
                <h3 className="text-lg font-bold text-[#3d2e1f] mb-4">Thông tin đơn đăng ký</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#6B5B3D]">Ngày nộp đơn</p>
                    <p className="font-medium text-[#3d2e1f]">{formatDate(selectedApplication.submittedAt)}</p>
                  </div>
                  {selectedApplication.reviewedAt && (
                    <div>
                      <p className="text-sm text-[#6B5B3D]">Ngày xét duyệt</p>
                      <p className="font-medium text-[#3d2e1f]">{formatDate(selectedApplication.reviewedAt)}</p>
                    </div>
                  )}
                  {selectedApplication.reviewedBy && (
                    <div>
                      <p className="text-sm text-[#6B5B3D]">Người xét duyệt</p>
                      <p className="font-medium text-[#3d2e1f]">{selectedApplication.reviewedBy}</p>
                    </div>
                  )}
                  {selectedApplication.rejectionReason && (
                    <div className="col-span-2">
                      <p className="text-sm text-[#6B5B3D]">Lý do từ chối</p>
                      <p className="font-medium text-red-600">{selectedApplication.rejectionReason}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-[#E5D5C3]">
              <h2 className="text-xl font-bold text-[#3d2e1f]">Từ chối đơn đăng ký</h2>
            </div>
            <div className="p-6">
              <p className="text-[#6B5B3D] mb-4">
                Bạn đang từ chối đơn đăng ký của <strong>{selectedApplication.businessName}</strong>. 
                Vui lòng nhập lý do từ chối:
              </p>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Nhập lý do từ chối..."
                className="w-full px-4 py-3 border border-[#E5D5C3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] min-h-[120px]"
              />
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason("");
                  }}
                  className="flex-1 px-6 py-3 border-2 border-[#E5D5C3] text-[#6B5B3D] rounded-lg font-bold hover:bg-[#F5EFE7] transition-all"
                >
                  Hủy
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all"
                >
                  Xác nhận từ chối
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
