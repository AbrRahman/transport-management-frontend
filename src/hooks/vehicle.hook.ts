import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/api";

export const useGetVehicles = () => {
  return useQuery({
    queryKey: ["get_vehicles"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/vehicle");
        return data;
      } catch (error: any) {
        throw new Error(error?.massage);
      }
    },
  });
};
