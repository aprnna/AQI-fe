"use client";
import React from "react";
import { Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import clsx from "clsx";
import { Skeleton } from "@heroui/skeleton";

const COLORS = [
  "#6366F1", // indigo
  "#10B981", // green
  "#F59E0B", // amber
  "#EF4444", // red
  "#3B82F6", // blue
  "#A855F7", // purple
  "#14B8A6", // teal
  "#F97316", // orange
];

export default function PieGases({
  data = [],
  isLoading = false,
  className = "",
}: {
  data: any[];
  isLoading?: boolean;
  className?: string;
}) {
  const renderedData = data?.length ? data : [];

  return (
    <Card
      className={clsx(
        className,
        "rounded-3xl border gap-2 border-white/20 dark:border-white/5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300"
      )}
    >
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl font-semibold tracking-tight">
          Gas Contributors
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col pt-4 flex-grow items-center justify-center overflow-visible">
        {isLoading ? (
          <Skeleton className="w-32 h-32 rounded-full" />
        ) : (
          <ChartContainer
            className="w-full flex justify-centeritems-center py-2 flex-grow"
            config={{}}
          >
            <PieChart width={150} height={500}>
              <ChartTooltip
                content={
                  <ChartTooltipContent className="backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 shadow-lg border rounded-lg" />
                }
              />

              <Pie
                data={renderedData}
                dataKey="Total_Mass"
                nameKey="Name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                labelLine={false}
                animationDuration={600}
              >
                {renderedData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm w-full px-4">
          {renderedData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="font-medium">{item.Name}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-center pt-3 text-sm text-muted-foreground">
        Distribution of total gas mass
      </CardFooter>
    </Card>
  );
}
