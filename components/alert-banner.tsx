"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";

interface StateAlert {
  name: string;
  aqiValue: number;
  category: string;
}

interface AlertBannerProps {
  alerts?: StateAlert[];
  isLoading?: boolean;
  className?: string;
}

const SEVERITY_CONFIG: Record<string, { icon: string; bgColor: string; borderColor: string; textColor: string }> = {
  "Unhealthy for Sensitive": {
    icon: "mdi:alert-circle",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-300 dark:border-orange-700",
    textColor: "text-orange-700 dark:text-orange-300",
  },
  Unhealthy: {
    icon: "mdi:alert",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-300 dark:border-red-700",
    textColor: "text-red-700 dark:text-red-300",
  },
  "Very Unhealthy": {
    icon: "mdi:alert-octagon",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-300 dark:border-purple-700",
    textColor: "text-purple-700 dark:text-purple-300",
  },
  Hazardous: {
    icon: "mdi:skull-crossbones",
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
    borderColor: "border-rose-400 dark:border-rose-700",
    textColor: "text-rose-800 dark:text-rose-300",
  },
};

export default function AlertBanner({
  alerts = [],
  isLoading = false,
  className = "",
}: AlertBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter only unhealthy states
  const unhealthyAlerts = alerts.filter(
    (alert) =>
      alert.category === "Unhealthy for Sensitive" ||
      alert.category === "Unhealthy" ||
      alert.category === "Very Unhealthy" ||
      alert.category === "Hazardous"
  );

  // Sort by severity (highest first)
  const sortedAlerts = unhealthyAlerts.sort((a, b) => b.aqiValue - a.aqiValue);

  if (isLoading) {
    return null;
  }

  if (sortedAlerts.length === 0) {
    // Show positive banner when all is good
    return (
      <div
        className={clsx(
          className,
          "rounded-2xl p-4 flex items-center gap-4",
          "bg-green-50 dark:bg-green-900/20",
          "border border-green-300 dark:border-green-700"
        )}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-800/50">
          <Icon icon="mdi:check-circle" className="text-2xl text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="font-semibold text-green-700 dark:text-green-300">
            All Clear!
          </p>
          <p className="text-sm text-green-600 dark:text-green-400">
            All selected states have acceptable air quality levels.
          </p>
        </div>
      </div>
    );
  }

  // Determine overall severity (based on worst state)
  const worstCategory = sortedAlerts[0].category;
  const config = SEVERITY_CONFIG[worstCategory] || SEVERITY_CONFIG["Unhealthy"];

  const displayedAlerts = isExpanded ? sortedAlerts : sortedAlerts.slice(0, 3);
  const hiddenCount = sortedAlerts.length - 3;

  return (
    <div
      className={clsx(
        className,
        "rounded-2xl p-4 transition-all duration-300",
        config.bgColor,
        "border",
        config.borderColor
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={clsx(
            "flex items-center justify-center w-10 h-10 rounded-full shrink-0",
            config.bgColor
          )}
        >
          <Icon icon={config.icon} className={clsx("text-2xl", config.textColor)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={clsx("font-semibold", config.textColor)}>
            ⚠️ {sortedAlerts.length} State{sortedAlerts.length > 1 ? "s" : ""} with Unhealthy Air Quality
          </p>

          {/* Alert List */}
          <div className="flex flex-wrap gap-2 mt-2">
            {displayedAlerts.map((alert) => (
              <Chip
                key={alert.name}
                size="sm"
                variant="flat"
                className={clsx(
                  "font-medium",
                  SEVERITY_CONFIG[alert.category]?.textColor || config.textColor
                )}
              >
                {alert.name} ({Math.round(alert.aqiValue)})
              </Chip>
            ))}

            {/* Show more button */}
            {hiddenCount > 0 && !isExpanded && (
              <Button
                size="sm"
                variant="flat"
                className="h-6 min-w-0 px-2"
                onPress={() => setIsExpanded(true)}
              >
                +{hiddenCount} more
              </Button>
            )}

            {isExpanded && sortedAlerts.length > 3 && (
              <Button
                size="sm"
                variant="flat"
                className="h-6 min-w-0 px-2"
                onPress={() => setIsExpanded(false)}
              >
                Show less
              </Button>
            )}
          </div>

          <p className={clsx("text-sm mt-2 opacity-80", config.textColor)}>
            Consider taking precautions for outdoor activities in these areas.
          </p>
        </div>
      </div>
    </div>
  );
}
