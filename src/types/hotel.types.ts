export interface TCreateHotelData {
  address: string;
  id: string;
  name: string;
  primaryContact: string;
  createdAt: string;
  updatedAt: string;
}

export interface TCreateHotelResponse {
  data: {
    hotel: TCreateHotelData;
  };
  message: string;
}
