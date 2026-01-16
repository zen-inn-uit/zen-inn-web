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
                <div className="rounded-[28px] border backdrop-blur-sm shadow-md p-6 md:p-8 flex items-center justify-center min-h-[300px]"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.28)', borderColor: 'rgba(255, 255, 255, 0.35)' }}>
                    <p className="text-gray-600">Loading...</p>
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
        <div className="min-h-screen relative" style={{ backgroundColor: 'var(--color-bg-light)' }}>
            {/* bg layer */}
            <div
                className="absolute inset-0 z-0 bg-no-repeat opacity-20"
                style={{
                    backgroundImage: "url('/auth-bg.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
            </div>
            {/* overlay */}
            <div className="absolute inset-0 z-0 bg-black/20" />

            <header className="relative z-10">
                <Navbar />
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8">
                {/* header */}
                <ProfileHeader name={profileData?.email?.split("@")[0] || "User"} />

                {/* main */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* sidebar */}
                    <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />

                    {/* content */}
                    <div className="flex-1 min-w-0">
                        {renderContent()}
                    </div>
                </div>
            </main>

            {/* footer */}
            <footer id="footer" className="relative z-10 py-12 px-6 mt-20">
                <div className="">
                <div>
                    <div className="flex justify-between md:flex-row flex-col">
                    <div className="flex flex-col items-center md:items-start space-y-6">
                        <Image src="/ZenInn.svg" alt="Zen Inn Logo" width={70} height={30} />
                        <p className="text-accent">
                        Find the true pleasure in life
                        </p>
                    </div>
                    <div className="flex items-center space-x-12">
                        <Link href="/contact" className="text-secondary">Contact</Link>
                        <Link href="/about" className="text-secondary">About us</Link>
                    </div>
                    </div>
                    <div className="border-t-2 border-[var(--color-primary)] mt-10 pt-4 text-center text-accent">
                    <div className="flex justify-end items-center space-x-6 md:space-x-8 mb-24 mt-6">
                        <Link href="https://www.facebook.com">
                        <Image src="/fb.svg" alt="Facebook" width={10} height={10} />
                        </Link>
                        <Link href="https://www.twitter.com">
                        <Image src="/x.svg" alt="Twitter" width={20} height={20} />
                        </Link>
                        <Link href="https://www.instagram.com">
                        <Image src="/ins.svg" alt="Instagram" width={20} height={20} />
                        </Link>
                    </div>
                    <p className="text-secondary">&copy; {new Date().getFullYear()} Zen Inn. Powered by <span className="text-accent">Group 15</span>.<br />All rights reserved.</p>
                    </div>
                </div>
                </div>
                <ChatButton />
            </footer>

            {/* chat btn */}
            <ChatButton />
        </div>
    );
}

// placeholders (no backend yet)
function SecurityPlaceholder() {
    return (
        <div
            className="rounded-[28px] border backdrop-blur-sm shadow-md p-6 md:p-8"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.28)', borderColor: 'rgba(255, 255, 255, 0.35)' }}
        >
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#3d2f26' }}>
                    Security settings
                </h1>
                <p className="text-gray-700" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}>
                    Manage your password and account security.
                </p>
            </div>
            <div className="space-y-0">
                {[
                    { label: "Password", value: "********", action: "Change" },
                    { label: "Two-factor authentication", value: "Not enabled", action: "Enable" },
                    { label: "Active sessions", value: "1 device", action: "Manage" },
                ].map((item, index, arr) => (
                    <div key={item.label} className={`py-5 ${index !== arr.length - 1 ? "border-b border-gray-300/25" : ""}`}>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            <div className="md:col-span-3">
                                <span className="text-sm font-normal text-gray-600">{item.label}</span>
                            </div>
                            <div className="md:col-span-7">
                                <span className="font-medium text-gray-900">{item.value}</span>
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <button className="px-3 py-1 text-sm border border-gray-400/50 bg-white/20 rounded-md font-medium hover:bg-white/35 transition-colors" style={{ color: '#5a4235' }}>
                                    {item.action}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PreferencesPlaceholder() {
    return (
        <div
            className="rounded-[28px] border backdrop-blur-sm shadow-md p-6 md:p-8"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.28)', borderColor: 'rgba(255, 255, 255, 0.35)' }}
        >
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#3d2f26' }}>
                    Preferences
                </h1>
                <p className="text-gray-700" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}>
                    Customize your experience.
                </p>
            </div>
            <div className="space-y-0">
                {[
                    { label: "Language", value: "English" },
                    { label: "Currency", value: "VND" },
                    { label: "Email notifications", value: "Enabled" },
                    { label: "SMS notifications", value: "Disabled" },
                    { label: "Marketing emails", value: "Disabled" },
                ].map((item, index, arr) => (
                    <div key={item.label} className={`py-5 ${index !== arr.length - 1 ? "border-b border-gray-300/25" : ""}`}>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            <div className="md:col-span-3">
                                <span className="text-sm font-normal text-gray-600">{item.label}</span>
                            </div>
                            <div className="md:col-span-7">
                                <span className="font-medium text-gray-900">{item.value}</span>
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <button className="px-3 py-1 text-sm border border-gray-400/50 bg-white/20 rounded-md font-medium hover:bg-white/35 transition-colors" style={{ color: '#5a4235' }}>
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PaymentMethodsPlaceholder() {
    return (
        <div
            className="rounded-[28px] border backdrop-blur-sm shadow-md p-6 md:p-8"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.28)', borderColor: 'rgba(255, 255, 255, 0.35)' }}
        >
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#3d2f26' }}>
                    Payment methods
                </h1>
                <p className="text-gray-700" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}>
                    Manage your saved payment methods.
                </p>
            </div>
            <div className="space-y-4">
                <div className="p-4 border border-gray-300/30 rounded-lg bg-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                            VISA
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">**** **** **** 4242</p>
                            <p className="text-sm text-gray-600">Expires 12/25</p>
                        </div>
                    </div>
                    <button className="px-3 py-1 text-sm border border-gray-400/50 bg-white/20 rounded-md font-medium hover:bg-white/35 transition-colors" style={{ color: '#5a4235' }}>
                        Remove
                    </button>
                </div>
                <button className="w-full py-3 border-2 border-dashed border-gray-400/50 rounded-lg text-gray-600 hover:bg-white/10 transition-colors">
                    + Add payment method
                </button>
            </div>
        </div>
    );
}
