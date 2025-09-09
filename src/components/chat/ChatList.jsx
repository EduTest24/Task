"use client";

import ChatMessage from "./ChatMessage";

export default function ChatList({ messages, renderContent }) {
  return (
    <div className="flex flex-col space-y-4">
      {messages.map((msg, i) => (
        <ChatMessage
          key={i}
          role={msg.role}
          content={msg.content}
          renderContent={renderContent}
        />
      ))}
    </div>
  );
}
