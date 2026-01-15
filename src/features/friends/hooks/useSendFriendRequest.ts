"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "@/api/friendsApi";
import { SendFriendRequestDto } from "@/api/types";

export function useSendFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, SendFriendRequestDto>({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });
}
