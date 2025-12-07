"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a label";

const chartData = [
  { gas: "CO", part: 275, fill: "#ff4d4f" },
  { gas: "NO₂", part: 100, fill: "#4dabf7"},
  { gas: "Ozone", part: 150, fill: "#82ca9d" },
  { gas: "SO₂", part: 50, fill: "#ffa94d" },
];

const chartConfig = {
  CO:    { label: "CO" },
  NO2:   { label: "NO₂"},
  Ozone: { label: "Ozone"},
  SO2:   { label: "SO₂"},
} satisfies ChartConfig;

export default function Page() {
  return (
      <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Parts of Gases</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="part" label nameKey="gas" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing total parts of gases
        </div>
      </CardFooter>
    </Card>
  );
}
