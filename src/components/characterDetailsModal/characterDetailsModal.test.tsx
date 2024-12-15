import { expect, describe, it } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "urql";
import { never, fromValue } from "wonka";
import CharacterDetailsModal from "./index";
import { charactersWithDetails } from "@test/fixtures";

describe("CharacterDetailsModal", () => {
  it("renders correctly in loading state", async () => {
    const fetchingState = {
      executeQuery: () => never,
    };
    render(
      <Provider value={fetchingState}>
        <CharacterDetailsModal
          isOpen={true}
          selectedCharacter={{ id: 2, name: "Achilles" }}
          onClose={() => {}}
        />
      </Provider>,
    );
    expect(document.body).toMatchSnapshot();
  });

  it("renders details for a specific character", async () => {
    const fetchingState = {
      executeQuery: () =>
        fromValue({
          data: {
            characters: {
              items: [charactersWithDetails[0]],
            },
          },
        }),
    };

    render(
      <Provider value={fetchingState}>
        <CharacterDetailsModal
          isOpen={true}
          selectedCharacter={{ id: 1, name: "Achilles" }}
          onClose={() => {}}
        />
      </Provider>,
    );
    expect(document.body).toMatchSnapshot();
  });
});
