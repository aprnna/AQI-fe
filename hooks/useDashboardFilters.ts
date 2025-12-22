"use client";

import { useState, useCallback } from "react";
import { parseDate, today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { DEFAULT_STATES } from "@/constants";
import { FilterData } from "@/types";

interface DateRangeState {
  start: CalendarDate;
  end: CalendarDate;
}

interface UseDashboardFiltersReturn {
  // States
  selectedStates: Set<string>;
  dateRange: DateRangeState;
  activeFilter: string;
  isFilterLoading: boolean;
  lastUpdated: Date | null;
  dateRangeInitialized: boolean;

  // Setters
  setSelectedStates: (states: Set<string>) => void;
  setDateRange: (range: DateRangeState) => void;
  setActiveFilter: (filter: string) => void;
  setIsFilterLoading: (loading: boolean) => void;
  setLastUpdated: (date: Date | null) => void;
  setDateRangeInitialized: (initialized: boolean) => void;

  // Handlers
  handleQuickFilterChange: (filter: string, range: DateRangeState) => void;
  handleDateRangeChange: (range: DateRangeState) => void;

  // Utilities
  getFilterPayload: (predictType?: number) => FilterData;
  getStatesArray: () => string[];
}

export function useDashboardFilters(): UseDashboardFiltersReturn {
  // State
  const [selectedStates, setSelectedStates] = useState<Set<string>>(
    new Set(DEFAULT_STATES)
  );
  const [dateRange, setDateRange] = useState<DateRangeState>({
    start: parseDate("2020-01-01"),
    end: today(getLocalTimeZone()),
  });
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isFilterLoading, setIsFilterLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [dateRangeInitialized, setDateRangeInitialized] = useState<boolean>(false);

  // Handlers
  const handleQuickFilterChange = useCallback(
    (filter: string, range: DateRangeState) => {
      setActiveFilter(filter);
      setDateRange(range);
    },
    []
  );

  const handleDateRangeChange = useCallback((range: DateRangeState) => {
    setDateRange(range);
    setActiveFilter("custom");
  }, []);

  // Utilities
  const getStatesArray = useCallback((): string[] => {
    return Array.from(selectedStates);
  }, [selectedStates]);

  const getFilterPayload = useCallback(
    (predictType?: number): FilterData => {
      const payload: FilterData = {
        start_month: dateRange.start.month.toString(),
        end_month: dateRange.end.month.toString(),
        start_year: dateRange.start.year.toString(),
        end_year: dateRange.end.year.toString(),
        states: getStatesArray(),
      };

      if (predictType !== undefined) {
        payload.predict_type = predictType;
      }

      return payload;
    },
    [dateRange, getStatesArray]
  );

  return {
    // States
    selectedStates,
    dateRange,
    activeFilter,
    isFilterLoading,
    lastUpdated,
    dateRangeInitialized,

    // Setters
    setSelectedStates: (states) => setSelectedStates(new Set(states)),
    setDateRange,
    setActiveFilter,
    setIsFilterLoading,
    setLastUpdated,
    setDateRangeInitialized,

    // Handlers
    handleQuickFilterChange,
    handleDateRangeChange,

    // Utilities
    getFilterPayload,
    getStatesArray,
  };
}
