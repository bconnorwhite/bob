#!/usr/bin/env node
import { resolve } from "path";
import { existsSync, unlinkSync, rmdirSync, readFileSync } from "fs";
import { program } from "commander";
import chokidar from "chokidar";
import exec, { execAll, Command } from "@bconnorwhite/exec";

const pkg = JSON.parse(readFileSync(resolve(__dirname, "../package.json"), "utf8"));

const babel = (watch: boolean): Command => ({
  command: "babel ./src",
  flags: {
    "out-dir": "./build",
    "config-file": resolve(__dirname, "config-babel.json"),
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

program
  .command("build")
  .option("-b --build", "Only output build files")
  .option("-d --declaration", "Only output declaration files")
  .option("-w --watch", "Watch files for changes")
  .action(({ build, declaration, watch }) => {
    const commands = [
      (build === declaration || build) && babel(watch),
      (build === declaration || declaration) && tsc(watch),
      watch && clean()
    ].filter((command) => command);
    execAll(commands, {
      parallel: watch
    });
  });

program
  .command("watch")
  .option("-b --build", "Only output build files")
  .option("-d --declaration", "Only output declaration files")
  .action(({ build, declaration }) => {
    exec("bob build", {
      build,
      declaration,
      watch: true
    });
  });

program
  .command("clean")
  .action(() => {
    chokidar.watch("src").on("unlink", (path) => {
      const match = path.match(/^src\/(.*)\.tsx?$/);
      if(match) {
        path = resolve("./build", match[1]);
        [".js", ".d.ts"].forEach((ext) => {
          const file = `${path}${ext}`;
          if(existsSync(file)) {
            unlinkSync(file);
          }
        });
      }
    }).on("unlinkDir", (path) => {
      const match = path.match(/^src\/(.*)$/);
      if(match) {
        path = resolve("./build", match[1]);
        if(existsSync(path)) {
          rmdirSync(path);
        }
      }
    });
  });

program.version(pkg.version);

program.parse(process.argv);
