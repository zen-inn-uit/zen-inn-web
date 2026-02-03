"use client";

import { PartnerConversationListContent } from "@/components/chat/PartnerConversationListContent";

export default function PartnerMessagesPage() {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-5 py-5 border-b bg-gradient-to-b from-background to-muted/20 sticky top-0 z-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Guest Messages
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Chat with your guests</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <PartnerConversationListContent />
      </div>
    </div>
  );
}
