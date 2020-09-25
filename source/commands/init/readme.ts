import { prompt } from "inquirer";
import { createCommand } from "commander-version";
import { Repository, Dependencies } from "types-pkg-json";
import { pkg } from "@bconnorwhite/package";
import { getDescriptions } from "npm-description";
import { getLicense } from "spdx-license";
import join from "join-newlines";
import { getReadme } from "../../structure";

function title(packageName: string) {
  return `  <h1>${packageName}</h1>\n`;
}

function npmVersion(packageName: string) {
  return join([
    `  <a href="https://npmjs.com/package/${packageName}">`,
    `    <img alt="npm" src="https://img.shields.io/npm/v/${packageName}.svg">`,
    "  </a>"
  ]);
}

function gitHubLanguages(gitHubName: string) {
  return join([
    `  <a href="https://github.com/${gitHubName}">`,
    `    <img alt="typescript" src="https://img.shields.io/github/languages/top/${gitHubName}.svg">`,
    "  </a>"
  ]);
}

function gitHubStars(gitHubName: string) {
  return join([
    `  <a href="https://github.com/${gitHubName}">`,
    `    <img alt="GitHub stars" src="https://img.shields.io/github/stars/${gitHubName}?label=Stars%20Appreciated%21&style=social">`,
    "  </a>"
  ]);
}

function twitter(twitterHandle: string) {
  return join([
    `  <a href="https://twitter.com/${twitterHandle}">`,
    `    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/${twitterHandle}.svg?label=%40${twitterHandle}&style=social">`,
    "  </a>"
  ]);
}

function header(packageName?: string, gitHubName?: string, twitterHandle?: string) {
  return `<div align="center">\n${
    packageName ? title(packageName) : ""
  }${packageName ? npmVersion(packageName) : ""
  }${gitHubName ? gitHubLanguages(gitHubName) : ""
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
    "```bash\n" +
    `yarn add ${packageName}\n` +
    "```\n\n" +
    "```bash\n" +
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
      return `<br />\n\n<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/${gitHubName}.svg"></h2>\n\n${list}\n`
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

export async function initReadmeAction() {
  const readme = getReadme();
  readme.exists().then((exists) => {
    if(exists) {
      // update
    } else {
      prompt([{
        type: "input",
        name: "twitterHandle",
        message: "twitter handle:"
      }]).then(async ({ twitterHandle }: { twitterHandle: string }) => {
        return readmeString(pkg?.name, pkg?.description, getGitHubName(pkg?.repository), twitterHandle).then((text) => {
          return readme.write(text);
        });
      })
    }
  });
}

export default createCommand("package-json")
  .description("initialize package.json")
  .action(initReadmeAction);
