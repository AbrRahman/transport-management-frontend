import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstance } from "../lib/api";
import type { AxiosError } from "axios";
import type { TRoutePickupPointInputs } from "../schema/routePickupPointFormValidationSchema";

// get all transfer fee
export const useGetAllRoutePickupPoint = () => {
  return useQuery({
    queryKey: ["route_pickup_point"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/route-pickup-point");
        return data;
      } catch (error: any) {
        throw new Error(error?.massage);
      }
    },
  });
};

// create route pickup point
export const useCreateRoutePickupPoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: TRoutePickupPointInputs) => {
      const { data } = await axiosInstance.post("/route-pickup-point", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["route_pickup_point"] });
    },
    onError: (error: AxiosError<any>) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    },
  });
};

// delete a route pickup point
export const useDeleteRoutePickupPoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/route-pickup-point/${id}`);
      return data;
    },

    onSuccess: () => {
      toast.success("Deleted successfully");
      // auto refetch after delete
      queryClient.invalidateQueries({
        queryKey: ["route_pickup_point"],
      });
    },
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to delete");
      console.error(error);
    },
  });
};
