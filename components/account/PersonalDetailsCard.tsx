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
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
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
                        className={`py-4 ${index !== fields.length - 1 ? "border-b border-gray-200" : ""}`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            {/* Label column */}
                            <div className="md:col-span-3">
                                <span className="font-medium text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                                    {field.label}
                                </span>
                            </div>

                            {/* Value column */}
                            <div className="md:col-span-7 flex items-center gap-2">
                                <span className="text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                                    {field.value}
                                </span>
                                {field.verified && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Verified
                                    </span>
                                )}
                            </div>

                            {/* Action column */}
                            <div className="md:col-span-2 flex justify-end">
                                <button
                                    type="button"
                                    className="text-accent hover:text-accent/80 font-medium hover:underline transition-colors"
                                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' }}
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

