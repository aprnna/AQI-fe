import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import clsx from "clsx";
import { Skeleton } from "@heroui/skeleton";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { useGetTimeAQIMutation } from "@/services/dashboard/mutations";

export default function TimeAQI2({
  data,
  isLoading,
  className,
  prediksiAQI,
}: {
  data: any;
  prediksiAQI: (years: number) => void;
  isLoading: boolean;
  className?: string;
}) {
  const timeAQIMutation = useGetTimeAQIMutation();

  return (
    <>
      <Card
        className={clsx(
          className,
          "flex flex-col rounded-3xl border border-white/20 dark:border-white/5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-xl transition-all duration-300 hover:shadow-2xl"
        )}
      >
        <CardHeader className=" items-center pb-0 pt-4">
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-xl font-semibold tracking-tight">
                AQI Value Trend
              </CardTitle>
              <CardDescription>AQI value trend over time</CardDescription>
            </div>
            <div>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="flat" color="primary">
                    Prediksi
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Prediksi AQI"
                  onAction={(key) => prediksiAQI(Number(key))}
                >
                  <DropdownItem key="1">Prediksi 1 Tahun</DropdownItem>
                  <DropdownItem key="3">Prediksi 3 Tahun</DropdownItem>
                  <DropdownItem key="5">Prediksi 5 Tahun</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 pb-0 pt-6 ps-0">
          {isLoading ? (
            <div className="w-full h-[300px] flex items-center justify-center">
              <Skeleton className="w-full h-full rounded-xl" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={data} width={600} height={300}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                {/* 1. Area Confidence Interval (Abu-abu transparan) */}
                <Area
                  type="monotone"
                  dataKey="CI_range"
                  fill="#8884d8"
                  stroke="none"
                  opacity={0.3}
                  name="95% Confidence Interval"
                />

                {/* 2. Garis Historis (Solid, Biru) */}
                <Line
                  type="monotone"
                  dataKey="History"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                  name="Historical Data"
                />

                {/* 3. Garis Prediksi (Putus-putus, Hijau) */}
                <Line
                  type="monotone"
                  dataKey="Predicted"
                  stroke="#16a34a"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Forecast"
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </CardContent>

        <CardFooter className="flex-col gap-2 text-sm pt-4">
          <div className="flex items-center gap-2 leading-none font-medium opacity-80">
            AQI value summary for 2020 - 2025
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
