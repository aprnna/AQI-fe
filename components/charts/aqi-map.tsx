"use client";

import { Skeleton } from "@heroui/skeleton";
import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { subtitle, title } from "../primitives";

// GeoJSON US States - menggunakan TopoJSON yang lebih reliable
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Warna berdasarkan kategori AQI
const AQI_COLORS: Record<string, string> = {
  Good: "#00E400",
  Moderate: "#FFFF00",
  "Unhealthy for Sensitive": "#FF7E00",
  Unhealthy: "#FF0000",
  "Very Unhealthy": "#8F3F97",
};

interface AQIData {
  "State Name": string;
  "AQI Category": string;
  "Mean AQI Value": number;
}

interface USAQIMapProps {
  data: AQIData[];
  isLoading: boolean;
  className?: string;
}

const USAQIMap: React.FC<USAQIMapProps> = ({ data, isLoading }) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // Buat mapping state name ke data AQI
  const stateDataMap = React.useMemo(() => {
    const map: Record<string, AQIData> = {};
    data?.forEach((item) => {
      map[item["State Name"]] = item;
    });
    return map;
  }, [data]);

  // Fungsi untuk mendapatkan warna berdasarkan state
  const getFillColor = (geoName: string) => {
    if (isLoading) {
      return "#eee";
    }

    const stateData = stateDataMap[geoName];
    if (!stateData) {
      return "#ddd";
    }

    return AQI_COLORS[stateData["AQI Category"]] || "#ddd";
  };

  const handleMouseEnter = (geo: any, event: React.MouseEvent) => {
    const stateName = geo.properties.name;
    const stateData = stateDataMap[stateName];

    if (stateData) {
      setTooltipContent(
        `${stateName}\nAQI: ${stateData["Mean AQI Value"]}\nCategory: ${stateData["AQI Category"]}`
      );
    } else {
      setTooltipContent(`${stateName}\nNo Data`);
    }

    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setShowTooltip(true);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="w-full relative">
      <div className="w-full rounded-lg" style={{ height: "500px" }}>
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{
            scale: 1000,
          }}
          width={975}
          height={610}
          style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.name;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getFillColor(stateName)}
                    stroke="#FFFFFF"
                    strokeWidth={0.75}
                    style={{
                      default: {
                        outline: "none",
                        transition: "all 0.2s ease-in-out",
                      },
                      hover: {
                        fill: isLoading ? "#eee" : "#777",
                        outline: "none",
                        cursor: "pointer",
                        strokeWidth: 1.5,
                      },
                      pressed: {
                        outline: "none",
                        fill: "#555",
                      },
                    }}
                    onMouseEnter={(event) => handleMouseEnter(geo, event)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Tooltip */}
      {showTooltip && !isLoading && (
        <div
          style={{
            position: "fixed",
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y + 10,
            background: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "10px 14px",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: "500",
            pointerEvents: "none",
            zIndex: 1000,
            whiteSpace: "pre-line",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {tooltipContent}
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
        {Object.entries(AQI_COLORS).map(([category, color]) => (
          <div key={category} className="flex items-center gap-2">
            <div
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: color,
                border: "2px solid #fff",
                borderRadius: "4px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
            <span className="font-medium">{category}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "#ddd",
              border: "2px solid #fff",
              borderRadius: "4px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          />
          <span className="font-medium">No Data</span>
        </div>
      </div>
    </div>
  );
};

export default function USAQIMapView({
  data,
  isLoading,
  className,
}: USAQIMapProps) {
  return (
    <div className={clsx(className, "space-y-5")}>
      <Card
        className={clsx(
          "rounded-3xl border gap-2 border-white/20 dark:border-white/5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300"
        )}
      >
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl font-semibold tracking-tight">
            US Air Quality Index (AQI) Map
          </CardTitle>
          <CardDescription>
            Hover over a state to see its AQI value and category
          </CardDescription>
        </CardHeader>
        <USAQIMap data={data} isLoading={isLoading} />
      </Card>
      <Card className="rounded-3xl border gap-2 border-white/20 dark:border-white/5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="font-bold text-xl mb-4 text-gray-800">
          <CardTitle>AQI Categories:</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="w-fit font-semibold mr-2 text-green-600">
                Good (0-50):
              </span>
              <span className={clsx(subtitle({ fullWidth: false }))}>
                Air quality is satisfactory, and air pollution poses little or
                no risk
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2 text-yellow-600">
                Moderate (51-100):
              </span>
              <span className={clsx(subtitle({ fullWidth: false }))}>
                Air quality is acceptable for most, however sensitive groups may
                experience minor effects
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2 text-orange-600">
                Unhealthy for Sensitive (101-150):
              </span>
              <span className={clsx(subtitle({ fullWidth: false }))}>
                Members of sensitive groups may experience health effects
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2 text-red-600">
                Unhealthy (151-200):
              </span>
              <span className={clsx(subtitle({ fullWidth: false }))}>
                Everyone may begin to experience health effects; sensitive
                groups may experience more serious effects
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2 text-purple-600">
                Very Unhealthy (201-300):
              </span>
              <span className={clsx(subtitle({ fullWidth: false }))}>
                Health alert: everyone may experience more serious health
                effects
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
