import connectDB from "@/lib/mongodb";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  await connectDB();
  const { userId } = getAuth(req);
  console.log("User ID:", userId);

  if (!userId)
    return res.status(401).json({ success: false, error: "Unauthorized" });

  if (req.method === "GET") {
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
    return res.status(200).json({ success: true, chats });
  }

  if (req.method === "POST") {
    const { title, agent } = req.body;
    const newChat = await Chat.create({ title, agent, userId });
    return res.status(201).json({ success: true, chat: newChat });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
