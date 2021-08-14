import { prompt } from "inquirer";
import { createCommand } from "commander-version";
import { Repository, Dependencies } from "types-pkg-json";
import { getPackageJSON } from "@bconnorwhite/package";
import { getDescriptions } from "npm-description";
import { getLicense } from "spdx-license";
import join from "join-newlines";
import { getConfigStore } from "../../utils";
import { getReadme } from "../../structure";

function title(packageName: string) {
  return `  <h1>${packageName}</h1>\n`;
}

function npmVersion(packageName: string) {
  return join([
    `  <a href="https://npmjs.com/package/${packageName}">`,
    `    <img alt="NPM" src="https://img.shields.io/npm/v/${packageName}.svg">`,
    "  </a>"
  ], true);
}

function gitHubLanguages(gitHubName: string) {
  return join([
    `  <a href="https://github.com/${gitHubName}">`,
    `    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/${gitHubName}.svg">`,
    "  </a>"
  ], true);
}

function coveralls(gitHubName: string) {
  return join([
    `  <a href="https://coveralls.io/github/${gitHubName}?branch=master">`,
    `    <img alt="Coverage Status" src="https://coveralls.io/repos/github/${gitHubName}.svg?branch=master">`,
    "  </a>"
  ], true);
}

function gitHubStars(gitHubName: string) {
  return join([
    `  <a href="https://github.com/${gitHubName}">`,
    `    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/${gitHubName}?label=Stars%20Appreciated%21&style=social">`,
    "  </a>"
  ], true);
}

function twitter(twitterHandle: string) {
  return join([
    `  <a href="https://twitter.com/${twitterHandle}">`,
    `    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/${twitterHandle}.svg?label=%40${twitterHandle}&style=social">`,
    "  </a>"
  ], true);
}

function header(packageName?: string, gitHubName?: string, twitterHandle?: string) {
  return `<div align="center">\n${
    packageName ? title(packageName) : ""
  }${packageName ? npmVersion(packageName) : ""
  }${gitHubName ? gitHubLanguages(gitHubName) : ""
  }${gitHubName ? coveralls(gitHubName) : ""
  }${gitHubName ? gitHubStars(gitHubName) : ""
  }${twitterHandle ? twitter(twitterHandle) : ""
  }</div>\n\n<br />\n\n`;
}

function description(packageDescription?: string) {
  if(packageDescription) {
    return `> ${packageDescription}${packageDescription?.endsWith(".") ? "" : "."}\n\n`;
  } else {
    return "";
  }
}

function installation(packageName?: string) {
  if(packageName) {
    return "## Installation\n\n" +
    "```sh\n" +
    `yarn add ${packageName}\n` +
    "```\n\n" +
    "```sh\n" +
    `npm install ${packageName}\n` +
    "```\n\n";
  } else {
    return undefined;
  }
}

async function packageList(packages: Dependencies) {
  return getDescriptions(Object.keys(packages)).then((descriptions) => {
    return Object.keys(packages).reduce((retval, name) => {
      return `${retval}- [${name}](https://www.npmjs.com/package/${name}): ${descriptions[name]}\n`;
    }, "");
  });
}

function dependencies(gitHubName?: string, packages?: Dependencies) {
  if(gitHubName && packages && Object.keys(packages).length > 0) {
    return packageList(packages).then((list) => {
      return `<br />\n\n<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/${gitHubName}.svg"></h2>\n\n${list}\n`;
    });
  } else {
    return "";
  }
}

function devDependencies(gitHubName?: string, packages?: Dependencies) {
  if(gitHubName && packages && Object.keys(packages).length > 0) {
    return packageList(packages).then((list) => {
      return `<br />\n\n<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/${gitHubName}.svg"></h2>\n\n${list}\n`;
    });
  } else {
    return "";
  }
}

function peerDependencies(gitHubName?: string, packages?: Dependencies) {
  if(gitHubName && packages && Object.keys(packages).length > 0) {
    return packageList(packages).then((list) => {
      return `<br />\n\n<h2>Peer Dependencies<img align="right" alt="David" src="https://img.shields.io/david/peer/${gitHubName}.svg"></h2>\n\n${list}\n`;
    });
  } else {
    return "";
  }
}

function license(packageName?: string, licenseID?: string) {
  if(packageName && licenseID) {
    return getLicense(licenseID).then((result) => {
      if(result !== undefined) {
        return `<br />\n\n<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/${packageName}.svg"></h2>\n\n` +
        `[${licenseID}](${result.url})`;
      } else {
        return "";
      }
    });
  } else {
    return "";
  }
}

function getGitHubName(repo?: Repository) {
  const string = typeof repo === "string" ? repo : repo?.url;
  if(string !== undefined && string.startsWith("git+https://github.com/")) {
    return string.replace("git+https://github.com/", "").replace(".git", "");
  } else {
    return undefined;
  }
}

async function readmeString(packageName?: string, packageDescription?: string, gitHubName?: string, twitterHandle?: string) {
  const pkg = await getPackageJSON().read();
  return Promise.all([
    Promise.resolve(dependencies(gitHubName, pkg?.dependencies)),
    Promise.resolve(peerDependencies(gitHubName, pkg?.peerDependencies)),
    Promise.resolve(devDependencies(gitHubName, pkg?.devDependencies)),
    Promise.resolve(license(packageName, pkg?.license))
  ]).then((footer) => {
    return header(packageName, gitHubName, twitterHandle) +
      description(packageDescription) +
      installation(packageName) +
      footer.join("");
  });
}

export async function initReadme() {
  const readme = getReadme();
  return readme.exists().then(async (exists) => {
    if(exists) {
      // TODO: update
      return Promise.resolve();
    } else {
      return getConfigStore().then(async (configstore) => {
        return prompt([{
          type: "input",
          name: "twitterHandle",
          message: "twitter handle:",
          default: configstore?.get("twitterHandle")
        }]).then(async (answers) => {
          configstore?.set("twitterHandle", answers.twitterHandle);
          const pkg = await getPackageJSON().read();
          return readmeString(pkg?.name, pkg?.description, getGitHubName(pkg?.repository), answers.twitterHandle).then((text) => {
            return readme.write(text);
          });
        });
      });
    }
  });
}

export async function initReadmeAction() {
  initReadme();
}

export default createCommand("readme")
  .description("initialize README.md")
  .action(initReadmeAction);
