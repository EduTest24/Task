// lib/syncUser.js
import connectDB from "./mongodb";
import User from "@/models/User";

export async function syncClerkUser(clerkUser) {
  await connectDB();

  const existingUser = await User.findOne({
    email: clerkUser.emailAddresses[0].emailAddress,
  });

  if (!existingUser) {
    await User.create({
      name: clerkUser.firstName + " " + clerkUser.lastName,
      email: clerkUser.emailAddresses[0].emailAddress,
      image: clerkUser.imageUrl,
      clerkId: clerkUser.id,
    });
  }
}
