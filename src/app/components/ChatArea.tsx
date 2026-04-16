"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import MessageBubble from "./MessageBubble";
import { getInitials, type ChatMessage, type ChatUser } from "./chat-data";

type ChatAreaProps = {
  currentUserName: string;
  messages: ChatMessage[];
  selectedUser: ChatUser | null;
  onOpenUserProfile: () => void;
  onSendMessage: (text: string) => void;
};

export default function ChatArea({
  currentUserName,
  messages,
  selectedUser,
  onOpenUserProfile,
  onSendMessage,
}: Readonly<ChatAreaProps>) {
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, selectedUser?.id]);

  if (!selectedUser) {
    return (
      <section className="flex flex-1 items-center justify-center bg-[#101010] p-8">
        <div className="max-w-md rounded-[28px] border border-dashed border-white/15 px-8 py-10 text-center">
          <p className="text-xs uppercase tracking-[0.34em] text-white/35">
            No Conversation
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Pick a user from the sidebar to start chatting.
          </h2>
        </div>
      </section>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextMessage = draft.trim();

    if (!nextMessage) {
      return;
    }

    onSendMessage(nextMessage);
    setDraft("");
  };

  return (
    <section className="flex min-h-[620px] flex-1 flex-col bg-[#101010]">
      <header className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black text-sm font-semibold text-white transition hover:brightness-125"
            type="button"
            onClick={onOpenUserProfile}
          >
            {getInitials(selectedUser.username)}
          </button>

          <div className="min-w-0">
            <button
              className="truncate text-left text-lg font-semibold text-white transition hover:text-white/80"
              type="button"
              onClick={onOpenUserProfile}
            >
              {selectedUser.username}
            </button>
            <p className="truncate text-xs uppercase tracking-[0.26em] text-white/35">
              {selectedUser.userId}
            </p>
          </div>
        </div>

        <div className="hidden rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/35 md:block">
          {currentUserName}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-5 md:px-8">
        <div className="space-y-3">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              isOwn={message.sender === "self"}
              message={message}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-4 md:px-8">
        <form className="flex items-center gap-3" onSubmit={handleSubmit}>
          <input
            className="w-full rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/[0.02]"
            placeholder={`Message ${selectedUser.username}`}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button
            className="rounded-2xl bg-green-500 px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!draft.trim()}
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
