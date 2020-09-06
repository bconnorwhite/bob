import { define as defineAs, defineFrom, Directory, File, getPackageJSON } from "@bconnorwhite/package";

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
  gitignore: {
    name: ".gitignore"
  },
  npmignore: {
    name: ".npmignore"
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

export function getGitignore() {
  return structure.files().gitignore as File<string>;
}

export function getNPMIgnore() {
  return structure.files().npmignore as File<string>;
}

export const define = defineFrom(structure);

export {
  defineFrom,
  Directory,
  File,
  getPackageJSON
}

export default structure;
