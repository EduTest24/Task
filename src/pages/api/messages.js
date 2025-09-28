// pages/api/messages.js
import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  await connectDB();
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    if (req.method === "GET") {
      const { chatId } = req.query;

      if (!chatId) {
        return res
          .status(400)
          .json({ success: false, message: "chatId is required" });
      }

      const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
      return res.status(200).json({ success: true, messages });
    }

    if (req.method === "POST") {
      const { chatId, role, content } = req.body;

      if (!chatId || !role || !content) {
        return res.status(400).json({
          success: false,
          message: "chatId, role, and content are required",
        });
      }

      const message = await Message.create({ chatId, role, content });
      return res.status(201).json({ success: true, message });
    }

    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  } catch (err) {
    console.error("API /messages error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
