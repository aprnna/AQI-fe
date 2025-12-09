"use client";

import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Accordion, AccordionItem } from "@heroui/accordion";
import clsx from "clsx";

interface Recommendation {
  Title: string;
  Description: string;
}

interface AQIRecommendationsProps {
  contextUsed?: string;
  recommendations: Recommendation[];
  isLoading?: boolean;
}

const iconMap: Record<number, string> = {
  0: "💡",
  1: "📈",
  2: "👥",
  3: "📊",
};

const colorMap: Record<
  number,
  "success" | "primary" | "secondary" | "warning"
> = {
  0: "success",
  1: "primary",
  2: "secondary",
  3: "warning",
};

const AQIRecommendations: React.FC<AQIRecommendationsProps> = ({
  contextUsed,
  recommendations,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="w-full">
            <CardBody className="gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-default-200 rounded-lg animate-pulse"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-default-200 rounded-lg w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-default-100 rounded-lg w-full animate-pulse"></div>
                  <div className="h-4 bg-default-100 rounded-lg w-5/6 animate-pulse"></div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Context Badge */}
      {contextUsed && (
        <div className="flex items-center gap-2">
          <Chip
            startContent={<span className="text-lg">📊</span>}
            variant="flat"
            color="default"
            size="lg"
          >
            <span className="font-semibold">Analisis berdasarkan:</span>
            <span className="ml-2 text-default-600">{contextUsed}</span>
          </Chip>
        </div>
      )}

      {/* Recommendations Grid with Accordion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, index) => {
          const color = colorMap[index % 4];

          return (
            <Card key={index} className="w-full h-fit" shadow="sm">
              <CardBody className="p-0">
                <Accordion
                  variant="splitted"
                  className="px-0"
                  itemClasses={{
                    base: "px-0",
                    title: "font-bold text-base",
                    trigger: "px-4 py-4 data-[hover=true]:bg-default-100",
                    indicator: "text-default-500",
                    content: "px-4 pb-4 pt-0",
                  }}
                >
                  <AccordionItem
                    key={index}
                    aria-label={rec.Title}
                    startContent={
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-default-100 text-2xl">
                          {iconMap[index % 4]}
                        </div>
                      </div>
                    }
                    title={
                      <div className="flex flex-col gap-2">
                        <span className="font-bold text-base">{rec.Title}</span>
                        <Chip size="sm" color={color} variant="flat">
                          Rekomendasi {index + 1}
                        </Chip>
                      </div>
                    }
                  >
                    <p className="text-default-700 text-sm leading-relaxed">
                      {rec.Description}
                    </p>
                  </AccordionItem>
                </Accordion>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Info Card */}
      <Card className="bg-primary-50 border-l-4 border-primary">
        <CardBody>
          <div className="flex items-start gap-3">
            <div className="text-2xl">ℹ️</div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary-900 mb-1">
                Rekomendasi ini dihasilkan berdasarkan analisis data AQI
              </p>
              <p className="text-sm text-primary-700">
                Klik pada setiap kartu untuk melihat detail lengkap rekomendasi
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card shadow="sm">
          <CardBody className="text-center py-6">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="font-bold text-lg mb-2">Berbasis Data</h3>
            <p className="text-sm text-default-600">
              Rekomendasi dihasilkan dari analisis mendalam data AQI real-time
            </p>
          </CardBody>
        </Card>

        <Card shadow="sm">
          <CardBody className="text-center py-6">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-lg mb-2">Actionable</h3>
            <p className="text-sm text-default-600">
              Setiap rekomendasi dapat langsung diterapkan oleh pemangku
              kepentingan
            </p>
          </CardBody>
        </Card>

        <Card shadow="sm">
          <CardBody className="text-center py-6">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="font-bold text-lg mb-2">Kolaboratif</h3>
            <p className="text-sm text-default-600">
              Melibatkan peran aktif pemerintah, industri, dan masyarakat
            </p>
          </CardBody>
        </Card> */}
      {/* </div> */}
    </div>
  );
};

// CONTOH PENGGUNAAN
export default function AQIRecommendationsView({
  data,
  isLoading,
  className,
}: {
  data: any;
  isLoading: boolean;
  className?: string;
}) {
  return (
    <Card
      className={clsx(
        className,
        "rounded-3xl border p-5 gap-2 border-white/20 dark:border-white/5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300"
      )}
    >
      <CardHeader className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold mb-3">Rekomendasi Kualitas Udara</h1>
        <p className="text-lg text-default-600">
          Langkah-langkah yang dapat diambil untuk mempertahankan dan
          meningkatkan kualitas udara
        </p>
      </CardHeader>

      {/* Recommendations Component */}
      <AQIRecommendations
        contextUsed={data?.context_used}
        recommendations={data?.response || []}
        isLoading={isLoading}
      />
    </Card>
  );
}
