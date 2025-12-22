import { SVGProps } from "react";

// ==================== Icon Types ====================
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// ==================== Filter Types ====================
export interface FilterData {
  start_month: string;
  start_year: string;
  end_month: string;
  end_year: string;
  states: string[];
  predict_type?: number;
}

export interface DateRangeValue {
  start: {
    month: number;
    day: number;
    year: number;
  };
  end: {
    month: number;
    day: number;
    year: number;
  };
}

// ==================== API Response Types ====================
export interface ApiResponse<T> {
  data: T;
  status: string;
}

export interface AQIMetric {
  Mean: number;
  Min?: number;
  Max?: number;
}

export interface GasesMetric {
  Sum: number;
}

export interface MapAQIItem {
  "State Name": string;
  "Mean AQI Value": number;
  "AQI Category": string;
}

// ==================== Chart Data Types ====================
export interface TimeSeriesDataPoint {
  name: string;
  Date?: string;
  History?: number;
  Predicted?: number;
  CI_range?: [number, number];
  "NO2 Mean"?: number;
  "CO Mean"?: number;
  "PM2.5 Mean"?: number;
  "PM10 Mean"?: number;
}

export interface PieChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

// ==================== Recommendation Types ====================
export interface Recommendation {
  Title: string;
  Description: string;
  Category?: string;
}

export interface RecommendationsResponse {
  context_used: string;
  response: Recommendation[];
}

// ==================== YoY Comparison Types ====================
export interface YoYData {
  Year: number;
  AQI: number;
  PM25: number;
  PM10: number;
  Gases: number;
}

export interface YoYComparisonResponse {
  current: YoYData;
  previous: YoYData;
}

// ==================== Alert Types ====================
export interface AlertItem {
  name: string;
  aqiValue: number;
  category: string;
}

// ==================== Comparison Types ====================
export interface ComparisonDataItem {
  label: string;
  currentValue: number;
  previousValue: number;
  unit: string;
}

// ==================== Export Types ====================
export interface ExportData {
  aqiValue?: number;
  pm25Value?: number;
  pm10Value?: number;
  gasesValue?: number;
  selectedStates: string[];
  dateRange: {
    start: string;
    end: string;
  };
  mapData?: MapAQIItem[];
  timeAQIData?: TimeSeriesDataPoint[];
  timeGasesData?: TimeSeriesDataPoint[];
  timePMData?: TimeSeriesDataPoint[];
  pieGasesData?: PieChartDataPoint[];
  piePM25Data?: PieChartDataPoint[];
  piePM10Data?: PieChartDataPoint[];
  pieAQIData?: PieChartDataPoint[];
  recommendations?: RecommendationsResponse;
  timestamp: Date;
}

// ==================== Dashboard State Types ====================
export interface DashboardData {
  timeGases: TimeSeriesDataPoint[];
  timeAQI: TimeSeriesDataPoint[];
  timePM: TimeSeriesDataPoint[];
  pieGases: PieChartDataPoint[];
  piePM25: PieChartDataPoint[];
  piePM10: PieChartDataPoint[];
  pieAQI: PieChartDataPoint[];
  sumGases: GasesMetric | null;
  avgAQI: AQIMetric | null;
  avgPM25: AQIMetric | null;
  avgPM10: AQIMetric | null;
  mapAQI: MapAQIItem[];
  recommendations: RecommendationsResponse | null;
  timeSeriesRecommendations: RecommendationsResponse | null;
  yoyComparison: YoYComparisonResponse | null;
}