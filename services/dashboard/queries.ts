"use client";
import { useQuery,useSuspenseQuery } from "@tanstack/react-query";
import fetchApi from "@/utils/fetchApi";

export const useGetStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const response = await fetchApi("/api/states", "GET");
      if (!response.data) throw new Error("Failed to fetch states");
      return response.data;
    }
  });
}