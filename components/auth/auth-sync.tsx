'use client';

import { useEffect } from 'react';

/**
 * This component handles syncing authentication between localStorage and cookies.
 * This is necessary because Server Components can't access localStorage.
 */
export function AuthSync() {
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (token) {
      // Check if cookie already exists
      const hasCookie = document.cookie.split(';').some((item) => item.trim().startsWith('access_token='));
      
      if (!hasCookie) {
        console.log('🔄 Syncing localStorage token to cookies for server-side access...');
        document.cookie = `access_token=${token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
        if (refreshToken) {
          document.cookie = `refresh_token=${refreshToken}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
        }
        // Force a page refresh to make the cookies available to the server on the next request
        window.location.reload();
      }
    }
  }, []);

  return null;
}
