import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { userId } = getAuth(req);

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    await connectDB();

    const { clerkId, name, email, image } = req.body;

    if (clerkId !== userId) {
      return res.status(403).json({ message: "Forbidden: Clerk ID mismatch" });
    }

    // Check if user already exists by clerkId
    let user = await User.findOne({ clerkId });

    // If not, try checking by email
    if (!user) {
      user = await User.findOne({ email });

      if (user) {
        // Update user with clerkId if it was missing
        user.clerkId = clerkId;
        user.name = name || user.name;
        user.image = image || user.image;
        await user.save();

        return res.status(200).json({ message: "User updated with Clerk ID" });
      } else {
        // No user found by either field – create new
        await User.create({
          clerkId,
          name,
          email,
          image,
        });

        return res.status(201).json({ message: "User created in DB" });
      }
    }

    // User with clerkId already exists – do nothing
    return res.status(200).json({ message: "User already exists" });
  } catch (error) {
    console.error("Error syncing user:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
