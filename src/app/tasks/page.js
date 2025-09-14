"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  User,
  Bot,
  Eye,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AiInteractionPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [latestOutput, setLatestOutput] = useState(null);

  // New: delete confirmation state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await res.json();
      console.log("AI Response:", data);

      if (res.ok && data.success) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: (
              <Button
                variant="link"
                className="p-0 text-purple-600 hover:underline"
                onClick={() => setLatestOutput(data.data)}
              >
                <Eye className="w-4 h-4 mr-1 inline" /> See Response
              </Button>
            ),
          },
        ]);
      } else {
        toast.error("Failed to get AI response");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteTask = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const deleteTask = async () => {
    if (!taskToDelete?.id) return;
    try {
      const prompt = `Delete the task with ID ${taskToDelete.id} from Google Tasks.`;
      const res = await fetch("/api/agent/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Task deleted");
        setLatestOutput((prev) =>
          Array.isArray(prev)
            ? prev.filter((t) => t.id !== taskToDelete.id)
            : null
        );
      } else {
        toast.error("Failed to delete task");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };

  const renderOutput = () => {
    if (!latestOutput) {
      return (
        <p className="text-gray-500">
          No output yet. Start chatting to see results here.
        </p>
      );
    }

    if (
      Array.isArray(latestOutput) &&
      latestOutput.every((item) => item.title)
    ) {
      return (
        <div className="space-y-4">
          {latestOutput.map((task) => (
            <Card
              key={task.id}
              className="border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <CardHeader className="p-3 pb-1 flex flex-row justify-between items-center">
                <CardTitle className="text-base font-semibold">
                  {task.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {task.status === "needsAction" ? (
                    <Clock className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  {task.webViewLink && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => window.open(task.webViewLink, "_blank")}
                    >
                      Open <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => confirmDeleteTask(task)}
                  >
                    <Trash2 className="w-3 h-3 mr-1" /> Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-1 text-sm text-gray-600 space-y-1">
                {task.due && <p>Due: {new Date(task.due).toLocaleString()}</p>}
                {task.updated && (
                  <p>Updated: {new Date(task.updated).toLocaleString()}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    // Single task object
    if (latestOutput?.title) {
      const task = latestOutput;
      return (
        <Card className="border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200 rounded-lg overflow-hidden bg-white">
          <CardHeader className="p-4 flex flex-row justify-between items-center bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-semibold text-gray-800 truncate">
                {task.title}
              </CardTitle>
              {task.status === "needsAction" ? (
                <Clock className="w-4 h-4 text-yellow-500" />
              ) : (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
            </div>
            <div className="flex items-center gap-2">
              {task.priority && (
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {task.priority}
                </span>
              )}
              {task.webViewLink && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => window.open(task.webViewLink, "_blank")}
                >
                  Open <ArrowUpRight className="w-3 h-3 ml-1" />
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-4 text-sm text-gray-600 space-y-2">
            {task.due && (
              <p>
                <span className="font-medium text-gray-700">Due:</span>{" "}
                {new Date(task.due).toLocaleString()}
              </p>
            )}
            {task.updated && (
              <p className="text-gray-500">
                <span className="font-medium text-gray-700">Updated:</span>{" "}
                {new Date(task.updated).toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>
      );
    }

    // String response
    if (typeof latestOutput === "string") {
      return <div className="prose max-w-full">{latestOutput}</div>;
    }

    // Fallback JSON
    return (
      <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
        {JSON.stringify(latestOutput, null, 2)}
      </pre>
    );
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 p-4 h-[calc(100vh-2rem)]">
        {/* Left Section - Chat */}
        <Card className="flex flex-col w-full lg:w-1/3 2xl:w-2/5 h-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">AI Chat</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <ScrollArea className="flex-1 pr-2 h-full max-h-[calc(100vh-12rem)]">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 mb-4 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <Bot className="w-5 h-5 text-purple-500 mt-1" />
                  )}
                  <div
                    className={`p-3 rounded-2xl max-w-[80%] shadow ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === "user" && (
                    <User className="w-5 h-5 text-purple-500 mt-1" />
                  )}
                </div>
              ))}
            </ScrollArea>

            <div className="flex gap-2 mt-2">
              <Textarea
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 resize-none"
                rows={1}
              />
              <Button onClick={sendMessage} disabled={loading}>
                {loading ? "..." : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Section - Output */}
        <Card className="flex flex-col w-full lg:w-2/3 2xl:w-3/5 h-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">AI Output</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            {renderOutput()}
          </CardContent>
        </Card>
      </div>
      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Task Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete the task {taskToDelete?.title}?</p>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteTask}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
