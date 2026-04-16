"use client"

import { useMemo, useState } from "react";
import ChatUserProfileModal from "./chatUserProfileModal";

type ChatTopBarProps = {
  displayName: string;
  userId: string;
}

export default function ChatTopBar({ displayName, userId }: ChatTopBarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const initial = useMemo(
    () => (displayName ? displayName[0].toUpperCase() : ""),
    [displayName]
  );

  return (
    <>
      <div>
        <div className="flex flex-row p-2 h-fit w-screen bg-gray-800">
          <div className="flex items-center justify-center text-white" >
          </div>
          <button
            type="button"
            onClick={() => setIsProfileOpen(true)}
            className="flex flex-row gap-2 items-center text-xl ml-2 cursor-pointer"
          >
            <div className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-white text-black">
              {initial}
            </div>
            <div className="text-white">{displayName}</div>
          </button>
        </div>
      </div>
      {isProfileOpen && (
        <ChatUserProfileModal
          displayName={displayName}
          userId={userId}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
    </>
  );
}
