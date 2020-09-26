import { createCommand } from "commander-version";
import { prompt } from "inquirer";
import ConfigStore from "configstore";
import { Octokit } from "@octokit/rest";
import isGitRepo from "is-git-repository";
import { getPackageJSON } from "../../../structure";
import { getModuleName } from "../../../utils";

export type InitGitHubArgs = {
  configPackageName?: string;
}

export async function initGitHub(args: InitGitHubArgs = {}) {
  if(isGitRepo()) {
    return getPackageJSON().read().then(async (pkgJSON) => {
      return getModuleName(args.configPackageName).then(async (moduleName) => {
        const config = moduleName ? new ConfigStore(moduleName) : undefined;
        const split = pkgJSON?.name?.split("/") ?? [];
        const name = split.reverse()[0];
        const org = split.reverse()[1]?.replace("@", "");
        return prompt([{
          type: "input",
          name: "name",
          message: "GitHub repo name:",
          default: name
        }, {
          type: "input",
          name: "githubUsername",
          message: "GitHub username:",
          default: config?.get("githubUsername") ?? org
        }, {
          type: "input",
          name: "githubToken",
          message: "GitHub token:",
          default: config?.get("githubToken")
        }]).then((answers) => {
          config?.set("githubUsername", answers.githubUsername);
          config?.set("githubToken", answers.githubToken);
          const octokit = new Octokit({
            auth: answers.githubToken
          });
          return octokit.repos.createForAuthenticatedUser({
            name: answers.name,
            description: pkgJSON?.description,
            homepage: pkgJSON?.homepage,
            private: pkgJSON?.private
          });
        });
      });
    });
  } else {
    return undefined;
  }
}

export async function initGitHubAction() {
  initGitHub();
}

export default createCommand("github")
  .description("initialize GitHub repo")
  .action(initGitHubAction);
