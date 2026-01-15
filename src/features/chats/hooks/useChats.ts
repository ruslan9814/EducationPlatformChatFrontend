"use client";

import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/api/chatsApi";
import { ChatDto, PaginatedResponse } from "@/api/types";
import { DEFAULT_CHAT_PAGE_SIZE } from "@/lib/constants";

export function useChats(page: number = 1, pageSize: number = DEFAULT_CHAT_PAGE_SIZE) {
  return useQuery<PaginatedResponse<ChatDto>>({
    queryKey: ["chats", page, pageSize],
    queryFn: () => getChats(page, pageSize),
  });
}
