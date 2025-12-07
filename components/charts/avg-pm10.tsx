import React from "react";
import DashboardItem from "../dashboard-item";

export default function AvgPM10({
  data,
  isLoading = true,
  className = "",
}: {
  data: any;
  isLoading?: boolean;
  className?: string;
}) {
  return (
    <DashboardItem
      className={className}
      isLoading={isLoading}
      IconClass="mdi:weather-windy"
      description="CO2 Level"
      value={data}
    />
  );
}
