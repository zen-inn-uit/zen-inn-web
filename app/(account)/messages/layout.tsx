"use client";

import { usePathname } from "next/navigation";
import { ConversationListContent } from "@/components/chat/ConversationListContent";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDetailPage = pathname !== "/messages";

  console.log('MessagesLayout - pathname:', pathname, 'isDetailPage:', isDetailPage);

  return (
    <div className="h-[calc(100vh-4rem)] bg-background flex overflow-hidden">
      {/* Mobile: Show either list or detail */}
      <div className="flex-1 md:hidden overflow-hidden">
        {children}
      </div>

      {/* Desktop: Split view - Messenger style */}
      <div className="hidden md:flex flex-1 w-full h-full overflow-hidden">
        {/* Left sidebar - Conversation list sempre visible */}
        <div className="w-[380px] border-r flex flex-col bg-background flex-shrink-0">
          <div className="px-5 py-5 border-b shrink-0">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Messages
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Chat with your hotels</p>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            <ConversationListContent isDesktop={true} />
          </div>
        </div>

        {/* Right panel - Chat detail or empty state */}
        <div className="flex-1 bg-white overflow-hidden flex flex-col min-w-0 h-full relative">
          {isDetailPage ? (
            <div className="flex-1 h-full overflow-hidden">
              {children}
            </div>
          ) : (
            <div className="flex-1 flex h-full">
              <EmptyState />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex items-center justify-center text-center p-8 bg-white">
      <div>
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <svg
            className="h-12 w-12 text-primary/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground">Your Messages</h3>
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
          Select a conversation from the list to view your chat history and send messages to hotels
        </p>
      </div>
    </div>
  );
}
