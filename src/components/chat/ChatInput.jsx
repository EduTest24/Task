"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles } from "lucide-react";

const agentPrompts = {
  calendar: [
    "What's on my schedule today?",
    "Add a meeting",
    "Show me this week's events",
  ],
  email: [
    "Check my emails",
    "Send a quick email",
    "Mark all as read",
  ],
  tasks: [
    "Add a new task",
    "Show pending tasks",
    "Complete today's task",
  ],
};

export default function ChatInput({
  agent,
  input,
  setInput,
  sendMessage,
  loading,
  autoResize = false,
}) {
  const textareaRef = useRef(null);
  const prompts = agentPrompts[agent] || [];

  // Auto resize textarea based on content
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input, autoResize]);

  return (
    <footer className="p-4 bg-white shadow-inner border-t relative">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Input + Send */}
        <div className="flex-1 flex items-center gap-2 relative">
          <textarea
            ref={textareaRef}
            placeholder={`Ask about your ${agent}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="flex-1 resize-none overflow-hidden rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 text-sm transition"
            rows={1}
          />
          <Button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="flex items-center gap-1 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>

        {/* Quick Prompts */}
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          {prompts.map((q) => (
            <Badge
              key={q}
              onClick={() => setInput(q)}
              className="cursor-pointer hover:bg-blue-100 hover:text-black transition rounded-full px-3 py-1 flex items-center text-white"
            >
              <Sparkles className="w-3 h-3 mr-1 text-blue-500" />
              {q}
            </Badge>
          ))}
        </div>
      </div>
    </footer>
  );
}
