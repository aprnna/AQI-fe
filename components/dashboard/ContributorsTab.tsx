"use client";

import React from "react";
import PieGases from "@/components/charts/pie-gases";
import PiePM10 from "@/components/charts/pie-pm10";
import PiePM25 from "@/components/charts/pie-pm25";
import PieAQI from "@/components/charts/pie-AQI";
import { PieChartDataPoint } from "@/types";

interface ContributorsTabProps {
  pieGases: PieChartDataPoint[];
  piePM10: PieChartDataPoint[];
  piePM25: PieChartDataPoint[];
  pieAQI: PieChartDataPoint[];
  isLoading: {
    pieGases: boolean;
    piePM10: boolean;
    piePM25: boolean;
    pieAQI: boolean;
  };
}

export default function ContributorsTab({
  pieGases,
  piePM10,
  piePM25,
  pieAQI,
  isLoading,
}: ContributorsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <PieGases data={pieGases} isLoading={isLoading.pieGases} />
      <PiePM10 data={piePM10} isLoading={isLoading.piePM10} />
      <PiePM25 data={piePM25} isLoading={isLoading.piePM25} />
      <PieAQI data={pieAQI} isLoading={isLoading.pieAQI} />
    </div>
  );
}
