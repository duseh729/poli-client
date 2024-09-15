
import create from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: string | null;
  email: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  deleted: boolean | null;
  deletedAt: string | null;
  setUser: (user: any) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      email: null,
      createdAt: null,
      updatedAt: null,
      deleted: null,
      deletedAt: null,
      setUser: (user) =>
        set({
          userId: user.userId,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          deleted: user.deleted,
          deletedAt: user.deletedAt,
        }),
      clearUser: () =>
        set({
          userId: null,
          email: null,
          createdAt: null,
          updatedAt: null,
          deleted: null,
          deletedAt: null,
        }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);
