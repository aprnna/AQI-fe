"use client";

import React from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/error-boundary";
import TimeSeriesRecommendationsView from "@/components/time-series-recommendations";
import TimeGases from "@/components/charts/time-gases";
import TimePM from "@/components/charts/time-pm";
import { TimeSeriesDataPoint, RecommendationsResponse } from "@/types";

const TimeAQI2 = dynamic(() => import("@/components/charts/time-aqi2"), {
  ssr: false,
});

interface TimeSeriesTabProps {
  timeAQI: TimeSeriesDataPoint[];
  timeGases: TimeSeriesDataPoint[];
  timePM: TimeSeriesDataPoint[];
  timeSeriesRecommendations: RecommendationsResponse | null;
  onPredictAQI: (years: number) => void;
  isLoading: {
    timeAQI: boolean;
    timeGases: boolean;
    timePM: boolean;
    timeSeriesRecommendations: boolean;
  };
}

export default function TimeSeriesTab({
  timeAQI,
  timeGases,
  timePM,
  timeSeriesRecommendations,
  onPredictAQI,
  isLoading,
}: TimeSeriesTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
      <TimeAQI2
        className="col-span-2"
        prediksiAQI={onPredictAQI}
        data={timeAQI}
        isLoading={isLoading.timeAQI}
      />

      {/* Time Series Recommendations - shown after prediction */}
      {(timeSeriesRecommendations || isLoading.timeSeriesRecommendations) && (
        <ErrorBoundary>
          <TimeSeriesRecommendationsView
            className="col-span-2"
            data={timeSeriesRecommendations}
            isLoading={isLoading.timeSeriesRecommendations}
          />
        </ErrorBoundary>
      )}

      <TimeGases data={timeGases} isLoading={isLoading.timeGases} />
      <TimePM data={timePM} isLoading={isLoading.timePM} />
    </div>
  );
}
