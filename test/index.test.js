const { list, getSourceDir } = require("../build/index.js");

test("getSourceDir", () => {
  expect(getSourceDir().relative).toBe("source");
});

test("list", () => {
  list().then((result) => {
    expect(Array.isArray(result)).toBe(true);
  })
});

