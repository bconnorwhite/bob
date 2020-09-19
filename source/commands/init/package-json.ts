import { prompt } from "inquirer";
import { createCommand } from "commander-version";
import { getString } from "package-run";
import { Scripts } from "types-pkg-json";
import { getPackageJSON, getBuildDir, getBuildIndex } from "../../structure";
import { PackageJSON } from "@bconnorwhite/package";

function except(a: PackageJSON = {}, b: PackageJSON = {}) {
  return Object.keys(a).reduce((retval, key) => {
    if(!Object.keys(b).includes(key)) {
      return {
        ...retval,
        [key]: a[key]
      }
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

export async function initPackageJSON() {
  return getPackageJSON().read().then(async (pkgJSON) => {
    const questions = [];
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
      questions.push({
        type: "input",
        name: "author.name",
        message: "author name:"
      });
    }
    if(pkgJSON?.author === undefined || (typeof pkgJSON.author === "object" && pkgJSON.author.email === undefined)) {
      questions.push({
        type: "input",
        name: "author.email",
        message: "author email:"
      });
    }
    if(pkgJSON?.author === undefined || (typeof pkgJSON?.author === "object" && pkgJSON?.author.url === undefined)) {
      questions.push({
        type: "input",
        name: "author.url",
        message: "author url:"
      });
    }
    if(pkgJSON?.homepage === undefined) {
      questions.push({
        type: "input",
        name: "homepage"
      });
    }
    if(pkgJSON?.repository === undefined) {
      questions.push({
        type: "input",
        name: "githubUsername",
        message: "GitHub username:"
      });
    }
    if(pkgJSON?.license === undefined) {
      questions.push({
        type: "input",
        name: "license"
      });
    }
    return prompt(questions).then(async (answers) => {
      const name = answers.name ?? pkgJSON?.name;
      const repositoryURL = name && answers.githubUsername
        ? `git+https://github.com/${answers.githubUsername}/${name}.git`
        : typeof pkgJSON?.repository === "object" ? pkgJSON?.repository?.url : undefined;
      const ordered = {
        name: answers.name ?? pkgJSON?.name,
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
          postversion: pkgJSON?.scripts?.postversion ?? "git push",
          prepublishOnly: pkgJSON?.scripts?.prepublishOnly ?? await getString({ command: "build" })
        }),
        dependencies: pkgJSON?.dependencies,
        devDependencies: pkgJSON?.devDependencies,
        peerDependencies: pkgJSON?.peerDependencies
      };
      return getPackageJSON().write({
        ...ordered,
        ...except(pkgJSON, ordered)
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
