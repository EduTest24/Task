import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    structuredData: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

const ChatSchema = new Schema(
  {
    title: { type: String, default: "New Chat" },
    agent: {
      type: String,
      enum: ["calendar", "email", "tasks"],
      default: "calendar",
    },
    messages: [MessageSchema],
    pinned: { type: Boolean, default: false },
    userId: { type: String, required: true }, // Clerk user ID
  },
  { timestamps: true }
);

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
