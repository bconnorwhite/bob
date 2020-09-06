import { createCommand } from "commander";
import { getSourceIndex } from "../../structure";

export type InitSourceArgs = {
  index?: string;
}

export async function initSource({ index }: InitSourceArgs) {
  const sourceIndex = getSourceIndex();
  return sourceIndex.exists().then((exists) => {
    if(!exists) {
      sourceIndex.write(index);
    }
  });
}

export function initSourceAction(args: InitSourceArgs) {
  initSource(args);
}

export default createCommand("source")
  .description("initialize source directory")
  .action(initSourceAction);
