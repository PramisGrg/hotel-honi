import { create } from "zustand";

interface State {
  name: string | undefined;
  username: string | undefined;
  phone: string | undefined;
}

interface Actions {
  setName: (name: string) => void;
  setUsername: (username: string) => void;
  setPhone: (phone: string) => void;
}

const userStoreInitialState: State = {
  name: undefined,
  username: undefined,
  phone: undefined,
};

export const useGetUserStore = create<State & Actions>()((set) => ({
  ...userStoreInitialState,

  setName: (name: string) => {
    set({ name });
  },

  setUsername: (username: string) => {
    set({ username });
  },

  setPhone: (phone: string) => {
    set({ phone });
  },
}));
