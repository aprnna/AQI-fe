import React from "react";
import DashboardItem from "../dashboard-item";

export default function AvgAQI({
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
      IconClass="mdi:cloud"
      description="AQI Level"
      value={data}
    />
  );
}
