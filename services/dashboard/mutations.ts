"use client";
import { useMutation } from "@tanstack/react-query";
import fetchApi from "@/utils/fetchApi";
import { FilterData } from "@/types";

export const useGetSumGasesMutation = () => {
  return useMutation({
    mutationFn: async (filter: FilterData) => {
      const response = await fetchApi("/api/sum_gases", "POST", filter);
      if (!response.data) throw new Error("Failed to fetch sum gases data");
      return response.data;
    }
  });
}

export const useGetAVGAQIMutation = () => {
  return useMutation({
    mutationFn: async (filter: FilterData) => {
      const response = await fetchApi("/api/avg_aqi", "POST", filter);
      if (!response.data) throw new Error("Failed to fetch average AQI data");
      return response.data;
    }
  });
} 

export const useGetAVGPM25Mutation = () => {
  return useMutation({
    mutationFn: async (filter: FilterData) => {
      const response = await fetchApi("/api/avg_pm25", "POST", filter);
      if (!response.data) throw new Error("Failed to fetch average PM2.5 data");
      return response.data;
    }
  });
}

export const useGetAVGPM10Mutation = () => {
  return useMutation({
    mutationFn: async (filter: FilterData) => {
      const response = await fetchApi("/api/avg_pm10", "POST", filter);
      if (!response.data) throw new Error("Failed to fetch average PM10 data");
      return response.data;
    }
  });
}

export const useGetMapAQIMutation = () => {
  return useMutation({
    mutationFn: async (filter: FilterData) => { 
      const response = await fetchApi("/api/map_aqi", "POST", filter);
      if (!response.data) throw new Error("Failed to fetch map AQI data");
      return response.data;
    }
  });
}

export const useGetContributGasesMutation = () => {
  return useMutation({
    mutationFn: async (filter: FilterData) => {
      const response = await fetchApi("/api/prec_gases", "POST", filter);
      if (!response.data) throw new Error("Failed to fetch predicted gases data");
      return response.data;
    }
  });
}

export const useGetContributAQIMutation = () => {
  return useMutation({  
    mutationFn: async (filter: FilterData) => {
      const response = await fetchApi("/api/prec_aqi", "POST", filter);
      if (!response.data) throw new Error("Failed to fetch predicted AQI data");
      return response.data;
    }
  });
}

export const useGetContributPM25Mutation = () => {
  return useMutation({
    mutationFn: async (filter: FilterData) => {
      const response = await fetchApi("/api/prec_p25", "POST", filter);
      if (!response.data) throw new Error("Failed to fetch predicted PM2.5 data");
      return response.data;
    }
  });
}

export const useGetContributPM10Mutation = () => {
  return useMutation({
    mutationFn: async (filter: FilterData) => {
      const response = await fetchApi("/api/prec_p10", "POST", filter);
      if (!response.data) throw new Error("Failed to fetch predicted PM10 data");
      return response.data;
    }
  });
}

export const useGetTimeGasesMutation = () => {
  return useMutation({
    mutationFn: async (filter: FilterData) => {
      const response = await fetchApi("/api/time_gases", "POST", filter);
      if (!response.data) throw new Error("Failed to fetch time series gases data");
      return response.data;
    }
  });
} 

export const useGetTimePMMutation = () => {
  return useMutation({
    mutationFn: async (filter: FilterData) => {
      const response = await fetchApi("/api/time_pm", "POST", filter);
      if (!response.data) throw new Error("Failed to fetch time series PM data");
      return response.data;
    }
  });
}

export const useGetTimeAQIMutation = () => {
  return useMutation({
    mutationFn: async (filter: FilterData) => {
      const response = await fetchApi("/api/time_aqi", "POST", filter);
      if (!response.data) throw new Error("Failed to fetch time series AQI data");
      return response.data;
    }
  });
}

export const useGetAQIRecommendationsMutation = () => {
  return useMutation({
    mutationFn: async (filter: FilterData) => {
      const response = await fetchApi("/api/recommendations", "POST", filter);
      if (!response.data) throw new Error("Failed to fetch AQI recommendations data");
      return response.data;
    }
  });
}