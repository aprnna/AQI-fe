"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { year: "2020", CO: 10, NO2: 30, Ozone: 20, SO2: 15 },
  { year: "2021", CO: 15, NO2: 28, Ozone: 25, SO2: 18 },
  { year: "2022", CO: 18, NO2: 32, Ozone: 27, SO2: 16 },
  { year: "2023", CO: 22, NO2: 35, Ozone: 30, SO2: 20 },
  { year: "2024", CO: 25, NO2: 33, Ozone: 29, SO2: 22 },
];

const chartConfig = {
  CO:    { label: "CO",    color: "#ff4d4f" },
  NO2:   { label: "NO₂",   color: "#4dabf7" },
  Ozone: { label: "Ozone", color: "#82ca9d" },
  SO2:   { label: "SO₂",   color: "#ffa94d" },
};

export default function MassTrendPage() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Mass Trends of Pollutant Gases</CardTitle>
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
          Mass Trends of Pollutant Gases 2020 - 2025
        </div>
      </CardFooter>
    </Card>
  );
}
