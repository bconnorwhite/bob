import { structure as packageStructure, defineFrom, Directory, File } from "@bconnorwhite/package";

const structure = defineFrom(packageStructure, {
  source: {
    name: "src",
    files: {}
  },
  build: {
    files: {}
  },
  docker: {
    files: (env: string) => ({
      [env]: {
        files: {
          dockerfile: {
            name: "Dockerfile"
          },
          compose: {
            name: "docker-compose.yml"
          }
        }
      }
    })
  }
});

export function getSourceDir() {
  return structure.files().source as Directory;
}

export function getBuildDir() {
  return structure.files().build as Directory;
}

export function getDockerDir(env: string) {
  return (structure.files().docker as Directory).files(env)[env] as Directory;
}

export {
  defineFrom,
  Directory,
  File
}

export default structure;
