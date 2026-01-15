"use client";

import { create } from "zustand";

type SelectedChatState = {
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
};

export const useSelectedChat = create<SelectedChatState>((set) => ({
  selectedChatId: null,
  setSelectedChatId: (id) => set({ selectedChatId: id }),
}));
