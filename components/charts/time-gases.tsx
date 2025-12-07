"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useGetTimeGasesMutation } from "@/services/dashboard/mutations";
import { Skeleton } from "@heroui/skeleton";
import clsx from "clsx";

// Dummy fallback data (jaga kalau API error)
const dummyData = [
  { Date: "Jan 2020", "NO2 Mean": 12, "CO Mean": 0.4 },
  { Date: "Feb 2020", "NO2 Mean": 10, "CO Mean": 0.35 },
  { Date: "Mar 2020", "NO2 Mean": 8, "CO Mean": 0.3 },
  { Date: "Apr 2020", "NO2 Mean": 9, "CO Mean": 0.28 },
  { Date: "May 2020", "NO2 Mean": 7, "CO Mean": 0.25 },
  { Date: "Jun 2020", "NO2 Mean": 7.5, "CO Mean": 0.24 },
];

const chartConfig = {
  value: {
    label: "AQI",
    color: "#6366F1", // indigo-500
  },
};

export default function TimeGases({
  data,
  isLoading = true,
  className = "",
}: {
  data: any;
  isLoading?: boolean;
  className?: string;
}) {
  return (
    <Card
      className={clsx(
        className,
        "flex flex-col rounded-3xl border border-white/20 dark:border-white/5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-xl transition-all duration-300 hover:shadow-2xl"
      )}
    >
      <CardHeader className="items-center pb-0 pt-4">
        <CardTitle className="text-xl font-semibold tracking-tight">
          Gas Concentration Trend
        </CardTitle>
        <CardDescription>NO₂ & CO levels over time</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0 pt-6 ps-0">
        {isLoading ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <Skeleton className="w-full h-full rounded-xl" />
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="w-full h-[200px]">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.4} />

              <XAxis dataKey="Date" tickMargin={10} tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />

              <ChartTooltip
                content={
                  <ChartTooltipContent className="backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 shadow-lg border rounded-lg" />
                }
              />

              {/* NO₂ Line */}
              <Line
                type="monotone"
                dataKey="NO2 Mean"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm pt-4">
        <div className="flex items-center gap-2 leading-none font-medium opacity-80">
          AQI & gas concentration summary for 2020 - 2025
        </div>
      </CardFooter>
    </Card>
  );
}
