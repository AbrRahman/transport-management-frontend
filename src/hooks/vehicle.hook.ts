import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/api";
import type { TVehicleInputs } from "../schema/vehicleFormValidationSchema";
import { AxiosError } from "axios";
import { toast } from "sonner";
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

// create vehicle
export const useCreateVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: TVehicleInputs) => {
      const { data } = await axiosInstance.post("/vehicle", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_vehicles"] });
    },
    onError: (error: AxiosError<any>) => {
      console.log(error);
    },
  });
};

// delete a vehicle
export const useDeleteAVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/vehicle/${id}`);
      return data;
    },

    onSuccess: () => {
      toast.success("Deleted successfully");
      // auto refetch after delete
      queryClient.invalidateQueries({
        queryKey: ["get_vehicles"],
      });
    },
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to delete");
      console.error(error);
    },
  });
};

// get single vehicle
export const useGetSingleVehicle = (
  id: string,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ["single_vehicle", id],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(`/vehicle/${id}`);
        return data;
      } catch (error: any) {
        console.log(error);
        throw new Error(error?.massage);
      }
    },
    enabled: options?.enabled,
  });
};

// update a vehicle
export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      id: string;
      data: Partial<TVehicleInputs>;
    }) => {
      const { data } = await axiosInstance.put(
        `/vehicle/${payload?.id}`,
        payload?.data,
      );
      return data;
    },

    onSuccess: () => {
      toast.success("Update successfully");
      // auto refetch after
      queryClient.invalidateQueries({
        queryKey: ["get_vehicles"],
      });
    },
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to Update");
      console.error(error);
    },
  });
};
