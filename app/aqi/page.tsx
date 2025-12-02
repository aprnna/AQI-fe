"use client";

import { title } from "@/components/primitives";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { date: "2024-01", value: 42 },
  { date: "2024-02", value: 55 },
  { date: "2024-03", value: 48 },
  { date: "2024-04", value: 62 },
  { date: "2024-05", value: 51 },
  { date: "2024-06", value: 70 },
  { date: "2024-07", value: 65 },
  { date: "2024-08", value: 78 },
  { date: "2024-09", value: 72 },
  { date: "2024-10", value: 85 },
  { date: "2024-11", value: 91 },
  { date: "2024-12", value: 88 },
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
        <CardTitle>AQI Time Series</CardTitle>
        <CardDescription>January – December 2024</CardDescription>
    </CardHeader>
    <CardContent className="flex-1">
        <ChartContainer
            config={chartConfig}
            className="mx-auto w-full h-[350px]"
        >
        <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickMargin={10} />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
            type="monotone"
            dataKey="value"
            stroke={chartConfig.value.color}
            strokeWidth={2}
            dot />
        </LineChart>
        </ResponsiveContainer>
        </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none font-medium">
                AQI trend summary for 2024
            </div>
        </CardFooter>
    </Card>
);
}
