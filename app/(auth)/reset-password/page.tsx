"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";

export default function ResetPasswordPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // UI only - no auth logic needed
        // In a real app, this would call a password reset API
    };

    return (
        <AuthLayout>
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8 md:p-10">
                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                    Reset password
                </h1>
                
                {/* Subtitle */}
                <p className="text-secondary text-center mb-8 text-base md:text-lg" style={{ fontFamily: 'var(--font-body)' }}>
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                {/* Reset password form */}
                <form onSubmit={handleSubmit}>
                    {/* Email input field */}
                    <div className="mb-6">
                        <label htmlFor="reset-email" className="sr-only">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="reset-email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-base transition-all"
                            style={{ fontFamily: 'var(--font-body)' }}
                            aria-label="Email address"
                            aria-required="true"
                            required
                        />
                    </div>

                    {/* Primary CTA button */}
                    <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-accent text-primary font-bold text-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent transition-all mb-6 shadow-lg"
                        style={{ fontFamily: 'var(--font-display)' }}
                        aria-label="Send reset link"
                    >
                        Send reset link
                    </button>
                </form>

                {/* Back to sign in link */}
                <div className="text-center">
                    <Link
                        href="/sign-in"
                        className="text-white/70 hover:text-white text-sm underline transition-colors"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        ← Back to sign in
                    </Link>
                </div>
            </div>

            {/* Footer copyright text */}
            <p className="text-white/60 text-sm text-center mt-8" style={{ fontFamily: 'var(--font-body)' }}>
                &copy; {new Date().getFullYear()} Zen Inn. All rights reserved.
            </p>
        </AuthLayout>
    );
}

