"use client";

import { FormEvent, useState } from "react";
import { MessageType } from "@/lib/constants";
import { useSendMessage } from "@/features/chats/hooks/useSendMessage";

interface Props {
  chatId: string;
}

export function MessageComposer({ chatId }: Props) {
  const [content, setContent] = useState("");
  const [type, setType] = useState<string>(MessageType.Text);
  const [replyToId, setReplyToId] = useState<string>("");
  const [attachments, setAttachments] = useState<FileList | null>(null);

  const sendMessageMutation = useSendMessage(chatId);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content && (!attachments || attachments.length === 0)) return;

    sendMessageMutation.mutate(
      {
        chatId,
        content,
        type,
        replyToId: replyToId || undefined,
        attachments,
      },
      {
        onSuccess: () => {
          setContent("");
          setReplyToId("");
          setAttachments(null);
          const input = document.getElementById("chat-attachments-input") as HTMLInputElement | null;
          if (input) input.value = "";
        },
      }
    );
  };

  return (
    <form onSubmit={onSubmit} className="border-t border-slate-800 pt-2 mt-2 space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
        className="w-full text-xs rounded border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100 resize-none h-16"
      />
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-1 py-0.5 rounded border border-slate-700 bg-slate-900"
        >
          {Object.values(MessageType).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          value={replyToId}
          onChange={(e) => setReplyToId(e.target.value)}
          placeholder="Reply to message ID (optional)"
          className="flex-1 min-w-[120px] px-2 py-0.5 rounded border border-slate-700 bg-slate-900 text-[11px]"
        />
        <input
          id="chat-attachments-input"
          type="file"
          multiple
          onChange={(e) => setAttachments(e.target.files)}
          className="text-[10px] text-slate-400"
        />
        <button
          type="submit"
          disabled={sendMessageMutation.isLoading}
          className="ml-auto px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-xs font-semibold"
        >
          {sendMessageMutation.isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
