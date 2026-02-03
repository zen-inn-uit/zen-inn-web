"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { chatApi, Conversation } from "@/lib/chat.api";
import { MessageCircle } from "lucide-react";
import { PartnerConversationListItem } from "./PartnerConversationListItem";
import { Skeleton } from "@/components/ui/skeleton";

interface PartnerConversationListContentProps {
  isDesktop?: boolean;
}

export function PartnerConversationListContent({ isDesktop = false }: PartnerConversationListContentProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    
    // Chỉ hiện loading nếu chưa có dữ liệu nào
    if (conversations.length === 0) {
      setLoading(true);
    }

    chatApi
      .getPartnerConversations()
      .then((res) => {
        if (!cancelled) {
          const conversations = Array.isArray(res) ? res : ((res as { data?: Conversation[] }).data || []);
          setConversations(conversations || []);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error(err);
          setConversations([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user]);


  const selectedConversationId = pathname.includes('/partner/messages/') 
    ? pathname.split('/partner/messages/')[1] 
    : null;

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="space-y-1 px-4 py-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-3">
            <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-12" />
              </div>
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if ((conversations?.length ?? 0) === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6">
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-5 shadow-inner">
          <MessageCircle className="h-10 w-10 text-primary/60" />
        </div>
        <p className="text-lg font-bold mb-2 text-foreground">No messages yet</p>
        <p className="text-sm text-muted-foreground text-center max-w-sm leading-relaxed">
          You'll see guest messages here when guests start conversations with your hotels
        </p>
      </div>
    );
  }

  return (
    <div className="py-1">
      {(conversations || []).map((conv) => (
        <PartnerConversationListItem
          key={conv.id}
          conversation={conv}
          isSelected={isDesktop && conv.id === selectedConversationId}
        />
      ))}
    </div>
  );
}
