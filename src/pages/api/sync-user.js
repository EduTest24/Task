'use client"';
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node"; // FIXED
import { syncClerkUser } from "@/lib/syncUser";

export default async function handler(req, res) {
  const { userId } = getAuth();

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const clerkUser = await clerkClient.users.getUser(userId);
    await syncClerkUser(clerkUser);
    return res.status(200).json({ message: "User synced successfully" });
  } catch (error) {
    console.error("Error syncing user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
