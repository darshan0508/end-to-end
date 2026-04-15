"use client";

import { useEffect, useMemo, useState } from "react";

type UserProfileProps = {
  displayName: string;
  userId: string;
  onDisplayNameSave?: (nextDisplayName: string) => void | Promise<void>;
  variant?: "trigger" | "panel";
};

export default function UserProfile({
  displayName,
  userId,
  onDisplayNameSave,
  variant = "trigger",
}: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draftDisplayName, setDraftDisplayName] = useState(displayName);
  const [isSaving, setIsSaving] = useState(false);
  const [copyLabel, setCopyLabel] = useState("copy");

  useEffect(() => {
    setDraftDisplayName(displayName);
  }, [displayName]);

  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
      setCopyLabel("copy");
    }
  }, [isOpen]);

  const initial = useMemo(() => {
    return displayName.trim().charAt(0).toUpperCase() || "?";
  }, [displayName]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(userId);
      setCopyLabel("copied");
      window.setTimeout(() => setCopyLabel("copy"), 1500);
    } catch {
      setCopyLabel("failed");
      window.setTimeout(() => setCopyLabel("copy"), 1500);
    }
  };

  const handleSave = async () => {
    const trimmedName = draftDisplayName.trim();
    if (!trimmedName || trimmedName === displayName) {
      setIsEditing(false);
      setDraftDisplayName(displayName);
      return;
    }

    try {
      setIsSaving(true);
      await onDisplayNameSave?.(trimmedName);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const profilePanel = (
    <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#111214] text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
      {variant === "trigger" && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-2xl text-gray-200 transition hover:bg-white/10"
          aria-label="Close profile"
        >
          ×
        </button>
      )}

      <div className="grid min-h-[24rem] md:grid-cols-[7.5rem_1fr]">
        <div className="border-b border-white/10 px-6 py-6 md:border-b-0 md:border-r">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-gray-400">
            profile
          </p>
        </div>

        <div className="flex flex-col items-center px-6 pb-8 pt-10">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/30 bg-gray-900 text-3xl font-semibold shadow-[0_0_0_8px_rgba(255,255,255,0.03)]">
            {initial}
          </div>

          <div className="mt-8 w-full max-w-md rounded-[1.75rem] border border-white/15 bg-white/[0.03] px-5 py-6 shadow-inner shadow-black/25">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                  Display Name
                </p>
                {isEditing ? (
                  <input
                    autoFocus
                    value={draftDisplayName}
                    onChange={(event) => setDraftDisplayName(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-green-500"
                  />
                ) : (
                  <p className="mt-2 truncate text-lg font-semibold text-gray-100">
                    {displayName}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                disabled={isSaving}
                className="shrink-0 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-gray-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "saving" : isEditing ? "save" : "edit"}
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                  User ID
                </p>
                <p className="mt-2 truncate font-mono text-sm text-gray-100">
                  {userId}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-gray-100 transition hover:bg-white/10"
              >
                {copyLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === "panel") {
    return profilePanel;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-gray-700/70 px-3 py-3 text-left text-white transition hover:border-white/30 hover:bg-gray-700"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-gray-900 text-base font-semibold">
          {initial}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{displayName}</p>
          <p className="truncate text-xs text-gray-300">{userId}</p>
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm md:items-center"
          onClick={() => setIsOpen(false)}
        >
          <div onClick={(event) => event.stopPropagation()}>{profilePanel}</div>
        </div>
      )}
    </>
  );
}
