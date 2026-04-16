"use client";

import { useMemo, useState } from "react";

type ChatUserProfileModalProps = {
  displayName: string;
  userId: string;
  onClose: () => void;
};

export default function ChatUserProfileModal({
  displayName,
  userId,
  onClose,
}: ChatUserProfileModalProps) {
  const [copyLabel, setCopyLabel] = useState("Copy User ID");

  const initial = useMemo(() => {
    return displayName.trim().charAt(0).toUpperCase() || "?";
  }, [displayName]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(userId);
      setCopyLabel("Copied");
      window.setTimeout(() => setCopyLabel("Copy User ID"), 1500);
    } catch {
      setCopyLabel("Failed");
      window.setTimeout(() => setCopyLabel("Copy User ID"), 1500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-gray-800 p-6 text-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-lg text-gray-300 cursor-pointer"
          aria-label="Close user profile"
        >
          X
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl text-black">
            {initial}
          </div>
          <h2 className="text-xl font-medium">{displayName}</h2>
          <p className="mt-2 text-sm text-gray-300">{userId}</p>

          <button
            type="button"
            onClick={handleCopy}
            className="mt-6 rounded-lg bg-green-700 px-4 py-2 text-white cursor-pointer hover:bg-green-800"
          >
            {copyLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
