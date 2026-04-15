"use client"
import ContactsCard from "./contactsCard";
import { useRouter } from "next/navigation"
import { useChatStore } from "@/store/chat.store";
import { useAuthStore } from "@/store/auth.store";
import UserProfile from "./userProfile";

export default function ContactsBar() {
  const router = useRouter();
  const conversations = useChatStore((state) => state.conversations);
  const setActiveConversationId = useChatStore((state) => state.setActiveConversationId);
  const setIsSearchOpen = useChatStore((state) => state.setIsSearchOpen);
  const authUserId = useAuthStore((state) => state.userId);
  const uniqueUserId = useAuthStore((state) => state.uniqueUserId);
  const displayName = useAuthStore((state) => state.name);
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleConversationClick = (conversation: typeof conversations[number]) => {
    setActiveConversationId(conversation.conversationId);
    const id = conversation.conversationId;
    router.push(`/chat/${id}`);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div onClick={() => { router.push("/") }} className=" cursor-pointer p-2 flex justify-center   font-extrabold text-4xl font-mono text-white mb-4">End2End </div>

      <div className="p-2">
        <button onClick={() => setIsSearchOpen(true)} className="w-full p-2 bg-green-900 rounded-lg shadow-2xl  text-gray-200 cursor-pointer hover:bg-green-800 ">start a new chat</button>
      </div>


      <div className="flex-1 overflow-y-auto px-2 space-y-2 scroll-auto ">
        {conversations.map((conversation) => (
          <ContactsCard
            key={conversation.conversationId}
            displayName={conversation.participant.displayName}
            onClick={() => handleConversationClick(conversation)}
          />
        ))}
      </div>

      {authUserId && uniqueUserId && displayName && (
        <div className="border-t border-white/10 p-3">
          <UserProfile
            displayName={displayName}
            userId={uniqueUserId}
            onDisplayNameSave={(nextDisplayName) =>
              setAuth(authUserId, uniqueUserId, nextDisplayName)
            }
          />
        </div>
      )}

    </div>
  );
}
