import Highcharts from "highcharts";
import { useShallow } from "zustand/shallow";
import HighchartsReact from "highcharts-react-official";
import useChartsStore from "@stores/chartStore";
import ExportToExcelButton from "./exportToExcelButton";
import { options } from "./pieChartConfig";
import classes from "./charactersPieChart.module.scss";

export default function CharactersPieChart() {
  const { filmsPieChart } = useChartsStore(
    useShallow((state) => ({ filmsPieChart: state.filmsPieChart })),
  );

  return (
    <div className={classes.pieChartContainer}>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          ...options,
          series: {
            ...options.series,
            data: filmsPieChart.data,
          },
        }}
      />
      <ExportToExcelButton dataForExport={filmsPieChart.data} />
    </div>
  );
}
