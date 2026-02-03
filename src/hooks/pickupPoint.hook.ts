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
// get all pickup point base on route
export const useGetPickupPointBaseOnRoute = (routeId?: string) => {
  return useQuery({
    queryKey: ["pickup-points", routeId],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(
          `/route-pickup-point/route/${routeId}`,
        );
        return data;
      } catch (error: any) {
        throw new Error(error?.massage);
      }
    },
    enabled: !!routeId,
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
      toast.error("Pickup point create failed");
      console.log(error);
    },
  });
};
// delete a pickup point
export const useDeleteAPickupPoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/pickup-point/${id}`);
      return data;
    },

    onSuccess: () => {
      toast.success("Deleted successfully");
      // auto refetch after delete
      queryClient.invalidateQueries({
        queryKey: ["get_pickup_point"],
      });
    },
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to delete");
      console.error(error);
    },
  });
};

// get single route
export const useGetSinglePickupPoint = (
  id: string,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ["single_pickup_point", id],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(`/pickup-point/${id}`);
        return data;
      } catch (error: any) {
        console.log(error);
        throw new Error(error?.massage);
      }
    },
    enabled: options?.enabled,
  });
};

// update a route
export const useUpdatePickupPoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      id: string;
      data: Partial<TPickupPointInputs>;
    }) => {
      const { data } = await axiosInstance.put(
        `/pickup-point/${payload?.id}`,
        payload?.data,
      );
      return data;
    },

    onSuccess: () => {
      toast.success("Update successfully");
      // auto refetch after
      queryClient.invalidateQueries({
        queryKey: ["get_pickup_point"],
      });
    },
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to Update");
      console.error(error);
    },
  });
};
