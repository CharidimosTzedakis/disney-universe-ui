import { Button } from "antd";
import classes from "./charactersPieChart.module.scss";
import { exportToExcel } from "./helpers";
import type { FilmsPieChartDataPoint } from "@stores/chartStore";

export default function exportToExcelButton({
  dataForExport,
}: {
  dataForExport: FilmsPieChartDataPoint[];
}) {
  return (
    <Button
      type="primary"
      className={classes.exportToExcelBtn}
      onClick={() => exportToExcel(dataForExport)}
    >
      Export to excel
    </Button>
  );
}
