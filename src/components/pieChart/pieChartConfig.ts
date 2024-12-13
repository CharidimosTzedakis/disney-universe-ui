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
      data: [
        {
          name: "Mikey",
          y: 2,
          films: ["Terminator", "Back to the future"],
        },
        {
          name: "Donald",
          y: 4,
          films: ["Blade runner", "film2", "film3", "film4"],
        },
        {
          name: "Taz",
          y: 7,
          films: [
            "film5",
            "film6",
            "film7",
            "film8",
            "film9",
            "film10",
            "film11",
          ],
        },
        { name: "char1", y: 0, films: [] },
      ],
    },
  ],
};
