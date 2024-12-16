import { expect, describe, it } from "vitest";
import { render } from "@testing-library/react";
import CharactersPieChart from "@components/pieChart";
import { pieChartDataPoints } from "@test/fixtures";
import useChartsStore from "@stores/chartStore";

describe("<CharactersPieChart/>", () => {
  it("should render correctly", () => {
    useChartsStore.getState().filmsPieChart.data = [...pieChartDataPoints];
    const { container } = render(<CharactersPieChart />);

    expect(container).toMatchSnapshot();
  });
});
