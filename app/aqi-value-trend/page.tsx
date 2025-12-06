"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { date: "2020-01", value: 42 },
  { date: "2021-02", value: 55 },
  { date: "2022-03", value: 48 },
  { date: "2023-04", value: 62 },
  { date: "2024-05", value: 51 },
  { date: "2025-06", value: 70 }
];

const chartConfig = {
  value: {
    label: "AQI",
    color: "#8884d8",
  },
};

export default function AqiPage() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>AQI Value Trend</CardTitle>
        <CardDescription>2020 - 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer 
          config={chartConfig} 
          className="w-full h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
            data={data}
            style={{ width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickMargin={10} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={chartConfig.value.color}
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          AQI trend summary for 2020 - 2025
        </div>
      </CardFooter>
    </Card>
  );
}
