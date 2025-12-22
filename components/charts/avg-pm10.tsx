import React from "react";
import DashboardItem from "../dashboard-item";

export default function AvgPM10({
  data,
  previousData,
  isLoading = true,
  className = "",
}: {
  data: any;
  previousData?: number;
  isLoading?: boolean;
  className?: string;
}) {
  return (
    <DashboardItem
      className={className}
      isLoading={isLoading}
      IconClass="mdi:blur-linear"
      description="Average PM10"
      value={data}
      previousValue={previousData}
      metricType="pm10"
      unit="μg/m³"
      showTrend={true}
      showStatus={true}
    />
  );
}
