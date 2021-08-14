import { prompt, DistinctQuestion } from "inquirer";
import ConfigStore from "configstore";
import { createCommand } from "commander-version";
import { Scripts } from "types-pkg-json";
import { getPackageJSON, getBuildDir, getBuildIndex } from "../../structure";
import { PackageJSON } from "@bconnorwhite/package";
import { getModuleName } from "../../utils";

type InitPackageJSONArgs = {
  configPackageName?: string;
};

function except(a: PackageJSON = {}, b: PackageJSON = {}) {
  return Object.keys(a).reduce((retval, key) => {
    if(!Object.keys(b).includes(key)) {
      return {
        ...retval,
        [key]: a[key]
      };
    } else {
      return retval;
    }
  }, {} as PackageJSON);
}

function sort(object: Scripts) {
  return Object.keys(object).sort().reduce((retval, key) => {
    retval[key] = object[key];
    return retval;
  }, {} as Scripts);
}

export async function initPackageJSON(args: InitPackageJSONArgs = {}) {
  return getModuleName(args.configPackageName).then(async (moduleName) => {
    const config = moduleName ? new ConfigStore(moduleName) : undefined;
    return getPackageJSON().read().then(async (pkgJSON) => {
      const questions: DistinctQuestion<any>[] = [];
      if(pkgJSON?.name === undefined) {
        questions.push({
          type: "input",
          name: "name"
        });
      }
      if(pkgJSON?.description === undefined) {
        questions.push({
          type: "input",
          name: "description"
        });
      }
      if(pkgJSON?.author === undefined || (typeof pkgJSON.author === "object" && pkgJSON.author.name === undefined)) {
        const configAuthorName = config?.get("authorName");
        questions.push({
          type: "input",
          name: "author.name",
          message: "author name:",
          default: configAuthorName
        });
      }
      if(pkgJSON?.author === undefined || (typeof pkgJSON.author === "object" && pkgJSON.author.email === undefined)) {
        const configAuthorEmail = config?.get("authorEmail");
        questions.push({
          type: "input",
          name: "author.email",
          message: "author email:",
          default: configAuthorEmail
        });
      }
      if(pkgJSON?.author === undefined || (typeof pkgJSON?.author === "object" && pkgJSON?.author.url === undefined)) {
        const configAuthorURL = config?.get("authorURL");
        questions.push({
          type: "input",
          name: "author.url",
          message: "author url:",
          default: configAuthorURL
        });
      }
      if(pkgJSON?.homepage === undefined) {
        questions.push({
          type: "input",
          name: "homepage"
        });
      }
      if(pkgJSON?.repository === undefined) {
        const configGithubUsername = config?.get("githubUsername");
        questions.push({
          type: "input",
          name: "githubUsername",
          message: "GitHub username:",
          default: configGithubUsername
        });
      }
      if(pkgJSON?.license === undefined) {
        questions.push({
          type: "input",
          name: "license"
        });
      }
      return prompt(questions).then(async (answers) => {
        config?.set("authorName", answers.author?.name);
        config?.set("authorEmail", answers.author?.email);
        config?.set("authorURL", answers.author?.url);
        config?.set("githubUsername", answers.githubUsername);
        const name = answers.name ?? pkgJSON?.name;
        const repositoryURL = name && answers.githubUsername ?
          `git+https://github.com/${answers.githubUsername}/${name}.git` :
          typeof pkgJSON?.repository === "object" ? pkgJSON?.repository?.url : undefined;
        const ordered: PackageJSON = {
          name,
          version: pkgJSON?.version ?? "1.0.0",
          description: answers.description ?? pkgJSON?.description,
          license: pkgJSON?.license ?? answers.license,
          private: pkgJSON?.private,
          author: typeof pkgJSON?.author === "string" ? pkgJSON.author : {
            ...(pkgJSON?.author ?? {}),
            ...(answers.author ?? {})
          },
          homepage: answers.homepage ?? pkgJSON?.homepage,
          repository: repositoryURL ? {
            type: "git",
            url: repositoryURL
          }: pkgJSON?.repository,
          contributors: pkgJSON?.contributors,
          keywords: pkgJSON?.keywords ?? [],
          files: pkgJSON?.files ?? [
            getBuildDir().relative
          ],
          main: pkgJSON?.main ?? getBuildIndex().relative,
          bin: pkgJSON?.bin,
          scripts: sort({
            ...(pkgJSON?.scripts ?? {}),
            build: pkgJSON?.scripts?.build ?? "bob build",
            commit: pkgJSON?.scripts?.commit ?? "bob commit",
            lint: pkgJSON?.scripts?.lint ?? "bob lint",
            release: pkgJSON?.scripts?.release ?? "bob publish",
            test: pkgJSON?.scripts?.test ?? "bob test"
          }),
          dependencies: pkgJSON?.dependencies,
          peerDependencies: pkgJSON?.peerDependencies,
          devDependencies: pkgJSON?.devDependencies,
          eslintConfig: pkgJSON?.eslintConfig ?? {
            extends: "eslint-config-bob"
          },
          husky: pkgJSON?.husky ?? {
            hooks: {
              "commit-msg": "bob lint commit"
            }
          },
          npmpackagejsonlint: pkgJSON?.npmpackagejsonlint ?? {
            extends: "npm-package-json-lint-config-bob"
          }
        };
        return getPackageJSON().write({
          ...ordered,
          ...except(pkgJSON, ordered)
        });
      });
    });
  });
}

export function initPackageJSONAction() {
  initPackageJSON();
}

export default createCommand("package-json")
  .description("initialize package.json")
  .action(initPackageJSONAction);
