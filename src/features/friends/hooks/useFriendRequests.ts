"use client";

import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "@/api/friendsApi";
import { FriendRequestDto } from "@/api/types";

export function useFriendRequests() {
  return useQuery<FriendRequestDto[]>({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });
}
