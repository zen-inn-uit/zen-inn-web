"use client";

import Image from "next/image";
import Link from "next/link";
import ChatButton from "@/components/ui/chat-button";

export default function SignInPage() {
    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 py-8">
            {/* Full-screen background image with dark overlay */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/auth-bg.jpg')",
                    backgroundColor: "#1f2937" // Fallback color if image doesn't exist
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Main content */}
            <div className="relative z-10 w-full max-w-md">
                {/* Glassmorphism auth card */}
                <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8 md:p-10">
                    {/* Heading */}
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                        Sign in or create an account!
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-secondary text-center mb-8 text-base md:text-lg" style={{ fontFamily: 'var(--font-body)' }}>
                        Welcome to Zen Inn. Enter your email to continue.
                    </p>

                    {/* Email input field */}
                    <div className="mb-6">
                        <label htmlFor="email" className="sr-only">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-base transition-all"
                            style={{ fontFamily: 'var(--font-body)' }}
                            aria-label="Email address"
                            aria-required="true"
                        />
                    </div>

                    {/* Primary CTA button */}
                    <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-accent text-primary font-bold text-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent transition-all mb-6 shadow-lg"
                        style={{ fontFamily: 'var(--font-display)' }}
                        aria-label="Continue with email"
                    >
                        Continue with email
                    </button>

                    {/* Divider with "Or" */}
                    <div className="flex items-center mb-6">
                        <div className="flex-1 h-px bg-white/30"></div>
                        <span className="px-4 text-white/80 text-sm" style={{ fontFamily: 'var(--font-body)' }}>Or</span>
                        <div className="flex-1 h-px bg-white/30"></div>
                    </div>

                    {/* Social login buttons */}
                    <div className="flex justify-center gap-4 mb-8">
                        {/* Google button */}
                        <button
                            type="button"
                            className="w-14 h-14 rounded-full bg-white/20 border border-white/30 flex items-center justify-center hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                            aria-label="Sign in with Google"
                        >
                            <Image 
                                src="/google.svg" 
                                alt="Google" 
                                width={24} 
                                height={24}
                                className="w-6 h-6"
                            />
                        </button>

                        {/* Apple button */}
                        <button
                            type="button"
                            className="w-14 h-14 rounded-full bg-white/20 border border-white/30 flex items-center justify-center hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                            aria-label="Sign in with Apple"
                        >
                            <Image 
                                src="/apple.svg" 
                                alt="Apple" 
                                width={24} 
                                height={24}
                                className="w-6 h-6 text-white"
                            />
                        </button>

                        {/* Facebook button */}
                        <button
                            type="button"
                            className="w-14 h-14 rounded-full bg-white/20 border border-white/30 flex items-center justify-center hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                            aria-label="Sign in with Facebook"
                        >
                            <Image 
                                src="/fb.svg" 
                                alt="Facebook" 
                                width={24} 
                                height={24}
                                className="w-6 h-6 brightness-0 invert"
                            />
                        </button>
                    </div>

                    {/* Terms & Conditions text */}
                    <p className="text-white/70 text-xs text-center mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                        By continuing, you agree to Zen Inn's{" "}
                        <Link href="/terms" className="underline hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                        {" "}and{" "}
                        <Link href="/privacy" className="underline hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>

                {/* Footer copyright text */}
                <p className="text-white/60 text-sm text-center mt-8" style={{ fontFamily: 'var(--font-body)' }}>
                    &copy; {new Date().getFullYear()} Zen Inn. All rights reserved.
                </p>
            </div>

            {/* Floating chat button - remains untouched */}
            <ChatButton />
        </div>
    );
}
