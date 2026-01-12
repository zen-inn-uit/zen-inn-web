"use client";

import Navbar from "@/components/ui/navbar";
import ChatButton from "@/components/ui/chat-button";
import ProfileHeader from "@/components/account/ProfileHeader";
import ProfileSidebar from "@/components/account/ProfileSidebar";
import PersonalDetailsCard from "@/components/account/PersonalDetailsCard";
import Image from "next/image";
import Link from "next/link";

// Mock user data
const mockUser = {
    name: "Han Khong",
    displayName: "Han K.",
    email: "hankhong@gmail.com",
    verified: true,
    phone: "Not provided",
    dateOfBirth: "Not provided",
    nationality: "Not provided",
    gender: "Not provided",
    address: "Not provided",
    passportDetails: "Not provided",
};

export default function ProfilePage() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-light)' }}>
            <header>
                <Navbar />
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                {/* Profile Header */}
                <ProfileHeader name={mockUser.name} />

                {/* Main content - 2 column layout */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left sidebar */}
                    <ProfileSidebar activeItem="personal-details" />

                    {/* Right main card */}
                    <div className="flex-1 min-w-0">
                        <PersonalDetailsCard user={mockUser} />
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
