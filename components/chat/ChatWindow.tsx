"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { chatApi, Conversation, Message } from '@/lib/chat.api';
import { useSocket } from '@/lib/socket';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface ChatWindowProps {
  hotelId: string;
  hotelName: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  hotelId,
  hotelName,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}) => {
  const { user } = useAuth();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAccessToken(localStorage.getItem('access_token'));
    }
  }, []);

  const { socket, isConnected } = useSocket(accessToken || undefined);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setIsOpen = setControlledOpen || setUncontrolledOpen;

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize conversation when opening chat
  useEffect(() => {
    if (isOpen && user && !conversation) {
      chatApi
        .startConversation(hotelId)
        .then((res) => {
          // Response interceptor already unwraps data
          const conversation = (res as Conversation).id ? (res as Conversation) : ((res as { data: Conversation }).data);
          setConversation(conversation);
          setMessages(conversation.messages?.reverse() || []);
          // Let's fetch full history
          return chatApi.getMessages(conversation.id);
        })
        .then((res) => {
          if (res) {
            const messages = Array.isArray(res) ? res : ((res as { data?: Message[] }).data || []);
            setMessages(messages);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [isOpen, user, hotelId, conversation]);

  // Join room
  useEffect(() => {
    if (socket && conversation && isConnected) {
      socket.emit('join_conversation', { conversationId: conversation.id });

      const handleReceiveMessage = (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      };

      socket.on('receive_message', handleReceiveMessage);

      return () => {
        socket.off('receive_message', handleReceiveMessage);
      };
    }
  }, [socket, conversation, isConnected]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversation || !socket || !user) return;

    const content = newMessage;
    setNewMessage('');

    // Optimistic update? Or wait for socket to echo back?
    // Using socket to send
    socket.emit('send_message', {
      conversationId: conversation.id,
      senderId: user.id,
      senderType: 'USER',
      content,
    });
  };

  if (!user) {
      // Show button but redirect/alert on click
      return (
        <Button 
            className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg z-50"
            onClick={() => {
                // You can use a router here to redirect
                window.location.href = '/login'; 
            }}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg z-50">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Chat with {hotelName}</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => {
              const isMe = msg.senderType === 'USER' && msg.senderId === user.id;
              return (
                <div
                  key={msg.id}
                  className={cn(
                    'flex w-full',
                    isMe ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-4 py-2 text-sm',
                      isMe
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t mt-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
