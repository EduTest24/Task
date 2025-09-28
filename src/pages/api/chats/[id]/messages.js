import connectDB from "@/lib/mongodb";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  await connectDB();
  const { userId } = getAuth(req);

  if (!userId)
    return res.status(401).json({ success: false, error: "Unauthorized" });

  const { id } = req.query;

  if (req.method === "POST") {
    const { role, content, structuredData } = req.body;

    const chat = await Chat.findOne({ _id: id, userId });
    if (!chat)
      return res.status(404).json({ success: false, error: "Chat not found" });

    chat.messages.push({ role, content, structuredData });
    await chat.save();

    return res.status(200).json({ success: true, chat });
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
