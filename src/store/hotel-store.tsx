import { create } from "zustand";

interface State {
  hotelId: string | undefined;
  hotelName: string | undefined;
  hotelAddress: string | undefined;
  activeHotelId: string | undefined;
}

interface Actions {
  setHotelId: (selectedHotelId: string) => void;
  setHotelName: (selectHotelName: string) => void;
  setHotelAddress: (selectHotelAddress: string) => void;
  setActiveHotelId: (selectActiveHotel: string) => void;
}

const hotelStoreInitialState: State = {
  hotelId: undefined,
  hotelName: undefined,
  hotelAddress: undefined,
  activeHotelId: undefined,
};

export const useHotelInfoStore = create<State & Actions>()((set) => ({
  ...hotelStoreInitialState,

  setHotelId: (hotelId: string) => {
    set({ hotelId });
  },

  setHotelName: (hotelName: string) => {
    set({ hotelName });
  },

  setHotelAddress: (hotelAddress: string) => {
    set({ hotelAddress });
  },

  setActiveHotelId: (activeHotelId: string) => {
    set({ activeHotelId });
  },
}));
