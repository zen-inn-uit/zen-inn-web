"use client";

import { ReactNode } from "react";

interface AuthCardProps {
    children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
    return (
        <div className="backdrop-blur-md bg-gray-50/60 rounded-3xl border border-gray-200/50 shadow-sm py-10 px-8 md:py-12 md:px-10">
            {children}
        </div>
    );
}

