"use client";

import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import ChatButton from "@/components/ui/chat-button";
import ProfileHeader from "@/components/account/ProfileHeader";
import ProfileSidebar from "@/components/account/ProfileSidebar";
import PersonalDetailsCard from "@/components/account/PersonalDetailsCard";
import Image from "next/image";
import Link from "next/link";

// Mock user data
const initialUser = {
    name: "Diem",
    displayName: "KDiem",
    email: "kieudiem@gmail.com",
    verified: true,
    phone: "Not provided",
    dateOfBirth: "Not provided",
    nationality: "Not provided",
    gender: "Not provided",
    address: "Not provided",
    passportDetails: "Not provided",
};

export default function ProfilePage() {
    const [user, setUser] = useState(initialUser);

    const handleUpdate = (field: string, value: string) => {
        setUser((prev) => ({
            ...prev,
            [field === "passport" ? "passportDetails" : field]: value,
        }));
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-light)' }}>
            <header>
                <Navbar />
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                {/* Profile Header */}
                <ProfileHeader name={user.name} />

                {/* Main content - 2 column layout */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left sidebar */}
                    <ProfileSidebar activeItem="personal-details" />

                    {/* Right main card */}
                    <div className="flex-1 min-w-0">
                        <PersonalDetailsCard user={user} onUpdate={handleUpdate} />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer id="footer" className="py-12 px-6 mt-20">
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

            {/* Floating chat button */}
            <ChatButton />
        </div>
    );
}
