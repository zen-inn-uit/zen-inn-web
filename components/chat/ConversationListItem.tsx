"use client";

import { Conversation } from "@/lib/chat.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ConversationListItemProps {
  conversation: Conversation;
  isSelected?: boolean;
}

export function ConversationListItem({
  conversation,
  isSelected = false,
}: ConversationListItemProps) {
  const hasUnread = (conversation.unreadCount ?? 0) > 0;
  const lastMessage = conversation.lastMessage;

  return (
    <Link
      href={`/messages/${conversation.id}`}
      className={cn(
        "block cursor-pointer transition-all duration-200 px-3 py-3 mx-2 my-1 rounded-lg",
        "hover:bg-primary group",
        hasUnread && !isSelected && "bg-muted",
        isSelected && "bg-primary shadow-sm"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
            <AvatarImage
              src={conversation.hotel?.images?.[0]?.url}
              alt={conversation.hotel?.name}
            />
            <AvatarFallback className="text-base font-semibold bg-gradient-to-br from-primary/20 to-primary/10">
              {conversation.hotel?.name?.[0] || "H"}
            </AvatarFallback>
          </Avatar>
          {hasUnread && !isSelected && (
            <div className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center shadow-md border-2 border-background">
              <span className="text-[10px] text-white font-bold">
                {(conversation.unreadCount ?? 0) > 9 ? '9+' : (conversation.unreadCount ?? 0)}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-0.5">
            <h3
              className={cn(
                "truncate text-[15px] transition-colors",
                hasUnread && !isSelected ? "font-bold text-foreground" : "font-semibold text-foreground",
                "group-hover:text-white",
                isSelected && "text-white font-semibold"
              )}
            >
              {conversation.hotel?.name}
            </h3>
            <span className={cn(
              "text-[11px] whitespace-nowrap ml-2 transition-colors",
              "text-muted-foreground",
              "group-hover:text-white/70",
              isSelected && "text-white/70"
            )}>
              {conversation.updatedAt &&
                formatDistanceToNow(new Date(conversation.updatedAt), {
                  addSuffix: true,
                }).replace('about ', '').replace('less than a minute ago', 'now')}
            </span>
          </div>

          {conversation.hotel?.city && (
            <div className={cn(
              "text-[11px] flex items-center gap-1 mb-1 transition-colors",
              "text-muted-foreground",
              "group-hover:text-white/75",
              isSelected && "text-white/75"
            )}>
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{conversation.hotel.city}</span>
              {conversation.hotel.starRating && (
                <>
                  <span className="mx-0.5">•</span>
                  <Star className={cn(
                    "h-3 w-3 flex-shrink-0",
                    "fill-yellow-400 text-yellow-400",
                    "group-hover:fill-yellow-300 group-hover:text-yellow-300",
                    isSelected && "fill-yellow-200 text-yellow-200"
                  )} />
                  <span>{conversation.hotel.starRating}</span>
                </>
              )}
            </div>
          )}

          {lastMessage && (
            <p
              className={cn(
                "text-[13px] truncate transition-colors",
                hasUnread && !isSelected ? "font-semibold text-foreground" : "text-muted-foreground font-normal",
                "group-hover:text-white/90",
                isSelected && "text-white/90 font-normal"
              )}
            >
              {lastMessage.senderType === "USER" && (
                <span className="font-medium">You: </span>
              )}
              {lastMessage.content}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
