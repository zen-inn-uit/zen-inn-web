"use client";

import { ReactNode } from "react";

interface AuthCardProps {
    children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
    return (
        <div 
            className="backdrop-blur-md border shadow-sm w-full"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                borderColor: 'rgba(255, 255, 255, 0.28)',
                borderRadius: '28px',
                padding: '3rem 2.5rem'
            }}
        >
            {children}
        </div>
    );
}

