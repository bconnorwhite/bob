#!/usr/bin/env node
import { program } from "commander";
import { build, clean, watch, start, dev, list, count, dockerize, dockerBuild } from "../commands";
import pkg from "../../package.json";

build(program);
watch(program);
start(program);
dev(program);
dockerize(program);
dockerBuild(program);
clean(program);
list(program);
count(program);

if(pkg.version) {
  program.version(pkg.version);
}

program.name("bob");

program.parse(process.argv);
