import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import backend from "../utils/backend";
import BackgroundLayout from "./BackgroundLayout";

// A component for the "thinking" animation
const ThinkingIndicator = () => (
  <div className="flex items-center space-x-2 p-3">
    <img src="/om.png" alt="Bot" className="h-8 w-8" />
    <div className="flex items-center space-x-1.5 bg-cream/70 p-3 rounded-2xl">
      <div className="h-2 w-2 rounded-full bg-charcoal/50 typing-dot" style={{ animationDelay: '0s' }}></div>
      <div className="h-2 w-2 rounded-full bg-charcoal/50 typing-dot" style={{ animationDelay: '0.2s' }}></div>
      <div className="h-2 w-2 rounded-full bg-charcoal/50 typing-dot" style={{ animationDelay: '0.4s' }}></div>
    </div>
  </div>
);

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { _id: 'welcome', role: 'bot', text: 'Namaste. I am here to help you explore the profound wisdom of the Ashtavakra Gita. How may I assist your journey today?' }
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // For new messages
  const [historyLoading, setHistoryLoading] = useState(false); // For old messages
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    if (!historyLoading) {
      scrollToBottom();
    }
  }, [messages, historyLoading]);

  // ✨ MODIFIED: fetchHistory now prevents adding duplicate messages
  const fetchHistory = async (currentPage) => {
    const token = localStorage.getItem("token");
    if (!token || !hasMore) return;

    setHistoryLoading(true);
    try {
      const res = await backend.get(`/chatbot/history?page=${currentPage}&limit=20`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { messages: newMessages, hasMore: newHasMore } = res.data;
      
      setMessages(prev => {
        // Create a Set of existing message IDs for efficient lookup
        const existingIds = new Set(prev.map(msg => msg._id));
        // Filter out any new messages that are already in the state
        const uniqueNewMessages = newMessages.filter(msg => !existingIds.has(msg._id));
        // Prepend the unique older messages to the start of the array
        return [...uniqueNewMessages, ...prev];
      });

      setHasMore(newHasMore);
    } catch (err) {
      console.error("❌ Error fetching history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(1);
  }, []); 

  useEffect(() => {
    if (page > 1) {
      fetchHistory(page);
    }
  }, [page]);
  
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop } = chatContainerRef.current;
      if (scrollTop === 0 && hasMore && !historyLoading) {
        setPage(prevPage => prevPage + 1);
      }
    }
  };
  
  const sendMessage = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to use the chatbot.");
      return;
    }
    if (!message.trim()) return;
    // We add a temporary key for the optimistic message
    const tempId = Date.now().toString();
    const userMsg = { role: "user", text: message, _id: `temp_${tempId}` };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setMessage("");

    try {
      const res = await backend.post('/chatbot/ask-gemini', { message }, { headers: { Authorization: `Bearer ${token}` } });
      const botMsg = { role: "bot", text: res?.data?.reply || "🧘 Gemini is silent...", _id: `temp_bot_${tempId}` };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("❌ Gemini error:", err);
      // It's good practice to remove the optimistic message on error
      setMessages(prev => prev.filter(m => m._id !== `temp_${tempId}`));
      setMessages(prev => [...prev, { role: "bot", text: "⚠️ Network error. Please try again.", _id: `err_${tempId}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundLayout>
      {/* ✨ UPDATED: Removed card layout for a more immersive feel */}
      <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-80px)]">
        <h2 className="text-3xl font-bold text-center mb-4 text-charcoal font-lora">🕉️ Ask the Sage</h2>
        
        {/* ✨ UPDATED: Chat history area */}
        <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto space-y-6 p-4">
          {historyLoading && <div className="text-center text-charcoal/50 text-sm py-2">Loading past wisdom...</div>}
          
          {messages.map((msg) => (
            <div key={msg._id} className={`flex items-end gap-3 fade-in-card ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {/* Bot Avatar */}
              {msg.role === "bot" && (
                <img src="/om.png" alt="Bot" className="h-8 w-8 mb-1" />
              )}
              
              {/* Message Bubble */}
              <div className={`max-w-md p-4 rounded-2xl text-base ${
                msg.role === "user" 
                  ? "bg-sage text-white rounded-br-none" 
                  : "bg-cream/70 text-charcoal rounded-bl-none border border-charcoal/10"
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && <ThinkingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* ✨ UPDATED: Floating input bar */}
        <div className="mt-4">
          <div className="bg-cream/80 backdrop-blur-sm border border-charcoal/10 rounded-full p-2 flex items-center">
            <input
              className="flex-1 bg-transparent px-4 py-2 text-charcoal placeholder-charcoal/50 focus:outline-none"
              placeholder="Ask about self, awareness, or reality..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !loading && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-saffron text-white p-3 rounded-full hover:bg-saffron/90 transition-colors disabled:bg-sage/50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}