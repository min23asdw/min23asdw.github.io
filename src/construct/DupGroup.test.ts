/**
 * @jest-environment node
 */
import { rowIndices } from "./DupGroup";

describe("rowIndices", () => {
  test("groups card tops into rows, top to bottom", () => {
    // 3-column grid, 2 rows, second row slightly off by a pixel.
    expect(rowIndices([100, 100, 100, 420, 421])).toEqual([0, 0, 0, 1, 1]);
  });

  test("handles unsorted input and single columns", () => {
    expect(rowIndices([700, 100, 400])).toEqual([2, 0, 1]);
  });

  test("returns nothing for no cards", () => {
    expect(rowIndices([])).toEqual([]);
  });
});
