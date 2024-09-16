import { create } from "zustand";

interface State {
  debounceRoomValue: string;
  debounceTableValue: string;
  debounceSpaceValue: string;
  debounceDishValue: string;
  debounceCategoryValue: string;
  debounceCustomerValue: string;
  debounceSupplierValue: string;
}

interface Actions {
  setDebounceRoomValue: (debounceRoomValue: string) => void;
  setDebounceTableValue: (debounceTableValue: string) => void;
  setDebounceSpaceValue: (debounceSpaceValue: string) => void;
  setDebounceDishValue: (debounceDishValue: string) => void;
  setDebounceCustomerValue: (debounceCustomerValue: string) => void;
  setDebounceSupplierValue: (debounceSupplierValue: string) => void;
  setDebounceCategoryValue: (debounceCategoryValue: string) => void;
}

const debounceInitialState: State = {
  debounceRoomValue: "",
  debounceTableValue: "",
  debounceSpaceValue: "",
  debounceDishValue: "",
  debounceCategoryValue: "",
  debounceCustomerValue: "",
  debounceSupplierValue: "",
};

export const useDebounceValue = create<State & Actions>()((set) => ({
  ...debounceInitialState,

  setDebounceRoomValue: (debounceRoomValue: string) => {
    set({ debounceRoomValue });
  },

  setDebounceDishValue: (debounceDishValue: string) => {
    set({ debounceDishValue });
  },

  setDebounceSpaceValue: (debounceSpaceValue: string) => {
    set({ debounceSpaceValue });
  },

  setDebounceTableValue: (debounceTableValue: string) => {
    set({ debounceTableValue });
  },

  setDebounceCustomerValue: (debounceCustomerValue: string) => {
    set({ debounceCustomerValue });
  },

  setDebounceSupplierValue: (debounceSupplierValue: string) => {
    set({ debounceSupplierValue });
  },

  setDebounceCategoryValue: (debounceCategoryValue: string) => {
    set({ debounceCategoryValue });
  },
}));
