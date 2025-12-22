import React from "react";
import DashboardItem from "../dashboard-item";

export default function AvgPM2({
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
      IconClass="mdi:blur"
      description="Average PM2.5"
      value={data}
      previousValue={previousData}
      metricType="pm25"
      unit="μg/m³"
      showTrend={true}
      showStatus={true}
    />
  );
}
