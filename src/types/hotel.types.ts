//Creating Hotel
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

//Get all hotels
interface THotel {
  address: string;
  id: string;
  name: string;
}
interface TRole {
  id: string;
  name: string;
}
interface TGetAllHotelResponseData {
  hotel: THotel;
  role: TRole;
}
export interface TGetAllHotelResponse {
  message: string;
  data: TGetAllHotelResponseData[];
}

//Switching hotel
export interface TSwitchHotelResponse {
  message: string;
  data: {
    token: string;
  };
}

//Active hotel
export interface TActiveHotelResponseData {
  id: string;
  name: string;
  address: string;
  primaryContact: string;
}
export interface TActivateHotelResponse {
  message: string;
  data: TActiveHotelResponseData;
}
