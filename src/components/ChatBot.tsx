import { MessageSquare, X, Send, Phone } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
  meta?: {
    intent?: string;
    workflow_step?: string;
    action?: string;
    system_updates?: string[];
  };
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm YourBank Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // ---------------------------------------------
  // SEND QUERY → FLASK BACKEND
  // ---------------------------------------------
  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = input.trim();
  setInput("");

  setMessages(prev => [...prev, { role: "user", content: userMessage }]);
  setIsLoading(true);

  try {
    const res = await fetch(
      "https://general-runtime.voiceflow.com/state/user/web-abhaya-1/interact",
      {
        method: "POST",
        headers: {
          "Authorization": "VF.DM.691ccd59d6d91caad66442a0.vOnPQyuTpWM8JRRN",
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          action: {
            type: "text",
            payload: userMessage
          }
        })
      }
    );

    const data = await res.json();

    // Voiceflow returns an array of responses
    const textReplies: string[] = [];

    data.forEach((block: any) => {
      if (block.type === "text") {
        textReplies.push(block.payload.message);
      }
    });

    const finalReply = textReplies.join("\n");

    setMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content: finalReply || "No response from Voiceflow."
      }
    ]);
  } catch (error) {
    setMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content: "Voiceflow API not reachable. Check your key."
      }
    ]);
  }

  setIsLoading(false);
};

  // ---------------------------------------------
  const handleCall = () => {
    window.location.href = "tel:+18632814984";
    toast.success("Calling +1 (863) 281-4984...");
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center z-50"
        >
          <MessageSquare className="h-7 w-7" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col z-50"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">YourBank Assistant</h3>
                  <p className="text-xs opacity-80">
                    {isLoading ? "Typing..." : "Online"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={handleCall} className="hover:bg-white/20 p-2 rounded-lg">
                  <Phone className="h-5 w-5" />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-lg">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: msg.role === "user" ? 40 : -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl shadow ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>

                      {/* Metadata */}
                      {msg.meta?.workflow_step && (
                        <p className="text-xs opacity-60 mt-2">
                          Step: {msg.meta.workflow_step}
                        </p>
                      )}

                      {msg.meta?.system_updates?.map((u, i) => (
                        <div
                          key={i}
                          className="bg-blue-100 text-blue-700 text-xs mt-2 px-2 py-1 rounded-md"
                        >
                          {u}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-3 flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                    </div>
                  </div>
                )}
              </div>
              <div ref={bottomRef} />
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  disabled={isLoading}
                />
                <Button onClick={handleSend} size="icon" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                YourBank AI Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

