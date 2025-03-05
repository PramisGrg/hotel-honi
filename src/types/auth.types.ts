export interface TUserLogin {
  dialCode: string;
  phoneNumber: string;
  password: string;
}

//Login Response
interface TLoginResponseData {
  activeHotelId: string | null;
  avatar: string | null;
  createdAt: string;
  dialCode: string;
  id: string;
  isPhoneChangeVerified: boolean;
  isVerified: boolean;
  name: string;
  phoneNumber: string;
  token: string;
  updatedAt: string;
  username: string | null;
}
export interface TLoginResponse {
  message: string;
  data: TLoginResponseData;
}
