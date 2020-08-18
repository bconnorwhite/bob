#!/usr/bin/env node
import { program } from "commander";
import { version, getVersion } from "@bconnorwhite/module";
import { build, clean, watch, start, dev, list, count, dockerize, dockerBuild } from "../commands";

build(program);
watch(program);
start(program);
dev(program);
dockerize(program);
dockerBuild(program);
clean(program);
list(program);
count(program);
version(program, __dirname);

program.name("bob");

program.parse(process.argv);
