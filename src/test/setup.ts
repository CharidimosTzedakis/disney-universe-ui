import { vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import useSearchStore from "@stores/searchStore";
import useChartsStore from "@stores/chartStore";

window.getComputedStyle = vi.fn().mockImplementation(() => ({
  getPropertyValue: vi.fn().mockReturnValue("value"),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

beforeEach(() => {
  useSearchStore.getState().reset();
  useChartsStore.getState().filmsPieChart.reset();
});
