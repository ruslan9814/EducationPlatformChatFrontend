"use client";

import { useState } from "react";
import { FriendsList } from "@/features/friends/components/FriendsList";
import { FriendRequestsList } from "@/features/friends/components/FriendRequestsList";
import { SendFriendRequestForm } from "@/features/friends/components/SendFriendRequestForm";

type Tab = "friends" | "requests" | "send";

export function FriendsPanel() {
  const [tab, setTab] = useState<Tab>("friends");

  return (
    <div className="flex flex-col h-full gap-2">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold">Friends</h2>
      </div>
      <div className="flex gap-1 border-b border-slate-800">
        {(["friends", "requests", "send"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-2 py-1 text-[10px] font-medium transition-colors ${
              tab === t
                ? "border-b-2 border-emerald-500 text-emerald-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        {tab === "friends" && <FriendsList />}
        {tab === "requests" && <FriendRequestsList />}
        {tab === "send" && <SendFriendRequestForm />}
      </div>
    </div>
  );
}
