import { Button } from "antd";
import classes from "./charactersPieChart.module.scss";

export default function exportToExcelButton() {
  return (
    <Button type="primary" className={classes.exportToExcelBtn}>
      Export to excel
    </Button>
  );
}
