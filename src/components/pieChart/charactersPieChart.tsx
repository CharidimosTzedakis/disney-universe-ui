import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { options } from "./pieChartConfig";

export default function CharactersPieChart() {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
