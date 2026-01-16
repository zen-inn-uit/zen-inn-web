'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import NavbarActionsGuest from "../helpers/navbar-actions-guest";
import AirbnbSearch from "./airbnb-search";
import { useAuth } from "@/contexts/auth-context";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getInitial = () => {
        if (!user?.email) return "U";
        return user.email.charAt(0).toUpperCase();
    };

    return (
        <header className="navbar sticky top-0 z-50 bg-white border-b border-gray-200">
            <nav className="max-w-[1760px] mx-auto px-6 lg:px-10">
                {/* top bar */}
                <div className="flex justify-between items-center h-20">
                    {/* logo */}
                    <Link href="/" className="flex items-center">
                        <div className="relative w-[100px] h-[32px]">
                            <Image
                                src="/logo-primary.png"
                                alt="Zen Inn Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </Link>

                    {/* center */}
                    <div className="hidden md:flex items-center">
                        <h2 className="text-lg font-semibold text-primary">
                            Stays
                        </h2>
                    </div>

                    {/* right side */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/partner"
                            className="hidden lg:block text-sm font-semibold text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors"
                        >
                            Zen Inn your home
                        </Link>
                        <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 border border-gray-300 rounded-full p-1 pl-3 hover:shadow-md transition-shadow"
                                >
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    <div className="w-8 h-8 rounded-full bg-[#6B5B3D] flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">{getInitial()}</span>
                                    </div>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href="/bookings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            My Bookings
                                        </Link>
                                        <Link
                                            href="/wishlist"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Wishlist
                                        </Link>
                                        <hr className="my-2 border-gray-200" />
                                        <button
                                            onClick={() => { logout(); setDropdownOpen(false); }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Log out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavbarActionsGuest />
                        )}
                    </div>
                </div>

                {/* search bar */}
                <div className="pb-6 flex justify-center">
                    <div className="w-full max-w-[850px]">
                        <AirbnbSearch />
                    </div>
                </div>
            </nav>
        </header>
    );
}