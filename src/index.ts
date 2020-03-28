#!/usr/bin/env node
import { resolve } from "path";
import { existsSync, unlinkSync, rmdirSync } from "fs";
import { program } from "commander";
import chokidar from "chokidar";
import exec, { execAll, Command } from "@bconnorwhite/exec";

const babel = (watch: boolean) => ({
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

const tsc = (watch: boolean) => ({
  command: "tsc src/*.ts*",
  flags: {
    "declaration": true,
    "emitDeclarationOnly": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "preserve",
    "lib": "esnext",
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

const clean = (watch: boolean) => watch ? [{ command: "bob clean" }] : [];

program
  .command("build")
  .option("-w --watch", "Watch files")
  .action(({ watch }) => {
    execAll(([
      babel(watch),
      tsc(watch)
    ] as Command[]).concat(
      clean(watch)
    ), {
      parallel: watch
    });
  });

program
  .command("watch")
  .action(() => {
    exec("bob build", {
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

program.parse(process.argv);
