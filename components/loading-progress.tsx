"use client";

import React from "react";
import { Progress } from "@heroui/progress";
import clsx from "clsx";

interface LoadingProgressProps {
  isLoading: boolean;
  label?: string;
  className?: string;
  variant?: "bar" | "overlay";
}

export default function LoadingProgress({
  isLoading,
  label = "Loading data...",
  className = "",
  variant = "bar",
}: LoadingProgressProps) {
  if (!isLoading) return null;

  if (variant === "overlay") {
    return (
      <div
        className={clsx(
          className,
          "fixed inset-0 z-50 flex flex-col items-center justify-center",
          "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm"
        )}
      >
        <div className="w-64 space-y-4">
          <Progress
            size="sm"
            isIndeterminate
            aria-label="Loading..."
            classNames={{
              indicator: "bg-gradient-to-r from-primary to-secondary",
            }}
          />
          <p className="text-sm text-center text-neutral-600 dark:text-neutral-400">
            {label}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        className,
        "flex items-center gap-3 p-3 rounded-xl",
        "bg-primary-50 dark:bg-primary-900/20",
        "border border-primary-200 dark:border-primary-800"
      )}
    >
      <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-[200px]"
        classNames={{
          indicator: "bg-gradient-to-r from-primary to-secondary",
        }}
      />
      <span className="text-sm text-primary-700 dark:text-primary-300">
        {label}
      </span>
    </div>
  );
}
