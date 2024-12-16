import { expect, describe, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useSearchStore from "@stores/searchStore";
import SearchForm from "./index";

describe("SearchForm", () => {
  it("should render correctly", () => {
    const { container } = render(<SearchForm />);
    expect(container).toMatchSnapshot();
  });

  it("should render as disabled when data are loading", () => {
    useSearchStore.getState().setIsLoading(true);

    const { container } = render(<SearchForm />);
    expect(container).toMatchSnapshot();
  });

  describe("Search button", () => {
    it("should be disabled if no text is typed in the form", () => {
      render(<SearchForm />);
      const searchButton = screen.getByRole("button", { name: /search/i });
      expect(searchButton).toBeDisabled();
    });

    it("should be enabled if text is typed in characterName field", async () => {
      render(<SearchForm />);
      const searchButton = screen.getByRole("button", { name: /search/i });

      const searchField = screen.getByLabelText(/character name/i);
      await userEvent.type(searchField, "Achilles");

      expect(searchButton).toBeEnabled();
    });

    it("should be enabled if text is typed in tvShow field", async () => {
      render(<SearchForm />);

      const searchButton = screen.getByRole("button", { name: /search/i });

      const searchField = screen.getByLabelText(/tv show/i);
      await userEvent.type(searchField, "tv show 1");

      expect(searchButton).toBeEnabled();
    });

    it("should set the search filters in searchStore", async () => {
      render(<SearchForm />);

      const searchButton = screen.getByRole("button", { name: /search/i });
      const searchFieldCharacterName = screen.getByLabelText(/character name/i);
      const searchFieldTvShow = screen.getByLabelText(/tv show/i);

      await userEvent.type(searchFieldCharacterName, "Achilles");
      await userEvent.type(searchFieldTvShow, "tv show 1");
      await userEvent.click(searchButton);

      expect(useSearchStore.getState().searchFilter).toEqual({
        name: "Achilles",
        tvShow: "tv show 1",
      });
    });
  });

  describe("Clear fields button", () => {
    it.only("should clear the form fields", async () => {
      render(<SearchForm />);
      const clearButton = screen.getByRole("button", { name: /Clear fields/i });
      let searchFieldCharacterName = screen.getByLabelText(/character name/i);
      let searchFieldTvShow = screen.getByLabelText(/tv show/i);

      await userEvent.type(searchFieldCharacterName, "Achilles");
      await userEvent.type(searchFieldTvShow, "tv show 1");
      await userEvent.click(clearButton);

      searchFieldCharacterName = screen.getByLabelText(/character name/i);
      searchFieldTvShow = screen.getByLabelText(/tv show/i);

      await waitFor(() => {
        expect(searchFieldCharacterName).toHaveValue("");
        expect(searchFieldTvShow).toHaveValue("");
      });
    });
  });
});
