"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import EmailFirstScreen from "@/components/auth/EmailFirstScreen";

export default function SignUpPage() {
    return (
        <AuthLayout>
            <EmailFirstScreen onSubmitAction="sign-up" />
            {/* Footer copyright text */}
            <p className="text-white/60 text-sm text-center mt-8" style={{ fontFamily: 'var(--font-body)' }}>
                &copy; {new Date().getFullYear()} Zen Inn. All rights reserved.
            </p>
        </AuthLayout>
    );
}
