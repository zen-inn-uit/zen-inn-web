
import axios from './api/axios';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'USER' | 'HOTEL';
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  userId: string;
  hotelId: string;
  createdAt: string;
  updatedAt: string;
  unreadCount?: number;
  lastMessage?: Message;
  user?: {
    id: string;
    fullName: string;
    avatarUrl?: string;
  };
  hotel?: {
    id: string;
    name: string;
    slug?: string;
    city?: string;
    starRating?: number;
    images?: { id: string; url: string; displayOrder: number }[];
  };
  messages?: Message[];
}

export const chatApi = {
  // Create or get existing conversation with a hotel
  startConversation: (hotelId: string) =>
    axios.post<Conversation>('/chat/conversations', { hotelId }),

  // Get all conversations for current user (Messenger inbox)
  getUserConversations: () =>
    axios.get<Conversation[]>('/chat/conversations'),

  // Get all conversations for partner hotels
  getPartnerConversations: () =>
    axios.get<Conversation[]>('/chat/conversations/partner'),

  // Get messages in a conversation
  getMessages: (conversationId: string) =>
    axios.get<Message[]>(`/chat/conversations/${conversationId}/messages`),

  // Get total unread count for badge notification
  getUnreadCount: () =>
    axios.get<{ unreadCount: number }>('/chat/unread-count'),

  // Mark all messages in conversation as read
  markAsRead: (conversationId: string) =>
    axios.post<{ success: boolean }>(`/chat/conversations/${conversationId}/read`),

  // Get single conversation details (helper method using getUserConversations)
  getConversation: async (conversationId: string): Promise<Conversation | null> => {
    const res = await axios.get<Conversation[]>('/chat/conversations');
    // Response interceptor already unwraps data
    const conversations = Array.isArray(res) ? res : ((res as { data?: Conversation[] }).data || []);
    return conversations.find((conv: Conversation) => conv.id === conversationId) || null;
  },
};
