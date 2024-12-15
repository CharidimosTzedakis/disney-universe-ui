import { expect, describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "urql";
import { never, fromValue } from "wonka";
import CharacterDetailsModal from "./characterDetailsModal";
import { charactersWithDetails } from "@test/fixtures";

vi.mock(import("urql"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    seQuery: vi.fn().mockReturnValue([{ fetching: true }]),
  };
});

describe("CharacterDetailsModal", () => {
  const fetchingState = {
    executeQuery: () => never,
  };

  it("renders correctly in loading state", async () => {
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
