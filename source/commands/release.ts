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
import versionExists from "version-exists";

function getReleaseType() {
  return new Promise((resolve: (value?: conventionalRecommendedBump.Callback.Recommendation.ReleaseType) => void) => {
    conventionalRecommendedBump({ preset: "angular" }, (_error, { releaseType }) => {
      resolve(releaseType);
    });
  })
}

async function getVersion(packageName = "", oldVersion = "1.0.0", releaseType: conventionalRecommendedBump.Callback.Recommendation.ReleaseType) {
  return versionExists(packageName, oldVersion).then((exists) => {
    if(exists) {
      return inc(oldVersion, releaseType) ?? "1.0.0";
    } else {
      return oldVersion;
    }
  });
}

async function getCommitSHA() {
  return exec("git", ["rev-parse", "HEAD"]).then(async (result) => {
    return result.textOutput;
  });
}

export async function sendToCoveralls(): Promise<void> {
  return getCoverageLCOV().read().then(async (lcov = "") => {
    return new Promise((resolve) => {
      handleInput(lcov, (err) => {
        if(err) {
          console.error(err);
        }
        resolve();
      });
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
                    await push();
                    const sha = await getCommitSHA();
                    await sendToCoveralls();
                    await octokit.repos.createCommitStatus({
                      owner: repoName[0],
                      repo: repoName[1],
                      sha,
                      state: "success"
                    });
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
