"use client";

import { useEffect, useRef, useState } from "react";
import { getInitials, type CurrentUserProfile } from "./chat-data";

type OwnProfileModalProps = {
  isOpen: boolean;
  user: CurrentUserProfile;
  onChangeName: (value: string) => void;
  onClose: () => void;
};

async function copyText(value: string) {
  await navigator.clipboard.writeText(value);
}

export default function OwnProfileModal({
  isOpen,
  user,
  onChangeName,
  onClose,
}: Readonly<OwnProfileModalProps>) {
  const [isEditing, setIsEditing] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy User ID");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  if (!isOpen) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await copyText(user.userId);
      setCopyLabel("Copied");
      window.setTimeout(() => setCopyLabel("Copy User ID"), 1400);
    } catch {
      setCopyLabel("Copy failed");
      window.setTimeout(() => setCopyLabel("Copy User ID"), 1400);
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="modal-card w-full max-w-md rounded-[30px] border border-white/15 bg-[#101010] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:bg-white/[0.06]"
            type="button"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <div className="mt-2 flex flex-col items-center text-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-black text-3xl font-semibold text-white">
            {getInitials(user.displayName)}
          </div>

          <div className="mt-5 w-full">
            {isEditing ? (
              <input
                ref={inputRef}
                className="w-full rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-center text-2xl font-semibold text-white outline-none focus:border-white/30"
                type="text"
                value={user.displayName}
                onChange={(event) => onChangeName(event.target.value)}
              />
            ) : (
              <h2 className="text-2xl font-semibold text-white">
                {user.displayName}
              </h2>
            )}

            <p className="mt-3 text-sm uppercase tracking-[0.26em] text-white/35">
              {user.userId}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
            type="button"
            onClick={() => setIsEditing((current) => !current)}
          >
            {isEditing ? "Done" : "Edit Name"}
          </button>

          <button
            className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
            type="button"
            onClick={handleCopy}
          >
            {copyLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
