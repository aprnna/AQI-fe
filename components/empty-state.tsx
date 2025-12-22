"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import clsx from "clsx";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  variant?: "default" | "compact" | "card";
}

export default function EmptyState({
  icon = "mdi:database-off",
  title = "No data available",
  description = "There is no data to display for the selected filters.",
  actionLabel,
  onAction,
  className = "",
  variant = "default",
}: EmptyStateProps) {
  if (variant === "compact") {
    return (
      <div
        className={clsx(
          className,
          "flex items-center gap-3 p-4 rounded-xl",
          "bg-neutral-100 dark:bg-neutral-800/50"
        )}
      >
        <Icon icon={icon} className="text-2xl text-neutral-400" />
        <div>
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
            {title}
          </p>
          <p className="text-xs text-neutral-500">{description}</p>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={clsx(
          className,
          "flex flex-col items-center justify-center p-6 rounded-2xl",
          "bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl",
          "border border-neutral-200 dark:border-neutral-700",
          "min-h-[200px]"
        )}
      >
        <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-3">
          <Icon icon={icon} className="text-xl text-neutral-400" />
        </div>
        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">
          {title}
        </p>
        <p className="text-xs text-neutral-500 text-center max-w-[200px]">
          {description}
        </p>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        className,
        "flex flex-col items-center justify-center p-12 rounded-3xl",
        "bg-gradient-to-br from-neutral-50 to-neutral-100",
        "dark:from-neutral-900 dark:to-neutral-800",
        "border border-neutral-200 dark:border-neutral-700"
      )}
    >
      <div className="w-20 h-20 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mb-6">
        <Icon icon={icon} className="text-4xl text-neutral-400" />
      </div>
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
        {title}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center max-w-sm mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          color="primary"
          variant="flat"
          startContent={<Icon icon="mdi:refresh" />}
          onPress={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
