"use client";

import Link from "next/link";

interface BreadcrumbsProps {
    hotelName: string;
    location?: string;
}

export default function Breadcrumbs({ hotelName, location = "Vietnam" }: BreadcrumbsProps) {
    return (
        <nav className="mb-6" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}>
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                    <Link href="/" className="hover:text-accent transition-colors">
                        Home
                    </Link>
                </li>
                <li>/</li>
                <li>
                    <Link href="/search" className="hover:text-accent transition-colors">
                        {location}
                    </Link>
                </li>
                <li>/</li>
                <li>
                    <span className="text-gray-900">{hotelName}</span>
                </li>
            </ol>
        </nav>
    );
}

