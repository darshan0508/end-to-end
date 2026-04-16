"use client";

import { getInitials, type ChatUser, type CurrentUserProfile } from "./chat-data";

type SidebarProps = {
  currentUser: CurrentUserProfile;
  users: ChatUser[];
  selectedUserId: string | null;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectUser: (userId: string) => void;
  onStartChat: () => void;
  onOpenOwnProfile: () => void;
};

export default function Sidebar({
  currentUser,
  users,
  selectedUserId,
  searchQuery,
  onSearchChange,
  onSelectUser,
  onStartChat,
  onOpenOwnProfile,
}: Readonly<SidebarProps>) {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-white/10 bg-[#0d0d0d] lg:w-[320px] lg:border-b-0 lg:border-r">
      <div className="space-y-5 p-4 md:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03]">
            <span className="flex flex-col gap-1">
              <span className="h-px w-4 bg-white" />
              <span className="h-px w-4 bg-white" />
              <span className="h-px w-4 bg-white" />
            </span>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-white/45">
              Secure Chat
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              End2End
            </h1>
          </div>
        </div>

        <label className="block">
          <span className="sr-only">Search users</span>
          <input
            className="w-full rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/[0.02]"
            placeholder="Search users"
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <button
          className="w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition hover:scale-[1.01] hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={users.length === 0}
          type="button"
          onClick={onStartChat}
        >
          Start Chat
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 pb-4 md:px-6">
        {users.map((user) => {
          const isActive = user.id === selectedUserId;

          return (
            <button
              key={user.id}
              className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                isActive
                  ? "border-white/30 bg-white/[0.06]"
                  : "border-white/10 bg-transparent hover:bg-white/[0.04]"
              }`}
              type="button"
              onClick={() => onSelectUser(user.id)}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black text-sm font-semibold text-white">
                {getInitials(user.username)}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {user.username}
                </p>
                <p className="truncate text-xs text-white/45">{user.userId}</p>
              </div>
            </button>
          );
        })}

        {users.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/45">
            No users match your search.
          </div>
        )}
      </div>

      <div className="border-t border-white/10 p-4 md:p-6">
        <button
          className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition hover:bg-white/[0.06]"
          type="button"
          onClick={onOpenOwnProfile}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black text-sm font-semibold text-white">
            {getInitials(currentUser.displayName)}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {currentUser.displayName}
            </p>
            <p className="truncate text-xs text-white/45">{currentUser.userId}</p>
          </div>
        </button>
      </div>
    </aside>
  );
}
