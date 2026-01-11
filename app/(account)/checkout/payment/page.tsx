"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import ChatButton from "@/components/ui/chat-button";

type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "EXPIRED";

export default function CheckoutPaymentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pid = searchParams.get("pid");
    const simulate = searchParams.get("simulate"); // For demo: ?simulate=fail
    
    const [status, setStatus] = useState<PaymentStatus>("PENDING");
    const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
    const hasProcessedPaid = useRef(false);

    // Countdown timer
    useEffect(() => {
        if (timeRemaining <= 0) {
            setStatus("EXPIRED");
            return;
        }

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    setStatus("EXPIRED");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining]);

    // Handle simulate=fail query param
    useEffect(() => {
        if (simulate === "fail" && status === "PENDING") {
            const timer = setTimeout(() => {
                setStatus("FAILED");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [simulate, status]);

    // Mock payment status polling
    useEffect(() => {
        if (status !== "PENDING") return;

        const pollInterval = setInterval(() => {
            // In a real app, this would check the payment status from the server
            // For now, we just keep polling (status stays PENDING unless expired or simulate=fail)
        }, 2500);

        return () => clearInterval(pollInterval);
    }, [status]);

    // Handle redirects based on status
    useEffect(() => {
        if (status === "PAID") {
            router.replace("/checkout/success");
        } else if (status === "FAILED") {
            // Extract reason from simulate query param if present
            const reason = searchParams.get("reason") || "declined";
            router.replace(`/checkout/failure?pid=${pid}&reason=${reason}`);
        } else if (status === "EXPIRED") {
            router.replace(`/checkout/expired?pid=${pid}`);
        }
    }, [status, router, pid, searchParams]);

    // Handle "I've paid" button click - simulate payment success
    const handlePaidClick = () => {
        if (!hasProcessedPaid.current && status === "PENDING") {
            hasProcessedPaid.current = true;
            // Simulate payment success after a short delay (1-2 polls)
            setTimeout(() => {
                setStatus("PAID");
            }, 2000);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    // Mock payment data
    const amount = 420.00;

    if (!pid) {
        return (
            <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
                <header>
                    <Navbar />
                </header>
                <main className="max-w-4xl mx-auto px-4 md:px-6 py-16">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
                        <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                            Payment ID missing
                        </h1>
                        <p className="text-gray-600 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                            Please go back and try again.
                        </p>
                        <Link
                            href="/checkout/review"
                            className="inline-block px-6 py-3 rounded-lg text-white font-bold hover:opacity-90 transition-all"
                            style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--color-form)', fontSize: 'var(--fs-h5)' }}
                        >
                            Back to review
                        </Link>
                    </div>
                </main>
                <ChatButton />
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
            <header>
                <Navbar />
            </header>

            <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
                {/* Status pill */}
                <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                        Waiting for payment…
                    </span>
                </div>

                {/* Page title */}
                <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                    Complete your payment
                </h1>

                {/* Main content - 2 column layout */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left column - QR Code */}
                    <div className="flex-1 flex flex-col items-center md:items-start">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 w-full max-w-md">
                            <div className="relative w-full aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                <Image
                                    src="/qr-placeholder.svg"
                                    alt="QR Code"
                                    fill
                                    className="object-contain p-4"
                                    sizes="400px"
                                />
                            </div>
                            <p className="text-sm text-center text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                                Scan QR to pay
                            </p>
                        </div>
                    </div>

                    {/* Right column - Payment details and actions */}
                    <div className="w-full md:w-[400px] flex-shrink-0">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                            {/* Amount */}
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                                    Amount to pay
                                </div>
                                <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                    ${amount.toFixed(2)}
                                </div>
                            </div>

                            {/* Order code / Reference */}
                            <div className="mb-6">
                                <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                                    Order code
                                </div>
                                <div className="text-base font-mono font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                                    {pid}
                                </div>
                            </div>

                            {/* Countdown timer */}
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <div className="text-center">
                                    <div className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: timeRemaining < 60 ? '#ef4444' : 'var(--color-primary)' }}>
                                        {formatTime(timeRemaining)}
                                    </div>
                                    <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                                        This payment request expires in 5 minutes.
                                    </p>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="space-y-3">
                                <button
                                    type="button"
                                    onClick={handlePaidClick}
                                    className="w-full py-3 rounded-lg border-2 border-accent bg-accent/10 text-accent font-bold hover:bg-accent/20 transition-colors"
                                    style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h5)' }}
                                >
                                    I've paid
                                </button>
                                <Link
                                    href="/checkout/review"
                                    className="block w-full py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors text-center"
                                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}
                                >
                                    Change payment method
                                </Link>
                                <Link
                                    href="/checkout/review"
                                    className="block w-full py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors text-center"
                                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}
                                >
                                    Cancel payment
                                </Link>
                            </div>
                        </div>
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

