import { create } from "zustand";
import { TTableResponseData } from "@/types/order.types";

interface TableRoomState {
  table: TTableResponseData | null;
  setTable: (user: TTableResponseData) => void;
}

export const useTableRoomStore = create<TableRoomState>((set) => ({
  table: null,
  setTable: (table) => set({ table }),
}));
