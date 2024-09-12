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
  dishes: {
    getDishes: mainEndpoint + "/menu/items/all",
    addDishes: mainEndpoint + "/menu/items/create",
    deleteDishes: mainEndpoint + "/menu/items/delete",
    editDishes: mainEndpoint + "/menu/items/update",
  },
  category: {
    getCategory: mainEndpoint + "/menu/category/all",
    addCategory: mainEndpoint + "/menu/category/create",
    deleteCategory: mainEndpoint + "/menu/category/delete",
    editCategory: mainEndpoint + "/menu/category/update",
  },
  spaces: {
    getSpaces: mainEndpoint + "/space/all",
    addSpace: mainEndpoint + "/space/create",
    deleteSpace: mainEndpoint + "/space/delete",
    editSpace: mainEndpoint + "/space/update",
  },
  tables: {
    getTables: mainEndpoint + "/table/all",
    addTable: mainEndpoint + "/table/create",
    deleteTable: mainEndpoint + "/table/delete",
    editTable: mainEndpoint + "/table/update",
  },
  rooms: {
    getRooms: mainEndpoint + "/room/all",
    addRoom: mainEndpoint + "/room/create",
    deleteRoom: mainEndpoint + "/room/delete",
    editRoom: mainEndpoint + "/room/update",
  },
};

export default endpoints;
