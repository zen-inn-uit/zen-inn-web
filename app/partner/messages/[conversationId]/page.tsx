"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { chatApi, Conversation, Message } from "@/lib/chat.api";
import { useSocket } from "@/lib/socket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function PartnerChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAccessToken(localStorage.getItem('access_token'));
    }
  }, []);

  const { socket, isConnected } = useSocket(accessToken || undefined);
  const conversationId = params.conversationId as string;

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load conversation and messages
  useEffect(() => {
    if (!conversationId || !user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    
    Promise.all([
      chatApi.getMessages(conversationId).catch(err => {
        console.error('Failed to load messages:', err);
        return [];
      }),
      chatApi.getPartnerConversations().catch(err => {
        console.error('Failed to load conversations:', err);
        return [];
      }),
    ])
      .then(([messagesRes, conversationsRes]) => {
        // Handle unwrapped responses
        const messages = Array.isArray(messagesRes) ? messagesRes : ((messagesRes as { data?: Message[] }).data || []);
        setMessages(messages);
        
        const conversations = Array.isArray(conversationsRes) ? conversationsRes : ((conversationsRes as { data?: Conversation[] }).data || []);
        const conv = conversations.find((c: Conversation) => c.id === conversationId);
        setConversation(conv || null);
        
        // Mark as read when opening
        if (conv) {
          chatApi.markAsRead(conversationId).catch(console.error);
        }
      })
      .catch((err) => {
        console.error("Failed to load chat detail:", err);
        if (window.innerWidth < 768) {
          router.push("/partner/messages");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [conversationId, user, router]);

  // Join WebSocket room
  useEffect(() => {
    if (socket && conversationId && isConnected) {
      socket.emit("join_conversation", { conversationId });

      const handleReceiveMessage = (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();

        // Mark as read if it's from user
        if (msg.senderType === "USER") {
          chatApi.markAsRead(conversationId).catch(console.error);
        }
      };

      socket.on("receive_message", handleReceiveMessage);

      return () => {
        socket.off("receive_message", handleReceiveMessage);
      };
    }
  }, [socket, conversationId, isConnected]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversationId || !socket || !user) return;

    const content = newMessage;
    setNewMessage("");

    // Partner sends as HOTEL
    socket.emit("send_message", {
      conversationId,
      senderId: user.id,
      senderType: "HOTEL",
      content,
    });
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !loading) {
      router.push("/partner/login");
    }
  }, [user, loading, router]);

  if (!user || loading && !conversation) {
    return null;
  }

  const guestUser = conversation?.user;
  const hotel = conversation?.hotel;

  return (
    <div className="flex flex-col h-full md:h-[calc(100vh-4rem)]">
      {/* Header - Mobile */}
      <div className="border-b bg-background sticky top-0 z-10 md:hidden">
        <div className="px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/partner/messages")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {loading || !guestUser ? (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-3 w-24 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ) : (
            <>
              <Avatar className="h-10 w-10">
                <AvatarImage src={guestUser.avatarUrl} alt={guestUser.fullName} />
                <AvatarFallback>{guestUser.fullName?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="font-semibold">{guestUser.fullName}</h2>
                <p className="text-xs text-muted-foreground">
                  Guest at {hotel?.name}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block border-b bg-background">
        <div className="px-6 py-4 flex items-center gap-4">
          {loading || !guestUser ? (
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-muted rounded-full animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                <div className="h-3 w-32 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ) : (
            <>
              <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                <AvatarImage src={guestUser.avatarUrl} alt={guestUser.fullName} />
                <AvatarFallback className="text-lg bg-gradient-to-br from-primary/20 to-primary/10">
                  {guestUser.fullName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="font-bold text-lg">{guestUser.fullName}</h2>
                <p className="text-sm text-muted-foreground">
                  Guest at {hotel?.name}
                  {isConnected && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="text-green-500 inline-flex items-center gap-1">
                        <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                        Online
                      </span>
                    </>
                  )}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-3">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground mb-2">No messages yet</p>
              <p className="text-sm text-muted-foreground">
                Start the conversation by sending a message
              </p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMe = msg.senderType === "HOTEL"; // Partner is HOTEL
              const showDate =
                index === 0 ||
                format(new Date(messages[index - 1].createdAt), "PP") !==
                  format(new Date(msg.createdAt), "PP");

              return (
                <div key={msg.id}>
                  {showDate && (
                    <div className="flex justify-center my-6">
                      <span className="text-xs font-medium text-muted-foreground bg-background px-4 py-1.5 rounded-full shadow-sm border">
                        {format(new Date(msg.createdAt), "MMMM d, yyyy")}
                      </span>
                    </div>
                  )}
                  <div
                    className={cn(
                      "flex w-full gap-2 items-end",
                      isMe ? "justify-end" : "justify-start"
                    )}
                  >
                    {!isMe && (
                      <Avatar className="h-8 w-8 flex-shrink-0 border-2 border-background shadow-sm">
                        <AvatarImage src={guestUser?.avatarUrl} alt={guestUser?.fullName} />
                        <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-primary/10">
                          {guestUser?.fullName?.[0] || 'G'}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn("flex flex-col max-w-[70%]", isMe ? "items-end" : "items-start")}>
                      <div
                        className={cn(
                          "inline-block rounded-2xl px-4 py-2.5 shadow-sm",
                          isMe
                            ? "bg-primary text-white rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        )}
                      >
                        <p className="text-[14px] leading-relaxed whitespace-pre-wrap break-words">
                          {msg.content}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "text-[11px] mt-1 px-1",
                          "text-muted-foreground"
                        )}
                      >
                        {format(new Date(msg.createdAt), "HH:mm")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t bg-background shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-3"
          >
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 h-11 rounded-full px-5 border-gray-200 focus-visible:ring-primary"
              disabled={!isConnected || loading}
            />
            <Button
              type="submit"
              size="icon"
              className="h-11 w-11 rounded-full shadow-md hover:shadow-lg transition-shadow bg-primary hover:bg-primary/90 text-white"
              disabled={!newMessage.trim() || !isConnected || loading}
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </form>
          {!isConnected && (
            <p className="text-xs text-amber-600 mt-2 flex items-center gap-2">
              <span className="h-2 w-2 bg-amber-600 rounded-full animate-pulse"></span>
              Connecting to chat server...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
