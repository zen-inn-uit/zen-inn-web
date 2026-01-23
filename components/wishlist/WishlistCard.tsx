"use client";

import { WishlistItem } from "@/lib/api/customer-api";
import Image from "next/image";
import Link from "next/link";

interface WishlistCardProps {
  item: WishlistItem;
  onRemove: (hotelId: string) => void;
  isRemoving: boolean;
}

export default function WishlistCard({
  item,
  onRemove,
  isRemoving,
}: WishlistCardProps) {
  const thumbnailUrl = item.thumbnailUrl || "/placeholder-hotel.jpg";

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 relative">
      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.hotelId)}
        disabled={isRemoving}
        className="absolute top-3 right-3 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-50 transition-all duration-200 shadow-lg group/btn disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Remove from wishlist"
      >
        {isRemoving ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-500 border-t-transparent"></div>
        ) : (
          <svg
            className="w-5 h-5 text-red-500 group-hover/btn:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )}
      </button>

      <Link href={`/hotels/${item.hotelId}`} className="block">
        {/* Hotel Image */}
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Hotel Details */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-display text-secondary mb-1 group-hover:text-accent transition-colors line-clamp-1">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="line-clamp-1">{item.city}</span>
              </p>
            </div>
          </div>

          {/* Rating */}
          {item.rating !== null && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 bg-accent text-white px-2 py-1 rounded-lg">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-sm">{item.rating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-gray-600">
                ({item.reviewCount} đánh giá)
              </span>
            </div>
          )}

          {/* Address */}
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex items-start gap-1">
            <svg
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {item.address}
          </p>

          {/* Price */}
          <div className="flex items-end justify-between pt-4 border-t border-gray-100">
            <div>
              {item.startingPrice !== null ? (
                <>
                  <p className="text-sm text-gray-500">Giá từ</p>
                  <p className="text-2xl font-bold text-accent">
                    {item.startingPrice.toLocaleString("vi-VN")} {item.currency}
                  </p>
                  <p className="text-xs text-gray-500">/ đêm</p>
                </>
              ) : (
                <p className="text-sm text-gray-500 italic">Liên hệ để biết giá</p>
              )}
            </div>
            <div className="px-4 py-2 bg-accent text-white rounded-lg group-hover:bg-accent/90 transition-colors font-medium text-sm">
              Xem chi tiết
            </div>
          </div>

          {/* Added Date */}
          <p className="text-xs text-gray-400 mt-3">
            Đã thêm vào:{" "}
            {new Date(item.createdAt).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      </Link>
    </div>
  );
}
