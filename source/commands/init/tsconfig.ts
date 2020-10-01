import { createCommand } from "commander-version";
import { updateTSConfig, UpdateTSConfigArgs } from "../update/tsconfig";
import { getTSConfig } from "../../structure";

export type InitTSConfigArgs = UpdateTSConfigArgs;

export async function initTSConfig(args: InitTSConfigArgs = {}) {
  const tsconfig = getTSConfig();
  return tsconfig.exists().then((exists) => {
    if(!exists) {
      return updateTSConfig(args);
    } else {
      return undefined;
    }
  });
}

export function initTSConfigAction() {
  initTSConfig();
}

export default createCommand("tsconfig")
  .description("initialize tsconfig.json")
  .action(initTSConfigAction);
