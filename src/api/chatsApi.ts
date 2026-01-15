import { apiClient } from "@/api/apiClient";
import {
  ChatDto,
  ChatDtoSchema,
  CreateGroupChatRequest,
  CreateGroupChatRequestSchema,
  CreatePrivateChatRequest,
  CreatePrivateChatRequestSchema,
  MessageDto,
  MessageDtoSchema,
  PaginatedResponse,
  PaginatedResponseSchema,
} from "@/api/types";

export async function getChats(
  page: number,
  pageSize: number
): Promise<PaginatedResponse<ChatDto>> {
  const response = await apiClient.get("/api/chats", {
    params: { page, pageSize },
  });
  const schema = PaginatedResponseSchema(ChatDtoSchema);
  const parsed = schema.parse(response.data);
  return parsed;
}

export async function getMessages(
  chatId: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse<MessageDto>> {
  const response = await apiClient.get(`/api/chats/${chatId}/messages`, {
    params: { page, pageSize },
  });
  const schema = PaginatedResponseSchema(MessageDtoSchema);
  const parsed = schema.parse(response.data);
  return parsed;
}

export async function createPrivateChat(
  body: CreatePrivateChatRequest
): Promise<ChatDto> {
  const parsedBody = CreatePrivateChatRequestSchema.parse(body);
  const response = await apiClient.post("/api/chats/private", parsedBody);
  const parsed = ChatDtoSchema.parse(response.data);
  return parsed;
}

export async function createGroupChat(
  body: CreateGroupChatRequest
): Promise<ChatDto> {
  const parsedBody = CreateGroupChatRequestSchema.parse(body);
  const response = await apiClient.post("/api/chats/group", parsedBody);
  const parsed = ChatDtoSchema.parse(response.data);
  return parsed;
}

export async function sendMessage(
  chatId: string,
  formData: FormData
): Promise<MessageDto> {
  const response = await apiClient.post(`/api/chats/${chatId}/messages`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const parsed = MessageDtoSchema.parse(response.data);
  return parsed;
}
