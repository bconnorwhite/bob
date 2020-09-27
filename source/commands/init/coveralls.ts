import { createCommand } from "commander-version";
import { prompt } from "inquirer";
import ConfigStore from "configstore";
import Coveralls, { CreateRepoResponse } from "coveralls-api";
import { getPackageJSON } from "../../structure";
import { getModuleName, getRepoName } from "../../utils";

export type InitCoverallsArgs = {
  configPackageName?: string;
}

export async function initCoveralls(args: InitCoverallsArgs = {}) {
  return getPackageJSON().read().then((pkgJSON) => {
    const repoName = getRepoName(pkgJSON);
    if(repoName) {
      return getModuleName(args.configPackageName).then(async (moduleName) => {
        const config = moduleName ? new ConfigStore(moduleName) : undefined;
        return prompt([{
          type: "input",
          name: "coverallsToken",
          message: "Coveralls token:",
          default: config?.get("coverallsToken")
        }]).then((answers): Promise<CreateRepoResponse | undefined> => {
          config?.set("coverallsToken", answers.coverallsToken);
          if(answers.coverallsToken) {
            const coveralls = new Coveralls(answers.coverallsToken);
            return coveralls.createRepo({
              service: "github",
              name: repoName
            });
          } else {
            return Promise.resolve(undefined);
          }
        });
      });
    } else {
      return undefined;
    }
  });
}

export async function initCoverallsAction() {
  initCoveralls();
}

export default createCommand("coveralls")
  .description("initialize Coveralls repo")
  .action(initCoverallsAction);
