import {
  AQI_THRESHOLDS,
  AQI_CATEGORIES,
  AQI_COLORS
} from "@/constants";

/**
 * Get AQI category based on AQI value
 */
export function getAQICategory(value: number): string {
  if (value <= AQI_THRESHOLDS.GOOD) return AQI_CATEGORIES.GOOD;
  if (value <= AQI_THRESHOLDS.MODERATE) return AQI_CATEGORIES.MODERATE;
  if (value <= AQI_THRESHOLDS.UNHEALTHY_SENSITIVE) return AQI_CATEGORIES.UNHEALTHY_SENSITIVE;
  if (value <= AQI_THRESHOLDS.UNHEALTHY) return AQI_CATEGORIES.UNHEALTHY;
  if (value <= AQI_THRESHOLDS.VERY_UNHEALTHY) return AQI_CATEGORIES.VERY_UNHEALTHY;
  return AQI_CATEGORIES.HAZARDOUS;
}

/**
 * Get AQI color based on AQI value
 */
export function getAQIColor(value: number): string {
  if (value <= AQI_THRESHOLDS.GOOD) return AQI_COLORS.GOOD;
  if (value <= AQI_THRESHOLDS.MODERATE) return AQI_COLORS.MODERATE;
  if (value <= AQI_THRESHOLDS.UNHEALTHY_SENSITIVE) return AQI_COLORS.UNHEALTHY_SENSITIVE;
  if (value <= AQI_THRESHOLDS.UNHEALTHY) return AQI_COLORS.UNHEALTHY;
  if (value <= AQI_THRESHOLDS.VERY_UNHEALTHY) return AQI_COLORS.VERY_UNHEALTHY;
  return AQI_COLORS.HAZARDOUS;
}

/**
 * Get AQI status label for display
 */
export function getAQIStatusLabel(value: number): { label: string; color: string } {
  const category = getAQICategory(value);
  const color = getAQIColor(value);
  return { label: category, color };
}

/**
 * Format AQI value for display
 */
export function formatAQIValue(value: number | undefined | null): string {
  if (value === undefined || value === null) return "N/A";
  return value.toFixed(1);
}

/**
 * Check if AQI value is in dangerous range
 */
export function isAQIDangerous(value: number): boolean {
  return value > AQI_THRESHOLDS.UNHEALTHY_SENSITIVE;
}

/**
 * Get recommendation priority based on AQI
 */
export function getAQIPriority(value: number): "low" | "medium" | "high" | "critical" {
  if (value <= AQI_THRESHOLDS.GOOD) return "low";
  if (value <= AQI_THRESHOLDS.MODERATE) return "medium";
  if (value <= AQI_THRESHOLDS.UNHEALTHY) return "high";
  return "critical";
}
