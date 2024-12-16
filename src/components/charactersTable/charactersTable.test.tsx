import { expect, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "urql";
import useSearchStore from "@stores/searchStore";
import CharactersTable from "./index";
import { fromValue, never } from "wonka";
import { characterItems } from "@test/fixtures";
import useChartsStore from "@stores/chartStore.ts";

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

    it("navigates to previous page", async () => {
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
      const previousPageButton = await screen.findByTitle("Previous Page");
      await userEvent.click(previousPageButton);

      expect(fetchingState.executeQuery).toHaveBeenCalledTimes(3);
      expect(fetchingState.executeQuery).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining({
          variables: {
            filter: {},
            page: 1,
            pageSize: 50,
          },
        }),
        {},
      );
    });

    // it.skip("navigates to a specific page", () => {});
    // it.skip("changes the page size", () => {});
  });

  describe("external state interactions", () => {
    it("updates the films pie chart data", () => {
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
          <CharactersTable onCharacterSelect={() => {}} />
        </Provider>,
      );

      expect(useChartsStore.getState().filmsPieChart.data).toMatchSnapshot();
    });

    it("updates the searchStore with loading state when is fetching data", () => {
      const fetchingState = {
        executeQuery: () => never,
      };

      render(
        <Provider value={fetchingState}>
          <CharactersTable onCharacterSelect={() => {}} />
        </Provider>,
      );

      expect(useSearchStore.getState().isLoading).toBeTruthy();
    });
  });

  describe("data fetching", () => {
    it("fetches character data based on the search filters", () => {
      useSearchStore.getState().setIsLoading(true);
      useSearchStore
        .getState()
        .setSearchFilter({ name: "Achilles", tvShow: "show" });

      const fetchingState = {
        executeQuery: vi.fn(() =>
          fromValue({
            fetching: false,
            data: {
              characters: {
                items: [characterItems[0], characterItems[1]],
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

      expect(fetchingState.executeQuery).toHaveBeenCalledTimes(1);
      expect(fetchingState.executeQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            filter: { name: "Achilles", tvShows: "show" },
            page: 1,
            pageSize: 500,
          },
        }),
        {},
      );
    });
  });
});
