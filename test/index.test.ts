import { list, getSourceDir } from "../source";

test("getSourceDir", () => {
  expect(getSourceDir().relative).toBe("source");
});

test("list", () => {
  list().then((result) => {
    expect(Array.isArray(result)).toBe(true);
  });
});

