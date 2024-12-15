import { expect, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "urql";
import useSearchStore from "@stores/searchStore";
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

    const { container } = render(
      <Provider value={fetchingState}>
        <CharactersTable onCharacterSelect={onCharacterSelect} />
      </Provider>,
    );

    const row = container.querySelector('[data-row-key="112"]');
    await userEvent.click(row!);
    expect(onCharacterSelect).toHaveBeenCalledTimes(1);
    expect(onCharacterSelect).toHaveBeenCalledWith({
      id: 112,
      name: "Achilles",
    });
  });

  it("renders correctly the search results", () => {
    const fetchingState = {
      executeQuery: () =>
        fromValue({
          fetching: false,
          data: {
            characters: {
              items: [characterItems[0], characterItems[1]],
            },
          },
        }),
    };
    useSearchStore.setState({ searchMode: true });

    const { container } = render(
      <Provider value={fetchingState}>
        <CharactersTable onCharacterSelect={() => {}} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  describe("pagination", () => {
    it("navigates to next page", async () => {
      const fetchingState = {
        executeQuery: vi.fn(() =>
          fromValue({
            fetching: false,
            data: {
              characters: {
                items: [...characterItems],
              },
            },
          }),
        ),
      };

      render(
        <Provider value={fetchingState}>
          <CharactersTable onCharacterSelect={() => {}} />
        </Provider>,
      );

      const nextPageButton = await screen.findByTitle("Next Page");
      await userEvent.click(nextPageButton);

      expect(fetchingState.executeQuery).toHaveBeenCalledTimes(2);
      expect(fetchingState.executeQuery).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          variables: {
            filter: {},
            page: 2,
            pageSize: 50,
          },
        }),
        {},
      );
    });

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
