"use client";

import React from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { Skeleton } from "@heroui/skeleton";
import { Chip } from "@heroui/chip";

// AQI Category colors and labels
const AQI_CONFIG: Record<string, { color: string; bgColor: string; label: string; textColor: string }> = {
  Good: {
    color: "#00E400",
    bgColor: "bg-green-500/20",
    label: "Good",
    textColor: "text-green-600 dark:text-green-400",
  },
  Moderate: {
    color: "#FFFF00",
    bgColor: "bg-yellow-500/20",
    label: "Moderate",
    textColor: "text-yellow-600 dark:text-yellow-400",
  },
  "Unhealthy for Sensitive": {
    color: "#FF7E00",
    bgColor: "bg-orange-500/20",
    label: "Unhealthy for Sensitive Groups",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  Unhealthy: {
    color: "#FF0000",
    bgColor: "bg-red-500/20",
    label: "Unhealthy",
    textColor: "text-red-600 dark:text-red-400",
  },
  "Very Unhealthy": {
    color: "#8F3F97",
    bgColor: "bg-purple-500/20",
    label: "Very Unhealthy",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  Hazardous: {
    color: "#7E0023",
    bgColor: "bg-rose-900/20",
    label: "Hazardous",
    textColor: "text-rose-800 dark:text-rose-400",
  },
};

function getAQICategory(value: number): string {
  if (value <= 50) return "Good";
  if (value <= 100) return "Moderate";
  if (value <= 150) return "Unhealthy for Sensitive";
  if (value <= 200) return "Unhealthy";
  if (value <= 300) return "Very Unhealthy";
  return "Hazardous";
}

interface HeroKPIProps {
  aqiValue?: number;
  pm25Value?: number;
  pm10Value?: number;
  gasesValue?: number;
  previousAqi?: number;
  isLoading?: boolean;
  lastUpdated?: Date;
  className?: string;
}

export default function HeroKPI({
  aqiValue = 0,
  pm25Value = 0,
  pm10Value = 0,
  gasesValue = 0,
  previousAqi,
  isLoading = false,
  lastUpdated,
  className = "",
}: HeroKPIProps) {
  const category = getAQICategory(aqiValue);
  const config = AQI_CONFIG[category] || AQI_CONFIG["Good"];

  // Calculate trend
  const trendValue = previousAqi ? aqiValue - previousAqi : 0;
  const trendPercent = previousAqi ? ((trendValue / previousAqi) * 100).toFixed(1) : "0";
  const isIncreasing = trendValue > 0;

  if (isLoading) {
    return (
      <div
        className={clsx(
          className,
          "rounded-3xl p-6 md:p-8",
          "bg-gradient-to-br from-white/80 to-white/60 dark:from-neutral-900/80 dark:to-neutral-800/60",
          "backdrop-blur-xl border border-white/30 dark:border-neutral-700",
          "shadow-xl"
        )}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Skeleton className="w-32 h-32 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <Skeleton className="h-6 w-32 rounded-lg" />
            <Skeleton className="h-4 w-64 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        className,
        "rounded-3xl p-6 md:p-8",
        "bg-gradient-to-br from-white/80 to-white/60 dark:from-neutral-900/80 dark:to-neutral-800/60",
        "backdrop-blur-xl border border-white/30 dark:border-neutral-700",
        "shadow-xl hover:shadow-2xl transition-all duration-500"
      )}
    >
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
        {/* Main AQI Circle */}
        <div className="relative">
          <div
            className={clsx(
              "w-36 h-36 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center",
              "shadow-lg transition-all duration-300",
              config.bgColor
            )}
            style={{
              boxShadow: `0 0 40px ${config.color}40, inset 0 0 30px ${config.color}20`,
            }}
          >
            <span
              className="text-4xl md:text-5xl font-bold"
              style={{ color: config.color }}
            >
              {Math.round(aqiValue)}
            </span>
            <span className="text-sm font-medium opacity-70">AQI</span>
          </div>
          {/* Pulse animation ring */}
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ backgroundColor: config.color }}
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 text-center lg:text-left space-y-3">
          {/* Category Badge */}
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <Chip
              size="lg"
              variant="flat"
              className={clsx("font-semibold", config.textColor, config.bgColor)}
            >
              {config.label}
            </Chip>

            {/* Trend Indicator */}
            {previousAqi && trendValue !== 0 && (
              <div
                className={clsx(
                  "flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
                  isIncreasing
                    ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                )}
              >
                <Icon
                  icon={isIncreasing ? "mdi:trending-up" : "mdi:trending-down"}
                  className="text-lg"
                />
                <span>{isIncreasing ? "+" : ""}{trendPercent}%</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
            {category === "Good" && "Air quality is satisfactory and poses little or no health risk."}
            {category === "Moderate" && "Air quality is acceptable. However, there may be a risk for sensitive people."}
            {category === "Unhealthy for Sensitive" && "Members of sensitive groups may experience health effects."}
            {category === "Unhealthy" && "Everyone may begin to experience health effects."}
            {category === "Very Unhealthy" && "Health alert: everyone may experience serious health effects."}
            {category === "Hazardous" && "Health warnings of emergency conditions. Everyone is affected."}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <div className="text-center lg:text-left">
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                {pm25Value?.toFixed(1) || "—"}
              </p>
              <p className="text-xs text-neutral-500">PM2.5 (μg/m³)</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                {pm10Value?.toFixed(1) || "—"}
              </p>
              <p className="text-xs text-neutral-500">PM10 (μg/m³)</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                {gasesValue?.toFixed(1) || "—"}
              </p>
              <p className="text-xs text-neutral-500">Gases (ppb)</p>
            </div>
          </div>

          {/* Last Updated */}
          {lastUpdated && (
            <p className="text-xs text-neutral-400 pt-2">
              <Icon icon="mdi:clock-outline" className="inline mr-1" />
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
