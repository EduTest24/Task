import { motion } from "framer-motion";
import ChatMessageBubble from "./ChatMessageBubble";

export default function ChatMessages({
  messages,
  agent,
  updateChatMessages,
  setInputMessage,
}) {
  return (
    <main className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <ChatMessageBubble
            msg={msg}
            agent={agent}
            setInputMessage={setInputMessage}
            updateChatMessages={updateChatMessages}
          />
        </motion.div>
      ))}
    </main>
  );
}
