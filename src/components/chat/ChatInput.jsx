"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Sparkles,
  Calendar,
  Mail,
  ListTodo,
  ChevronDown,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const agentPrompts = {
  calendar: [
    "What's on my schedule today?",
    "Add a meeting",
    "Show me this week's events",
  ],
  email: ["Check my emails", "Send a quick email", "Mark all as read"],
  tasks: ["Add a new task", "Show pending tasks", "Complete today's task"],
};

const agentMeta = {
  calendar: {
    icon: <Calendar className="w-4 h-4" />,
    label: "Calendar",
    style: "bg-blue-100 text-blue-700 border border-blue-300",
  },
  email: {
    icon: <Mail className="w-4 h-4" />,
    label: "Email",
    style: "bg-purple-100 text-purple-700 border border-purple-300",
  },
  tasks: {
    icon: <ListTodo className="w-4 h-4" />,
    label: "Tasks",
    style: "bg-green-100 text-green-700 border border-green-300",
  },
};

export default function ChatInput({
  agent,
  setAgent,
  input,
  setInput,
  sendMessage,
  loading,
  autoResize = false,
}) {
  const textareaRef = useRef(null);
  const prompts = agentPrompts[agent] || [];
  const activeAgent = agentMeta[agent];

  // Auto resize textarea
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input, autoResize]);

  return (
    <footer className="p-4 bg-white/95 backdrop-blur-xl border-t sticky bottom-0">
      <div className="flex flex-col gap-3 w-full">

        {/* Input + Agent Selector + Send */}
        <div className="relative flex items-center gap-2 bg-gray-50 rounded-full border px-3 transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-1">
          {/* Agent Dropdown */}
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full p-2 mt-2 mb-2  w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-700 hover:scale-105 transition-all duration-200 shadow-md text-white flex items-center justify-center"
                    >
                      {/* Show the current agent’s icon clearly */}
                      {activeAgent?.icon || <Sparkles className="w-5 h-5" />}
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Switch Assistant</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent
              align="start"
              className="rounded-xl shadow-xl p-2 bg-white"
            >
              <DropdownMenuItem
                onClick={() => setAgent("calendar")}
                className="rounded-lg hover:bg-blue-50"
              >
                <Calendar className="w-4 h-4 mr-2 text-blue-600" /> Calendar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setAgent("email")}
                className="rounded-lg hover:bg-purple-50"
              >
                <Mail className="w-4 h-4 mr-2 text-purple-600" /> Email
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setAgent("tasks")}
                className="rounded-lg hover:bg-green-50"
              >
                <ListTodo className="w-4 h-4 mr-2 text-green-600" /> Tasks
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Text Input */}
          <textarea
            ref={textareaRef}
            placeholder={`Ask your ${agent || "assistant"} anything...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="w-full resize-none overflow-hidden bg-transparent outline-none px-3 py-3 text-sm text-gray-700 placeholder:text-gray-400 rounded-full"
            rows={1}
          />

          {/* Send Button */}
          <Button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="absolute right-2 bottom-2 rounded-full p-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transition-all duration-200"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Quick Prompts just below input */}
        {prompts.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {prompts.map((q) => (
              <Badge
                key={q}
                onClick={() => setInput(q)}
                className="cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 rounded-full px-3 py-1 text-sm"
              >
                {q}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
