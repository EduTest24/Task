"use client";

import React from "react";
import { Plus, Search, X, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Sidebar({
  chats,
  activeChatId,
  setActiveChatId,
  createNewChat,
  togglePinChat,
  deleteChat,
  search,
  setSearch,
}) {
  return (
    <div className="flex flex-col h-full w-full sm:w-80 bg-gradient-to-b from-white/80 to-gray-50 shadow-lg border-r border-gray-200">
      
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="font-semibold text-gray-700 text-lg">Chats</h2>
        <Button
          size="sm"
          onClick={createNewChat}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="flex items-center gap-2 bg-gray-100/70 backdrop-blur-sm rounded-lg px-3 py-2 shadow-inner">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chats..."
            className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto m-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChatId(chat.id)}
            className={cn(
              "p-3 flex justify-between items-center cursor-pointer rounded-lg transition-all mb-1 hover:bg-blue-50 hover:shadow-sm",
              activeChatId === chat.id ? "bg-blue-100 font-medium shadow-inner" : ""
            )}
          >
            <div className="flex items-center gap-2 truncate">
              <span
                className={cn(
                  "truncate",
                  chat.pinned ? "text-blue-600 font-semibold" : "text-gray-700"
                )}
              >
                {chat.title}
              </span>
              {chat.pinned && (
                <Pin className="w-4 h-4 text-blue-500" title="Pinned chat" />
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-1   group-hover:opacity-100 transition-all">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePinChat(chat.id);
                }}
              >
                <Pin
                  className={cn(
                    "h-4 w-4",
                    chat.pinned ? "text-blue-500" : "text-gray-400"
                  )}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
              >
                <X className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}

        {chats.length === 0 && (
          <div className="p-4 text-gray-400 text-center text-sm">
            No chats yet. Create a new one!
          </div>
        )}
      </div>
    </div>
  );
}
