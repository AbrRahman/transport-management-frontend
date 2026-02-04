import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstance } from "../lib/api";
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
          "/student-transport/transport-fee",
        );
        return data;
      } catch (error: any) {
        throw new Error(error?.massage);
      }
    },
  });
};

// get all student data
export const useGetAllStudent = () => {
  return useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/student");
        return data;
      } catch (error: any) {
        throw new Error(error?.massage);
      }
    },
  });
};

// create assign student
export const useCreateStudentAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      studentId: string;
      routeId: string;
      pickupPointId: string;
      month: number;
    }) => {
      const { data } = await axiosInstance.post(
        "/student-transport/student-assign",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assign_student"] });
      queryClient.invalidateQueries({ queryKey: ["transport_fee"] });
      queryClient.invalidateQueries({ queryKey: ["student"] });
    },

    onError: (error: AxiosError<any>) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "student assignment create failed";
      toast.error(message);
    },
  });
};

// delete assign student
export const useDeleteAssignStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(
        `/student-transport/student-assign/${id}`,
      );
      return data;
    },

    onSuccess: () => {
      toast.success("Deleted successfully");
      // auto refetch after delete
      queryClient.invalidateQueries({
        queryKey: ["assign_student"],
      });
    },
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to delete");
      console.error(error);
    },
  });
};
// toggle update assign student
export const useUpdateAssignStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.put(
        `/student-transport/student-assign/${id}`,
      );
      return data;
    },

    onSuccess: () => {
      toast.success("update successfully");
      // auto refetch after delete
      queryClient.invalidateQueries({
        queryKey: ["assign_student"],
      });
    },
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to update");
      console.error(error);
    },
  });
};
