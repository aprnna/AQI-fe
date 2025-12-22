"use client";

import React from "react";
import ErrorBoundary from "@/components/error-boundary";
import EmptyState from "@/components/empty-state";
import ComparativeAnalysis from "@/components/comparative-analysis";
import AQIRecommendationsView from "@/components/recomendations";

// Charts
import SumGases from "@/components/charts/sum-gases";
import AvgAQI from "@/components/charts/avg-aqi";
import AvgPM2 from "@/components/charts/avg-pm2";
import AvgPM10 from "@/components/charts/avg-pm10";
import USAQIMapView from "@/components/charts/aqi-map";

// Types
import { 
  AQIMetric, 
  GasesMetric, 
  MapAQIItem, 
  RecommendationsResponse,
  ComparisonDataItem 
} from "@/types";

interface OverviewTabProps {
  // Metrics data
  sumGases: GasesMetric | null;
  avgAQI: AQIMetric | null;
  avgPM25: AQIMetric | null;
  avgPM10: AQIMetric | null;
  
  // Map data
  mapAQI: MapAQIItem[];
  
  // Recommendations
  recommendations: RecommendationsResponse | null;
  
  // Comparison data
  comparisonData: ComparisonDataItem[];
  
  // Loading states
  isLoading: {
    sumGases: boolean;
    avgAQI: boolean;
    avgPM25: boolean;
    avgPM10: boolean;
    mapAQI: boolean;
    recommendations: boolean;
    hero: boolean;
  };
}

export default function OverviewTab({
  sumGases,
  avgAQI,
  avgPM25,
  avgPM10,
  mapAQI,
  recommendations,
  comparisonData,
  isLoading,
}: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 gap-6 mt-4">
      {/* Metric Cards */}
      <ErrorBoundary>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SumGases
            data={sumGases?.Sum}
            isLoading={isLoading.sumGases}
          />
          <AvgAQI
            data={avgAQI?.Mean}
            isLoading={isLoading.avgAQI}
          />
          <AvgPM2
            data={avgPM25?.Mean}
            isLoading={isLoading.avgPM25}
          />
          <AvgPM10
            data={avgPM10?.Mean}
            isLoading={isLoading.avgPM10}
          />
        </div>
      </ErrorBoundary>

      {/* Comparative Analysis */}
      <ErrorBoundary>
        <ComparativeAnalysis
          data={comparisonData}
          isLoading={isLoading.hero}
          currentPeriodLabel="Current Period"
          previousPeriodLabel="Previous Period"
          description="Compare current metrics with previous period"
        />
      </ErrorBoundary>

      {/* Map */}
      <ErrorBoundary>
        {mapAQI && mapAQI.length > 0 ? (
          <USAQIMapView
            data={mapAQI}
            isLoading={isLoading.mapAQI}
          />
        ) : !isLoading.mapAQI ? (
          <EmptyState
            icon="mdi:map-marker-off"
            title="No map data"
            description="Apply filters to load AQI map data"
            variant="card"
          />
        ) : (
          <USAQIMapView
            data={mapAQI}
            isLoading={isLoading.mapAQI}
          />
        )}
      </ErrorBoundary>

      {/* Recommendations */}
      <ErrorBoundary>
        <AQIRecommendationsView
          data={recommendations}
          isLoading={isLoading.recommendations}
        />
      </ErrorBoundary>
    </div>
  );
}
