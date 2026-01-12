"use client";

import { ReactNode } from "react";

interface CheckoutFormSectionProps {
    title: string;
    children: ReactNode;
}

export default function CheckoutFormSection({ title, children }: CheckoutFormSectionProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                {title}
            </h2>
            {children}
        </div>
    );
}

