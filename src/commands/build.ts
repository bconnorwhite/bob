import { resolve } from "path";
import { program } from "commander";
import { execAll, Command } from "@bconnorwhite/exec";

const babel = (watch: boolean): Command => ({
  command: "babel ./src",
  flags: {
    "out-dir": "./build",
    "config-file": resolve(__dirname, "../config-babel.json"),
    "extensions": ".ts,.tsx",
    "delete-dir-on-start": true,
    "copy-files": true,
    "watch": watch
  }
});

const tsc = (watch: boolean): Command => ({
  command: "find ./src \\( -name '*.ts' -o -name '*.tsx' \\) -type f | xargs tsc",
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
});

const clean = (): Command => ({
  command: "bob clean"
});

export function build({ build, declaration, watch }: { build: boolean; declaration: boolean; watch: boolean }) {
  const commands = [
    (build === declaration || build) && babel(watch),
    (build === declaration || declaration) && tsc(watch),
    watch && clean()
  ].filter((command) => command) as Command[];
  execAll(commands, {
    parallel: watch
  });
}

export default () => {
  program
    .command("build")
    .option("-b --build", "Only output build files")
    .option("-d --declaration", "Only output declaration files")
    .option("-w --watch", "Watch files for changes")
    .action(build);
}
