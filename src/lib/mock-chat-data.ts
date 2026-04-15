import { GetConversationsResponse } from "@/types/loadConversation.type";
import { ChatMessage } from "@/types/message.type";

export const mockAuthUser = {
  userId: "mock-user-001",
  uniqueUserId: "E2E-MOCK-001",
  displayName: "Avery Stone",
};

export const mockConversations: GetConversationsResponse = [
  {
    conversationId: "mock-conversation-nora",
    participant: {
      uniqueUserId: "E2E-NORA-204",
      displayName: "Nora Blake",
    },
  },
  {
    conversationId: "mock-conversation-kian",
    participant: {
      uniqueUserId: "E2E-KIAN-118",
      displayName: "Kian Moss",
    },
  },
];

export const mockMessagesByConversation: Record<string, ChatMessage[]> = {
  "mock-conversation-nora": [
    {
      id: "mock-message-1",
      conversationId: "mock-conversation-nora",
      senderId: "E2E-NORA-204",
      ciphertext: "Are you free to review the new wireframe tonight?",
      createdAt: "2026-04-15T15:30:00.000Z",
      status: "read",
    },
    {
      id: "mock-message-2",
      conversationId: "mock-conversation-nora",
      senderId: mockAuthUser.userId,
      ciphertext: "Yes, send it over. I can check it after dinner.",
      createdAt: "2026-04-15T15:32:00.000Z",
      status: "read",
    },
    {
      id: "mock-message-3",
      conversationId: "mock-conversation-nora",
      senderId: "E2E-NORA-204",
      ciphertext: "Perfect. I also added the profile modal flow you sketched.",
      createdAt: "2026-04-15T15:34:00.000Z",
      status: "delivered",
    },
  ],
  "mock-conversation-kian": [
    {
      id: "mock-message-4",
      conversationId: "mock-conversation-kian",
      senderId: "E2E-KIAN-118",
      ciphertext: "The chat page looks stable on desktop now.",
      createdAt: "2026-04-15T16:05:00.000Z",
      status: "read",
    },
    {
      id: "mock-message-5",
      conversationId: "mock-conversation-kian",
      senderId: mockAuthUser.userId,
      ciphertext: "Nice. I am polishing the profile section next.",
      createdAt: "2026-04-15T16:07:00.000Z",
      status: "read",
    },
  ],
};

const mockReplyPool = [
  "Looks good from my side.",
  "Nice, that works for testing.",
  "I can see the latest changes now.",
  "Let us keep this version for the demo.",
];

export const getMockMessages = (conversationId: string): ChatMessage[] =>
  mockMessagesByConversation[conversationId] ?? [];

export const createMockConversation = (userId: string) => ({
  conversationId: `mock-conversation-${userId.toLowerCase()}`,
  participant: {
    uniqueUserId: userId,
    displayName: userId
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
  },
});

export const createMockReply = (
  conversationId: string,
  senderId: string
): ChatMessage => ({
  id: `mock-reply-${Date.now()}`,
  conversationId,
  senderId,
  ciphertext:
    mockReplyPool[Math.floor(Math.random() * mockReplyPool.length)],
  createdAt: new Date().toISOString(),
  status: "sent",
});
