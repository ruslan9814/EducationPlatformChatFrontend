"use client";

import { useQuery } from "@tanstack/react-query";
import { getFriends } from "@/api/friendsApi";
import { FriendDto, PaginatedResponse } from "@/api/types";
import { DEFAULT_FRIENDS_PAGE_SIZE } from "@/lib/constants";

export function useFriends(page: number = 1, pageSize: number = DEFAULT_FRIENDS_PAGE_SIZE) {
  return useQuery<PaginatedResponse<FriendDto>>({
    queryKey: ["friends", page, pageSize],
    queryFn: () => getFriends(page, pageSize),
  });
}
