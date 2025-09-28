import connectDB from "@/lib/mongodb";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  await connectDB();

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "POST") {
    try {
      const { id } = req.query;
      const { role, content } = req.body;

      // Add message
      const chat = await Chat.findOneAndUpdate(
        { _id: id, userId },
        { $push: { messages: { role, content } } },
        { new: true }
      );

      if (!chat) return res.status(404).json({ error: "Chat not found" });

      // ✅ Auto-generate title if still "New Chat"
      if (chat.title === "New Chat" && role === "user") {
        const preview =
          content.length > 30 ? content.slice(0, 30) + "…" : content;
        chat.title = preview;
        await chat.save();
      }

      res.status(200).json(chat);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save message" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
