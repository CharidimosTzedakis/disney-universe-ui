import { saveAs } from "file-saver";
import { describe, it, expect, vi, Mock } from "vitest";
import { exportToExcel } from "./helpers";
import { pieChartDataPoints } from "@test/fixtures";

vi.mock("file-saver", () => ({
  saveAs: vi.fn(),
}));

describe("exportToExcel", () => {
  it("should create worksheet with data and write to xlsx file", async () => {
    await exportToExcel(pieChartDataPoints);
    const mockSaveAs = saveAs as unknown as Mock;

    expect(mockSaveAs).toHaveBeenCalledWith(
      expect.any(Blob),
      "characters_films.xlsx",
    );

    const blob = mockSaveAs.mock.calls[0][0];
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    expect(blob.size).toBeGreaterThan(0);
  });
});
