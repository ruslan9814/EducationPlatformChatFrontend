"use client";

import { useState } from "react";
import { useChats } from "@/features/chats/hooks/useChats";
import { useSelectedChat } from "@/features/chats/hooks/useSelectedChat";
import { DEFAULT_CHAT_PAGE_SIZE } from "@/lib/constants";

export function ChatsList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useChats(page, DEFAULT_CHAT_PAGE_SIZE);
  const { selectedChatId, setSelectedChatId } = useSelectedChat();

  if (isLoading) return <div className="text-xs text-slate-400">Loading chats...</div>;
  if (isError || !data) return <div className="text-xs text-red-400">Failed to load chats.</div>;

  const { items, totalCount, pageSize } = data;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="flex flex-col h-full gap-2">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold">Chats</h2>
        <span className="text-[10px] text-slate-500">{totalCount} total</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1">
        {items.map((chat) => {
          const isActive = chat.id === selectedChatId;
          return (
            <button
              key={chat.id}
              type="button"
              onClick={() => setSelectedChatId(chat.id)}
              className={`w-full text-left px-2 py-1 rounded text-xs border transition-colors ${
                isActive
                  ? "bg-emerald-700/40 border-emerald-500 text-slate-50"
                  : "bg-slate-900/40 border-slate-800 hover:bg-slate-800/60 text-slate-200"
              }`}
            >
              <div className="font-semibold truncate">{chat.name ?? "(no name)"}</div>
              {chat.lastMessagePreview && (
                <div className="text-[10px] text-slate-400 truncate">
                  {chat.lastMessagePreview}
                </div>
              )}
            </button>
          );
        })}
        {items.length === 0 && (
          <div className="text-xs text-slate-500">No chats.</div>
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
