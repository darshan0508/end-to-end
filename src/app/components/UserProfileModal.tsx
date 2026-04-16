"use client";

import { useState } from "react";
import { getInitials, type ChatUser } from "./chat-data";

type UserProfileModalProps = {
  isOpen: boolean;
  user: ChatUser | null;
  onClose: () => void;
  onMessage: () => void;
};

async function copyText(value: string) {
  await navigator.clipboard.writeText(value);
}

export default function UserProfileModal({
  isOpen,
  user,
  onClose,
  onMessage,
}: Readonly<UserProfileModalProps>) {
  const [usernameLabel, setUsernameLabel] = useState("Copy Username");
  const [userIdLabel, setUserIdLabel] = useState("Copy User ID");

  if (!isOpen || !user) {
    return null;
  }

  const handleCopy = async (
    value: string,
    setLabel: (value: string) => void,
    resetLabel: string
  ) => {
    try {
      await copyText(value);
      setLabel("Copied");
    } catch {
      setLabel("Copy failed");
    } finally {
      window.setTimeout(() => setLabel(resetLabel), 1400);
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <aside
        className="panel-card flex h-full w-full max-w-xl flex-col border-l border-white/10 bg-[#111111]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-6">
          <p className="text-sm uppercase tracking-[0.32em] text-white/35">
            Contact Info
          </p>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:bg-white/[0.06]"
            type="button"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-8 md:px-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-black text-3xl font-semibold text-white">
              {getInitials(user.username)}
            </div>
            <h2 className="mt-5 text-3xl font-semibold text-white">
              {user.username}
            </h2>
            <p className="mt-3 text-sm uppercase tracking-[0.26em] text-white/35">
              {user.userId}
            </p>
            <p className="mt-4 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/50">
              {user.status}
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
              type="button"
              onClick={() =>
                handleCopy(user.username, setUsernameLabel, "Copy Username")
              }
            >
              {usernameLabel}
            </button>

            <button
              className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
              type="button"
              onClick={() => handleCopy(user.userId, setUserIdLabel, "Copy User ID")}
            >
              {userIdLabel}
            </button>

            <button
              className="rounded-2xl bg-green-500 px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] hover:bg-green-400 sm:col-span-2"
              type="button"
              onClick={onMessage}
            >
              Message
            </button>
          </div>

          <section className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              Status
            </p>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Hey there! I am using chat.
            </p>
          </section>

          <section className="mt-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              About
            </p>
            <p className="mt-3 text-sm leading-6 text-white/80">{user.about}</p>
          </section>

          <section className="mt-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              Media, Links and Docs
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs uppercase tracking-[0.2em] text-white/40">
              <div className="rounded-2xl border border-dashed border-white/10 px-3 py-6">
                Media
              </div>
              <div className="rounded-2xl border border-dashed border-white/10 px-3 py-6">
                Links
              </div>
              <div className="rounded-2xl border border-dashed border-white/10 px-3 py-6">
                Docs
              </div>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
