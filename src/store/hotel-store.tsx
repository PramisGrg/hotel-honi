import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface State {
  activeHotelId: string | undefined;
  activeHotelName: string | undefined;
  activeHotelAddress: string | undefined;
}

interface Actions {
  setActiveHotelId: (activeHotelId: string) => void;
  setActiveHotelName: (activeHotelName: string) => void;
  setActiveHotelAddress: (activeHotelAddress: string) => void;
}

const hotelInfoInitailState: State = {
  activeHotelId: undefined,
  activeHotelName: undefined,
  activeHotelAddress: undefined,
};

export const UseHotelInfoStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...hotelInfoInitailState,

      setActiveHotelId: (activeHotelId: string) => {
        set({ activeHotelId });
      },

      setActiveHotelName: (activeHotelName: string) => {
        set({ activeHotelName });
      },

      setActiveHotelAddress: (activeHotelAddress: string) => {
        set({ activeHotelAddress });
      },
    }),
    {
      name: "hotel-info-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
