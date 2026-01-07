'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '@/contexts/theme-context';

const menuItems = [
  { 
    href: '/partner/dashboard', 
    label: 'Dashboard', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  { 
    href: '/partner/reservations', 
    label: 'Reservations', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    href: '/partner/rooms', 
    label: 'Rooms', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-6 0h6" />
      </svg>
    )
  },
  { 
    href: '/partner/messages', 
    label: 'Messages', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    badge: 3
  },
  { 
    href: '/partner/inventory', 
    label: 'Inventory', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    )
  },
  { 
    href: '/partner/financial', 
    label: 'Financial', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  { 
    href: '/partner/reviews', 
    label: 'Reviews', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  },
];

export default function PartnerSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { toggleMode, mode, getBackgroundClass, getBorderClass } = useTheme();

  const sidebarBg = mode === 'light' ? 'bg-white' : 'bg-[#FDFBF7]';
  const sidebarBorder = mode === 'light' ? 'border-slate-200' : 'border-[#E5D5C3]';

  return (
    <aside className={`${sidebarBg} border-r ${sidebarBorder} min-h-screen transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        <div className={`p-6 border-b ${sidebarBorder}`}>
          <div className={`flex items-center mb-4 ${isCollapsed ? 'flex-col gap-3' : 'justify-between'}`}>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-[#F5EFE7] rounded-lg transition-colors text-[#6B5B3D]"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMode}
                className="p-2 hover:bg-[#F5EFE7] rounded-lg transition-colors text-[#6B5B3D]"
                title={mode === 'light' ? 'Switch to primary theme' : 'Switch to light theme'}
              >
                {mode === 'light' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B6F47] to-[#6B5B3D] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              ZI
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#A0826D] uppercase tracking-wide font-semibold">Hotel Partner</p>
                <p className="font-bold text-[#3d2e1f] truncate">Zen Inn</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="mb-6">
            <p className={`text-xs font-semibold text-[#A0826D] uppercase tracking-wide mb-3 ${isCollapsed ? 'text-center' : 'px-3'}`}>
              {isCollapsed ? '•' : 'Main Menu'}
            </p>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                      isActive
                        ? 'bg-[#F5EFE7] text-[#6B5B3D]'
                        : 'text-[#6B5B3D] hover:bg-[#F5EFE7]'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <span className={isActive ? 'text-[#8B6F47]' : 'text-[#A0826D] group-hover:text-[#8B6F47]'}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <>
                        <span className={`font-semibold text-sm flex-1 ${isActive ? 'text-[#6B5B3D]' : ''}`}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-[#8B6F47] text-white text-xs rounded-full font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {isActive && !isCollapsed && (
                      <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#8B6F47]"></div>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-[#3d2e1f] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 flex items-center gap-2">
                        {item.label}
                        {item.badge && (
                          <span className="px-1.5 py-0.5 bg-[#8B6F47] text-white text-xs rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className={`border-t ${sidebarBorder} pt-3`}>
            <p className={`text-xs font-semibold text-[#A0826D] uppercase tracking-wide mb-3 ${isCollapsed ? 'text-center' : 'px-3'}`}>
              {isCollapsed ? '•' : 'Account'}
            </p>
            <Link
              href="/partner/profile"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                pathname === '/partner/profile'
                  ? 'bg-[#F5EFE7] text-[#6B5B3D]'
                  : 'text-[#6B5B3D] hover:bg-[#F5EFE7]'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <span className={pathname === '/partner/profile' ? 'text-[#8B6F47]' : 'text-[#A0826D] group-hover:text-[#8B6F47]'}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              {!isCollapsed && (
                <span className={`font-semibold text-sm ${pathname === '/partner/profile' ? 'text-[#6B5B3D]' : ''}`}>
                  Profile
                </span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-[#3d2e1f] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  Profile
                </div>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}
