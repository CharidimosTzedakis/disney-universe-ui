import { expect, describe, it } from "vitest";
import { render } from "@testing-library/react";
import ClearSearchResultsButton from "./index";
import useSearchStore from "@stores/searchStore";

describe("<ClearSearchResultsButton/>", () => {
  it("should render correctly", () => {
    useSearchStore.getState().searchMode = true;
    useSearchStore.getState().isLoading = false;

    const { container } = render(<ClearSearchResultsButton />);

    expect(container).toMatchSnapshot();
  });

  it("should not render when data is loading", () => {
    useSearchStore.getState().searchMode = true;
    useSearchStore.getState().isLoading = true;

    const { container } = render(<ClearSearchResultsButton />);
    expect(container.firstChild).toBeNull();
  });

  it("should not render when not in search mode", () => {
    useSearchStore.getState().searchMode = false;
    useSearchStore.getState().isLoading = false;

    const { container } = render(<ClearSearchResultsButton />);
    expect(container.firstChild).toBeNull();
  });
});
