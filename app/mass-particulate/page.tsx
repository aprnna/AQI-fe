"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { year: "2020", PM10: 10, IDK: 30},
  { year: "2021", PM10: 15, IDK: 28},
  { year: "2022", PM10: 18, IDK: 32},
  { year: "2023", PM10: 22, IDK: 35},
  { year: "2024", PM10: 25, IDK: 33}
];

const chartConfig = {
  PM10:    { label: "CO",    color: "#ff4d4f" },
  IDK:   { label: "NO₂",   color: "#4dabf7" }
};

export default function MassParticulatePage() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Mass Particulate Matter Trends</CardTitle>
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
              <XAxis dataKey="year" tickMargin={10} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {
                Object.keys(chartConfig).map((key) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={chartConfig[key as keyof typeof chartConfig].color}
                    strokeWidth={2}
                    dot={false}
                  />
                ))
              }
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Mass Particulate Matter Trends 2020 - 2025
        </div>
      </CardFooter>
    </Card>
  );
}
