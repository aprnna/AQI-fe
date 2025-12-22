"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Accordion, AccordionItem } from "@heroui/accordion";
import clsx from "clsx";

interface TimeSeriesRecommendation {
  Title: string;
  Description: string;
}

interface TimeSeriesRecommendationsProps {
  contextUsed?: string;
  recommendations: TimeSeriesRecommendation[];
  isLoading?: boolean;
}

const TimeSeriesRecommendations: React.FC<TimeSeriesRecommendationsProps> = ({
  contextUsed,
  recommendations,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 gap-4">
        {[1, 2].map((i) => (
          <Card key={i} className="w-full">
            <CardBody className="gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-default-200 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-default-200 rounded-lg w-3/4 animate-pulse" />
                  <div className="h-4 bg-default-100 rounded-lg w-full animate-pulse" />
                  <div className="h-4 bg-default-100 rounded-lg w-5/6 animate-pulse" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-4">
      {/* Context Badge */}
      {contextUsed && (
        <div className="flex items-center gap-2">
          <Chip
            startContent={<span className="text-lg">🔮</span>}
            variant="flat"
            color="secondary"
            size="lg"
            className="h-full"
            classNames={{ content: "w-full h-full max-w-full text-wrap" }}
          >
            <span className="font-semibold w-full">Berdasarkan:</span>
            <span className="ml-2 text-default-600 w-full">{contextUsed}</span>
          </Chip>
        </div>
      )}

      {/* Recommendations List */}
      <div className="grid grid-cols-1 gap-4">
        {recommendations.map((rec, index) => {
          const icons = ["📊", "💡"];
          const colors: ("primary" | "secondary")[] = ["primary", "secondary"];

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
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-default-100 text-xl">
                          {icons[index % 2]}
                        </div>
                      </div>
                    }
                    title={
                      <div className="flex flex-col gap-2">
                        <span className="font-bold text-base">{rec.Title}</span>
                        <Chip size="sm" color={colors[index % 2]} variant="flat">
                          Rekomendasi Prediksi {index + 1}
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
    </div>
  );
};

// Main View Component
export default function TimeSeriesRecommendationsView({
  data,
  isLoading,
  className,
}: {
  data: any;
  isLoading: boolean;
  className?: string;
}) {
  if (!data && !isLoading) {
    return null;
  }

  return (
    <Card
      className={clsx(
        className,
        "rounded-3xl border p-5 gap-2 border-white/20 dark:border-white/5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300"
      )}
    >
      <CardHeader className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-2">🔮 Rekomendasi Aksi Prediksi</h1>
        <p className="text-sm text-default-600">
          Langkah-langkah yang dapat diambil stakeholder berdasarkan hasil prediksi kualitas udara
        </p>
      </CardHeader>

      {/* Recommendations Component */}
      <TimeSeriesRecommendations
        contextUsed={data?.context_used}
        recommendations={data?.response || []}
        isLoading={isLoading}
      />
    </Card>
  );
}
