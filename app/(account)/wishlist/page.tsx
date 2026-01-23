"use client";

import { useEffect, useState } from "react";
import { customerAPI, WishlistItem } from "@/lib/api/customer-api";
import WishlistCard from "@/components/wishlist/WishlistCard";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);

  // Mock data for testing
  const mockWishlist: WishlistItem[] = [
    {
      id: "wish-1",
      hotelId: "hotel-1",
      name: "Zen Inn Đà Nẵng Beach Resort",
      city: "Đà Nẵng",
      address: "123 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng",
      thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      rating: 4.8,
      reviewCount: 245,
      startingPrice: 1200000,
      currency: "VND",
      createdAt: "2026-01-10T08:30:00.000Z",
    },
    {
      id: "wish-2",
      hotelId: "hotel-2",
      name: "Zen Inn Hà Nội Old Quarter",
      city: "Hà Nội",
      address: "45 Hàng Bài, Hoàn Kiếm, Hà Nội",
      thumbnailUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      rating: 4.6,
      reviewCount: 189,
      startingPrice: 800000,
      currency: "VND",
      createdAt: "2026-01-12T14:20:00.000Z",
    },
    {
      id: "wish-3",
      hotelId: "hotel-3",
      name: "Zen Inn Phú Quốc Paradise",
      city: "Phú Quốc",
      address: "78 Trần Hưng Đạo, Dương Đông, Phú Quốc",
      thumbnailUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      rating: 4.9,
      reviewCount: 312,
      startingPrice: 1500000,
      currency: "VND",
      createdAt: "2026-01-15T10:45:00.000Z",
    },
    {
      id: "wish-4",
      hotelId: "hotel-4",
      name: "Zen Inn Sapa Mountain View",
      city: "Sapa",
      address: "12 Phố Cầu Mây, Sapa, Lào Cai",
      thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      rating: 4.7,
      reviewCount: 156,
      startingPrice: 900000,
      currency: "VND",
      createdAt: "2026-01-18T16:00:00.000Z",
    },
  ];

  useEffect(() => {
    fetchWishlist();
  }, [useMockData]);

  const fetchWishlist = async () => {
    if (useMockData) {
      setLoading(true);
      setTimeout(() => {
        setWishlist(mockWishlist);
        setLoading(false);
      }, 500);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await customerAPI.getWishlist();
      setWishlist(response.items);
    } catch (err: any) {
      console.error("Error fetching wishlist:", err);
      setError(
        err.response?.data?.message ||
          "Không thể tải danh sách yêu thích. Vui lòng thử lại sau."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (hotelId: string) => {
    try {
      setRemovingId(hotelId);
      await customerAPI.removeFromWishlist(hotelId);
      
      // Remove from local state
      setWishlist((prev) => prev.filter((item) => item.hotelId !== hotelId));
      
      // Show success message (optional)
      // You can add a toast notification here
    } catch (err: any) {
      console.error("Error removing from wishlist:", err);
      alert(
        err.response?.data?.message ||
          "Không thể xóa khỏi danh sách yêu thích. Vui lòng thử lại."
      );
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-white to-cream-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl text-secondary mb-2">
                Danh sách yêu thích
              </h1>
              <p className="text-gray-600">
                Các khách sạn bạn đã lưu để xem sau
              </p>
            </div>
            <button
              onClick={() => setUseMockData(!useMockData)}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              {useMockData ? "Dùng API thật" : "Dùng Mock Data"}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && wishlist.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-display text-secondary mb-2">
              Danh sách yêu thích trống
            </h3>
            <p className="text-gray-600 mb-6">
              Bạn chưa lưu khách sạn nào. Hãy khám phá và thêm các khách sạn yêu thích!
            </p>
            <a
              href="/search"
              className="inline-block px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
            >
              Khám phá khách sạn
            </a>
          </div>
        )}

        {/* Wishlist Grid */}
        {!loading && !error && wishlist.length > 0 && (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Bạn có <span className="font-semibold text-accent">{wishlist.length}</span> khách sạn yêu thích
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <WishlistCard
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  isRemoving={removingId === item.hotelId}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
