import { create } from "zustand";

interface State {
  hotelId: string | undefined;
  hotelName: string | undefined;
  hotelAddress: string | undefined;
  activeHotelId: string | undefined;
  activeHotelName: string | undefined;
  activeHotelAddress: string | undefined;
}

interface Actions {
  setHotelId: (hotelId: string) => void;
  setHotelName: (hotelName: string) => void;
  setHotelAddress: (hotelAddress: string) => void;
  setActiveHotelId: (activeHotelId: string) => void;
  setActiveHotelName: (activeHotelName: string) => void;
  setActiveHotelAddress: (activeHotelAddress: string) => void;
}

const hotelStoreInitialState: State = {
  hotelId: undefined,
  hotelName: undefined,
  hotelAddress: undefined,
  activeHotelId: undefined,
  activeHotelName: undefined,
  activeHotelAddress: undefined,
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

  setActiveHotelName: (activeHotelName: string) => {
    set({ activeHotelName });
  },

  setActiveHotelAddress: (activeHotelAddress: string) => {
    set({ activeHotelAddress });
  },
}));
