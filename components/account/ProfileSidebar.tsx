"use client";

interface ProfileSidebarProps {
    activeItem?: string;
}

export default function ProfileSidebar({ activeItem = "personal-details" }: ProfileSidebarProps) {
    const menuItems = [
        { id: "personal-details", label: "Personal details" },
        { id: "security-settings", label: "Security settings" },
        { id: "preferences", label: "Preferences" },
        { id: "payment-methods", label: "Payment methods" },
    ];

    return (
        <div className="rounded-xl border border-gray-200 shadow-sm p-4 w-full md:w-[280px] flex-shrink-0" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                    const isActive = item.id === activeItem;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            className={`px-4 py-3 rounded-lg text-left transition-colors ${
                                isActive
                                    ? "bg-white border-2 border-accent shadow-md font-bold"
                                    : "border border-gray-300/50 hover:bg-white/60 font-medium"
                            }`}
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--fs-h5)',
                                color: isActive ? 'var(--color-primary)' : '#60463d',
                            }}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}

