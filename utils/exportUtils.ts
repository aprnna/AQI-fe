"use client";

import * as XLSX from "xlsx";

export interface ExportData {
  // Summary data
  aqiValue?: number;
  pm25Value?: number;
  pm10Value?: number;
  gasesValue?: number;
  selectedStates?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  // Map data
  mapData?: any[];
  // Time series data
  timeAQIData?: any[];
  timeGasesData?: any[];
  timePMData?: any[];
  // Pie chart data
  pieGasesData?: any[];
  piePM25Data?: any[];
  piePM10Data?: any[];
  pieAQIData?: any[];
  // Recommendations
  recommendations?: any;
  // Timestamp
  timestamp?: Date;
}

/**
 * Export all dashboard data to Excel file
 */
export function exportToExcel(
  data: ExportData,
  filename: string = "aqi-dashboard-data"
): void {
  try {
    const workbook = XLSX.utils.book_new();
    const dateStr = new Date().toLocaleDateString("en-US").replace(/\//g, "-");

    // ========== SHEET 1: Summary ==========
    const summaryData = [
      ["Air Quality Index Dashboard Report"],
      ["Generated on:", new Date().toLocaleString()],
      [""],
      ["FILTER SETTINGS"],
      ["Date Range:", data.dateRange ? `${data.dateRange.start} - ${data.dateRange.end}` : "N/A"],
      ["Selected States:", data.selectedStates?.join(", ") || "N/A"],
      [""],
      ["SUMMARY METRICS"],
      ["Metric", "Value", "Unit"],
      ["Average AQI", data.aqiValue?.toFixed(2) || "N/A", "-"],
      ["Average PM2.5", data.pm25Value?.toFixed(2) || "N/A", "μg/m³"],
      ["Average PM10", data.pm10Value?.toFixed(2) || "N/A", "μg/m³"],
      ["Total Gases", data.gasesValue?.toFixed(2) || "N/A", "ppb"],
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);

    // Set column widths
    summarySheet["!cols"] = [{ wch: 20 }, { wch: 40 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    // ========== SHEET 2: State AQI Data (Map Data) ==========
    if (data.mapData && data.mapData.length > 0) {
      const mapHeaders = ["State Name", "Mean AQI Value", "AQI Category"];
      const mapRows = data.mapData.map((item: any) => [
        item["State Name"] || item.name || "",
        item["Mean AQI Value"] || item.aqiValue || "",
        item["AQI Category"] || item.category || "",
      ]);
      const mapSheetData = [mapHeaders, ...mapRows];
      const mapSheet = XLSX.utils.aoa_to_sheet(mapSheetData);
      mapSheet["!cols"] = [{ wch: 20 }, { wch: 15 }, { wch: 25 }];
      XLSX.utils.book_append_sheet(workbook, mapSheet, "State AQI");
    }

    // ========== SHEET 3: Time Series AQI ==========
    if (data.timeAQIData && data.timeAQIData.length > 0) {
      const timeAQISheet = XLSX.utils.json_to_sheet(data.timeAQIData);
      XLSX.utils.book_append_sheet(workbook, timeAQISheet, "Time Series AQI");
    }

    // ========== SHEET 4: Time Series Gases ==========
    if (data.timeGasesData && data.timeGasesData.length > 0) {
      const timeGasesSheet = XLSX.utils.json_to_sheet(data.timeGasesData);
      XLSX.utils.book_append_sheet(workbook, timeGasesSheet, "Time Series Gases");
    }

    // ========== SHEET 5: Time Series PM ==========
    if (data.timePMData && data.timePMData.length > 0) {
      const timePMSheet = XLSX.utils.json_to_sheet(data.timePMData);
      XLSX.utils.book_append_sheet(workbook, timePMSheet, "Time Series PM");
    }

    // ========== SHEET 6: Contribution Gases ==========
    if (data.pieGasesData && data.pieGasesData.length > 0) {
      const pieGasesSheet = XLSX.utils.json_to_sheet(data.pieGasesData);
      XLSX.utils.book_append_sheet(workbook, pieGasesSheet, "Contribution Gases");
    }

    // ========== SHEET 7: Contribution PM2.5 ==========
    if (data.piePM25Data && data.piePM25Data.length > 0) {
      const piePM25Sheet = XLSX.utils.json_to_sheet(data.piePM25Data);
      XLSX.utils.book_append_sheet(workbook, piePM25Sheet, "Contribution PM2.5");
    }

    // ========== SHEET 8: Contribution PM10 ==========
    if (data.piePM10Data && data.piePM10Data.length > 0) {
      const piePM10Sheet = XLSX.utils.json_to_sheet(data.piePM10Data);
      XLSX.utils.book_append_sheet(workbook, piePM10Sheet, "Contribution PM10");
    }

    // ========== SHEET 9: Contribution AQI ==========
    if (data.pieAQIData && data.pieAQIData.length > 0) {
      const pieAQISheet = XLSX.utils.json_to_sheet(data.pieAQIData);
      XLSX.utils.book_append_sheet(workbook, pieAQISheet, "Contribution AQI");
    }

    // ========== SHEET 10: Recommendations ==========
    if (data.recommendations) {
      const recsData = [
        ["AI RECOMMENDATIONS"],
        ["Context:", data.recommendations.context_used || "N/A"],
        [""],
        ["Recommendations:"],
      ];

      if (data.recommendations.response && Array.isArray(data.recommendations.response)) {
        data.recommendations.response.forEach((rec: any, index: number) => {
          recsData.push([`${index + 1}. ${rec.Title || rec.title || ""}`]);
          recsData.push([rec.Description || rec.description || ""]);
          recsData.push([""]);
        });
      }

      const recsSheet = XLSX.utils.aoa_to_sheet(recsData);
      recsSheet["!cols"] = [{ wch: 80 }];
      XLSX.utils.book_append_sheet(workbook, recsSheet, "Recommendations");
    }

    // Generate and download file
    XLSX.writeFile(workbook, `${filename}-${dateStr}.xlsx`);
  } catch (error) {
    console.error("Error generating Excel:", error);
    alert("Failed to generate Excel file. Please try again.");
  }
}
