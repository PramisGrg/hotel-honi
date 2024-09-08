// import { useQuery } from "@tanstack/react-query";
// import { axiosAuthInstance } from "@/services/axios";
// import endpoints from "@/lib/api.contant";
// import Cookies from "js-cookie";

// interface TFetchSingleHotel {
//   data: {
//     id: string;
//     name: string;
//     token: string;
//   };
// }
// export const fetchSwitchHotel = async (hotelId: string) => {
//   const response = await axiosAuthInstance.patch<TFetchSingleHotel>(
//     endpoints.hotel.switchHotel,
//     {
//       hotelId: hotelId,
//     }
//   );
//   Cookies.set("token", response.data.data.token);
//   console.log({ response: response.data.data.token }, "😀😀😀😀");
//   return response.data;
// };

// export const useSwitchHotelQuery = (hotelId: string | undefined) => {
//   return useQuery({
//     queryKey: ["singleHotel", hotelId],
//     queryFn: async () =>
//       hotelId ? fetchSwitchHotel(hotelId) : Promise.resolve(null),
//     enabled: !!hotelId,
//   });
// };

import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const useSwitchHotel = () => {
  return useMutation({
    mutationFn: async (hotelId: string) => {
      const response = await axiosAuthInstance.patch(
        endpoints.hotel.switchHotel,
        { hotelId }
      );
      console.log(response, "😀😀😀😀");
      return response?.data;
    },

    onSuccess: (data) => {
      console.log(data, "Switching data");
      console.log("token", data.data.token);
      Cookies.set("token", data.data.token);
      toast.success("Hotel Switched");
    },

    onError: (error) => {
      console.log("Error", error);
      toast.error("Hotel don't switched ");
    },
  });
};
