import { expect, test } from "bun:test";
import { buildPath } from "../src/utils.ts";

test("buildPath", () => {
  const path = buildPath("/v0/search/subjects/{id}", { id: 1 });
  expect(path).toBe("/v0/search/subjects/1");
});
