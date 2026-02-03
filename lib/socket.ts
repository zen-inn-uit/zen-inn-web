
import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

// Get base URL without /api suffix for WebSocket connection
const getSocketUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
  // Remove /api suffix if present
  return apiUrl.replace(/\/api\/?$/, '');
};

const SOCKET_URL = getSocketUrl();

console.log('Socket configuration:', {
  url: SOCKET_URL,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
});

export const useSocket = (token?: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token) {
      console.log('useSocket: No token provided');
      return;
    }

    if (!socketRef.current) {
      console.log('useSocket: Creating new socket connection to', SOCKET_URL);
      
      socketRef.current = io(SOCKET_URL, {
        auth: { token },
        transports: ['websocket', 'polling'], // Fallback to polling if websocket fails
        autoConnect: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      socketRef.current.on('connect', () => {
        console.log('✅ Socket connected successfully!');
        setIsConnected(true);
      });

      socketRef.current.on('disconnect', (reason) => {
        console.log('❌ Socket disconnected:', reason);
        setIsConnected(false);
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('❌ Socket connection error:', error.message);
        console.error('Details:', error);
      });

      socketRef.current.on('error', (error) => {
        console.error('❌ Socket error:', error);
      });
    }

    return () => {
      if (socketRef.current) {
        console.log('useSocket: Disconnecting socket');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [token]);

  return { socket: socketRef.current, isConnected };
};
