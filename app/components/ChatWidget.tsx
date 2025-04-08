"use client";
import { MessageSquare } from "lucide-react";

export default function ChatWidget({ showChat, setShowChat }: any) {
  const quickReplies = [
    "What can this assistant do?",
    "Tell me about AI projects",
    "Show me publications",
    "Let's collaborate",
  ];

  return (
    <>
      {showChat && (
        <div className="fixed bottom-20 right-6 bg-white text-black w-72 rounded-xl shadow-xl p-4 z-50">
          <h3 className="font-semibold text-lg mb-2">Ask HuyBot 🤖</h3>
          <div className="flex flex-col gap-2 mb-2">
            {quickReplies.map((q, i) => (
              <button key={i} className="bg-purple-100 hover:bg-purple-200 text-sm p-2 rounded-md text-left">{q}</button>
            ))}
          </div>
          <input type="text" placeholder="Type a message..." className="w-full border px-3 py-2 rounded-md text-sm" />
        </div>
      )}
      <button onClick={() => setShowChat(!showChat)} className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-purple-500 hover:bg-purple-600 flex items-center justify-center shadow-lg z-50">
        <MessageSquare size={24} className="text-white" />
      </button>
    </>
  );
}
