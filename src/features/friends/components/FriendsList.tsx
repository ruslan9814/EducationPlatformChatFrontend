"use client";

import { useState } from "react";
import { useFriends } from "@/features/friends/hooks/useFriends";
import { useRemoveFriend } from "@/features/friends/hooks/useRemoveFriend";
import { useBlockUser } from "@/features/friends/hooks/useBlockUser";
import { DEFAULT_FRIENDS_PAGE_SIZE } from "@/lib/constants";

export function FriendsList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useFriends(page, DEFAULT_FRIENDS_PAGE_SIZE);
  const removeMutation = useRemoveFriend();
  const blockMutation = useBlockUser();

  if (isLoading) return <div className="text-xs text-slate-400">Loading friends...</div>;
  if (isError || !data) return <div className="text-xs text-red-400">Failed to load friends.</div>;

  const { items, totalCount, pageSize } = data;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="flex flex-col h-full gap-2">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold">Friends</h3>
        <span className="text-[10px] text-slate-500">{totalCount} total</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1">
        {items.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between px-2 py-1 rounded border border-slate-800 bg-slate-900/40"
          >
            <span className="text-xs text-slate-200 truncate">
              {friend.displayName ?? friend.friendId}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => removeMutation.mutate(friend.friendId)}
                disabled={removeMutation.isPending || blockMutation.isPending}
                className="px-1 py-0.5 rounded bg-red-700 hover:bg-red-600 disabled:opacity-50 text-[10px]"
              >
                Remove
              </button>
              <button
                type="button"
                onClick={() => blockMutation.mutate(friend.friendId)}
                disabled={removeMutation.isPending || blockMutation.isPending}
                className="px-1 py-0.5 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-[10px]"
              >
                Block
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-xs text-slate-500">No friends.</div>
        )}
      </div>
      <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-1 py-0.5 rounded border border-slate-700 disabled:opacity-40"
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-1 py-0.5 rounded border border-slate-700 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
