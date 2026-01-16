"use client";

export interface ProfileUser {
    id: string;
    email: string;
    emailVerifiedAt: string | null;
    role: string;
    status: string;
    provider: string;
    createdAt: string;
}

interface PersonalDetailsCardProps {
    user: ProfileUser;
}

export default function PersonalDetailsCard({ user }: PersonalDetailsCardProps) {
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getProviderLabel = (provider: string) => {
        switch (provider) {
            case 'GOOGLE': return 'Google';
            case 'FACEBOOK': return 'Facebook';
            case 'PASSWORD': return 'Email & Password';
            default: return provider;
        }
    };

    const fields = [
        {
            key: "email",
            label: "Email address",
            value: user.email,
            verified: !!user.emailVerifiedAt
        },
        {
            key: "provider",
            label: "Login method",
            value: getProviderLabel(user.provider),
            badge: true
        },
        {
            key: "role",
            label: "Account type",
            value: user.role.charAt(0) + user.role.slice(1).toLowerCase()
        },
        {
            key: "status",
            label: "Account status",
            value: user.status.charAt(0) + user.status.slice(1).toLowerCase(),
            statusBadge: true
        },
        {
            key: "createdAt",
            label: "Member since",
            value: formatDate(user.createdAt)
        },
    ];

    return (
        <div
            className="rounded-[28px] border backdrop-blur-sm shadow-md p-6 md:p-8"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.28)',
                borderColor: 'rgba(255, 255, 255, 0.35)',
            }}
        >
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#3d2f26' }}>
                    Personal details
                </h1>
                <p className="text-gray-700" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}>
                    Your account information from our server.
                </p>
            </div>

            <div className="space-y-0">
                {fields.map((field, index) => (
                    <div
                        key={field.key}
                        className={`py-5 ${index !== fields.length - 1 ? "border-b border-gray-300/25" : ""}`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            {/* Label column */}
                            <div className="md:col-span-3">
                                <span className="text-sm font-normal text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                                    {field.label}
                                </span>
                            </div>

                            {/* Value column */}
                            <div className="md:col-span-9 flex gap-2 items-center">
                                <span className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                                    {field.value}
                                </span>
                                {field.verified !== undefined && (
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                        field.verified
                                            ? "bg-green-100/90 text-green-800 border border-green-300/60"
                                            : "bg-yellow-100/90 text-yellow-800 border border-yellow-300/60"
                                    }`}>
                                        {field.verified ? "Verified" : "Not verified"}
                                    </span>
                                )}
                                {field.badge && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100/90 text-blue-800 border border-blue-300/60">
                                        {field.value}
                                    </span>
                                )}
                                {field.statusBadge && (
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                        user.status === 'ACTIVE'
                                            ? "bg-green-100/90 text-green-800 border border-green-300/60"
                                            : "bg-red-100/90 text-red-800 border border-red-300/60"
                                    }`}>
                                        {field.value}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
