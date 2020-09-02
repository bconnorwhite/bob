import { getLockfile, getPackageManagerName } from "which-pm-lockfile";
import { isWorkspace } from "@bconnorwhite/package";
import { getSourceIndex, getBuildIndex, getPackageJSON, getGitIgnore, getNPMIgnore } from "../structure";

// mkdir src
// touch src/index.ts
// package.json main -> ./build/index.js
// .gitignore
// - build
// - node_modules
// - yarn-error.log (if yarn)
// .npmignore
// - src
// - .gitignore
// README.md
// # packagename

type InitArgs = {
  index?: string;
  npm?: boolean;
}

// TODO: homepage, repository (wizard), scripts (based on pm & run command. needs to be configurable)
async function setPackageJSON() {
  return getPackageJSON().merge({
    main: getBuildIndex().relative
  });
}

async function setGitignore() {
  return getLockfile().then((lockfile) => {
    return getGitIgnore().write(`build\nnode_modules\n${lockfile}${lockfile ? "\n" : ""}`);
  });
}

function init({ index, npm }: InitArgs) {
  const promises = [
    getSourceIndex().write(index),
    setPackageJSON(),
    setGitignore()
  ];
  if(npm) { // .npmignore
    promises.push(getNPMIgnore().write("src\n.gitignore\n"));
  }
}
