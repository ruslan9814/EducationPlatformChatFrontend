"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFriend } from "@/api/friendsApi";

export function useRemoveFriend() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: (friendId: string) => removeFriend(friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
}
