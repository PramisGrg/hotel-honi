const mainEndpoint = import.meta.env.VITE_BASE_URL;

const endpoints = {
  mainEndpoint,
  auth: {
    login: mainEndpoint + "/auth/login",
    register: mainEndpoint + "/auth/register",
    resetPasswordSend: mainEndpoint + "/auth/reset-password/send",
    verifyOTP: mainEndpoint + "/auth/reset-password/verify",
    setPassword: mainEndpoint + "/auth/reset-password/set",
    verifyOTPResend: mainEndpoint + "/auth/reset-password/resend",
  },
  hotel: {
    createHotel: mainEndpoint + "/hotel/create",
    allHotel: mainEndpoint + "/hotel/all",
    switchHotel: mainEndpoint + "/hotel/switch",
    getActiveHotel: mainEndpoint + "/hotel",
  },
  user: {
    getUser: mainEndpoint + "/user",
    updateUser: mainEndpoint + "/user/update",
    changeUserPassword: mainEndpoint + "/user/change-password",
  },
};

export default endpoints;
