"use client";

import Image from "next/image";

export default function ChatButton() {
    return (
        <button 
            className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform duration-200 cursor-pointer
            bg-transparent border-none p-0"
            aria-label="Open chat"
        >
            <Image src="/chat.svg" alt="Chat Button" width={50} height={50} />
        </button>
    );
}