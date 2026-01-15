"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "@/api/chatsApi";
import { MessageDto } from "@/api/types";

export type SendMessageInput = {
  chatId: string;
  content: string;
  type: string;
  replyToId?: string;
  attachments?: FileList | null;
};

export function useSendMessage(chatId: string | null) {
  const queryClient = useQueryClient();

  return useMutation<MessageDto, unknown, SendMessageInput>({
    mutationFn: async (input) => {
      const formData = new FormData();
      formData.append("content", input.content);
      formData.append("type", input.type);
      if (input.replyToId) {
        formData.append("replyToId", input.replyToId);
      }
      if (input.attachments) {
        Array.from(input.attachments).forEach((file) => {
          formData.append("attachments", file);
        });
      }
      return sendMessage(input.chatId, formData);
    },
    onSuccess: () => {
      if (!chatId) return;
      queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
    },
  });
}
