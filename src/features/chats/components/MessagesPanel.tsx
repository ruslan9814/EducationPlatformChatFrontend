"use client";

import { useState } from "react";
import { useSelectedChat } from "@/features/chats/hooks/useSelectedChat";
import { useMessages } from "@/features/chats/hooks/useMessages";
import { DEFAULT_MESSAGES_PAGE_SIZE } from "@/lib/constants";
import { MessageComposer } from "@/features/chats/components/MessageComposer";

export function MessagesPanel() {
  const { selectedChatId } = useSelectedChat();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useMessages(
    selectedChatId,
    page,
    DEFAULT_MESSAGES_PAGE_SIZE
  );

  if (!selectedChatId) {
    return <div className="h-full flex items-center justify-center text-sm text-slate-500">Select a chat to view messages.</div>;
  }

  if (isLoading) {
    return <div className="text-xs text-slate-400">Loading messages...</div>;
  }

  if (isError || !data) {
    return <div className="text-xs text-red-400">Failed to load messages.</div>;
  }

  const { items, totalCount, pageSize } = data;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-1 text-xs">
        {items.map((m) => (
          <div
            key={m.id}
            className="border border-slate-800 rounded px-2 py-1 bg-slate-900/40"
          >
            <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
              <span>From: {m.senderId}</span>
              <span>{new Date(m.createdAt).toLocaleString()}</span>
            </div>
            {m.content && <div className="text-slate-100 text-xs mb-0.5">{m.content}</div>}
            {m.attachments && m.attachments.length > 0 && (
              <div className="mt-0.5 space-y-0.5">
                {m.attachments.map((a) => (
                  <a
                    key={a.id ?? a.url}
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-[10px] text-emerald-400 hover:underline"
                  >
                    {a.fileName}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-xs text-slate-500">No messages.</div>
        )}
      </div>
      <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-1 py-0.5 rounded border border-slate-700 disabled:opacity-40"
        >
          Prev page
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
          Next page
        </button>
      </div>
      <MessageComposer chatId={selectedChatId} />
    </div>
  );
}
