import React from "react";
import DashboardItem from "../dashboard-item";

export default function AvgAQI({
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
      IconClass="mdi:cloud"
      description="Average AQI"
      value={data}
      previousValue={previousData}
      metricType="aqi"
      showTrend={true}
      showStatus={true}
    />
  );
}
