"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

export default function CalendarActionButton({ eventData }) {
  const handleAddCalendar = async () => {
    try {
      const res = await fetch("/api/agent/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: JSON.stringify(eventData),
        }),
      });

      if (!res.ok) throw new Error("Calendar event creation failed");
      toast.success("Event added to calendar!");
    } catch (err) {
      console.error("Calendar error:", err);
      toast.error("Failed to add calendar event");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleAddCalendar}
      className="flex items-center gap-2"
    >
      <Calendar className="h-4 w-4" />
      Add to Calendar
    </Button>
  );
}
