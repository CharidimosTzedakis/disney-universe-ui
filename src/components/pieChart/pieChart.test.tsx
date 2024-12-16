import { expect, describe, it } from "vitest";
import { render } from "@testing-library/react";
import CharactersPieChart from "@components/pieChart";
import { pieChartDataPoints } from "@test/fixtures";
import useChartsStore from "@stores/chartStore";

describe("<CharactersPieChart/>", () => {
  it("should render correctly", async () => {
    useChartsStore.getState().filmsPieChart.data = [...pieChartDataPoints];
    const { container } = render(<CharactersPieChart />);

    container.querySelectorAll('[id^="highcharts-"]').forEach((element) => {
      element.id = "highcharts-placeholder-id";
    });

    expect(container).toMatchSnapshot();
  });
});
