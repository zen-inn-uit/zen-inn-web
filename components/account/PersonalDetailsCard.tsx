"use client";

interface PersonalDetailsCardProps {
    user: {
        name: string;
        displayName: string;
        email: string;
        verified: boolean;
        phone: string;
        dateOfBirth: string;
        nationality: string;
        gender: string;
        address: string;
        passportDetails: string;
    };
}

export default function PersonalDetailsCard({ user }: PersonalDetailsCardProps) {
    const fields = [
        { label: "Name", value: user.name, action: "Edit" },
        { label: "Display name", value: user.displayName, action: "Edit" },
        { label: "Email address", value: user.email, verified: user.verified, action: "Edit" },
        { label: "Phone number", value: user.phone, action: "Edit" },
        { label: "Date of birth", value: user.dateOfBirth, action: "Edit" },
        { label: "Nationality", value: user.nationality, action: "Edit" },
        { label: "Gender", value: user.gender, action: "Edit" },
        { label: "Address", value: user.address, action: "Edit" },
        { label: "Passport details", value: user.passportDetails, action: "Add passport" },
    ];

    return (
        <div className="rounded-xl border border-gray-200 shadow-sm p-6 md:p-8" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                    Personal details
                </h1>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}>
                    Update your information and find out how it's used.
                </p>
            </div>

            <div className="space-y-0">
                {fields.map((field, index) => (
                    <div
                        key={field.label}
                        className={`py-5 ${index !== fields.length - 1 ? "border-b border-gray-300/30" : ""}`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            {/* Label column */}
                            <div className="md:col-span-3">
                                <span className="text-sm font-normal text-gray-500" style={{ fontFamily: 'var(--font-body)' }}>
                                    {field.label}
                                </span>
                            </div>

                            {/* Value column */}
                            <div className="md:col-span-7 flex items-center gap-2">
                                <span className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                                    {field.value}
                                </span>
                                {field.verified && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100/80 text-green-700 border border-green-200/50">
                                        Verified
                                    </span>
                                )}
                            </div>

                            {/* Action column */}
                            <div className="md:col-span-2 flex justify-end">
                                <button
                                    type="button"
                                    className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-accent/20 hover:border-accent/50 transition-colors"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    {field.action}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

