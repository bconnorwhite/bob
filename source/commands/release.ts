/* eslint-disable max-nested-callbacks */
import { createCommand } from "commander-version";
import { inc } from "semver";
import { prompt } from "inquirer";
import ConfigStore from "configstore";
import conventionalRecommendedBump from "conventional-recommended-bump";
import { exec, execAllSeries } from "@bconnorwhite/exec";
import { push } from "./push";
import { prerelease } from "./prerelease";
import { getPackageJSON, getChangelog, getCoverageLCOV } from "../structure";
import { updateChangelog } from "./update";
import { Octokit } from "@octokit/rest";
import { getModuleName, getRepoName } from "../utils";
import { handleInput } from "coveralls";

function getReleaseType() {
  return new Promise((resolve: (value?: conventionalRecommendedBump.Callback.Recommendation.ReleaseType) => void) => {
    conventionalRecommendedBump({ preset: "angular" }, (_error, bump) => {
      resolve(bump.releaseType);
    });
  })
}

export async function release() {
  return prerelease().then(async () => {
    return getReleaseType().then(async (releaseType) => {
      const pkgJSONFile = getPackageJSON();
      return pkgJSONFile.read().then(async (pkgJSON) => {
        const oldVersion = pkgJSON?.version;
        const version = (oldVersion && inc(oldVersion, releaseType)) ?? "1.0.0";
        return pkgJSONFile.merge({ version }).then(async () => {
          return updateChangelog().then(async () => {
            const tag = `v${version}`;
            return execAllSeries([{
              command: "git",
              args: ["add", pkgJSONFile.relative, getChangelog().relative]
            }, {
              command: "git",
              args: ["commit", {
                message: tag
              }]
            }, {
              command: "git",
              args: ["tag", tag]
            }]).then(async () => {
              return getModuleName().then(async (moduleName) => {
                const config = moduleName ? new ConfigStore(moduleName) : undefined;
                return prompt([{
                  type: "input",
                  name: "githubToken",
                  message: "GitHub token:",
                  default: config?.get("githubToken")
                }]).then(async (answers) => {
                  config?.set("githubToken", answers.githubToken);
                  const octokit = new Octokit({
                    auth: answers.githubToken
                  });
                  const repoName = getRepoName(pkgJSON)?.split("/");
                  if(repoName && repoName.length > 1) {
                    let issueNumber: number | undefined;
                    if(version === "1.0.0") {
                      await octokit.issues.create({
                        owner: repoName[0],
                        repo: repoName[1],
                        title: `Release ${tag}`
                      }).then((response) => {
                        issueNumber = response.data.number;
                      });
                    }
                    return push().then(async () => {
                      return exec("git", ["rev-parse", "HEAD"]).then(async (result) => {
                        const sha = result.textOutput;
                        return getCoverageLCOV().read().then(async (lcov) => {
                          return new Promise((resolve) => {
                            handleInput(lcov ?? "", () => {
                              resolve();
                            });
                          }).then(async () => {
                            return octokit.repos.createCommitStatus({
                              owner: repoName[0],
                              repo: repoName[1],
                              sha,
                              state: "success"
                            }).then(() => {
                              if(issueNumber !== undefined) {
                                return octokit.issues.update({
                                  owner: repoName[0],
                                  repo: repoName[1],
                                  issue_number: issueNumber,
                                  state: "closed"
                                });
                              } else {
                                return undefined;
                              }
                            });
                          });
                        });
                      });
                    });
                  } else {
                    return undefined;
                  }
                });
              });
            });
          });
        });
      });
    });
  });
}

export async function releaseAction() {
  release();
}

export default createCommand("release")
  .description("release to GitHub")
  .action(releaseAction);
