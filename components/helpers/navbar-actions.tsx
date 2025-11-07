"use client";

import { useRouter } from "next/navigation";

export default function NavbarActions() {
    const router = useRouter();
    return (
        <div className="space-x-2">
            <button className="text-base light" onClick={() => router.push("/sign-up")}>Register</button>
            <button className="text-base dark" onClick={() => router.push("/sign-in")}>Sign in</button>
        </div>
    );
}