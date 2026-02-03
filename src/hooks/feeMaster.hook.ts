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
      toast.error("Route create failed");
      console.log(error);
    },
  });
};

// delete a transfer fee
export const useDeleteRouteTransferFee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/transport-fee/${id}`);
      return data;
    },

    onSuccess: () => {
      toast.success("Deleted successfully");
      // auto refetch after delete
      queryClient.invalidateQueries({
        queryKey: ["transport_fee"],
      });
    },
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to delete");
      console.error(error);
    },
  });
};

// get single route transport fee
export const useGetSingleTransportFee = (id: string) => {
  return useQuery({
    queryKey: ["single_transport_fee", id],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(`/transport-fee/${id}`);
        return data;
      } catch (error: any) {
        console.log(error);
        throw new Error(error?.massage);
      }
    },
    enabled: !!id,
  });
};

// update a transfer fee
export const useUpdateRouteTransferFee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      id: string;
      data: { monthlyFee: number };
    }) => {
      const { data } = await axiosInstance.put(
        `/transport-fee/${payload?.id}`,
        payload?.data,
      );
      return data;
    },

    onSuccess: () => {
      toast.success("Update successfully");
      // auto refetch after delete
      queryClient.invalidateQueries({
        queryKey: ["transport_fee"],
      });
    },
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to Update");
      console.error(error);
    },
  });
};
