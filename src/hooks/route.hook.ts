import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstance } from "../lib/api";
import type { AxiosError } from "axios";
import type { TRouteInputs } from "../schema/routeValidationSchema";

// get all routes
export const useGetAllRoutes = () => {
  return useQuery({
    queryKey: ["route"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/route");
        return data;
      } catch (error: any) {
        throw new Error(error?.massage);
      }
    },
  });
};
export const useGetRoutesWithStops = () => {
  return useQuery({
    queryKey: ["route_stops"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/route/stop-watch");
        return data;
      } catch (error: any) {
        throw new Error(error?.massage);
      }
    },
  });
};

export const useGetAllRoutesByUnassignedTransferFee = () => {
  return useQuery({
    queryKey: ["unassign_transfer_fee_route"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/route/unassign-fee");
        return data;
      } catch (error: any) {
        throw new Error(error?.massage);
      }
    },
  });
};

// create create route
export const useCreateRoute = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: TRouteInputs) => {
      const { data } = await axiosInstance.post("/route", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["route"] });
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

// delete a route
export const useDeleteRoute = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/route/${id}`);
      return data;
    },

    onSuccess: () => {
      toast.success("Deleted successfully");
      // auto refetch after delete
      queryClient.invalidateQueries({
        queryKey: ["route"],
      });
    },
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to delete");
      console.error(error);
    },
  });
};
