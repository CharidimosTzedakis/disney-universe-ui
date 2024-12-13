import { Point } from "highcharts";

export const options = {
  chart: {
    type: "pie",
  },
  title: {
    text: "Number of films for characters",
  },
  tooltip: {
    useHTML: true,
    formatter: function (this: Point & { films: string[] }) {
      const listItems = this.films.map((film) => `<li>${film}</li>`).join("");
      return `
        <b>${this.name}</b>: ${this.percentage?.toFixed(1)} %<br/>
        <ul>${listItems}</ul>
      `;
    },
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.y}",
      },
    },
  },
  series: [
    {
      name: "Films",
      colorByPoint: true,
      data: [],
    },
  ],
};
