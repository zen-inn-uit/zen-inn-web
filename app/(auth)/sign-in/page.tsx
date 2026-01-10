"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import EmailFirstScreen from "@/components/auth/EmailFirstScreen";

export default function SignInPage() {
    return (
        <AuthLayout>
            <EmailFirstScreen onSubmitAction="sign-in" />
            {/* Footer copyright text */}
            <p className="text-sm text-center mt-8" style={{ fontFamily: 'var(--font-body)', color: 'rgba(156, 163, 175, 0.9)' }}>
                &copy; {new Date().getFullYear()} Zen Inn. All rights reserved.
            </p>
        </AuthLayout>
    );
}
