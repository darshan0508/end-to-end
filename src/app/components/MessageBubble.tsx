"use client";

import { type ChatMessage } from "./chat-data";

type MessageBubbleProps = {
  isOwn: boolean;
  message: ChatMessage;
};

const formatTime = (timestamp: string) => {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
};

export default function MessageBubble({
  isOwn,
  message,
}: Readonly<MessageBubbleProps>) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-[24px] border px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] ${
          isOwn
            ? "border-white/20 bg-white/[0.07] text-white"
            : "border-white/12 bg-[#111111] text-zinc-100"
        }`}
      >
        <p className="text-sm leading-6 text-white/90">{message.text}</p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/35">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
