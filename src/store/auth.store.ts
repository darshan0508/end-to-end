"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthState = {
  userId: string | null;
  uniqueUserId: string | null;
  name: string | null;
  status: AuthStatus;
  isMockSession: boolean;

  setAuth: (userId: string, uniqueUserId?: string, name?: string | null) => void;
  setMockAuth: (
    userId: string,
    uniqueUserId?: string,
    name?: string | null
  ) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      uniqueUserId: null,
      name: null,
      status: "loading",
      isMockSession: false,

      setAuth: (userId, uniqueUserId, name = null) =>
        set({
          userId,
          uniqueUserId: uniqueUserId,
          name: name,
          status: "authenticated",
          isMockSession: false,
        }),

      setMockAuth: (userId, uniqueUserId, name = null) =>
        set({
          userId,
          uniqueUserId: uniqueUserId,
          name: name,
          status: "authenticated",
          isMockSession: true,
        }),

      clearAuth: () =>
        set({
          uniqueUserId: null,
          name: null,
          userId: null,
          status: "unauthenticated",
          isMockSession: false,
        }),
    }),
    {
      // Persist user details
      name: "auth-storage",
      partialize: (state) => ({
        userId: state.userId,
        uniqueUserId: state.uniqueUserId,
        name: state.name,
        isMockSession: state.isMockSession,
      }),
    }
  )
);
