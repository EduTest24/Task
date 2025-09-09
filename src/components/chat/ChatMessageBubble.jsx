import { Button } from "@/components/ui/button";
import { Copy, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import ResponseRenderer from "@/components/ResponseRenderer";

export default function ChatMessageBubble({
  msg,
  agent,
  setInputMessage,
}) {
  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div
      className={`p-3 rounded-2xl shadow-sm max-w-[80%] break-words ${
        msg.role === "user"
          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          : "bg-white border border-gray-200 text-gray-900"
      }`}
    >
      {msg.role === "assistant" ? (
        <ResponseRenderer agent={agent} text={msg.content} />
      ) : (
        msg.content
      )}

      {msg.role === "assistant" && (
        <div className="flex gap-2 mt-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => handleCopy(msg.content)}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => {
              setInputMessage(msg.content);
              toast.message("Ready to regenerate this response");
            }}
          >
            <RefreshCcw className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
