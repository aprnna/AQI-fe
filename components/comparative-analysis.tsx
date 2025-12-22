"use client";

import React from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";

interface ComparisonData {
  label: string;
  currentValue: number;
  previousValue: number;
  unit?: string;
}

interface ComparativeAnalysisProps {
  title?: string;
  description?: string;
  data: ComparisonData[];
  isLoading?: boolean;
  className?: string;
  currentPeriodLabel?: string;
  previousPeriodLabel?: string;
}

function getChangeColor(current: number, previous: number, isPositiveGood: boolean = false) {
  const change = current - previous;
  if (change === 0) return "default";
  // For AQI/pollution, lower is better (so decrease is good)
  const isGood = isPositiveGood ? change > 0 : change < 0;
  return isGood ? "success" : "danger";
}

function formatChange(current: number, previous: number): string {
  if (previous === 0) return "N/A";
  const change = ((current - previous) / previous) * 100;
  const sign = change > 0 ? "+" : "";
  return `${sign}${change.toFixed(1)}%`;
}

export default function ComparativeAnalysis({
  title = "Comparative Analysis",
  description = "Compare current period with previous period",
  data,
  isLoading = false,
  className = "",
  currentPeriodLabel = "Current",
  previousPeriodLabel = "Previous",
}: ComparativeAnalysisProps) {
  if (isLoading) {
    return (
      <div
        className={clsx(
          className,
          "rounded-2xl p-6 animate-pulse",
          "bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl",
          "border border-neutral-200 dark:border-neutral-700"
        )}
      >
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-48 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-neutral-200 dark:bg-neutral-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div
      className={clsx(
        className,
        "rounded-2xl p-6",
        "bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl",
        "border border-neutral-200 dark:border-neutral-700",
        "shadow-lg"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <Icon icon="mdi:chart-timeline-variant" className="text-xl text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            {title}
          </h3>
          <p className="text-xs text-neutral-500">{description}</p>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-4 gap-4 mb-3 px-4 text-xs font-medium text-neutral-500">
        <div>Metric</div>
        <div className="text-center">{currentPeriodLabel}</div>
        <div className="text-center">{previousPeriodLabel}</div>
        <div className="text-center">Change</div>
      </div>

      {/* Data Rows */}
      <div className="space-y-2">
        {data.map((item, index) => {
          const changePercent = formatChange(item.currentValue, item.previousValue);
          const changeColor = getChangeColor(item.currentValue, item.previousValue);
          const isIncrease = item.currentValue > item.previousValue;

          return (
            <Tooltip
              key={index}
              content={
                <div className="p-2 text-sm">
                  <p className="font-medium">{item.label}</p>
                  <p>Current: {item.currentValue.toFixed(2)} {item.unit}</p>
                  <p>Previous: {item.previousValue.toFixed(2)} {item.unit}</p>
                  <p>Delta: {(item.currentValue - item.previousValue).toFixed(2)} {item.unit}</p>
                </div>
              }
            >
              <div
                className={clsx(
                  "grid grid-cols-4 gap-4 p-4 rounded-xl cursor-pointer",
                  "bg-neutral-50 dark:bg-neutral-800/50",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                  "transition-all duration-200"
                )}
              >
                {/* Metric Label */}
                <div className="flex items-center gap-2">
                  <span className="font-medium text-neutral-700 dark:text-neutral-200">
                    {item.label}
                  </span>
                </div>

                {/* Current Value */}
                <div className="text-center">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-100">
                    {item.currentValue.toFixed(1)}
                  </span>
                  {item.unit && (
                    <span className="text-xs text-neutral-500 ml-1">{item.unit}</span>
                  )}
                </div>

                {/* Previous Value */}
                <div className="text-center">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {item.previousValue.toFixed(1)}
                  </span>
                  {item.unit && (
                    <span className="text-xs text-neutral-500 ml-1">{item.unit}</span>
                  )}
                </div>

                {/* Change */}
                <div className="flex items-center justify-center">
                  <Chip
                    size="sm"
                    color={changeColor}
                    variant="flat"
                    startContent={
                      <Icon
                        icon={isIncrease ? "mdi:trending-up" : "mdi:trending-down"}
                        className="text-sm"
                      />
                    }
                  >
                    {changePercent}
                  </Chip>
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <Icon icon="mdi:information-outline" />
          <span>
            For air quality metrics, <span className="text-green-600">decreasing values</span> indicate improvement.
          </span>
        </div>
      </div>
    </div>
  );
}
