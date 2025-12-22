"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

interface ExportButtonProps {
  onExportExcel?: () => void;
  isExporting?: boolean;
  className?: string;
}

export default function ExportButton({
  onExportExcel,
  isExporting = false,
  className = "",
}: ExportButtonProps) {
  return (
    <Button
      variant="flat"
      color="success"
      className={className}
      isLoading={isExporting}
      startContent={!isExporting && <Icon icon="mdi:file-excel" className="text-lg" />}
      onPress={onExportExcel}
    >
      Export Excel
    </Button>
  );
}
