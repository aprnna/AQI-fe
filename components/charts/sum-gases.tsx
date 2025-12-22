import React from "react";
import DashboardItem from "../dashboard-item";

export default function SumGases({
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
      IconClass="mdi:weather-hazy"
      description="Total Gases"
      value={data}
      previousValue={previousData}
      metricType="gases"
      unit="ppb"
      showTrend={true}
      showStatus={false}
    />
  );
}
