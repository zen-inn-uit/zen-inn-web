"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "./AuthCard";

interface EmailFirstScreenProps {
    onSubmitAction?: "sign-in" | "sign-up";
}

export default function EmailFirstScreen({
    onSubmitAction = "sign-in"
}: EmailFirstScreenProps) {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        
        if (onSubmitAction === "sign-in") {
            router.push(`/sign-in/password?email=${encodeURIComponent(email)}`);
        } else {
            router.push(`/sign-up/password?email=${encodeURIComponent(email)}`);
        }
    };

    return (
        <AuthCard>
            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-secondary)' }}>
                Sign in or create an account!
            </h1>

            {/* Subtitle */}
            <p className="text-center mb-8 text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'rgba(245, 225, 191, 0.7)' }}>
                You can sign in using your ZenInn.com account to access our services
            </p>

            {/* Email form */}
            <form onSubmit={handleSubmit}>
                {/* Email input field */}
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: '#60463d' }}>
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-4 rounded-xl bg-white/50 border border-gray-200/50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-base transition-all"
                        style={{ fontFamily: 'var(--font-body)' }}
                        aria-label="Email address"
                        aria-required="true"
                        required
                    />
                </div>

                {/* Primary CTA button */}
                <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-white font-bold text-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent transition-all mb-6"
                    style={{ fontFamily: 'var(--font-display)', backgroundColor: 'var(--color-form)' }}
                    aria-label="Continue with email"
                >
                    Continue with email
                </button>
            </form>

            {/* Divider with "Or" */}
            <div className="flex items-center mb-8">
                <div className="flex-1 h-px bg-gray-300/60"></div>
                <span className="px-4 text-sm" style={{ fontFamily: 'var(--font-body)', color: '#9ca3af' }}>Or</span>
                <div className="flex-1 h-px bg-gray-300/60"></div>
            </div>

            {/* Social login buttons */}
            <div className="flex justify-center gap-6 mb-8">
                {/* Google button */}
                <button
                    type="button"
                    className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent rounded-full transition-all"
                    aria-label="Sign in with Google"
                >
                    <Image 
                        src="/google.svg" 
                        alt="Google" 
                        width={32} 
                        height={32}
                        className="w-8 h-8"
                    />
                </button>

                {/* Apple button */}
                <button
                    type="button"
                    className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent rounded-full transition-all"
                    aria-label="Sign in with Apple"
                >
                    <Image 
                        src="/apple.svg" 
                        alt="Apple" 
                        width={32} 
                        height={32}
                        className="w-8 h-8"
                    />
                </button>

                {/* Facebook button */}
                <button
                    type="button"
                    className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent rounded-full transition-all"
                    aria-label="Sign in with Facebook"
                >
                    <Image 
                        src="/fb.svg" 
                        alt="Facebook" 
                        width={32} 
                        height={32}
                        className="w-8 h-8"
                    />
                </button>
            </div>

            {/* Terms & Conditions text */}
            <p className="text-xs text-center mb-2 leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'rgba(156, 163, 175, 0.9)' }}>
                By continuing, you agree to Zen Inn's{" "}
                <Link href="/terms" className="underline hover:opacity-80 transition-opacity" style={{ color: 'rgba(245, 225, 191, 0.8)' }}>
                    Terms of Service
                </Link>
                {" "}and{" "}
                <Link href="/privacy" className="underline hover:opacity-80 transition-opacity" style={{ color: 'rgba(245, 225, 191, 0.8)' }}>
                    Privacy Policy
                </Link>
                .
            </p>
        </AuthCard>
    );
}
