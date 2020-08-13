import find from "find";
import commander from "commander";
import { getRootDir } from "@bconnorwhite/package";

export function getFiles() {
  return new Promise<string[]>((resolve) => {
    find.file(/\.tsx?$/, getRootDir("src").relative, (files) => {
      resolve(files);
    });
  });
}

export function list() {
  getFiles().then((files) => {
    console.log(files);
  });
}

export default (program: commander.Command) => {
  program
    .command("list")
    .description("list files included in build")
    .action(list);
}
