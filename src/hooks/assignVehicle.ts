import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstance } from "../lib/api";
import type { AxiosError } from "axios";
import type { TAssignInputs } from "../schema/assignFormValidationSchema";

// get all assign vehicle
export const useGetAllAssignVehicle = () => {
  return useQuery({
    queryKey: ["assign_vehicle"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/route-vehicle");
        return data;
      } catch (error: any) {
        throw new Error(error?.massage);
      }
    },
  });
};
// get all unassigned vehicle
export const useGetAllUnassignedVehicle = () => {
  return useQuery({
    queryKey: ["unassigned_vehicle"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(
          "/route-vehicle/unassigned-vehicle",
        );
        return data;
      } catch (error: any) {
        throw new Error(error?.massage);
      }
    },
  });
};
// unassigned route
export const useGetAllUnassignedRoute = () => {
  return useQuery({
    queryKey: ["unassigned_route"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(
          "/route-vehicle/unassigned-route",
        );
        return data;
      } catch (error: any) {
        throw new Error(error?.massage);
      }
    },
  });
};

// assign Vehicle
export const useCreateAssignVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: TAssignInputs) => {
      const { data } = await axiosInstance.post("/route-vehicle", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assign_vehicle", "unassigned_vehicle", "unassigned_route"],
      });
    },
    onError: (error: AxiosError<any>) => {
      // const message =
      //   error.response?.data?.message ||
      //   error.message ||
      //   "Something went wrong";
      toast.error("Route PickupPoint create failed");
      console.log(error);
    },
  });
};
