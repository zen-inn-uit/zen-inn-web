"use client";

import { ReactNode } from "react";
import ChatButton from "@/components/ui/chat-button";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 py-8">
            {/* Full-screen background image with light gray overlay */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/auth-bg.png')",
                    backgroundColor: "#e5e7eb" // Fallback color if image doesn't exist
                }}
            >
                <div className="absolute inset-0 bg-gray-100/40" />
            </div>

            {/* Main content */}
            <div className="relative z-10 w-full" style={{ maxWidth: '560px' }}>
                {children}
            </div>

            {/* Floating chat button - remains untouched */}
            <ChatButton />
        </div>
    );
}

