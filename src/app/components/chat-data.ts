export type ChatUser = {
  id: string;
  username: string;
  userId: string;
  status: string;
  about: string;
};

export type ChatMessage = {
  id: string;
  sender: "self" | "other";
  text: string;
  timestamp: string;
};

export type CurrentUserProfile = {
  displayName: string;
  userId: string;
};

export const initialCurrentUser: CurrentUserProfile = {
  displayName: "Sage Rivera",
  userId: "E2E-SAGE-001",
};

export const chatUsers: ChatUser[] = [
  {
    id: "nora-blake",
    username: "Nora Blake",
    userId: "E2E-NORA-204",
    status: "Available",
    about: "Sketching clean interfaces and simplifying every edge case.",
  },
  {
    id: "kian-moss",
    username: "Kian Moss",
    userId: "E2E-KIAN-118",
    status: "In a focus block",
    about: "Shipping small details that make the whole chat feel effortless.",
  },
  {
    id: "ivy-chen",
    username: "Ivy Chen",
    userId: "E2E-IVY-332",
    status: "At the studio",
    about: "Collecting references, polishing flows, and testing on mobile.",
  },
  {
    id: "leo-hart",
    username: "Leo Hart",
    userId: "E2E-LEO-563",
    status: "Online",
    about: "Always a message away when the build needs one more pass.",
  },
];

export const initialMessages: Record<string, ChatMessage[]> = {
  "nora-blake": [
    {
      id: "nora-1",
      sender: "other",
      text: "The wireframe direction feels right. Can we keep the profile panel minimal?",
      timestamp: "2026-04-16T08:45:00.000Z",
    },
    {
      id: "nora-2",
      sender: "self",
      text: "Yes. White outlines, dark background, and just enough motion.",
      timestamp: "2026-04-16T08:47:00.000Z",
    },
    {
      id: "nora-3",
      sender: "other",
      text: "Perfect. I also want the contact sheet to feel a bit like WhatsApp.",
      timestamp: "2026-04-16T08:49:00.000Z",
    },
  ],
  "kian-moss": [
    {
      id: "kian-1",
      sender: "other",
      text: "Search is working nicely with the dummy contacts.",
      timestamp: "2026-04-16T09:05:00.000Z",
    },
    {
      id: "kian-2",
      sender: "self",
      text: "Great. I am keeping the send action local so the demo stays offline-safe.",
      timestamp: "2026-04-16T09:06:00.000Z",
    },
  ],
  "ivy-chen": [
    {
      id: "ivy-1",
      sender: "other",
      text: "The rounded shells look sharp on mobile too.",
      timestamp: "2026-04-16T09:18:00.000Z",
    },
    {
      id: "ivy-2",
      sender: "self",
      text: "Nice. I tightened the spacing so the layout still breathes on smaller screens.",
      timestamp: "2026-04-16T09:20:00.000Z",
    },
  ],
  "leo-hart": [
    {
      id: "leo-1",
      sender: "other",
      text: "Can the header avatar open the profile too?",
      timestamp: "2026-04-16T09:32:00.000Z",
    },
    {
      id: "leo-2",
      sender: "self",
      text: "It does. Avatar and name both trigger the read-only user profile.",
      timestamp: "2026-04-16T09:34:00.000Z",
    },
  ],
};

export const getInitials = (value: string) => {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};
