"use client";

import { TokenInput } from "@/features/auth/components/TokenInput";
import { ChatsList } from "@/features/chats/components/ChatsList";
import { MessagesPanel } from "@/features/chats/components/MessagesPanel";
import { FriendsPanel } from "@/features/friends/components/FriendsPanel";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/70">
        <h1 className="text-lg font-semibold">Education Platform Chat</h1>
        <TokenInput />
      </header>
      {isAuthenticated ? (
        <main className="flex flex-1 overflow-hidden">
          <section className="w-1/4 border-r border-slate-800 overflow-y-auto p-3 bg-slate-950/40">
            <ChatsList />
          </section>
          <section className="flex-1 overflow-hidden p-3">
            <MessagesPanel />
          </section>
          <section className="w-1/4 border-l border-slate-800 overflow-y-auto p-3 bg-slate-950/40">
            <FriendsPanel />
          </section>
        </main>
      ) : (
        <main className="flex-1 flex items-center justify-center text-slate-300">
          <p>Paste your JWT token in the header to start using the chat.</p>
        </main>
      )}
    </div>
  );
}
