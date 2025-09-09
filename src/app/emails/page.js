"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Loader2,
  Send,
  Bot,
  User,
  Mail,
  Reply,
  MailCheck,
  ExternalLink,
} from "lucide-react";

export default function EmailAgentPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", typing: true, content: "" },
    ]);

    try {
      const res = await fetch("/api/agent/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
        credentials: "include",
      });

      const data = await res.json();
      console.log("API response:", data);

      setMessages((prev) => [
        ...prev.filter((m) => !m.typing),
        {
          role: "assistant",
          content: data.success
            ? `📬 I found ${data.result.emails.length} emails matching your query. Click to view details.`
            : data.message,
          raw: data.result.emails, // keep full data for right panel
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.filter((m) => !m.typing),
        { role: "assistant", content: "❌ Error fetching response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center gap-2 p-4 border-b shadow-sm bg-white">
        <Bot className="w-6 h-6 text-blue-600" />
        <h1 className="font-semibold text-lg">Smart Email Agent</h1>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Section (Left) */}
        <div className="w-1/2 border-r flex flex-col">
          <ScrollArea className="flex-1 p-4 space-y-3">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() =>
                  msg.role === "assistant" &&
                  msg.raw &&
                  setSelectedResponse(msg.raw)
                }
                className={`flex items-start gap-2 cursor-pointer ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <Bot className="w-5 h-5 text-blue-600 mt-1" />
                )}
                <Card
                  className={`max-w-xs p-2 rounded-2xl shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white border hover:bg-gray-50"
                  }`}
                >
                  <CardContent className="p-2 text-sm">
                    {msg.typing ? (
                      <motion.div
                        className="flex gap-1"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                      >
                        <span className="w-2 h-2 bg-gray-400 rounded-full" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full" />
                      </motion.div>
                    ) : (
                      msg.content
                    )}
                  </CardContent>
                </Card>
                {msg.role === "user" && (
                  <User className="w-5 h-5 text-gray-600 mt-1" />
                )}
              </motion.div>
            ))}
          </ScrollArea>

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t bg-white">
            <Input
              placeholder="Ask me about your emails..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Detail Viewer (Right) */}
        <div className="w-1/2 bg-white p-6 overflow-auto">
          {selectedResponse ? (
            <motion.div
              key={selectedResponse[0]?.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                Emails Found ({selectedResponse.length})
              </h2>

              <div className="grid gap-4">
                {selectedResponse.map((email) => (
                  <Card
                    key={email.id}
                    className="shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 rounded-2xl border border-gray-200"
                  >
                    <CardContent className="p-4 space-y-3">
                      {/* Header with sender + date */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {email.from?.charAt(0).toUpperCase() || "E"}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 text-sm">
                              {email.from}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {email.date}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          Email
                        </span>
                      </div>

                      {/* Subject */}
                      <h2 className="text-base font-semibold text-gray-900 line-clamp-1">
                        {email.subject}
                      </h2>

                      {/* Snippet (expandable) */}
                      <p className="text-sm text-gray-600 line-clamp-2 group-hover:line-clamp-none transition-all">
                        {email.snippet}
                      </p>

                      <div className="flex justify-between items-center pt-3 border-t">
                        <div className="flex gap-2">
                          {/* Reply - Primary / Blue */}
                          <Button
                            size="sm"
                            className="rounded-full shadow-sm flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Reply className="h-4 w-4" />
                            Reply
                          </Button>

                          {/* Mark Read - Green */}
                          <Button
                            size="sm"
                            className="rounded-full shadow-sm flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            <MailCheck className="h-4 w-4" />
                            Mark Read
                          </Button>
                        </div>

                        {/* Open in Gmail - Neutral */}
                        {email.link && (
                          <Button
                            asChild
                            size="sm"
                            className="rounded-full shadow-sm flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                          >
                            <a
                              href={email.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Open in Gmail
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Click on an AI response to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
