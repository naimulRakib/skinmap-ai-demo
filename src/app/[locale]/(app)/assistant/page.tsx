"use client";

import { useTranslations } from "next-intl";
import { Send, Sparkles, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";

export default function AssistantPage() {
  const t = useTranslations("assistant");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    {
      role: "ai",
      content: "হ্যালো! আমি আপনার স্কিনম্যাপ এআই সহকারী। আপনার ত্বক বা রুটিন সম্পর্কে কোনো প্রশ্ন থাকলে করতে পারেন।"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: "এটি একটি ডেমো প্রোটোটাইপ, তাই আমি এখনো বাস্তব উত্তর দিতে পারছি না। তবে বাস্তব অ্যাপে আমি আপনার স্ক্যান ও রুটিনের উপর ভিত্তি করে একদম সঠিক উত্তর দেব!" 
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] bg-surface-50">
      <header className="px-6 py-4 bg-white border-b border-surface-200 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
          <Sparkles size={20} />
        </div>
        <div>
          <h1 className="font-display font-bold text-navy-900">{t("title")}</h1>
          <p className="text-xs text-navy-400">এআই ডেমো মোড</p>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="bg-amber-50 text-amber-800 text-xs p-3 rounded-xl mb-4 text-center">
          {t("disclaimer")}
        </div>

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-navy-900 text-white rounded-tr-sm' 
                : 'bg-white text-navy-800 shadow-sm border border-surface-200 rounded-tl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-surface-200 rounded-2xl rounded-tl-sm p-4 flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-6 pb-2 flex gap-2 overflow-x-auto scroll-no-bar shrink-0">
          {[
            "আমার ত্বক কেন শুষ্ক লাগছে?",
            "সানস্ক্রিন কি প্রতিদিন মাখতে হবে?"
          ].map(q => (
            <button 
              key={q}
              onClick={() => setInput(q)}
              className="whitespace-nowrap px-4 py-2 bg-white border border-surface-200 rounded-full text-xs font-medium text-navy-600 hover:border-teal-300 transition-colors"
            >
              <MessageCircleQuestion size={12} className="inline mr-1 opacity-50" />
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-surface-200 shrink-0 pb-safe">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t("placeholder")}
            className="flex-1 bg-surface-100 border-none rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center disabled:opacity-50 shrink-0"
          >
            <Send size={18} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
