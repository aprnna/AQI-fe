import { Icon } from "@iconify/react";
import clsx from "clsx";
import React from "react";
import { title } from "@/components/primitives";

export default function DashboardItem({
  IconClass,
  description,
  value,
  isLoading,
  className,
}: {
  IconClass: string;
  description: string;
  value: number;
  isLoading?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        className,
        "rounded-2xl p-5 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl",
        "shadow-lg hover:shadow-xl transition-all duration-300",
        "border border-white/30 dark:border-neutral-800",
        "flex items-center gap-5 cursor-pointer hover:scale-[1.02]"
      )}
    >
      {/* Icon wrapper */}
      <div
        className={clsx(
          "flex items-center justify-center rounded-xl",
          "bg-gradient-to-br from-primary/20 to-primary/10",
          "w-14 h-14"
        )}
      >
        <Icon icon={IconClass} className="text-3xl text-primary" />
      </div>

      {/* Text content */}
      <div className="text-left">
        {isLoading ? (
          <p className="text-sm opacity-70">Loading...</p>
        ) : (
          <h2 className={clsx(title({ size: "sm" }), "leading-tight")}>
            {value}
          </h2>
        )}
        <p className="text-sm opacity-70">{description}</p>
      </div>
    </div>
  );
}
