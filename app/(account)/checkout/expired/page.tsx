"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import ChatButton from "@/components/ui/chat-button";

export default function CheckoutExpiredPage() {
    const searchParams = useSearchParams();
    const pid = searchParams.get("pid");
    const [newPid] = useState(`pid_${Date.now()}`);

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
            <header>
                <Navbar />
            </header>

            <main className="max-w-2xl mx-auto px-4 md:px-6 py-16">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-12 text-center">
                    {/* Status icon */}
                    <div className="mb-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                        Payment expired
                    </h1>

                    {/* Message */}
                    <p className="text-lg text-gray-700 mb-8" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}>
                        This payment request has expired. Please try again.
                    </p>

                    {pid && (
                        <p className="text-sm text-gray-500 mb-8" style={{ fontFamily: 'var(--font-body)' }}>
                            Order code: <span className="font-mono">{pid}</span>
                        </p>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/checkout/payment?pid=${newPid}`}
                            className="px-6 py-3 rounded-lg text-white font-bold hover:opacity-90 transition-all"
                            style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--color-form)', fontSize: 'var(--fs-h5)' }}
                        >
                            Generate new QR
                        </Link>
                        <Link
                            href="/checkout/review"
                            className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}
                        >
                            Change payment method
                        </Link>
                        <Link
                            href="/search"
                            className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}
                        >
                            Back to hotel
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer id="footer" className="py-12 px-6 mt-20 bg-brand/10">
                <div className="max-w-7xl mx-auto">
                    <div className="border-t-2 border-[var(--color-primary)] pt-4 text-center">
                        <p className="text-secondary" style={{ fontFamily: 'var(--font-body)' }}>
                            &copy; {new Date().getFullYear()} Zen Inn. Powered by <span className="text-accent">Group 15</span>.<br />All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Floating chat button */}
            <ChatButton />
        </div>
    );
}

