import { Icon } from "@iconify/react";
import clsx from "clsx";
import React from "react";
import { title } from "@/components/primitives";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { Tooltip } from "@heroui/tooltip";
import InfoTooltip, { MetricTooltips } from "@/components/info-tooltip";

// Status configuration based on metric type
const getStatusConfig = (value: number, metricType?: string) => {
  if (metricType === "aqi") {
    if (value <= 50) return { label: "Good", color: "success" as const, bgClass: "bg-green-500/20" };
    if (value <= 100) return { label: "Moderate", color: "warning" as const, bgClass: "bg-yellow-500/20" };
    if (value <= 150) return { label: "Sensitive", color: "warning" as const, bgClass: "bg-orange-500/20" };
    if (value <= 200) return { label: "Unhealthy", color: "danger" as const, bgClass: "bg-red-500/20" };
    return { label: "Hazardous", color: "danger" as const, bgClass: "bg-purple-500/20" };
  }
  if (metricType === "pm25") {
    if (value <= 12) return { label: "Good", color: "success" as const, bgClass: "bg-green-500/20" };
    if (value <= 35) return { label: "Moderate", color: "warning" as const, bgClass: "bg-yellow-500/20" };
    if (value <= 55) return { label: "Sensitive", color: "warning" as const, bgClass: "bg-orange-500/20" };
    return { label: "Unhealthy", color: "danger" as const, bgClass: "bg-red-500/20" };
  }
  if (metricType === "pm10") {
    if (value <= 54) return { label: "Good", color: "success" as const, bgClass: "bg-green-500/20" };
    if (value <= 154) return { label: "Moderate", color: "warning" as const, bgClass: "bg-yellow-500/20" };
    if (value <= 254) return { label: "Sensitive", color: "warning" as const, bgClass: "bg-orange-500/20" };
    return { label: "Unhealthy", color: "danger" as const, bgClass: "bg-red-500/20" };
  }
  return null;
};

// Get tooltip content based on metric type
const getTooltipContent = (metricType?: string) => {
  switch (metricType) {
    case "aqi":
      return MetricTooltips.AQI;
    case "pm25":
      return MetricTooltips.PM25;
    case "pm10":
      return MetricTooltips.PM10;
    case "gases":
      return MetricTooltips.Gases;
    default:
      return null;
  }
};

interface DashboardItemProps {
  IconClass: string;
  description: string;
  value: number;
  isLoading?: boolean;
  className?: string;
  previousValue?: number;
  metricType?: "aqi" | "pm25" | "pm10" | "gases";
  unit?: string;
  showTrend?: boolean;
  showStatus?: boolean;
  showTooltip?: boolean;
}

export default function DashboardItem({
  IconClass,
  description,
  value,
  isLoading,
  className,
  previousValue,
  metricType,
  unit,
  showTrend = true,
  showStatus = true,
  showTooltip = true,
}: DashboardItemProps) {
  // Calculate trend
  const hasTrend = previousValue !== undefined && previousValue !== 0;
  const trendValue = hasTrend ? value - previousValue : 0;
  const trendPercent = hasTrend ? ((trendValue / previousValue) * 100).toFixed(1) : "0";
  const isIncreasing = trendValue > 0;
  const isPositiveTrend = metricType ? !isIncreasing : isIncreasing;

  // Get status config
  const statusConfig = metricType && showStatus ? getStatusConfig(value, metricType) : null;
  
  // Get tooltip content
  const tooltipContent = showTooltip ? getTooltipContent(metricType) : null;

  // Check for empty/invalid value
  const hasValidValue = value !== undefined && value !== null && !isNaN(value);

  if (isLoading) {
    return (
      <div
        className={clsx(
          className,
          "rounded-2xl p-5 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl",
          "shadow-lg border border-white/30 dark:border-neutral-800",
          "flex items-center gap-5"
        )}
      >
        <Skeleton className="w-14 h-14 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-8 w-20 rounded-lg" />
          <Skeleton className="h-4 w-24 rounded-lg" />
        </div>
      </div>
    );
  }

  // Empty state
  if (!hasValidValue) {
    return (
      <div
        className={clsx(
          className,
          "rounded-2xl p-5 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl",
          "shadow-lg border border-white/30 dark:border-neutral-800",
          "flex items-center gap-5"
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-center rounded-xl",
            "bg-neutral-100 dark:bg-neutral-800",
            "w-14 h-14"
          )}
        >
          <Icon icon={IconClass} className="text-3xl text-neutral-400" />
        </div>
        <div className="text-left">
          <p className="text-lg font-medium text-neutral-400">No data</p>
          <p className="text-sm text-neutral-400">{description}</p>
        </div>
      </div>
    );
  }

  const content = (
    <div
      className={clsx(
        className,
        "rounded-2xl p-5 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl",
        "shadow-lg hover:shadow-xl transition-all duration-300",
        "border border-white/30 dark:border-neutral-800",
        "flex items-center gap-5 cursor-pointer hover:scale-[1.02]"
      )}
    >
      {/* Icon wrapper */}
      <div
        className={clsx(
          "flex items-center justify-center rounded-xl",
          statusConfig ? statusConfig.bgClass : "bg-gradient-to-br from-primary/20 to-primary/10",
          "w-14 h-14"
        )}
      >
        <Icon icon={IconClass} className="text-3xl text-primary" />
      </div>

      {/* Text content */}
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className={clsx(title({ size: "sm" }), "leading-tight")}>
            {typeof value === "number" ? value.toFixed(1) : value}
            {unit && <span className="text-sm font-normal opacity-70 ml-1">{unit}</span>}
          </h2>

          {/* Trend indicator */}
          {showTrend && hasTrend && trendValue !== 0 && (
            <div
              className={clsx(
                "flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium",
                isPositiveTrend
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
              )}
            >
              <Icon
                icon={isIncreasing ? "mdi:arrow-up" : "mdi:arrow-down"}
                className="text-sm"
              />
              <span>{Math.abs(Number(trendPercent))}%</span>
            </div>
          )}

          {/* Info tooltip */}
          {tooltipContent && (
            <InfoTooltip
              content={tooltipContent}
              title={description}
              iconClassName="text-lg"
            />
          )}
        </div>

        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm opacity-70">{description}</p>

          {/* Status badge */}
          {showStatus && statusConfig && (
            <Chip size="sm" color={statusConfig.color} variant="flat" className="h-5 text-xs">
              {statusConfig.label}
            </Chip>
          )}
        </div>
      </div>
    </div>
  );

  // Wrap with detailed tooltip on hover
  return (
    <Tooltip
      content={
        <div className="p-3 max-w-xs">
          <p className="font-semibold mb-2">{description}</p>
          <div className="space-y-1 text-sm">
            <p>Current Value: <strong>{value.toFixed(2)}</strong> {unit}</p>
            {hasTrend && (
              <>
                <p>Previous Value: {previousValue?.toFixed(2)} {unit}</p>
                <p>
                  Change: {trendValue > 0 ? "+" : ""}{trendValue.toFixed(2)} {unit} ({trendPercent}%)
                </p>
              </>
            )}
            {statusConfig && (
              <p>Status: <span className={clsx(
                statusConfig.color === "success" && "text-green-500",
                statusConfig.color === "warning" && "text-yellow-500",
                statusConfig.color === "danger" && "text-red-500",
              )}>{statusConfig.label}</span></p>
            )}
          </div>
        </div>
      }
      classNames={{
        content: "bg-white dark:bg-neutral-800 shadow-xl border border-neutral-200 dark:border-neutral-700",
      }}
      delay={500}
      closeDelay={0}
    >
      {content}
    </Tooltip>
  );
}
