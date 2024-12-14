import { expect, describe, it, vi, beforeAll } from "vitest";
import { render } from "@testing-library/react";
import { never } from "wonka";
import CharacterDetailsModal from "./characterDetailsModal";
import { Provider } from "urql";

vi.mock(import("urql"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    seQuery: vi.fn().mockReturnValue([{ fetching: true }]),
  };
});

describe("CharacterDetailsModal", () => {
  beforeAll(() => {
    global.window.getComputedStyle = vi.fn().mockImplementation(() => ({
      getPropertyValue: vi.fn().mockReturnValue("value"),
    }));
  });

  const fetchingState = {
    executeQuery: () => never,
  };

  it("renders correctly in loading state", async () => {
    render(
      <Provider value={fetchingState}>
        <CharacterDetailsModal
          isOpen
          selectedCharacter={{ id: 2, name: "Achilles" }}
          onClose={() => {}}
        />
      </Provider>,
    );
    expect(document.body).toMatchSnapshot();
  });
});
