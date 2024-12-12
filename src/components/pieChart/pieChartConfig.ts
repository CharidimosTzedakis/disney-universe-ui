export const options = {
  chart: {
    type: "pie",
  },
  title: {
    text: "Number of films for characters",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
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
        format: "<b>{point.name}</b>: {point.percentage:.1f} %",
      },
    },
  },
  series: [
    {
      name: "Share",
      colorByPoint: true,
      data: [
        { name: "Chrome", y: 63.5 },
        { name: "Firefox", y: 18.6 },
        { name: "Edge", y: 9.2 },
        { name: "Safari", y: 4.8 },
        { name: "Other", y: 3.9 },
      ],
    },
  ],
};
