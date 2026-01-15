"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockUser } from "@/api/friendsApi";

export function useBlockUser() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: (targetUserId: string) => blockUser(targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });
}
