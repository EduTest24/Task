// pages/api/calendar/mark-completed.js
import { getCalendarClient } from "@/lib/utils/googleCalendar";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, eventId, calendarId = "primary" } = req.body;
    if (!userId || !eventId) {
      return res.status(400).json({ error: "Missing userId or eventId" });
    }

    const calendar = await getCalendarClient(userId);

    const { data: event } = await calendar.events.get({
      calendarId,
      eventId,
    });

    // Mark as completed
    event.summary = `${event.summary}`;
    event.colorId = "8"; // Gray

    const updatedEvent = await calendar.events.update({
      calendarId,
      eventId,
      requestBody: event,
    });

    res.status(200).json({ success: true, event: updatedEvent.data });
  } catch (error) {
    console.error("Mark as completed error:", error);
    res.status(500).json({ error: error.message });
  }
}
