import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstance } from "../lib/api";
import type { TPickupPointInputs } from "../schema/pickupPointValidationSchema";
import type { AxiosError } from "axios";

// get all pickup point
export const useGetAllPickupPoint = () => {
  return useQuery({
    queryKey: ["get_pickup_point"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/pickup-point");
        return data;
      } catch (error: any) {
        throw new Error(error?.massage);
      }
    },
  });
};

// create create pickup point
export const useCreatePickupPoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: TPickupPointInputs) => {
      const { data } = await axiosInstance.post("/pickup-point", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_pickup_point"] });
    },
    onError: (error: AxiosError<any>) => {
      // const message =
      //   error.response?.data?.message ||
      //   error.message ||
      //   "Something went wrong";
      toast.error("Pickup point create faild");
      console.log(error);
    },
  });
};
