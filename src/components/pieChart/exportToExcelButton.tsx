import { useState } from "react";
import { Button } from "antd";
import classes from "./charactersPieChart.module.scss";
import { exportToExcel } from "./helpers";
import type { FilmsPieChartDataPoint } from "@stores/chartStore";

export default function ExportToExcelButton({
  dataForExport,
}: {
  dataForExport: FilmsPieChartDataPoint[];
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await exportToExcel(dataForExport);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="primary"
      className={classes.exportToExcelBtn}
      loading={loading}
      onClick={handleClick}
    >
      Export to excel
    </Button>
  );
}
