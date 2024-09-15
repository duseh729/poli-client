
import create from "zustand";
import { persist } from "zustand/middleware";
import { UserStore } from "@/types/user";



export const useUserStore = create<UserStore>()(
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
