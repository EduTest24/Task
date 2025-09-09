"use client";

import { useState } from "react";
import { Calendar, Mail, ListTodo, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AgentHeader({ agent, setAgent, handleClear, title }) {
  const getIcon = () => {
    switch (agent) {
      case "calendar":
        return <Calendar className="w-6 h-6" />;
      case "email":
        return <Mail className="w-6 h-6" />;
      case "tasks":
        return <ListTodo className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md  ">
      <div className="flex items-center gap-2">
        {getIcon()}
        <h1 className="text-lg font-semibold capitalize drop-shadow-sm">
          {title || `${agent} Assistant`}
        </h1>
      </div>

      <div className="flex gap-3 items-center">
        {/* Shadcn Select */}
        <Select
          value={agent}
          onValueChange={(val) => setAgent(val)}
        >
          <SelectTrigger className="w-32 bg-white/20 text-white border-none focus:ring-2 focus:ring-white/40">
            <SelectValue placeholder="Select Agent" />
          </SelectTrigger>
          <SelectContent className="bg-white text-gray-800 rounded-lg shadow-lg">
            <SelectItem value="calendar">Calendar</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="tasks">Tasks</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Button */}
        <Button
          variant="secondary"
          size="icon"
          onClick={handleClear}
          title="Clear chat"
          className="bg-white/20 hover:bg-white/30 text-white rounded-full shadow-md"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
