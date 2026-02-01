import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstance } from "../lib/api";
import type { AxiosError } from "axios";
import type { TFeeMasterInputs } from "../schema/feeMasterFormValidationSchema";

// get all transfer fee
export const useGetAllTransportFee = () => {
  return useQuery({
    queryKey: ["transport_fee"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/transport-fee");
        return data;
      } catch (error: any) {
        throw new Error(error?.massage);
      }
    },
  });
};

// create assign transport fee
export const useCreateTransportFee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: TFeeMasterInputs) => {
      const { data } = await axiosInstance.post("/transport-fee", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transport_fee"] });
    },
    onError: (error: AxiosError<any>) => {
      // const message =
      //   error.response?.data?.message ||
      //   error.message ||
      //   "Something went wrong";
      toast.error("Route create failed");
      console.log(error);
    },
  });
};
