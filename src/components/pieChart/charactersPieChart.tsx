import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useChartsStore from "@stores/chartStore";
import { options } from "./pieChartConfig";

export default function CharactersPieChart() {
  const { filmsPieChart } = useChartsStore();

  return (
    <div>
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
    </div>
  );
}
