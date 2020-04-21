#!/usr/bin/env node
import { resolve } from "path";
import { existsSync, readFileSync } from "fs";
import { program } from "commander";

import build from "../commands/build";
import watch from "../commands/watch";
import clean from "../commands/clean";

build();
watch();
clean();

let pkg: {
  version?: string;
} = {};
if(existsSync(resolve(__dirname, "../package.json"))) {
  pkg = JSON.parse(readFileSync(resolve(__dirname, "../package.json"), "utf8"));
} else if(existsSync(resolve(__dirname, "../@bconnorwhite/bob/package.json"))) {
  pkg = JSON.parse(readFileSync(resolve(__dirname, "../@bconnorwhite/bob/package.json"), "utf8"));
}

if(pkg.version) {
  program.version(pkg.version);
}

program.parse(process.argv);
