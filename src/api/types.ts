import { z } from "zod";

export const ChatDtoSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  description: z.string().nullable().optional(),
  isGroup: z.boolean().optional(),
  lastMessagePreview: z.string().nullable().optional(),
  lastMessageAt: z.string().datetime().nullable().optional(),
});

export type ChatDto = z.infer<typeof ChatDtoSchema>;

export const MessageAttachmentSchema = z.object({
  id: z.string().uuid().optional(),
  fileName: z.string(),
  url: z.string(),
  contentType: z.string().nullable().optional(),
});

export const MessageDtoSchema = z.object({
  id: z.string().uuid(),
  chatId: z.string().uuid(),
  senderId: z.string().uuid(),
  content: z.string().nullable(),
  type: z.string(),
  createdAt: z.string().datetime(),
  replyToId: z.string().uuid().nullable().optional(),
  attachments: z.array(MessageAttachmentSchema).optional().default([]),
});

export type MessageDto = z.infer<typeof MessageDtoSchema>;

export const FriendDtoSchema = z.object({
  id: z.string().uuid(),
  friendId: z.string().uuid(),
  displayName: z.string().nullable().optional(),
});

export type FriendDto = z.infer<typeof FriendDtoSchema>;

export const FriendRequestDtoSchema = z.object({
  id: z.string().uuid(),
  requesterId: z.string().uuid(),
  targetUserId: z.string().uuid(),
  message: z.string().nullable().optional(),
  status: z.string(),
  createdAt: z.string().datetime(),
});

export type FriendRequestDto = z.infer<typeof FriendRequestDtoSchema>;

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    items: z.array(item),
    page: z.number(),
    pageSize: z.number(),
    totalCount: z.number(),
  });

export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
};

export const CreatePrivateChatRequestSchema = z.object({
  targetUserId: z.string().uuid(),
});

export type CreatePrivateChatRequest = z.infer<
  typeof CreatePrivateChatRequestSchema
>;

export const CreateGroupChatRequestSchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  courseId: z.string().uuid().nullable().optional(),
  participantIds: z.array(z.string().uuid()),
});

export type CreateGroupChatRequest = z.infer<
  typeof CreateGroupChatRequestSchema
>;

export const SendFriendRequestDtoSchema = z.object({
  targetUserId: z.string().uuid(),
  message: z.string().nullable().optional(),
});

export type SendFriendRequestDto = z.infer<typeof SendFriendRequestDtoSchema>;
