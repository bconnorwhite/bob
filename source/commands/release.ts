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
import Coveralls from "coveralls-api";
import { getModuleName, getRepoName } from "../utils";
import hasVersion from "has-version";

function getReleaseType() {
  return new Promise((resolve: (value?: conventionalRecommendedBump.Callback.Recommendation.ReleaseType) => void) => {
    conventionalRecommendedBump({ preset: "angular" }, (_error, { releaseType }) => {
      resolve(releaseType);
    });
  })
}

const firstVersion = "1.0.0";

export async function getVersion(packageName = "", version = firstVersion, releaseType: conventionalRecommendedBump.Callback.Recommendation.ReleaseType) {
  return hasVersion(packageName, version).then((npmExists) => {
    if(npmExists) {
      return inc(version, releaseType) ?? firstVersion;
    } else {
      return exec("git", ["show-ref", {
        tags: `refs/tags/v${version}`
      }], { silent: true }).then(({ textOutput }) => {
        if(textOutput) {
          return inc(version, releaseType) ?? firstVersion;
        } else {
          return version;
        }
      });
    }
  });
}

async function getCommitSHA() {
  return exec("git", ["rev-parse", "HEAD"], { silent: true }).then(async (result) => {
    return result.textOutput;
  });
}

export async function sendToCoveralls(owner: string, repo: string, config?: ConfigStore) {
  return prompt([{
    type: "input",
    name: "token",
    message: "Coveralls token:",
    default: config?.get("coverallsToken")
  }]).then((answers) => {
    const coveralls = new Coveralls(answers.token);
    return coveralls.postJob("github", owner, repo, {
      lcov_path: getCoverageLCOV().path
    });
  });
}

export async function release() {
  return prerelease().then(async () => {
    return getReleaseType().then(async (releaseType) => {
      const pkgJSONFile = getPackageJSON();
      return pkgJSONFile.read().then(async (pkgJSON) => {
        const oldVersion = pkgJSON?.version;
        const version = await getVersion(pkgJSON?.name, oldVersion, releaseType);
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
                    const [owner, repo] = repoName;
                    let issueNumber: number | undefined;
                    if(version === "1.0.0") {
                      await octokit.issues.create({
                        owner,
                        repo,
                        title: `Release ${tag}`
                      }).then((response) => {
                        issueNumber = response.data.number;
                      });
                    }
                    await push();
                    const sha = await getCommitSHA();
                    await sendToCoveralls(owner, repo, config);
                    await octokit.repos.createCommitStatus({
                      owner,
                      repo,
                      sha,
                      state: "success"
                    });
                    if(issueNumber !== undefined) {
                      return octokit.issues.update({
                        owner,
                        repo,
                        issue_number: issueNumber,
                        state: "closed"
                      });
                    } else {
                      return undefined;
                    }
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
