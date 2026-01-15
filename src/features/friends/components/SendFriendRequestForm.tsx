"use client";

import { FormEvent, useState } from "react";
import { useSendFriendRequest } from "@/features/friends/hooks/useSendFriendRequest";

export function SendFriendRequestForm() {
  const [targetUserId, setTargetUserId] = useState("");
  const [message, setMessage] = useState("");

  const sendMutation = useSendFriendRequest();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!targetUserId.trim()) return;

    sendMutation.mutate(
      { targetUserId, message: message || null },
      {
        onSuccess: () => {
          setTargetUserId("");
          setMessage("");
        },
      }
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2 text-xs">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] text-slate-400">Target User ID (GUID)</label>
        <input
          value={targetUserId}
          onChange={(e) => setTargetUserId(e.target.value)}
          placeholder="00000000-0000-0000-0000-000000000000"
          className="px-2 py-1 rounded border border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[10px] text-slate-400">Message (optional)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a message..."
          rows={2}
          className="px-2 py-1 rounded border border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={sendMutation.isPending}
        className="w-full px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-xs font-semibold"
      >
        {sendMutation.isPending ? "Sending..." : "Send Request"}
      </button>
    </form>
  );
}
