import { create } from "zustand";

interface State {
  selectMenuId: string | undefined;
  selectCategoryId: string | undefined;
  selectSpaceId: string | undefined;
  selectTableId: string | undefined;
  selectRoomId: string | undefined;
  selectCustomerId: string | undefined;
  selectSupplierId: string | undefined;
}

interface Actions {
  setSelectMenuId: (selectMenuId: string) => void;
  setSelectCategoryId: (selectCategory: string) => void;
  setSelectSpaceId: (selectSpaceId: string) => void;
  setSelectTableId: (selectTableId: string) => void;
  setSelectRoomId: (selectRoomId: string) => void;
  setSelectCustomerId: (selectCustomerId: string) => void;
  setSelectSupplierId: (selectSupplierId: string) => void;
}

const tableIdInitialaState: State = {
  selectMenuId: undefined,
  selectCategoryId: undefined,
  selectSpaceId: undefined,
  selectTableId: undefined,
  selectRoomId: undefined,
  selectCustomerId: undefined,
  selectSupplierId: undefined,
};

export const useTableIdStore = create<State & Actions>()((set) => ({
  ...tableIdInitialaState,

  setSelectMenuId: (selectMenuId: string) => {
    set({ selectMenuId });
  },

  setSelectCategoryId: (selectCategoryId: string) => {
    set({ selectCategoryId });
  },

  setSelectSpaceId: (selectSpaceId: string) => {
    set({ selectSpaceId });
  },

  setSelectTableId: (selectTableId: string) => {
    set({ selectTableId });
  },

  setSelectRoomId: (selectRoomId: string) => {
    set({ selectRoomId });
  },

  setSelectCustomerId: (selectCustomerId: string) => {
    set({ selectCustomerId });
  },

  setSelectSupplierId: (selectSupplierId: string) => {
    set({ selectSupplierId });
  },
}));
