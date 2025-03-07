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
export interface TUserRegister {
  name: string;
  dialCode: string;
  phoneNumber: string;
  password: string;
}

//verify otp
export interface TVerifyOtp {
  dialCode: string | null;
  phoneNumber: string | null;
  otp: string;
}

//reset password
interface TResetPasswordData {
  id: string;
  token: string;
}
export interface TResetPasswordResponse {
  message: string;
  data: TResetPasswordData;
}

export interface TResetPassword {
  dialCode: string;
  phoneNumber: string;
}

//verify forgot otp
export interface TVerifyForgotOtp {
  id: string | null;
  otp: string;
}
export interface TVerifyForgotOtpResponse {
  data: {
    resetToken: string;
  };
  message: string;
}

//set password
export interface TSetPassword {
  token: string | null;
  password: string;
}
