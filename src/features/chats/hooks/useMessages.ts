"use client";

import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/api/chatsApi";
import { MessageDto, PaginatedResponse } from "@/api/types";
import { DEFAULT_MESSAGES_PAGE_SIZE } from "@/lib/constants";

export function useMessages(
  chatId: string | null,
  page: number = 1,
  pageSize: number = DEFAULT_MESSAGES_PAGE_SIZE
) {
  return useQuery<PaginatedResponse<MessageDto>>({
    queryKey: ["messages", chatId, page, pageSize],
    queryFn: () => getMessages(chatId as string, page, pageSize),
    enabled: !!chatId,
  });
}
