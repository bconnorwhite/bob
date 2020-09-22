import {
  define as defineAs,
  defineFrom,
  Directory,
  File,
  MarkdownTokens,
  getPackageJSON,
  JSONObject
} from "@bconnorwhite/package";
import { TSConfigJSON } from "types-tsconfig";

const dockerDefinition = {
  files: {
    dockerfile: {
      name: "Dockerfile"
    },
    compose: {
      name: "docker-compose.yml"
    }
  }
};

const structure = defineAs({
  source: {
    name: "source",
    files: {
      index: {
        name: "index.ts"
      }
    }
  },
  build: {
    files: {
      index: {
        name: "index.js"
      }
    }
  },
  test: {
    files: {}
  },
  docker: {
    files: (env?: string) => {
      if(env) {
        return {
          [env]: dockerDefinition
        }
      } else {
        return dockerDefinition.files;
      }
    }
  },
  tsconfig: {
    name: "tsconfig.json",
    type: "json"
  },
  readme: {
    name: "README.md",
    type: "md"
  },
  gitignore: {
    name: ".gitignore"
  },
  commitizenConfig: {
    name: ".cz.json",
    type: "json"
  }
});

export function getSourceDir() {
  return structure.files().source as Directory;
}

export function getSourceIndex() {
  return getSourceDir().files().index as File<string>;
}

export function getBuildDir() {
  return structure.files().build as Directory;
}

export function getTestDir() {
  return structure.files().test as Directory;
}

export function getBuildIndex() {
  return getBuildDir().files().index as File<string>;
}

export function getDockerDir(env?: string) {
  return (env ? (structure.files().docker as Directory).files(env)[env] : (structure.files().docker as Directory).files(env)) as Directory;
}

export function getReadme() {
  return structure.files().readme as File<MarkdownTokens>;
}

export function getTSConfig() {
  return structure.files().tsconfig as File<TSConfigJSON>;
}

export function getGitignore() {
  return structure.files().gitignore as File<string>;
}

export function getCommitizenConfig() {
  return structure.files().commitizenConfig as File<JSONObject>;
}

export const define = defineFrom(structure);

export {
  defineFrom,
  Directory,
  File,
  getPackageJSON
}

export default structure;
