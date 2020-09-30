import { createCommand } from "commander-version";
import run from "package-run";
import ora from "ora";
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
    },
    silent: true
  }, {
    silent: true
  });
}

export async function testAction() {
  const spinner = ora("Running tests").start();
  return test().then(({ output, error }) => {
    spinner.stop();
    if(output) {
      console.info(output);
    }
    if(error) {
      console.error(error);
    }
  });
}

export default createCommand("test")
  .description("run tests")
  .action(testAction);
