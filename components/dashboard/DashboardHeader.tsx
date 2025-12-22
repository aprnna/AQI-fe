"use client";

import React from "react";
import { Select, SelectItem } from "@heroui/select";
import { DateRangePicker } from "@heroui/date-picker";
import { Button } from "@heroui/button";
import { CalendarDate } from "@internationalized/date";

import { Logo } from "@/components/icons";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { ThemeSwitch } from "@/components/theme-switch";
import ExportButton from "@/components/export-button";
import QuickFilters from "@/components/quick-filters";
import LoadingProgress from "@/components/loading-progress";

interface DateRangeState {
  start: CalendarDate;
  end: CalendarDate;
}

interface DashboardHeaderProps {
  // States
  states: string[];
  statesLoading: boolean;
  selectedStates: Set<string>;
  dateRange: DateRangeState;
  activeFilter: string;
  isFilterLoading: boolean;
  lastUpdated: Date | null;

  // Handlers
  onStatesChange: (states: any) => void;
  onDateRangeChange: (range: any) => void;
  onQuickFilterChange: (filter: string, range: DateRangeState) => void;
  onApplyFilters: () => void;
  onExportExcel: () => void;
}

export default function DashboardHeader({
  states,
  statesLoading,
  selectedStates,
  dateRange,
  activeFilter,
  isFilterLoading,
  lastUpdated,
  onStatesChange,
  onDateRangeChange,
  onQuickFilterChange,
  onApplyFilters,
  onExportExcel,
}: DashboardHeaderProps) {
  return (
    <Card className="p-4 rounded-3xl border gap-6 border-white/20 dark:border-white/5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <CardTitle className="flex items-center gap-3 flex-wrap">
        <Logo />
        <h2 className="text-lg font-semibold">Air Quality Index Dashboard</h2>
        <div className="ml-auto flex items-center gap-2">
          <ExportButton onExportExcel={onExportExcel} />
          <ThemeSwitch />
        </div>
      </CardTitle>

      <CardContent className="space-y-4">
        {/* Quick Filters */}
        <div>
          <p className="text-sm text-neutral-500 mb-2">Quick Filters</p>
          <QuickFilters
            activeFilter={activeFilter}
            onFilterChange={onQuickFilterChange}
          />
        </div>

        {/* Date Range & State Select */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <DateRangePicker
              label="Custom Date Range"
              aria-label="Date range"
              value={dateRange}
              onChange={onDateRangeChange}
            />
          </div>
          <div>
            <Select
              className="w-full"
              label="Select states"
              aria-label="select states"
              placeholder="Choose states"
              selectionMode="multiple"
              selectedKeys={selectedStates}
              isLoading={statesLoading}
              onSelectionChange={onStatesChange}
            >
              {states?.map((state: string) => (
                <SelectItem key={state}>{state}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <div className="flex justify-between items-center w-full">
          {lastUpdated && (
            <p className="text-xs text-neutral-400">
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}
          <Button
            onPress={onApplyFilters}
            color="primary"
            className="ml-auto"
            isLoading={isFilterLoading}
          >
            {isFilterLoading ? "Loading..." : "Apply Filters"}
          </Button>
        </div>
        <LoadingProgress
          isLoading={isFilterLoading}
          label="Fetching dashboard data..."
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
}
