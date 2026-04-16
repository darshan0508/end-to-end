"use client";

import { useEffect } from "react";
import ContactsBar from "@/components/contactsBar";
import { useChatStore } from "@/store/chat.store";
import { useAuthStore } from "@/store/auth.store";
import { useInitAuth } from "@/hooks/useInitAuth";
import { useSocketInit } from "@/hooks/useSocketInit";
import { useSocketConnection } from "@/hooks/useSocketConnection";
import SearchBar from "@/components/searchBar";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useInitAuth();
  useSocketInit();
  useSocketConnection();

  const isSearchOpen = useChatStore((state) => state.isSearchOpen);
  const loadConversations = useChatStore((state) => state.loadConversations);
  const authStatus = useAuthStore((state) => state.status);

  useEffect(() => {
    if (authStatus !== "authenticated") return;
    loadConversations();
  }, [authStatus, loadConversations]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-900">
      <div className="flex bg-gray-800 w-2/5 lg:w-1/5">
        <ContactsBar />
      </div>

      <div className="flex w-3/5 lg:w-4/5 flex-col">{children}</div>

      <div>{isSearchOpen && <SearchBar />}</div>
    </div>
  );
}
