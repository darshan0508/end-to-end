import { getSocket } from "@/lib/socket/socket";
import { useCallback } from "react";
import { useAuthStore } from "@/store/auth.store";

export const useChatSocket = () => {
  const isMockSession = useAuthStore((s) => s.isMockSession);
  const socket = getSocket();

  const joinConversation = useCallback((id: string) => {
    if (isMockSession) return;
    socket.emit("join:conversation", id);
  }, [isMockSession, socket]);

  const leaveConversation = useCallback((id: string) => {
    if (isMockSession) return;
    socket.emit("leave:conversation", id);
  }, [isMockSession, socket]);

  return { joinConversation, leaveConversation };
};
