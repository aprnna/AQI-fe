"use client";

import { useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/select";
import { DateRangePicker } from "@heroui/date-picker";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { Button } from "@heroui/button";

import TimeGases from "@/components/charts/time-gases";
import TimeAQI from "@/components/charts/time-aqi";
import TimePM from "@/components/charts/time-pm";
import SumGases from "@/components/charts/sum-gases";
import AvgAQI from "@/components/charts/avg-aqi";
import AvgPM2 from "@/components/charts/avg-pm2";
import AvgPM10 from "@/components/charts/avg-pm10";

import { useGetStates } from "@/services/dashboard/queries";
import {
  useGetTimeGasesMutation,
  useGetTimeAQIMutation,
  useGetTimePMMutation,
  useGetSumGasesMutation,
  useGetAVGAQIMutation,
  useGetAVGPM25Mutation,
  useGetAVGPM10Mutation,
  useGetContributGasesMutation,
  useGetContributPM25Mutation,
  useGetContributPM10Mutation,
  useGetContributAQIMutation,
} from "@/services/dashboard/mutations";
import PieGases from "@/components/charts/pie-gases";
import PiePM10 from "@/components/charts/pie-pm10";
import PiePM25 from "@/components/charts/pie-pm25";
import PieAQI from "@/components/charts/pie-AQI";
import { Input } from "@heroui/input";

export default function Home() {
  const { data: states, isLoading } = useGetStates();

  // FILTER STATE
  const [selectedStates, setSelectedStates] = useState<any>(
    new Set(["Alabama", "California", "Florida", "New York"])
  );
  const [value, setValue] = useState<any>({
    start: parseDate("2020-01-01"),
    end: parseDate("2026-12-30"),
  });
  const [prediksi, setPrediksi] = useState<string>("");

  // DATE FORMATTER
  const formatter = useDateFormatter({ dateStyle: "long" });

  // MUTATIONS (semua chart)
  const timeGasesMutation = useGetTimeGasesMutation();
  const timeAQIMutation = useGetTimeAQIMutation();
  const timePMMutation = useGetTimePMMutation();

  const pieGasesMutation = useGetContributGasesMutation();
  const piePM25Mutation = useGetContributPM25Mutation();
  const piePM10Mutation = useGetContributPM10Mutation();
  const pieAQIMutation = useGetContributAQIMutation();

  const sumGasesMutation = useGetSumGasesMutation();
  const avgAQIMutation = useGetAVGAQIMutation();
  const avgPM2Mutation = useGetAVGPM25Mutation();
  const avgPM10Mutation = useGetAVGPM10Mutation();

  // DATA STATE PER CHART
  const [dataTimeGases, setDataTimeGases] = useState([]);
  const [dataTimeAQI, setDataTimeAQI] = useState([]);
  const [dataTimePM, setDataTimePM] = useState([]);

  const [dataPieGases, setDataPieGases] = useState([]);
  const [dataPiePM25, setDataPiePM25] = useState([]);
  const [dataPiePM10, setDataPiePM10] = useState([]);
  const [dataPieAQI, setDataPieAQI] = useState([]);

  const [dataSumGases, setDataSumGases] = useState<any>();
  const [dataAvgAQI, setDataAvgAQI] = useState<any>();
  const [dataAvgPM2, setDataAvgPM2] = useState<any>();
  const [dataAvgPM10, setDataAvgPM10] = useState<any>();

  // APPLY FILTERS TO ALL CHARTS
  function filterDashboard() {
    const start = value.start;
    const end = value.end;
    const payload = {
      start_month: start.month.toString(),
      end_month: end.month.toString(),
      start_year: start.year.toString(),
      end_year: end.year.toString(),
      states: Array.from(selectedStates) as string[],
      predict_type: prediksi ? parseInt(prediksi) : undefined,
    };

    // TIME GASES
    timeGasesMutation.mutate(payload, {
      onSuccess: (data) => setDataTimeGases(data),
    });

    // TIME AQI
    timeAQIMutation.mutate(payload, {
      onSuccess: (data) => setDataTimeAQI(data),
    });

    // TIME PM
    timePMMutation.mutate(payload, {
      onSuccess: (data) => setDataTimePM(data),
    });

    // SUM GASES
    sumGasesMutation.mutate(payload, {
      onSuccess: (data) => setDataSumGases(data),
    });

    // PIE CHARTS
    pieGasesMutation.mutate(payload, {
      onSuccess: (data) => setDataPieGases(data),
    });
    piePM25Mutation.mutate(payload, {
      onSuccess: (data) => setDataPiePM25(data),
    });
    piePM10Mutation.mutate(payload, {
      onSuccess: (data) => setDataPiePM10(data),
    });
    pieAQIMutation.mutate(payload, {
      onSuccess: (data) => setDataPieAQI(data),
    });

    // AVG CHARTS
    avgAQIMutation.mutate(payload, {
      onSuccess: (data) => setDataAvgAQI(data),
    });

    avgPM2Mutation.mutate(payload, {
      onSuccess: (data) => setDataAvgPM2(data),
    });

    avgPM10Mutation.mutate(payload, {
      onSuccess: (data) => setDataAvgPM10(data),
    });
  }

  useEffect(() => {
    filterDashboard();
    console.log(dataSumGases);
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      <div className="col-span-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DATE RANGE */}
            <div>
              <DateRangePicker
                label="Date range"
                aria-label="Date range"
                value={value}
                onChange={setValue}
              />
            </div>

            {/* STATE SELECT */}
            <div>
              <Select
                className="w-full"
                label="Select states"
                aria-label="select states"
                placeholder="Choose states"
                selectionMode="multiple"
                selectedKeys={selectedStates}
                isLoading={isLoading}
                onSelectionChange={setSelectedStates}
              >
                {states?.map((state: any) => (
                  <SelectItem key={state}>{state}</SelectItem>
                ))}
              </Select>
            </div>
            <Input
              className="w-full"
              label="Prediksi Berapa Tahun ke Depan"
              type="number"
              aria-label="prediksi value"
              value={prediksi}
              onChange={(e) => setPrediksi(e.target.value)}
              placeholder="Masukkan jumlah tahun"
            />
          </div>

          {/* ACTION BUTTON */}
          <div className="flex justify-end mt-6">
            <Button onPress={filterDashboard} color="primary">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* ALL CHARTS */}
      <SumGases
        data={dataSumGases?.Sum}
        isLoading={sumGasesMutation.isPending}
      />
      <AvgAQI data={dataAvgAQI?.Mean} isLoading={avgAQIMutation.isPending} />
      <AvgPM2 data={dataAvgPM2?.Mean} isLoading={avgPM2Mutation.isPending} />
      <AvgPM10 data={dataAvgPM10?.Mean} isLoading={avgPM10Mutation.isPending} />

      <PieGases data={dataPieGases} isLoading={pieGasesMutation.isPending} />
      <PiePM10 data={dataPiePM10} isLoading={piePM10Mutation.isPending} />
      <PiePM25 data={dataPiePM25} isLoading={piePM25Mutation.isPending} />
      <PieAQI data={dataPieAQI} isLoading={pieAQIMutation.isPending} />

      <TimeGases
        className="col-span-2"
        data={dataTimeGases}
        isLoading={timeGasesMutation.isPending}
      />

      <TimeAQI
        className="col-span-2"
        data={dataTimeAQI}
        isLoading={timeAQIMutation.isPending}
      />

      <TimePM
        className="col-span-2"
        data={dataTimePM}
        isLoading={timePMMutation.isPending}
      />
    </section>
  );
}
