"use client";

import React from "react";
import { Button } from "@heroui/button";
import clsx from "clsx";
import { parseDate, CalendarDate, today, getLocalTimeZone } from "@internationalized/date";

type DateRange = {
  start: CalendarDate;
  end: CalendarDate;
};

type FilterPreset = {
  label: string;
  value: string;
  getRange: () => DateRange;
};

interface QuickFiltersProps {
  activeFilter?: string;
  onFilterChange?: (filter: string, range: DateRange) => void;
  className?: string;
}

const FILTER_PRESETS: FilterPreset[] = [
  {
    label: "7 Days",
    value: "7d",
    getRange: () => {
      const now = today(getLocalTimeZone());
      return {
        start: now.subtract({ days: 7 }),
        end: now,
      };
    },
  },
  {
    label: "30 Days",
    value: "30d",
    getRange: () => {
      const now = today(getLocalTimeZone());
      return {
        start: now.subtract({ days: 30 }),
        end: now,
      };
    },
  },
  {
    label: "3 Months",
    value: "3m",
    getRange: () => {
      const now = today(getLocalTimeZone());
      return {
        start: now.subtract({ months: 3 }),
        end: now,
      };
    },
  },
  {
    label: "6 Months",
    value: "6m",
    getRange: () => {
      const now = today(getLocalTimeZone());
      return {
        start: now.subtract({ months: 6 }),
        end: now,
      };
    },
  },
  {
    label: "1 Year",
    value: "1y",
    getRange: () => {
      const now = today(getLocalTimeZone());
      return {
        start: now.subtract({ years: 1 }),
        end: now,
      };
    },
  },
  {
    label: "All Time",
    value: "all",
    getRange: () => {
      const now = today(getLocalTimeZone());
      return {
        start: parseDate("2020-01-01"),
        end: now,
      };
    },
  },
];

export default function QuickFilters({
  activeFilter = "all",
  onFilterChange,
  className = "",
}: QuickFiltersProps) {
  const handleFilterClick = (preset: FilterPreset) => {
    if (onFilterChange) {
      onFilterChange(preset.value, preset.getRange());
    }
  };

  return (
    <div className={clsx(className, "flex flex-wrap gap-2")}>
      {FILTER_PRESETS.map((preset) => (
        <Button
          key={preset.value}
          size="sm"
          variant={activeFilter === preset.value ? "solid" : "flat"}
          color={activeFilter === preset.value ? "primary" : "default"}
          className={clsx(
            "font-medium transition-all duration-200",
            activeFilter === preset.value
              ? "shadow-md"
              : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
          )}
          onPress={() => handleFilterClick(preset)}
        >
          {preset.label}
        </Button>
      ))}
    </div>
  );
}
