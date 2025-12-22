// ==================== Default Values ====================
export const DEFAULT_STATES = ["Alabama", "California", "Florida", "New York"];

export const DEFAULT_PREDICTION_YEARS = 1;

// ==================== AQI Categories & Thresholds ====================
export const AQI_THRESHOLDS = {
  GOOD: 50,
  MODERATE: 100,
  UNHEALTHY_SENSITIVE: 150,
  UNHEALTHY: 200,
  VERY_UNHEALTHY: 300,
  HAZARDOUS: 500,
} as const;

export const AQI_CATEGORIES = {
  GOOD: "Good",
  MODERATE: "Moderate",
  UNHEALTHY_SENSITIVE: "Unhealthy for Sensitive",
  UNHEALTHY: "Unhealthy",
  VERY_UNHEALTHY: "Very Unhealthy",
  HAZARDOUS: "Hazardous",
} as const;

export const AQI_COLORS = {
  GOOD: "#22c55e", // green-500
  MODERATE: "#eab308", // yellow-500
  UNHEALTHY_SENSITIVE: "#f97316", // orange-500
  UNHEALTHY: "#ef4444", // red-500
  VERY_UNHEALTHY: "#a855f7", // purple-500
  HAZARDOUS: "#7f1d1d", // red-900
} as const;

// ==================== Recommendation Category Icons ====================
export const CATEGORY_ICONS: Record<string, string> = {
  health: "🏥",
  outdoor: "🏃",
  transportation: "🚌",
  policy: "🏛️",
  environment: "🌳",
};

export const CATEGORY_COLORS: Record<string, "success" | "primary" | "secondary" | "warning" | "danger"> = {
  health: "danger",
  outdoor: "primary",
  transportation: "warning",
  policy: "secondary",
  environment: "success",
};

export const CATEGORY_LABELS: Record<string, string> = {
  health: "Kesehatan",
  outdoor: "Aktivitas Luar",
  transportation: "Transportasi",
  policy: "Kebijakan",
  environment: "Lingkungan",
};

// ==================== Chart Colors ====================
export const CHART_COLORS = {
  PRIMARY: "#6366F1", // indigo-500
  SECONDARY: "#10B981", // emerald-500
  TERTIARY: "#F59E0B", // amber-500
  QUATERNARY: "#EF4444", // red-500
  CONFIDENCE_INTERVAL: "#8884d8",
  HISTORICAL: "#2563eb",
  FORECAST: "#16a34a",
} as const;

// ==================== Quick Filter Presets ====================
export const QUICK_FILTER_OPTIONS = {
  ALL: "all",
  LAST_YEAR: "lastYear",
  LAST_3_MONTHS: "last3Months",
  LAST_6_MONTHS: "last6Months",
  CUSTOM: "custom",
} as const;

// ==================== Prediction Options ====================
export const PREDICTION_OPTIONS = [
  { key: 1, label: "Prediksi 1 Tahun" },
  { key: 3, label: "Prediksi 3 Tahun" },
  { key: 5, label: "Prediksi 5 Tahun" },
] as const;
