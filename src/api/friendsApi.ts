import { apiClient } from "@/api/apiClient";
import {
  FriendDto,
  FriendDtoSchema,
  FriendRequestDto,
  FriendRequestDtoSchema,
  PaginatedResponse,
  PaginatedResponseSchema,
  SendFriendRequestDto,
  SendFriendRequestDtoSchema,
} from "@/api/types";

export async function getFriends(
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FriendDto>> {
  const response = await apiClient.get("/api/friends", {
    params: { page, pageSize },
  });
  const schema = PaginatedResponseSchema(FriendDtoSchema);
  return schema.parse(response.data);
}

export async function getFriendRequests(): Promise<FriendRequestDto[]> {
  const response = await apiClient.get("/api/friends/requests");
  const schema = FriendRequestDtoSchema.array();
  return schema.parse(response.data);
}

export async function sendFriendRequest(
  body: SendFriendRequestDto
): Promise<void> {
  const parsedBody = SendFriendRequestDtoSchema.parse(body);
  await apiClient.post("/api/friends/requests", parsedBody);
}

export async function acceptFriendRequest(friendshipId: string): Promise<void> {
  await apiClient.post(`/api/friends/requests/${friendshipId}/accept`);
}

export async function declineFriendRequest(friendshipId: string): Promise<void> {
  await apiClient.post(`/api/friends/requests/${friendshipId}/decline`);
}

export async function removeFriend(friendId: string): Promise<void> {
  await apiClient.delete(`/api/friends/${friendId}`);
}

export async function blockUser(targetUserId: string): Promise<void> {
  await apiClient.post(`/api/friends/${targetUserId}/block`);
}
