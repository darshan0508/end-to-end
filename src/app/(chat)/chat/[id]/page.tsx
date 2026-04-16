"use client"

import ChatInputBox from "@/components/chatInputBox";
import ChatTopBar from "@/components/chatTopBar";
import { useParams } from "next/navigation";
import { useChatStore } from "@/store/chat.store";
import { useAuthStore } from "@/store/auth.store";
import ChatUi from "@/components/chatUi";
import { useEffect, useMemo, useRef } from "react";
import { useChatSocket } from "@/hooks/useChatSocket";

export default function Chat() {
  const params = useParams<{ id: string }>();
  const conversationId = params.id;

  const conversations = useChatStore((s) => s.conversations);
  const messagesByConversation = useChatStore((s) => s.messagesByConversation);
  const loadMessages = useChatStore((s) => s.loadMessages);
  const setActiveConversationId = useChatStore((s) => s.setActiveConversationId);
  const socketConnected = useChatStore((s) => s.socketConnected);
  const currentUserId = useAuthStore((s) => s.userId);

  const { joinConversation, leaveConversation } = useChatSocket();

  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const wasNearBottomRef = useRef(true);
  const previousConversationIdRef = useRef<string | null>(null);
  const previousMessageCountRef = useRef(0);

  useEffect(() => {
    if (!conversationId) return;

    joinConversation(conversationId);

    return () => {
      leaveConversation(conversationId);
    };
  }, [conversationId, joinConversation, leaveConversation]);

  useEffect(() => {
    if (!conversationId) return;

    setActiveConversationId(conversationId);
    loadMessages(conversationId);

    return () => {
      leaveConversation(conversationId);
    };
  }, [conversationId, loadMessages, setActiveConversationId, leaveConversation]);

  const activeConversation = conversations.find(
    (conversation) => conversation.conversationId === conversationId
  );

  const messages = useMemo(
    () => (conversationId ? messagesByConversation[conversationId] || [] : []),
    [conversationId, messagesByConversation]
  );

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      wasNearBottomRef.current =
        element.scrollHeight - element.scrollTop - element.clientHeight < 120;
    };

    handleScroll();
    element.addEventListener("scroll", handleScroll);

    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!conversationId || socketConnected) return;

    const intervalId = window.setInterval(() => {
      loadMessages(conversationId);
    }, 4000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [conversationId, socketConnected, loadMessages]);

  useEffect(() => {
    const hasConversationChanged =
      previousConversationIdRef.current !== conversationId;
    const hasNewMessage = messages.length > previousMessageCountRef.current;

    if (hasConversationChanged) {
      previousConversationIdRef.current = conversationId;
      previousMessageCountRef.current = messages.length;
      requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ behavior: "auto" });
      });
      return;
    }

    if (hasNewMessage && wasNearBottomRef.current) {
      requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }

    previousMessageCountRef.current = messages.length;
  }, [conversationId, messages.length]);

  if (!conversationId) return null;

  return (
    <div className="flex h-full flex-col">
      <ChatTopBar
        displayName={activeConversation?.participant.displayName ?? ""}
        userId={activeConversation?.participant.uniqueUserId ?? ""}
      />

      <div ref={scrollRef} className="flex-1 overflow-y-scroll">
        {messages.map((message) => {
          const isSent = currentUserId
            ? message.senderId === currentUserId
            : false;

          return (
            <ChatUi
              key={message.id}
              content={message.ciphertext}
              type={isSent ? "sent" : "received"}
            />
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="p-2">
        <ChatInputBox />
      </div>
    </div>
  );
}
