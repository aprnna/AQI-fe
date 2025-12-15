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
import { Tabs, Tab } from "@heroui/tabs";

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
  useGetMapAQIMutation,
  useGetAQIRecommendationsMutation,
} from "@/services/dashboard/mutations";
import PieGases from "@/components/charts/pie-gases";
import PiePM10 from "@/components/charts/pie-pm10";
import PiePM25 from "@/components/charts/pie-pm25";
import PieAQI from "@/components/charts/pie-AQI";
import dynamic from "next/dynamic";
import AQIMap from "@/components/charts/aqi-map";
import TestMap from "@/components/charts/test-map";
import USAQIMapView from "@/components/charts/aqi-map";
import { Logo } from "@/components/icons";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { ThemeSwitch } from "@/components/theme-switch";
import Example from "@/components/recomendations";
import AQIRecommendationsView from "@/components/recomendations";

const TimeAQI2 = dynamic(() => import("../components/charts/time-aqi2"), {
  ssr: false,
});

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

  const mapAQIMutation = useGetMapAQIMutation();
  const aqiRecommendationsMutation = useGetAQIRecommendationsMutation();

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

  const [dataMapAQI, setDataMapAQI] = useState<any>();
  const [dataAQIRecommendations, setDataAQIRecommendations] = useState<any>();

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

    // MAP AQI
    mapAQIMutation.mutate(payload, {
      onSuccess: (data) => setDataMapAQI(data),
    });
    // AQI RECOMMENDATIONS
    aqiRecommendationsMutation.mutate(payload, {
      onSuccess: (data) => setDataAQIRecommendations(data),
    });

    setDataAQIRecommendations({
      context_used:
        "AQI, PM2.5, PM10, NO2, SO2, CO, O3 dari tahun 2020 hingga 2026 di negara bagian terpilih. sadsadasd sadsd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd",
      response: [
        {
          Title: "Tingkatkan Ruang Hijau di Area Perkotaan",
          Description:
            "Menanam lebih banyak pohon dan menciptakan taman dapat membantu menyerap polutan udara dan meningkatkan kualitas udara secara keseluruhan.",
        },
        {
          Title: "Promosikan Penggunaan Transportasi Ramah Lingkungan",
          Description:
            "Mendorong penggunaan kendaraan listrik, transportasi umum, bersepeda, dan berjalan kaki untuk mengurangi emisi dari kendaraan bermotor.",
        },
        {
          Title: "Tingkatkan Pengelolaan Limbah Industri",
          Description:
            "Memastikan bahwa pabrik dan industri mematuhi regulasi lingkungan dan menggunakan teknologi bersih untuk mengurangi emisi polutan.",
        },
        {
          Title: "Edukasi Masyarakat tentang Polusi Udara",
          Description:
            "Mengadakan kampanye kesadaran untuk menginformasikan masyarakat tentang dampak polusi udara dan cara-cara untuk menguranginya.",
        },
        {
          Title: "Pantau Kualitas Udara Secara Berkala",
          Description:
            "Menggunakan sensor kualitas udara untuk memantau tingkat polusi secara real-time dan mengambil tindakan cepat jika terjadi peningkatan polutan.",
        },
      ],
    });
  }

  function prediksiAQI(years: number) {
    const start = value.start;
    const end = value.end;
    const payload = {
      start_month: start.month.toString(),
      end_month: end.month.toString(),
      start_year: start.year.toString(),
      end_year: end.year.toString(),
      states: Array.from(selectedStates) as string[],
      predict_type: years,
    };

    timeAQIMutation.mutate(payload, {
      onSuccess: (data) => setDataTimeAQI(data),
    });
  }

  useEffect(() => {
    filterDashboard();
  }, []);

  return (
    <section className="gap-6 p-4">
      <Card className="col-span-4 p-4 rounded-3xl border gap-10 border-white/20 dark:border-white/5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <CardTitle className="flex items-center gap-3">
          <Logo />
          <h2 className="text-lg font-semibold">Air Quality Index Dashboard</h2>
          <ThemeSwitch className="ml-auto" />
        </CardTitle>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </CardContent>

        {/* ACTION BUTTON */}
        <CardFooter className="flex justify-end mt-6">
          <Button onPress={filterDashboard} color="primary">
            Apply Filters
          </Button>
        </CardFooter>
      </Card>
      <Tabs className="col-span-4 mt-6" aria-label="AQI Dashboard Tabs">
        {/* TAB 1: OVERVIEW */}
        <Tab key="overview" title="Overview">
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SumGases
                data={dataSumGases?.Sum}
                isLoading={sumGasesMutation.isPending}
              />
              <AvgAQI
                data={dataAvgAQI?.Mean}
                isLoading={avgAQIMutation.isPending}
              />
              <AvgPM2
                data={dataAvgPM2?.Mean}
                isLoading={avgPM2Mutation.isPending}
              />
              <AvgPM10
                data={dataAvgPM10?.Mean}
                isLoading={avgPM10Mutation.isPending}
              />
            </div>
            <USAQIMapView
              data={dataMapAQI}
              isLoading={mapAQIMutation.isPending}
            />
            <AQIRecommendationsView
              data={dataAQIRecommendations}
              isLoading={aqiRecommendationsMutation.isPending}
            />
          </div>
        </Tab>

        {/* TAB 2: CONTRIBUTION (PIE CHART) */}
        <Tab key="contributors" title="Contributors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PieGases
              data={dataPieGases}
              isLoading={pieGasesMutation.isPending}
            />
            <PiePM10 data={dataPiePM10} isLoading={piePM10Mutation.isPending} />
            <PiePM25 data={dataPiePM25} isLoading={piePM25Mutation.isPending} />
            <PieAQI data={dataPieAQI} isLoading={pieAQIMutation.isPending} />
          </div>
        </Tab>

        {/* TAB 3: TIME SERIES */}
        <Tab key="timeseries" title="Time Series">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TimeAQI2
              className="col-span-2"
              prediksiAQI={prediksiAQI}
              data={dataTimeAQI}
              isLoading={timeAQIMutation.isPending}
            />
            <TimeGases
              data={dataTimeGases}
              isLoading={timeGasesMutation.isPending}
            />
            <TimePM data={dataTimePM} isLoading={timePMMutation.isPending} />
          </div>
        </Tab>
      </Tabs>
    </section>
  );
}
