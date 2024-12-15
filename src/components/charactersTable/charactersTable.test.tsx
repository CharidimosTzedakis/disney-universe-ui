import { expect, describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "urql";
import CharactersTable from "./index";
import { fromValue } from "wonka";
import { characterItems } from "@test/fixtures";

describe("<CharactersTable />", () => {
  it("renders correctly", () => {
    const fetchingState = {
      executeQuery: () =>
        fromValue({
          fetching: false,
          data: {
            characters: {
              items: characterItems,
            },
          },
        }),
    };

    const { container } = render(
      <Provider value={fetchingState}>
        <CharactersTable onCharacterSelect={() => {}} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it("it invokes callback for rendering modal when a row is selected", async () => {
    const onCharacterSelect = vi.fn();
    const fetchingState = {
      executeQuery: () =>
        fromValue({
          fetching: false,
          data: {
            characters: {
              items: characterItems,
            },
          },
        }),
    };

    render(
      <Provider value={fetchingState}>
        <CharactersTable onCharacterSelect={onCharacterSelect} />
      </Provider>,
    );

    //click a row
    expect(onCharacterSelect).toHaveBeenCalledTimes(1);
  });

  it("renders correctly the search results", () => {});

  describe("pagination", () => {
    it("navigates to previous page", () => {});
    it("navigates to next page", () => {});
    it("navigates to a specific page", () => {});
  });

  describe("external state interactions", () => {
    it("updates the films pie chart data", () => {});
    it("updates the searchStore with loading state when is fetching data", () => {});
  });
  describe("data fetching", () => {
    it("fetches a page of the character table data", () => {});
    it("fetches character data based on the search filters", () => {});
  });
});
