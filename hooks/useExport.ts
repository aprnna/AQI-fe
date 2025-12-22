"use client";

import { useCallback } from "react";
import { exportToExcel } from "@/utils/exportUtils";
import { ExportData, DashboardData } from "@/types";

interface UseExportParams {
  data: DashboardData;
  selectedStates: string[];
  dateRange: {
    start: { month: number; day: number; year: number };
    end: { month: number; day: number; year: number };
  };
  lastUpdated: Date | null;
}

interface UseExportReturn {
  handleExportExcel: () => void;
  getExportData: () => ExportData;
}

export function useExport({
  data,
  selectedStates,
  dateRange,
  lastUpdated,
}: UseExportParams): UseExportReturn {

  const getExportData = useCallback((): ExportData => {
    return {
      // Summary metrics
      aqiValue: data.avgAQI?.Mean,
      pm25Value: data.avgPM25?.Mean,
      pm10Value: data.avgPM10?.Mean,
      gasesValue: data.sumGases?.Sum,

      // Filter settings
      selectedStates,
      dateRange: {
        start: `${dateRange.start.month}/${dateRange.start.day}/${dateRange.start.year}`,
        end: `${dateRange.end.month}/${dateRange.end.day}/${dateRange.end.year}`,
      },

      // Map data
      mapData: data.mapAQI,

      // Time series data
      timeAQIData: data.timeAQI,
      timeGasesData: data.timeGases,
      timePMData: data.timePM,

      // Pie chart / contribution data
      pieGasesData: data.pieGases,
      piePM25Data: data.piePM25,
      piePM10Data: data.piePM10,
      pieAQIData: data.pieAQI,

      // Recommendations
      recommendations: data.recommendations || undefined,

      // Timestamp
      timestamp: lastUpdated || new Date(),
    };
  }, [data, selectedStates, dateRange, lastUpdated]);

  const handleExportExcel = useCallback(() => {
    const exportData = getExportData();
    exportToExcel(exportData, "aqi-dashboard-data");
  }, [getExportData]);

  return {
    handleExportExcel,
    getExportData,
  };
}
