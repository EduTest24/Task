"use client";

import { Button } from "@/components/ui/button";
import { ListTodo } from "lucide-react";
import { toast } from "sonner";

export default function TaskActionButton({ taskData }) {
  const handleAddTask = async () => {
    try {
      const res = await fetch("/api/agent/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) throw new Error("Task creation failed");
      toast.success("Task added successfully!");
    } catch (err) {
      console.error("Task error:", err);
      toast.error("Failed to add task");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleAddTask}
      className="flex items-center gap-2"
    >
      <ListTodo className="h-4 w-4" />
      Add to Tasks
    </Button>
  );
}
