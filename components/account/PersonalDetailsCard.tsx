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
        <div className="rounded-2xl bg-white shadow-lg overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6B5B3D] to-[#8B7355] p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">Personal Details</h1>
                <p className="text-white/90 text-sm">Your account information from our server</p>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="space-y-1 stagger-fade-in">
                    {fields.map((field, index) => (
                        <div 
                            key={field.key}
                            className="p-4 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{field.label}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-sm text-gray-500">{field.value}</p>
                                            {field.verified !== undefined && (
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    field.verified
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}>
                                                    {field.verified ? "Verified" : "Not verified"}
                                                </span>
                                            )}
                                            {field.statusBadge && (
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    user.status === 'ACTIVE'
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}>
                                                    {field.value}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {field.key === 'email' && (
                                    <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-[#6B5B3D] hover:text-[#6B5B3D] transition-all text-sm">
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
