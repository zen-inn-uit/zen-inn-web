"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import PasswordScreen from "@/components/auth/PasswordScreen";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignInPasswordForm() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    return (
        <PasswordScreen 
            title="Log in"
            buttonText="Log in"
            showForgotPassword={true}
            email={email}
        />
    );
}

export default function SignInPasswordPage() {
    return (
        <AuthLayout>
            <Suspense fallback={
                <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8 md:p-10">
                    <div className="text-white text-center" style={{ fontFamily: 'var(--font-body)' }}>Loading...</div>
                </div>
            }>
                <SignInPasswordForm />
            </Suspense>
        </AuthLayout>
    );
}
