export interface TGetUserResponseData {
  avatar: null | string;
  createdAt: string;
  dialCode: string;
  id: string;
  isPhoneChangeVerified: boolean;
  isVerified: boolean;
  name: string;
  phoneNumber: string;
  updatedAt: string;
  username: null | string;
}

export interface TGetUserResponse {
  message: string;
  data: TGetUserResponseData;
}
