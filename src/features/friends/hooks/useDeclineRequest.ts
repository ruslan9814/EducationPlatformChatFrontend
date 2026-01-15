"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { declineFriendRequest } from "@/api/friendsApi";

export function useDeclineRequest() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: (friendshipId: string) => declineFriendRequest(friendshipId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });
}
