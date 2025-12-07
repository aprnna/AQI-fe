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
  { state: "California", part: 275, fill: "#ff4d4f" },
  { state: "Florida", part: 100, fill: "#4dabf7"},
  { state: "Ohio", part: 150, fill: "#82ca9d" },
  { state: "Pennsylvania", part: 50, fill: "#ffa94d" },
  { state: "Texas", part: 50, fill: "#f4d" },
];

const chartConfig = {
  California: { label: "California" },
  Florida: { label: "Florida" },
  Ohio: { label: "Ohio" },
  Pennsylvania: { label: "Pennsylvania" },
  Texas: { label: "Texas" }
} satisfies ChartConfig;

export default function Page() {
  return (
      <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Worst AQI States</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="part" label nameKey="state" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing Worst AQI States
        </div>
      </CardFooter>
    </Card>
  );
}
