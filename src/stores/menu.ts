import { create } from "zustand";

type MenuState = {
  menuPosition: { top: number; left: number } | null;
  setMenuPosition: (position: { top: number; left: number } | null) => void;
};

export const useMenuStore = create<MenuState>((set) => ({
  menuPosition: null,
  setMenuPosition: (position) => set({ menuPosition: position }),
}));
