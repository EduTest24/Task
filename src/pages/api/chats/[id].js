// pages/api/chats/[id].js
import connectDB from "@/lib/mongodb";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  await connectDB();
  const { userId } = getAuth(req);
  if (!userId)
    return res.status(401).json({ success: false, error: "Unauthorized" });

  const { id } = req.query;

  if (req.method === "GET") {
    const chat = await Chat.findOne({ _id: id, userId });
    if (!chat)
      return res.status(404).json({ success: false, error: "Chat not found" });
    return res.status(200).json({ success: true, chat });
  }

  if (req.method === "PATCH") {
    const { title } = req.body;
    const updated = await Chat.findOneAndUpdate(
      { _id: id, userId },
      { title },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ success: false, error: "Chat not found" });
    return res.status(200).json({ success: true, chat: updated });
  }

  if (req.method === "PUT") {
    const { messages } = req.body;
    const updated = await Chat.findOneAndUpdate(
      { _id: id, userId },
      { messages },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ success: false, error: "Chat not found" });
    return res.status(200).json({ success: true, chat: updated });
  }

  if (req.method === "DELETE") {
    await Chat.findOneAndDelete({ _id: id, userId });
    return res.status(200).json({ success: true });
  }

  res.setHeader("Allow", ["GET", "PATCH", "PUT", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
