"use client";

import { useMemo, useState } from "react";
import ChatArea from "@/app/components/ChatArea";
import OwnProfileModal from "@/app/components/OwnProfileModal";
import Sidebar from "@/app/components/Sidebar";
import UserProfileModal from "@/app/components/UserProfileModal";
import {
  chatUsers,
  initialCurrentUser,
  initialMessages,
  type ChatMessage,
} from "@/app/components/chat-data";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(chatUsers[0]?.id ?? "");
  const [messagesByUser, setMessagesByUser] =
    useState<Record<string, ChatMessage[]>>(initialMessages);
  const [currentUser, setCurrentUser] = useState(initialCurrentUser);
  const [isOwnProfileOpen, setIsOwnProfileOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return chatUsers;
    }

    return chatUsers.filter((user) => {
      return (
        user.username.toLowerCase().includes(query) ||
        user.userId.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const selectedUser =
    chatUsers.find((user) => user.id === selectedUserId) ?? chatUsers[0] ?? null;

  const selectedMessages = selectedUser
    ? messagesByUser[selectedUser.id] ?? []
    : [];

  const handleStartChat = () => {
    const nextUser = filteredUsers[0] ?? chatUsers[0];

    if (!nextUser) {
      return;
    }

    setSelectedUserId(nextUser.id);
    setIsUserProfileOpen(false);
  };

  const handleSendMessage = (text: string) => {
    if (!selectedUser) {
      return;
    }

    const nextMessage: ChatMessage = {
      id: `message-${Date.now()}`,
      sender: "self",
      text,
      timestamp: new Date().toISOString(),
    };

    setMessagesByUser((current) => ({
      ...current,
      [selectedUser.id]: [...(current[selectedUser.id] ?? []), nextMessage],
    }));
  };

  return (
    <>
      <main className="min-h-screen bg-[#0a0a0a] p-4 text-white md:p-6">
        <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl flex-col overflow-hidden rounded-[32px] border border-white/12 bg-[#0f0f0f] shadow-[0_0_0_1px_rgba(255,255,255,0.03)] lg:flex-row">
          <Sidebar
            currentUser={currentUser}
            users={filteredUsers}
            selectedUserId={selectedUser?.id ?? null}
            searchQuery={searchQuery}
            onOpenOwnProfile={() => setIsOwnProfileOpen(true)}
            onSearchChange={setSearchQuery}
            onSelectUser={(userId) => {
              setSelectedUserId(userId);
              setIsUserProfileOpen(false);
            }}
            onStartChat={handleStartChat}
          />

          <ChatArea
            key={selectedUser?.id ?? "empty-chat"}
            currentUserName={currentUser.displayName}
            messages={selectedMessages}
            selectedUser={selectedUser}
            onOpenUserProfile={() => {
              if (selectedUser) {
                setIsUserProfileOpen(true);
              }
            }}
            onSendMessage={handleSendMessage}
          />
        </div>
      </main>

      {isOwnProfileOpen && (
        <OwnProfileModal
          isOpen={isOwnProfileOpen}
          user={currentUser}
          onChangeName={(displayName) =>
            setCurrentUser((current) => ({ ...current, displayName }))
          }
          onClose={() => setIsOwnProfileOpen(false)}
        />
      )}

      {isUserProfileOpen && (
        <UserProfileModal
          isOpen={isUserProfileOpen}
          user={selectedUser}
          onClose={() => setIsUserProfileOpen(false)}
          onMessage={() => setIsUserProfileOpen(false)}
        />
      )}
    </>
  );
}
