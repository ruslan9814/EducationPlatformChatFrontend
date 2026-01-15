"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest } from "@/api/friendsApi";

export function useAcceptRequest() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: (friendshipId: string) => acceptFriendRequest(friendshipId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });
}
