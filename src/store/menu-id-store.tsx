import { create } from "zustand";

interface State {
  selectMenuId: string | undefined;
}

interface Actions {
  setSelectMenuId: (selectMenuId: string) => void;
}

const menuIdInitialaState: State = {
  selectMenuId: undefined,
};

export const useMenuIdStore = create<State & Actions>()((set) => ({
  ...menuIdInitialaState,

  setSelectMenuId: (selectMenuId: string) => {
    set({ selectMenuId });
  },
}));
