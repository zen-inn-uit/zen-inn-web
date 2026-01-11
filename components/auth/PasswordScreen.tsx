"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "./AuthCard";

interface PasswordScreenProps {
    title?: string;
    buttonText?: string;
    showForgotPassword?: boolean;
    email?: string;
}

function PasswordForm({ 
    title, 
    buttonText, 
    showForgotPassword, 
    email 
}: PasswordScreenProps) {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <>
            <AuthCard>
                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                    {title || "Log in"}
                </h1>
                
                {/* Email display */}
                {email && (
                    <p className="text-secondary text-center mb-6 text-base" style={{ fontFamily: 'var(--font-body)' }}>
                        {email}
                    </p>
                )}

                {/* Password form */}
                <form onSubmit={handleSubmit}>
                    {/* Password input field */}
                    <div className="mb-6">
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-base transition-all"
                            style={{ fontFamily: 'var(--font-body)' }}
                            aria-label="Password"
                            aria-required="true"
                            required
                        />
                    </div>

                    {/* Forgot password link */}
                    {showForgotPassword && (
                        <div className="mb-6 text-right">
                            <Link 
                                href="/reset-password" 
                                className="text-accent hover:text-accent/80 text-sm underline transition-colors"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    )}

                    {/* Primary CTA button */}
                    <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-accent text-primary font-bold text-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent transition-all mb-6 shadow-lg"
                        style={{ fontFamily: 'var(--font-display)' }}
                        aria-label={buttonText || "Log in"}
                    >
                        {buttonText || "Log in"}
                    </button>
                </form>

                {/* Back to email link */}
                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="text-white/70 hover:text-white text-sm underline transition-colors"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        ← Back
                    </button>
                </div>
            </AuthCard>

            {/* Footer copyright text */}
            <p className="text-white/60 text-sm text-center mt-8" style={{ fontFamily: 'var(--font-body)' }}>
                &copy; {new Date().getFullYear()} Zen Inn. All rights reserved.
            </p>
        </>
    );
}

export default function PasswordScreen(props: PasswordScreenProps) {
    return <PasswordForm {...props} />;
}
