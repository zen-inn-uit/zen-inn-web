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
        <div 
            className="rounded-[28px] border backdrop-blur-sm shadow-md p-4 w-full md:w-[280px] flex-shrink-0"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.28)',
                borderColor: 'rgba(255, 255, 255, 0.35)',
            }}
        >
            <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                    const isActive = item.id === activeItem;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            className={`px-4 py-3 rounded-lg text-left transition-colors ${
                                isActive
                                    ? "bg-white/20 border border-white/30 font-bold"
                                    : "bg-white/0 border border-transparent hover:bg-white/12 font-medium"
                            }`}
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--fs-h5)',
                                color: isActive ? 'var(--color-primary)' : '#4a3728',
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

