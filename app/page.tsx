"use client";

import { useEffect, useCallback } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { parseDate } from "@internationalized/date";

// Custom hooks
import { useDashboardFilters, useDashboardData, useExport } from "@/hooks";

// Dashboard components
import {
  DashboardHeader,
  OverviewTab,
  ContributorsTab,
  TimeSeriesTab,
} from "@/components/dashboard";

// Common components
import HeroKPI from "@/components/hero-kpi";
import AlertBanner from "@/components/alert-banner";
import ErrorBoundary from "@/components/error-boundary";

// Services
import { useGetStates, useGetDateRange } from "@/services/dashboard/queries";

// Types
import { AlertItem, ComparisonDataItem } from "@/types";

export default function Home() {
  // API queries
  const { data: states, isLoading: statesLoading } = useGetStates();
  const { data: dateRangeData, isLoading: isDateRangeLoading } = useGetDateRange();

  // Custom hooks
  const filters = useDashboardFilters();
  const dashboardData = useDashboardData();

  // Export hook
  const { handleExportExcel } = useExport({
    data: dashboardData.data,
    selectedStates: filters.getStatesArray(),
    dateRange: {
      start: {
        month: filters.dateRange.start.month,
        day: filters.dateRange.start.day,
        year: filters.dateRange.start.year,
      },
      end: {
        month: filters.dateRange.end.month,
        day: filters.dateRange.end.day,
        year: filters.dateRange.end.year,
      },
    },
    lastUpdated: filters.lastUpdated,
  });

  // Filter dashboard handler
  const handleApplyFilters = useCallback(() => {
    filters.setIsFilterLoading(true);
    filters.setLastUpdated(new Date());

    const payload = filters.getFilterPayload();

    dashboardData.fetchAllData(payload, () => {
      filters.setIsFilterLoading(false);
    });
  }, [filters, dashboardData]);

  // Prediction handler
  const handlePredictAQI = useCallback(
    (years: number) => {
      const payload = filters.getFilterPayload(years);
      dashboardData.fetchPrediction(payload);
    },
    [filters, dashboardData]
  );

  // Generate alerts from map data
  const generateAlerts = useCallback((): AlertItem[] => {
    if (!dashboardData.data.mapAQI || !Array.isArray(dashboardData.data.mapAQI)) {
      return [];
    }

    return dashboardData.data.mapAQI.map((item) => ({
      name: item["State Name"],
      aqiValue: item["Mean AQI Value"],
      category: item["AQI Category"],
    }));
  }, [dashboardData.data.mapAQI]);

  // Generate comparison data from YoY API response
  const generateComparisonData = useCallback((): ComparisonDataItem[] => {
    const yoy = dashboardData.data.yoyComparison;
    if (!yoy?.current || !yoy?.previous) {
      return [];
    }

    const { current, previous } = yoy;

    return [
      {
        label: `AQI (${current.Year} vs ${previous.Year})`,
        currentValue: current.AQI || 0,
        previousValue: previous.AQI || 0,
        unit: "",
      },
      {
        label: `PM2.5 (${current.Year} vs ${previous.Year})`,
        currentValue: current.PM25 || 0,
        previousValue: previous.PM25 || 0,
        unit: "μg/m³",
      },
      {
        label: `PM10 (${current.Year} vs ${previous.Year})`,
        currentValue: current.PM10 || 0,
        previousValue: previous.PM10 || 0,
        unit: "μg/m³",
      },
      {
        label: `Gases (${current.Year} vs ${previous.Year})`,
        currentValue: current.Gases || 0,
        previousValue: previous.Gases || 0,
        unit: "ppb",
      },
    ];
  }, [dashboardData.data.yoyComparison]);

  // Set default date range from API
  useEffect(() => {
    if (dateRangeData && !filters.dateRangeInitialized) {
      const { min_date, max_date } = dateRangeData;

      if (min_date && max_date) {
        const startDate = parseDate(
          `${min_date.year}-${String(min_date.month).padStart(2, "0")}-01`
        );
        const lastDayOfMonth = new Date(max_date.year, max_date.month, 0).getDate();
        const endDate = parseDate(
          `${max_date.year}-${String(max_date.month).padStart(2, "0")}-${String(lastDayOfMonth).padStart(2, "0")}`
        );

        filters.setDateRange({ start: startDate, end: endDate });
        filters.setDateRangeInitialized(true);
      }
    }
  }, [dateRangeData, filters.dateRangeInitialized]);

  // Initial data fetch
  useEffect(() => {
    if (filters.dateRangeInitialized || !isDateRangeLoading) {
      handleApplyFilters();
    }
  }, [filters.dateRangeInitialized]);

  // Computed loading states
  const isHeroLoading =
    dashboardData.isLoading.avgAQI ||
    dashboardData.isLoading.avgPM25 ||
    dashboardData.isLoading.avgPM10 ||
    dashboardData.isLoading.sumGases;

  return (
    <section id="dashboard-content" className="gap-6 pb-8">
      {/* Header with Filters */}
      <DashboardHeader
        states={states || []}
        statesLoading={statesLoading}
        selectedStates={filters.selectedStates}
        dateRange={filters.dateRange}
        activeFilter={filters.activeFilter}
        isFilterLoading={filters.isFilterLoading}
        lastUpdated={filters.lastUpdated}
        onStatesChange={(s) => filters.setSelectedStates(new Set(s))}
        onDateRangeChange={filters.handleDateRangeChange}
        onQuickFilterChange={filters.handleQuickFilterChange}
        onApplyFilters={handleApplyFilters}
        onExportExcel={handleExportExcel}
      />

      {/* Hero KPI Section */}
      <div className="mt-6">
        <ErrorBoundary>
          <HeroKPI
            aqiValue={dashboardData.data.avgAQI?.Mean || 0}
            pm25Value={dashboardData.data.avgPM25?.Mean || 0}
            pm10Value={dashboardData.data.avgPM10?.Mean || 0}
            gasesValue={dashboardData.data.sumGases?.Sum || 0}
            isLoading={isHeroLoading}
            lastUpdated={filters.lastUpdated || undefined}
          />
        </ErrorBoundary>
      </div>

      {/* Alert Banner */}
      <div className="mt-6">
        <ErrorBoundary>
          <AlertBanner
            alerts={generateAlerts()}
            isLoading={dashboardData.isLoading.mapAQI}
          />
        </ErrorBoundary>
      </div>

      {/* Tabs */}
      <Tabs className="mt-6" aria-label="AQI Dashboard Tabs">
        <Tab key="overview" title="Overview">
          <OverviewTab
            sumGases={dashboardData.data.sumGases}
            avgAQI={dashboardData.data.avgAQI}
            avgPM25={dashboardData.data.avgPM25}
            avgPM10={dashboardData.data.avgPM10}
            mapAQI={dashboardData.data.mapAQI}
            recommendations={dashboardData.data.recommendations}
            comparisonData={generateComparisonData()}
            isLoading={{
              sumGases: dashboardData.isLoading.sumGases,
              avgAQI: dashboardData.isLoading.avgAQI,
              avgPM25: dashboardData.isLoading.avgPM25,
              avgPM10: dashboardData.isLoading.avgPM10,
              mapAQI: dashboardData.isLoading.mapAQI,
              recommendations: dashboardData.isLoading.recommendations,
              hero: isHeroLoading,
            }}
          />
        </Tab>

        <Tab key="contributors" title="Contributors">
          <ContributorsTab
            pieGases={dashboardData.data.pieGases}
            piePM10={dashboardData.data.piePM10}
            piePM25={dashboardData.data.piePM25}
            pieAQI={dashboardData.data.pieAQI}
            isLoading={{
              pieGases: dashboardData.isLoading.pieGases,
              piePM10: dashboardData.isLoading.piePM10,
              piePM25: dashboardData.isLoading.piePM25,
              pieAQI: dashboardData.isLoading.pieAQI,
            }}
          />
        </Tab>

        <Tab key="timeseries" title="Time Series">
          <TimeSeriesTab
            timeAQI={dashboardData.data.timeAQI}
            timeGases={dashboardData.data.timeGases}
            timePM={dashboardData.data.timePM}
            timeSeriesRecommendations={dashboardData.data.timeSeriesRecommendations}
            onPredictAQI={handlePredictAQI}
            isLoading={{
              timeAQI: dashboardData.isLoading.timeAQI,
              timeGases: dashboardData.isLoading.timeGases,
              timePM: dashboardData.isLoading.timePM,
              timeSeriesRecommendations: dashboardData.isLoading.timeSeriesRecommendations,
            }}
          />
        </Tab>
      </Tabs>
    </section>
  );
}
