import React from "react";
import DashboardItem from "../dashboard-item";

export default function SumGases({
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
      IconClass="mdi:weather-hazy"
      description="PM2.5 Level"
      value={data}
    />
  );
}
