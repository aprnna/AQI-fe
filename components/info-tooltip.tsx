"use client";

import React from "react";
import { Tooltip } from "@heroui/tooltip";
import { Icon } from "@iconify/react";
import clsx from "clsx";

interface InfoTooltipProps {
  content: React.ReactNode;
  title?: string;
  className?: string;
  iconClassName?: string;
  placement?: "top" | "bottom" | "left" | "right";
}

export default function InfoTooltip({
  content,
  title,
  className = "",
  iconClassName = "",
  placement = "top",
}: InfoTooltipProps) {
  return (
    <Tooltip
      placement={placement}
      content={
        <div className="p-2 max-w-xs">
          {title && (
            <p className="font-semibold text-sm mb-1">{title}</p>
          )}
          <div className="text-xs text-neutral-600 dark:text-neutral-300">
            {content}
          </div>
        </div>
      }
      classNames={{
        content: "bg-white dark:bg-neutral-800 shadow-lg border border-neutral-200 dark:border-neutral-700",
      }}
    >
      <span className={clsx("cursor-help inline-flex", className)}>
        <Icon
          icon="mdi:information-outline"
          className={clsx(
            "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors",
            iconClassName
          )}
        />
      </span>
    </Tooltip>
  );
}

// Predefined tooltips for common metrics
export const MetricTooltips = {
  AQI: (
    <div>
      <p className="mb-2">Air Quality Index (AQI) is a scale from 0-500 used to communicate air pollution levels.</p>
      <div className="space-y-1">
        <p><span className="text-green-500">●</span> 0-50: Good</p>
        <p><span className="text-yellow-500">●</span> 51-100: Moderate</p>
        <p><span className="text-orange-500">●</span> 101-150: Unhealthy for Sensitive</p>
        <p><span className="text-red-500">●</span> 151-200: Unhealthy</p>
        <p><span className="text-purple-500">●</span> 201-300: Very Unhealthy</p>
        <p><span className="text-rose-800">●</span> 301+: Hazardous</p>
      </div>
    </div>
  ),
  PM25: (
    <div>
      <p className="mb-2">PM2.5 refers to fine particulate matter with diameter ≤ 2.5 micrometers.</p>
      <p>These particles can penetrate deep into lungs and bloodstream.</p>
      <div className="mt-2">
        <p><strong>WHO Guidelines:</strong></p>
        <p>• Annual mean: 5 μg/m³</p>
        <p>• 24-hour mean: 15 μg/m³</p>
      </div>
    </div>
  ),
  PM10: (
    <div>
      <p className="mb-2">PM10 refers to coarse particulate matter with diameter ≤ 10 micrometers.</p>
      <p>Includes dust, pollen, and mold spores.</p>
      <div className="mt-2">
        <p><strong>WHO Guidelines:</strong></p>
        <p>• Annual mean: 15 μg/m³</p>
        <p>• 24-hour mean: 45 μg/m³</p>
      </div>
    </div>
  ),
  Gases: (
    <div>
      <p className="mb-2">Total concentration of gaseous pollutants including:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>Nitrogen Dioxide (NO₂)</li>
        <li>Sulfur Dioxide (SO₂)</li>
        <li>Carbon Monoxide (CO)</li>
        <li>Ozone (O₃)</li>
      </ul>
    </div>
  ),
};
