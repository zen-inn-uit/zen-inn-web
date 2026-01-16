'use client';

import Link from "next/link";
import Image from "next/image";
import NavbarActionsGuest from "../helpers/navbar-actions-guest";
import NavbarActions from "../helpers/navbar-actions";
import AirbnbSearch from "./airbnb-search";

export default function Navbar() {
    const isLogin = false;

    return (
        <header className="navbar sticky top-0 z-50 bg-white border-b border-gray-200">
            <nav className="max-w-[1760px] mx-auto px-6 lg:px-10">
                {/* Top bar */}
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
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

                    {/* Center - Title */}
                    <div className="hidden md:flex items-center">
                        <h2 className="text-lg font-semibold text-primary">
                            Stays
                        </h2>
                    </div>

                    {/* Right side actions */}
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
                        {isLogin ? (
                            <NavbarActions />
                        ) : (
                            <NavbarActionsGuest />
                        )}
                    </div>
                </div>

                {/* Search bar */}
                <div className="pb-6 flex justify-center">
                    <div className="w-full max-w-[850px]">
                        <AirbnbSearch />
                    </div>
                </div>
            </nav>
        </header>
    );
}