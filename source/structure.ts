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
  build: {
    files: {
      index: {
        name: "index.js"
      }
    }
  },
  coverage: {
    name: "coverage",
    files: {
      lcov: {
        name: "lcov.info"
      }
    }
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
  source: {
    name: "source",
    files: {
      index: {
        name: "index.ts"
      }
    }
  },
  test: {
    files: {}
  },
  commitizenConfig: {
    name: ".cz.json",
    type: "json"
  },
  env: {
    name: ".env"
  },
  gitignore: {
    name: ".gitignore"
  },
  changelog: {
    name: "CHANGELOG.md",
    type: "md"
  },
  readme: {
    name: "README.md",
    type: "md"
  },
  tsconfig: {
    name: "tsconfig.json",
    type: "json"
  }
});

export function getBuildDir() {
  return structure.files().build as Directory;
}

export function getBuildIndex() {
  return getBuildDir().files().index as File<string>;
}

export function getCoverageDir() {
  return structure.files().coverage as Directory;
}

export function getCoverageLCOV() {
  return getCoverageDir().files().lcov as File<string>;
}

export function getDockerDir(env?: string) {
  return (env ? (structure.files().docker as Directory).files(env)[env] : (structure.files().docker as Directory).files(env)) as Directory;
}

export function getSourceDir() {
  return structure.files().source as Directory;
}

export function getSourceIndex() {
  return getSourceDir().files().index as File<string>;
}

export function getTestDir() {
  return structure.files().test as Directory;
}

export function getCommitizenConfig() {
  return structure.files().commitizenConfig as File<JSONObject>;
}

export function getEnv() {
  return structure.files().env as File<string>;
}

export function getGitignore() {
  return structure.files().gitignore as File<string>;
}

export function getReadme() {
  return structure.files().readme as File<MarkdownTokens>;
}

export function getTSConfig() {
  return structure.files().tsconfig as File<TSConfigJSON>;
}

export const define = defineFrom(structure);

export {
  defineFrom,
  Directory,
  File,
  getPackageJSON
}

export default structure;
