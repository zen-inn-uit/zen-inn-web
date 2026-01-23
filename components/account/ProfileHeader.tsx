"use client";

import Link from "next/link";
import { Camera } from "lucide-react";
import { useState } from "react";

interface ProfileHeaderProps {
    name: string;
}

export default function ProfileHeader({ name }: ProfileHeaderProps) {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    
    // Extract first name from full name
    const firstName = name.split(" ")[0] || name;

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex items-center gap-5 mb-8">
            {/* Avatar */}
            <div className="relative group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6B5B3D] to-[#8B7355] flex items-center justify-center overflow-hidden shadow-lg">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-3xl font-bold text-white">
                            {firstName.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>
                {/* Camera overlay */}
                <label 
                    htmlFor="avatar-upload" 
                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                    <Camera size={24} className="text-white" />
                </label>
                <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                />
            </div>
            
            {/* Greeting */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1">
                    Hi, {firstName}
                </h2>
                <p className="text-gray-600">
                    How you doing?
                </p>
            </div>
        </div>
    );
}
