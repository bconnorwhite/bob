import { resolve } from "path";
import commander from "commander";
import { getCommand } from "package-run";
import { execAll, Command } from "@bconnorwhite/exec";
import { getFiles } from "./list";

export type BuildArgs = {
  build: boolean;
  declaration: boolean;
  watch: boolean;
}

const babel = (watch: boolean) => getCommand({
  command: "babel",
  args: "./src",
  flags: {
    "out-dir": "./build",
    "config-file": resolve(__dirname, "../config-babel.json"),
    "extensions": ".ts,.tsx",
    "delete-dir-on-start": true,
    "copy-files": true,
    "watch": watch
  }
});

const tsc = async (watch: boolean) => {
  return getFiles().then((files) => getCommand({
    command: "tsc",
    args: files,
    flags: {
      "declaration": true,
      "emitDeclarationOnly": true,
      "esModuleInterop": true,
      "forceConsistentCasingInFileNames": true,
      "jsx": "preserve",
      "lib": "dom,esnext",
      "module": "esnext",
      "moduleResolution": "node",
      "noFallthroughCasesInSwitch": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "outDir": "./build",
      "removeComments": true,
      "resolveJsonModule": true,
      "skipLibCheck": true,
      "strict": true,
      "target": "esnext",
      "watch": watch
    }
  }));
};

const clean = () => getCommand({
  command: "bob",
  args: "clean"
});

export function build({ build, declaration, watch }: BuildArgs) {
  const commands = [
    (build === declaration || build) && babel(watch),
    (build === declaration || declaration) && tsc(watch),
    watch && clean()
  ].filter((command) => command) as Promise<Command>[];
  execAll(commands, {
    parallel: watch
  });
}

export default (program: commander.Command) => {
  program
    .command("build")
    .description("build and output type declaration files")
    .option("-b --build", "Only output build files")
    .option("-d --declaration", "Only output declaration files")
    .option("-w --watch", "Watch files for changes")
    .action(build);
}
