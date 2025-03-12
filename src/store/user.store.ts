import { TGetUserResponseData } from "@/types/user.types";
import { create } from "zustand";

interface UserState {
  user: TGetUserResponseData | null;
  setUser: (user: TGetUserResponseData) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
