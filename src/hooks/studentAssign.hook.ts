import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstance } from "../lib/api";
import type { TPickupPointInputs } from "../schema/pickupPointValidationSchema";
import type { AxiosError } from "axios";

// get all assign student
export const useGetAllAssignStudent = () => {
  return useQuery({
    queryKey: ["assign_student"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(
          "/student-transport/student-assign",
        );
        return data;
      } catch (error: any) {
        throw new Error(error?.massage);
      }
    },
  });
};
// get all assign student transport fee
export const useGetTransportFee = () => {
  return useQuery({
    queryKey: ["transport_fee"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(
          "/student-transport//transport-fee",
        );
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
      const { data } = await axiosInstance.post(
        "/student-transport/student-assign",
        payload,
      );
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
