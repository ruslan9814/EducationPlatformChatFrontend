"use client";

import { useFriendRequests } from "@/features/friends/hooks/useFriendRequests";
import { useAcceptRequest } from "@/features/friends/hooks/useAcceptRequest";
import { useDeclineRequest } from "@/features/friends/hooks/useDeclineRequest";
import { useBlockUser } from "@/features/friends/hooks/useBlockUser";

export function FriendRequestsList() {
  const { data: requests, isLoading, isError } = useFriendRequests();
  const acceptMutation = useAcceptRequest();
  const declineMutation = useDeclineRequest();
  const blockMutation = useBlockUser();

  if (isLoading) return <div className="text-xs text-slate-400">Loading requests...</div>;
  if (isError) return <div className="text-xs text-red-400">Failed to load requests.</div>;

  if (!requests || requests.length === 0) {
    return <div className="text-xs text-slate-500">No friend requests.</div>;
  }

  return (
    <div className="space-y-2">
      {requests.map((req) => (
        <div
          key={req.id}
          className="flex flex-col gap-1 px-2 py-1 rounded border border-slate-800 bg-slate-900/40"
        >
          <div className="flex justify-between items-start">
            <div className="text-xs text-slate-200">
              <div>From: {req.requesterId}</div>
              <div>To: {req.targetUserId}</div>
              {req.message && <div className="text-[10px] text-slate-400 mt-0.5">{req.message}</div>}
              <div className="text-[9px] text-slate-500 mt-0.5">
                {new Date(req.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => acceptMutation.mutate(req.id)}
                disabled={acceptMutation.isPending || declineMutation.isPending || blockMutation.isPending}
                className="px-1 py-0.5 rounded bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-[10px]"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => declineMutation.mutate(req.id)}
                disabled={acceptMutation.isPending || declineMutation.isPending || blockMutation.isPending}
                className="px-1 py-0.5 rounded bg-red-700 hover:bg-red-600 disabled:opacity-50 text-[10px]"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => blockMutation.mutate(req.requesterId)}
                disabled={acceptMutation.isPending || declineMutation.isPending || blockMutation.isPending}
                className="px-1 py-0.5 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-[10px]"
              >
                Block
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
