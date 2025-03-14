import { TActiveHotelResponseData } from "@/types/hotel.types";
import { create } from "zustand";

interface ActiveHotelState {
  activeHotel: TActiveHotelResponseData | null;
  setActiveHotel: (user: TActiveHotelResponseData) => void;
}

export const useActiveHotelStore = create<ActiveHotelState>((set) => ({
  activeHotel: null,
  setActiveHotel: (activeHotel) => set({ activeHotel }),
}));
