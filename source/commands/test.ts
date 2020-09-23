import { createCommand } from "commander-version";
import run from "package-run";
import { getTestDir } from "../structure";

export async function test() {
  return run({
    command: "jest",
    args: {
      "passWithNoTests": true,
      "coverage": true,
      "coverage-reporters": ["lcov", "text"],
      "config": '{"preset":"ts-jest"}',
      "testPathPattern": getTestDir().path
    }
  }, {
    silent: true
  });
}

export async function testAction() {
  test();
}

export default createCommand("test")
  .description("run tests")
  .action(testAction);
