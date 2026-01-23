"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import ChatButton from "@/components/ui/chat-button";
import ProfileHeader from "@/components/account/ProfileHeader";
import ProfileSidebar, { ProfileTab } from "@/components/account/ProfileSidebar";
import PersonalDetailsCard, { ProfileUser } from "@/components/account/PersonalDetailsCard";
import Image from "next/image";
import Link from "next/link";
import { authAPI } from "@/lib/api/auth-api";

interface ProfileResponse {
    id: string;
    email: string;
    emailVerifiedAt?: string | null;
    role: string;
    status: string;
    provider?: string;
    createdAt?: string;
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<ProfileTab>("personal-details");
    const [profileData, setProfileData] = useState<ProfileUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await authAPI.getProfile() as ProfileResponse;
                setProfileData({
                    id: data.id,
                    email: data.email,
                    emailVerifiedAt: data.emailVerifiedAt || null,
                    role: data.role,
                    status: data.status,
                    provider: data.provider || 'email',
                    createdAt: data.createdAt || new Date().toISOString(),
                });
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="rounded-2xl bg-white shadow-lg p-8 animate-pulse">
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        <div className="space-y-3 pt-4">
                            <div className="h-12 bg-gray-200 rounded"></div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            );
        }

        switch (activeTab) {
            case "personal-details":
                return profileData ? <PersonalDetailsCard user={profileData} /> : null;
            case "security-settings":
                return <SecurityPlaceholder />;
            case "preferences":
                return <PreferencesPlaceholder />;
            case "payment-methods":
                return <PaymentMethodsPlaceholder />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                <Navbar showSearch={false} />
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 animate-fade-in">
                {/* Header with animation */}
                <div className="animate-fade-in-down">
                    <ProfileHeader name={profileData?.email?.split("@")[0] || "User"} />
                </div>

                {/* Main content with stagger animation */}
                <div className="flex flex-col lg:flex-row gap-6 mt-8">
                    {/* Sidebar with animation */}
                    <div className="lg:w-80 animate-fade-in-left">
                        <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>

                    {/* Content area with animation */}
                    <div className="flex-1 min-w-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {renderContent()}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-20 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="space-y-4">
                            <Image src="/ZenInn.svg" alt="Zen Inn Logo" width={100} height={40} className="transition-transform hover:scale-105" />
                            <p className="text-gray-600 text-sm">
                                Find the true pleasure in life
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-900">Quick Links</h3>
                            <div className="flex flex-col space-y-2">
                                <Link href="/contact" className="text-gray-600 hover:text-[#6B5B3D] transition-colors">Contact</Link>
                                <Link href="/about" className="text-gray-600 hover:text-[#6B5B3D] transition-colors">About us</Link>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-900">Follow Us</h3>
                            <div className="flex space-x-4">
                                <Link href="https://www.facebook.com" className="transition-transform hover:scale-110">
                                    <Image src="/fb.svg" alt="Facebook" width={24} height={24} />
                                </Link>
                                <Link href="https://www.twitter.com" className="transition-transform hover:scale-110">
                                    <Image src="/x.svg" alt="Twitter" width={24} height={24} />
                                </Link>
                                <Link href="https://www.instagram.com" className="transition-transform hover:scale-110">
                                    <Image src="/ins.svg" alt="Instagram" width={24} height={24} />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            &copy; {new Date().getFullYear()} Zen Inn. Powered by <span className="text-[#6B5B3D] font-semibold">Group 15</span>.<br />
                            All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            <ChatButton />
        </div>
    );
}

// Security Settings Component
function SecurityPlaceholder() {
    const securityItems = [
        { label: "Password", value: "••••••••", action: "Change" },
        { label: "Two-factor authentication", value: "Not enabled", action: "Enable" },
        { label: "Active sessions", value: "1 device", action: "Manage" },
    ];

    return (
        <div className="rounded-2xl bg-white shadow-lg overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6B5B3D] to-[#8B7355] p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">Security Settings</h1>
                <p className="text-white/90 text-sm">Manage your password and account security</p>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="space-y-1 stagger-fade-in">
                    {securityItems.map((item, index) => (
                        <div 
                            key={item.label} 
                            className="p-4 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{item.label}</p>
                                        <p className="text-sm text-gray-500">{item.value}</p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-[#6B5B3D] text-white rounded-lg font-medium hover:bg-[#5a4a31] transition-all button-hover-lift text-sm">
                                    {item.action}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Security Info */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex gap-3">
                        <span className="text-blue-600 text-xl">ℹ️</span>
                        <div>
                            <h3 className="font-semibold text-blue-900 mb-1">Security Tip</h3>
                            <p className="text-sm text-blue-700">
                                Enable two-factor authentication for an extra layer of security on your account.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Preferences Component
function PreferencesPlaceholder() {
    const preferences = [
        { label: "Language", value: "English" },
        { label: "Currency", value: "VND" },
        { label: "Email notifications", value: "Enabled" },
        { label: "SMS notifications", value: "Disabled" },
        { label: "Marketing emails", value: "Disabled" },
    ];

    return (
        <div className="rounded-2xl bg-white shadow-lg overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6B5B3D] to-[#8B7355] p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">Preferences</h1>
                <p className="text-white/90 text-sm">Customize your experience</p>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="space-y-1 stagger-fade-in">
                    {preferences.map((item, index) => (
                        <div 
                            key={item.label}
                            className="p-4 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{item.label}</p>
                                        <p className="text-sm text-gray-500">{item.value}</p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-[#6B5B3D] hover:text-[#6B5B3D] transition-all text-sm">
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Payment Methods Component
function PaymentMethodsPlaceholder() {
    return (
        <div className="rounded-2xl bg-white shadow-lg overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6B5B3D] to-[#8B7355] p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">Payment Methods</h1>
                <p className="text-white/90 text-sm">Manage your saved payment methods</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Saved Card */}
                <div className="p-5 border-2 border-gray-200 rounded-xl hover:border-[#6B5B3D] transition-all group card-hover bg-gradient-to-br from-blue-50 to-blue-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md">
                                VISA
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">•••• •••• •••• 4242</p>
                                <p className="text-sm text-gray-600">Expires 12/25</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all text-sm">
                            Remove
                        </button>
                    </div>
                </div>

                {/* Add New Card */}
                <button className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#6B5B3D] hover:bg-gray-50 transition-all group">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-[#6B5B3D] flex items-center justify-center transition-all">
                            <span className="text-2xl group-hover:text-white transition-colors">+</span>
                        </div>
                        <span className="font-medium group-hover:text-[#6B5B3D] transition-colors">Add payment method</span>
                    </div>
                </button>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex gap-3">
                        <span className="text-green-600 text-xl">🔐</span>
                        <div>
                            <h3 className="font-semibold text-green-900 mb-1">Secure Payments</h3>
                            <p className="text-sm text-green-700">
                                Your payment information is encrypted and securely stored.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
