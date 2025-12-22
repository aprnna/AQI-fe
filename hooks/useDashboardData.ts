"use client";

import { useState, useCallback } from "react";
import { DEFAULT_PREDICTION_YEARS } from "@/constants";
import {
  FilterData,
  TimeSeriesDataPoint,
  PieChartDataPoint,
  AQIMetric,
  GasesMetric,
  MapAQIItem,
  RecommendationsResponse,
  YoYComparisonResponse
} from "@/types";
import {
  useGetTimeGasesMutation,
  useGetTimeAQIMutation,
  useGetTimePMMutation,
  useGetSumGasesMutation,
  useGetAVGAQIMutation,
  useGetAVGPM25Mutation,
  useGetAVGPM10Mutation,
  useGetContributGasesMutation,
  useGetContributPM25Mutation,
  useGetContributPM10Mutation,
  useGetContributAQIMutation,
  useGetMapAQIMutation,
  useGetAQIRecommendationsMutation,
  useGetYoYComparisonMutation,
  useGetTimeSeriesRecommendationsMutation,
} from "@/services/dashboard/mutations";

export interface DashboardDataState {
  // Time series data
  timeGases: TimeSeriesDataPoint[];
  timeAQI: TimeSeriesDataPoint[];
  timePM: TimeSeriesDataPoint[];

  // Pie chart data
  pieGases: PieChartDataPoint[];
  piePM25: PieChartDataPoint[];
  piePM10: PieChartDataPoint[];
  pieAQI: PieChartDataPoint[];

  // Metric data
  sumGases: GasesMetric | null;
  avgAQI: AQIMetric | null;
  avgPM25: AQIMetric | null;
  avgPM10: AQIMetric | null;

  // Other data
  mapAQI: MapAQIItem[];
  recommendations: RecommendationsResponse | null;
  timeSeriesRecommendations: RecommendationsResponse | null;
  yoyComparison: YoYComparisonResponse | null;
}

export interface UseDashboardDataReturn {
  data: DashboardDataState;
  isLoading: {
    timeGases: boolean;
    timeAQI: boolean;
    timePM: boolean;
    pieGases: boolean;
    piePM25: boolean;
    piePM10: boolean;
    pieAQI: boolean;
    sumGases: boolean;
    avgAQI: boolean;
    avgPM25: boolean;
    avgPM10: boolean;
    mapAQI: boolean;
    recommendations: boolean;
    timeSeriesRecommendations: boolean;
    yoyComparison: boolean;
  };
  fetchAllData: (payload: FilterData, onComplete?: () => void) => void;
  fetchPrediction: (payload: FilterData) => void;
}

export function useDashboardData(): UseDashboardDataReturn {
  // Mutations
  const timeGasesMutation = useGetTimeGasesMutation();
  const timeAQIMutation = useGetTimeAQIMutation();
  const timePMMutation = useGetTimePMMutation();
  const pieGasesMutation = useGetContributGasesMutation();
  const piePM25Mutation = useGetContributPM25Mutation();
  const piePM10Mutation = useGetContributPM10Mutation();
  const pieAQIMutation = useGetContributAQIMutation();
  const sumGasesMutation = useGetSumGasesMutation();
  const avgAQIMutation = useGetAVGAQIMutation();
  const avgPM25Mutation = useGetAVGPM25Mutation();
  const avgPM10Mutation = useGetAVGPM10Mutation();
  const mapAQIMutation = useGetMapAQIMutation();
  const recommendationsMutation = useGetAQIRecommendationsMutation();
  const yoyComparisonMutation = useGetYoYComparisonMutation();
  const timeSeriesRecommendationsMutation = useGetTimeSeriesRecommendationsMutation();

  // Data states
  const [timeGases, setTimeGases] = useState<TimeSeriesDataPoint[]>([]);
  const [timeAQI, setTimeAQI] = useState<TimeSeriesDataPoint[]>([]);
  const [timePM, setTimePM] = useState<TimeSeriesDataPoint[]>([]);
  const [pieGases, setPieGases] = useState<PieChartDataPoint[]>([]);
  const [piePM25, setPiePM25] = useState<PieChartDataPoint[]>([]);
  const [piePM10, setPiePM10] = useState<PieChartDataPoint[]>([]);
  const [pieAQI, setPieAQI] = useState<PieChartDataPoint[]>([]);
  const [sumGases, setSumGases] = useState<GasesMetric | null>(null);
  const [avgAQI, setAvgAQI] = useState<AQIMetric | null>(null);
  const [avgPM25, setAvgPM25] = useState<AQIMetric | null>(null);
  const [avgPM10, setAvgPM10] = useState<AQIMetric | null>(null);
  const [mapAQI, setMapAQI] = useState<MapAQIItem[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationsResponse | null>(null);
  const [timeSeriesRecommendations, setTimeSeriesRecommendations] = useState<RecommendationsResponse | null>(null);
  const [yoyComparison, setYoYComparison] = useState<YoYComparisonResponse | null>(null);

  // Fetch all dashboard data
  const fetchAllData = useCallback(
    (payload: FilterData, onComplete?: () => void) => {
      // Time series
      timeGasesMutation.mutate(payload, {
        onSuccess: (data) => setTimeGases(data),
      });
      timePMMutation.mutate(payload, {
        onSuccess: (data) => setTimePM(data),
      });

      // Pie charts
      pieGasesMutation.mutate(payload, {
        onSuccess: (data) => setPieGases(data),
      });
      piePM25Mutation.mutate(payload, {
        onSuccess: (data) => setPiePM25(data),
      });
      piePM10Mutation.mutate(payload, {
        onSuccess: (data) => setPiePM10(data),
      });
      pieAQIMutation.mutate(payload, {
        onSuccess: (data) => setPieAQI(data),
      });

      // Metrics
      sumGasesMutation.mutate(payload, {
        onSuccess: (data) => setSumGases(data),
      });
      avgAQIMutation.mutate(payload, {
        onSuccess: (data) => setAvgAQI(data),
      });
      avgPM25Mutation.mutate(payload, {
        onSuccess: (data) => setAvgPM25(data),
      });
      avgPM10Mutation.mutate(payload, {
        onSuccess: (data) => setAvgPM10(data),
      });

      // Map
      mapAQIMutation.mutate(payload, {
        onSuccess: (data) => setMapAQI(data),
      });

      // YoY Comparison
      yoyComparisonMutation.mutate(
        { states: payload.states },
        {
          onSuccess: (data) => setYoYComparison(data),
        }
      );

      // Recommendations (with onComplete callback)
      recommendationsMutation.mutate(payload, {
        onSuccess: (data) => setRecommendations(data),
        onSettled: onComplete,
      });

      // Default prediction (1 year)
      const predictionPayload = { ...payload, predict_type: DEFAULT_PREDICTION_YEARS };
      timeAQIMutation.mutate(predictionPayload, {
        onSuccess: (data) => setTimeAQI(data),
      });
      timeSeriesRecommendationsMutation.mutate(predictionPayload, {
        onSuccess: (data) => setTimeSeriesRecommendations(data),
      });
    },
    []
  );

  // Fetch prediction data
  const fetchPrediction = useCallback((payload: FilterData) => {
    timeAQIMutation.mutate(payload, {
      onSuccess: (data) => setTimeAQI(data),
    });
    timeSeriesRecommendationsMutation.mutate(payload, {
      onSuccess: (data) => setTimeSeriesRecommendations(data),
    });
  }, []);

  return {
    data: {
      timeGases,
      timeAQI,
      timePM,
      pieGases,
      piePM25,
      piePM10,
      pieAQI,
      sumGases,
      avgAQI,
      avgPM25,
      avgPM10,
      mapAQI,
      recommendations,
      timeSeriesRecommendations,
      yoyComparison,
    },
    isLoading: {
      timeGases: timeGasesMutation.isPending,
      timeAQI: timeAQIMutation.isPending,
      timePM: timePMMutation.isPending,
      pieGases: pieGasesMutation.isPending,
      piePM25: piePM25Mutation.isPending,
      piePM10: piePM10Mutation.isPending,
      pieAQI: pieAQIMutation.isPending,
      sumGases: sumGasesMutation.isPending,
      avgAQI: avgAQIMutation.isPending,
      avgPM25: avgPM25Mutation.isPending,
      avgPM10: avgPM10Mutation.isPending,
      mapAQI: mapAQIMutation.isPending,
      recommendations: recommendationsMutation.isPending,
      timeSeriesRecommendations: timeSeriesRecommendationsMutation.isPending,
      yoyComparison: yoyComparisonMutation.isPending,
    },
    fetchAllData,
    fetchPrediction,
  };
}
