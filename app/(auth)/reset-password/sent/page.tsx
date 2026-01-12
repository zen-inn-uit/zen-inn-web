"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ResetPasswordSentForm() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    
    // Mask email for display (show first 3 chars and domain)
    const maskEmail = (email: string) => {
        if (!email) return "";
        const [localPart, domain] = email.split("@");
        if (!domain) return email;
        const visible = localPart.substring(0, 3);
        return `${visible}***@${domain}`;
    };

    return (
        <>
            <AuthCard>
                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                    Check your inbox!
                </h1>
                
                {/* Message */}
                <p className="text-secondary text-center mb-8 text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                    We've sent a password reset link to{" "}
                    {email && (
                        <span className="font-medium">{maskEmail(email)}</span>
                    )}
                    {!email && (
                        <span className="font-medium">your email address</span>
                    )}
                    . Please check your inbox and follow the instructions to reset your password.
                </p>

                {/* Back to login button */}
                <Link
                    href="/sign-in"
                    className="block w-full py-4 rounded-xl bg-accent text-primary font-bold text-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent transition-all mb-6 shadow-lg text-center"
                    style={{ fontFamily: 'var(--font-display)' }}
                    aria-label="Back to login"
                >
                    Back to login
                </Link>
            </AuthCard>

            {/* Footer copyright text */}
            <p className="text-white/60 text-sm text-center mt-8" style={{ fontFamily: 'var(--font-body)' }}>
                &copy; {new Date().getFullYear()} Zen Inn. All rights reserved.
            </p>
        </>
    );
}

export default function ResetPasswordSentPage() {
    return (
        <AuthLayout>
            <Suspense fallback={
                <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8 md:p-10">
                    <div className="text-white text-center" style={{ fontFamily: 'var(--font-body)' }}>Loading...</div>
                </div>
            }>
                <ResetPasswordSentForm />
            </Suspense>
        </AuthLayout>
    );
}

