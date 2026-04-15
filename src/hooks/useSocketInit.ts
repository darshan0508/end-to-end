"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { connectSocket, disconnectSocket } from "@/lib/socket/connect";

export const useSocketInit = () => {
  const status = useAuthStore((s) => s.status);
  const isMockSession = useAuthStore((s) => s.isMockSession);

  useEffect(() => {
    if (isMockSession) {
      disconnectSocket();
      return;
    }

    if (status === "authenticated") {
      connectSocket();
    }

    if (status === "unauthenticated") {
      disconnectSocket();
    }
  }, [isMockSession, status]);
};
