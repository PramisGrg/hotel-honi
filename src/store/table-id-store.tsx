import { create } from "zustand";

interface State {
  selectMenuId: string | undefined;
  selectCategoryId: string | undefined;
}

interface Actions {
  setSelectMenuId: (selectMenuId: string) => void;
  setSelectCategoryId: (selectCategory: string) => void;
}

const tableIdInitialaState: State = {
  selectMenuId: undefined,
  selectCategoryId: undefined,
};

export const useTableIdStore = create<State & Actions>()((set) => ({
  ...tableIdInitialaState,

  setSelectMenuId: (selectMenuId: string) => {
    set({ selectMenuId });
  },

  setSelectCategoryId: (selectCategoryId: string) => {
    set({ selectCategoryId });
  },
}));
