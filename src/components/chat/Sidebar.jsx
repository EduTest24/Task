"use client";

import React, { useState } from "react";
import { Plus, Search, Pin, MessageSquare, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Sidebar({
  chats,
  activeChatId,
  setActiveChatId,
  createNewChat,
  togglePinChat,
  deleteChat,
  renameChat, // ✅ new prop
  search,
  setSearch,
}) {
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  return (
    <div className="relative flex flex-col h-[calc(100vh-64px)] w-full sm:w-80 bg-white/70 backdrop-blur-xl shadow-lg border-r border-gray-100">
      {/* Search Bar */}
      <div className="p-4">
        <div className="flex items-center gap-2 bg-gray-100/70 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-3 pb-20">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChatId(chat.id)}
            className={cn(
              "group relative flex flex-col p-3 mb-2 rounded-lg cursor-pointer transition-all",
              activeChatId === chat.id
                ? "bg-blue-50 border border-blue-200 shadow-sm"
                : "bg-white hover:bg-gray-50 border border-gray-100"
            )}
          >
            {/* Chat Title */}
            <div className="flex items-center justify-between">
              {editingId === chat.id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={() => {
                    renameChat(chat.id, newTitle);
                    setEditingId(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      renameChat(chat.id, newTitle);
                      setEditingId(null);
                    }
                  }}
                  autoFocus
                  className="text-sm border rounded px-2 py-1 w-full"
                />
              ) : (
                <span
                  className={cn(
                    "truncate text-sm font-medium",
                    chat.pinned ? "text-blue-600" : "text-gray-800"
                  )}
                >
                  {chat.title}
                </span>
              )}
              {chat.pinned && <Pin className="w-3 h-3 text-blue-500" />}
            </div>

            {/* Actions */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                title="Rename"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingId(chat.id);
                  setNewTitle(chat.title);
                }}
              >
                <Pencil className="h-4 w-4 text-gray-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                title={chat.pinned ? "Unpin" : "Pin"}
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
                title="Delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {chats.length === 0 && (
          <div className="flex flex-col items-center justify-center p-10 text-gray-400 text-sm">
            <MessageSquare className="w-10 h-10 mb-3 opacity-50" />
            <p className="mb-2">No chats yet</p>
            <Button
              onClick={createNewChat}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Start a Chat
            </Button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-6 right-6">
        <Button
          size="icon"
          onClick={createNewChat}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-110"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
