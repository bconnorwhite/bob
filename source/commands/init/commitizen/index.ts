import { createCommand } from "commander-version";
import { getCommitizenConfig } from "../../../structure";
import defaultConfig from "./config.json";

export type InitCommitizenArgs = {
  config?: {
    types?: {
      [name: string]: {
        description: string;
      };
    };
  }
};

export async function initCommitizen(args: InitCommitizenArgs = {}) {
  const commitizenConfig = getCommitizenConfig();
  return commitizenConfig.exists().then((exists) => {
    if(!exists) {
      return commitizenConfig.write(args.config ?? defaultConfig);
    } else {
      return undefined;
    }
  });
}

export function initCommitizenAction() {
  initCommitizen();
}

export default createCommand("commitizen")
  .description("initialize .cz.json")
  .action(initCommitizenAction);
