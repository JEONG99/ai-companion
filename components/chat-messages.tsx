"use client";

import { Companion } from "@prisma/client";

import ChatMessage from "@/components/chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  messages: any[];
  isLoading: boolean;
  companion: Companion;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages = [],
  isLoading,
  companion,
}) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        src={companion.src}
        role="system"
        content={`Hello, I'm ${companion.name}, ${companion.description}.`}
        isLoading={fakeLoading}
      />
      {messages.map((message, i) => (
        <ChatMessage
          key={i}
          role={message.role}
          content={message.content}
          src={companion.src}
        />
      ))}
      {isLoading && <ChatMessage role="system" src={companion.src} isLoading />}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default ChatMessages;
