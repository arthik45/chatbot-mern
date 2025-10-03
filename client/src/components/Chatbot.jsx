import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        question: input, // match backend expectation
      });

      const botMessage = {
        sender: "bot",
        text: response.data.answer || "Sorry, I don't have an answer for that.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const botMessage = {
        sender: "bot",
        text: "❌ Sorry, something went wrong. Try again later.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  // Send on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition"
        title="Open Chat"
      >
        💬
      </button>

      {/* Chat window */}
      {open && (
        <div className="mt-2 w-80 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col">
          {/* Header */}
          <div className="bg-green-500 text-white px-4 py-2 rounded-t-lg font-bold">
            Health Bot
          </div>

          {/* Messages */}
          <div className="h-60 overflow-y-auto p-3 flex flex-col gap-2 text-sm text-gray-700">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
              >
                <span
                  className={`inline-block px-3 py-1 rounded-lg max-w-[75%] break-words ${
                    msg.sender === "bot" ? "bg-gray-100 text-gray-800" : "bg-green-500 text-white"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <span className="inline-block px-3 py-1 rounded-lg bg-gray-100 text-gray-800 animate-pulse">
                  Typing...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex p-2 border-t border-gray-300">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border rounded-l-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-r-lg transition disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
