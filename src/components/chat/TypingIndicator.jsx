"use client";

import { motion } from "framer-motion";

export default function TypingIndicator({
  loading,
  message = "Assistant is typing...",
  dotColor = "bg-gray-400",
  dotSize = "w-2 h-2",
}) {
  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 text-gray-500 text-sm"
    >
      <span className="flex space-x-1">
        <span className={`${dotSize} ${dotColor} rounded-full animate-bounce`}></span>
        <span
          className={`${dotSize} ${dotColor} rounded-full animate-bounce`}
          style={{ animationDelay: "0.15s" }}
        ></span>
        <span
          className={`${dotSize} ${dotColor} rounded-full animate-bounce`}
          style={{ animationDelay: "0.3s" }}
        ></span>
      </span>
      <span>{message}</span>
    </motion.div>
  );
}
