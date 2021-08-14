import { createCommand } from "commander-version";
import { getTestIndex } from "../../structure";

export type InitTestArgs = {
  index?: string;
};

export async function initTest({ index }: InitTestArgs = { index: 'import { test, expect } from "@jest/globals";' }) {
  const testIndex = getTestIndex();
  return testIndex.exists().then((exists) => {
    if(!exists) {
      testIndex.write(index);
    }
  });
}

export function initTestAction() {
  initTest();
}

export default createCommand("test")
  .description("initialize test directory")
  .action(initTestAction);
