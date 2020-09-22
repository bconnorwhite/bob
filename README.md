<div align="center">
  <h1>@bconnorwhite/bob</h1>
  <a href="https://npmjs.com/package/@bconnorwhite/bob">
    <img alt="npm" src="https://img.shields.io/npm/v/@bconnorwhite/bob.svg">
  </a>
  <a href="https://github.com/bconnorwhite/bob">
    <img alt="typescript" src="https://img.shields.io/github/languages/top/bconnorwhite/bob.svg">
  </a>
  <a href="https://github.com/bconnorwhite/bob">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/bconnorwhite/bob?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Bob is a toolkit for typescript projects.

Bob provides a set of tools for developing TypeScript projects for both Node and the browser (React) without having to think about `tsc` or `babel`.

Bob works with zero configuration, does not require `babel.config.json`, and will auto-generate the correct `tsconfig.json` file.

## Installation

```bash
yarn add @bconnorwhite/bob
```

```bash
npm install @bconnorwhite/bob
```

<br />

## Project Structure

### build, watch, clean, list

Bob assumes your source files are in `./src`. Build files (.js) and type declaration files (.d.ts) will be output to `./build`.

Bob only builds `.ts` and `.tsx` files, but he will copy over any other file types.

### start, dev

Bob will run `main` as defined in your package.json.

### docker

For a single environment, use:
  - `./docker-compose.yml`
  - `./Dockerfile`

For multiple environments, use:
  - `./docker/${NODE_ENV}/docker-compose.yml`
  - `./docker/${NODE_ENV}/Dockerfile`

`bob docker build` will build the appropriate Dockerfile based on `NODE_ENV`.  
`bob docker up` will start docker-compose with the appropriate YAML file based on `NODE_ENV`.

`NODE_ENV` may be defined in `.env` or passed to bob on the command line.

<br />

## CLI

### bob
```
Usage: bob [options] [command]

Options:
  -v --version     output the version number
  -h, --help       display help for command

Commands:
  init             initialize source, package.json, .gitignore, tsconfig.json, README.md, .cz.json
  build [options]  build and output type declaration files
  watch            watch source files and build after changes
  start [options]  start the script defined in the main field of package.json
  dev [options]    start with NODE_ENV set to 'development' and watch for changes
  commit           create a conventional commit
  lint             lint package.json and source files
  docker           run docker commands
  count            count lines across source files
  list             list files included in build
  help [command]   display help for command
```
### bob init
```
Usage: bob init [options] [command]

initialize source, package.json, .gitignore, and tsconfig.json

Options:
  -h, --help    display help for command

Commands:
  source        initialize source directory
  package-json  initialize package.json
  gitignore     initialize git repo
  tsconfig      initialize tsconfig.json
```
### bob build
```
Usage: bob build [options] [command]

build and output type declaration files

Options:
  -w --watch        watch files for changes
  -s --silent       silent output
  -h, --help        display help for command

Commands:
  source [options]  build source files
  types [options]   output type declaration files
```
### bob watch
```
Usage: bob watch [options] [command]

watch source files and build after changes

Options:
  -h, --help  display help for command

Commands:
  source      build source files after changes
  types       output type declarations after changes
```
### bob start
```
Usage: bob start [options]

start the script defined in the main field of package.json

Options:
  -d --dev                 set NODE_ENV to 'development' and watch for changes
  -i --ignore [ignore...]  files or directories to ignore for restart
  -h, --help               display help for command
```
### bob dev
```
Usage: bob dev [options]

start with NODE_ENV set to 'development' and watch for changes

Options:
  -i --ignore [ignore...]  files or directories to ignore for restart
  -h, --help               display help for command
```
### bob commit
```
Usage: bob commit [options]

create a conventional commit

Options:
  -h, --help  display help for command
```
### bob lint
```
Usage: bob lint [options] [command]

lint package.json and source files

Options:
  -h, --help  display help for command

Commands:
  package     lint package.json
  source      lint source files with ESLint
```
### bob docker
```
Usage: bob docker [options] [command]

run docker commands

Options:
  -h, --help                 display help for command

Commands:
  build [options] <context>  run docker build on Dockerfile
  up [options]               run docker-compose up on docker-compose.yml
  help [command]             display help for command
```
### bob count
```
Usage: bob count [options]

count lines across source files

Options:
  -h, --help  display help for command
```
### bob list
```
Usage: bob list [options]

list files included in build

Options:
  -h, --help  display help for command
```

<br />

## run-env

Bob also includes [@bconnorwhite/run-env](https://www.npmjs.com/package/@bconnorwhite/run-env), which allows for running package.json scrips suffixed by the beginning characters of `NODE_ENV`.

For example, to run a script called `build:dev` or `build:prod`:
```sh
yarn run-env build

# If NODE_ENV=development:
# this will run scripts like 'build:dev' or 'build:development'
# If NODE_ENV=production:
# this will run scripts like 'build:prod' or 'build:production'
```
Suffixes must be at least 3 characters, as long as they match the first characters of `NODE_ENV`.

For full documentation visit https://www.npmjs.com/package/@bconnorwhite/run-env.

<br />

## Build Configuration

The eqivalent of Bob's babel.config.json:
```json
{
  "presets": [
    "@babel/preset-typescript",
    [
      "@babel/preset-env", {
        "loose": true,
        "exclude": [
          "@babel/plugin-transform-regenerator"
        ]
      }
    ],
    "@babel/preset-react"
  ]
}
```

The equivalent of Bob's tsconfig.json:
```json
{
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "preserve",
    "lib": [
      "dom",
      "esnext"
    ],
    "module": "commonjs",
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "outDir": "build",
    "removeComments": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "esnext"
  },
  "include": [
    "source"
  ]
}
```

<br />

## API

Bob includes an easily composable API for including its commands:

```ts
import { program } from "commander";
import {
  initCommand,
  buildCommand,
  watchCommand,
  startCommand,
  devCommand,
  dockerCommand,
  countCommand,
  listCommand 
} from "@bconnorwhite/bob";

// These can easily be used as commander commands

program
  .addCommand(initCommand)
  .addCommand(buildCommand)
  .addCommand(watchCommand)
  .addCommand(startCommand)
  .addCommand(devCommand)
  .addCommand(dockerCommand)
  .addCommand(countCommand)
  .addCommand(listCommand)
  .parse();

```
You can also run the actions programmatically:
```ts
import {
  initAction,
  buildAction,
  watchAction,
  startAction,
  devAction,
  dockerizeAction,
  dockerBuildAction,
  countAction,
  listAction
} from "@bconnorwhite/bob";

// These can be used as commander commands

// equivalent of `bob init`
initAction();

// equivalent of `bob build`
buildAction({
  watch: false
});

// equivalent of `bob watch`
watchAction();

// equivalent of `bob clean`
cleanAction();

// equivalent of `bob start`
startAction({
  dev: false
});

// equivalent of `bob dev`
devAction();

// equivalent of `bob dockerize`
dockerizeAction();

// equivalent of `bob docker-build`
dockerBuildAction();

// equivalent of `bob count`
countAction();

// equivalent of `bob list`
listAction();
```

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/bob.svg"></h2>

- [@babel/cli](https://npmjs.com/package/@babel/cli): Babel command line.
- [@babel/core](https://npmjs.com/package/@babel/core): Babel compiler core.
- [@babel/preset-env](https://npmjs.com/package/@babel/preset-env): A Babel preset for each environment.
- [@babel/preset-react](https://npmjs.com/package/@babel/preset-react): Babel preset for all React plugins.
- [@babel/preset-typescript](https://npmjs.com/package/@babel/preset-typescript): Babel preset for TypeScript.
- [@bconnorwhite/exec](https://npmjs.com/package/@bconnorwhite/exec): Execute commands while keeping flags easily configurable as an object
- [@bconnorwhite/package](https://npmjs.com/package/@bconnorwhite/package): A utility for reading package.json of a project, and forming paths relative to it.
- [@bconnorwhite/run-env](https://npmjs.com/package/@bconnorwhite/run-env): Run package.json scripts suffixed with NODE_ENV.
- [chokidar](https://npmjs.com/package/chokidar): A neat wrapper around node.js fs.watch / fs.watchFile / fsevents.
- [commander-version](https://npmjs.com/package/commander-version): A wrapper for Commander that automatically sets the version based on your package.json
- [dotenv](https://npmjs.com/package/dotenv): Loads environment variables from .env file
- [find](https://npmjs.com/package/find): Find files or directories by name
- [inquirer](https://npmjs.com/package/inquirer): A collection of common interactive command line user interfaces.
- [nodemon](https://npmjs.com/package/nodemon): Simple monitor script for use during development of a node.js app.
- [ora](https://npmjs.com/package/ora): Elegant terminal spinner
- [package-run](https://npmjs.com/package/package-run): Programmatically run package.json scripts. Supports yarn, npm, and pnpm.
- [typescript](https://npmjs.com/package/typescript): TypeScript is a language for application scale JavaScript development
- [wait-on](https://npmjs.com/package/wait-on): Wait-on is a cross platform command line utility and Node.js API which will wait for files, ports, sockets, and http(s) resources to become available
- [which-pm-lockfile](https://npmjs.com/package/which-pm-lockfile): Check if a project uses yarn, npm, or pnpm. Supports yarn workspaces.

##

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/bob.svg"></h2>

- [@types/find](https://npmjs.com/package/@types/find): TypeScript definitions for find
- [@types/inquirer](https://npmjs.com/package/@types/inquirer): TypeScript definitions for inquirer
- [@types/node](https://npmjs.com/package/@types/node): TypeScript definitions for Node.js
- [@types/nodemon](https://npmjs.com/package/@types/nodemon): TypeScript definitions for nodemon
- [@types/wait-on](https://npmjs.com/package/@types/wait-on): TypeScript definitions for wait-on
- [jest](https://npmjs.com/package/jest): Delightful JavaScript Testing.
- [npm-package-json-lint](https://npmjs.com/package/npm-package-json-lint): Configurable linter for package.json files.

##

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/@bconnorwhite/bob.svg"></h2>

[MIT](https://mit-license.org/)

<br />

## Related Packages:

- [@bconnorwhite/exec](https://npmjs.com/package/@bconnorwhite/exec): Execute commands while keeping flags easily configurable as an object
- [@bconnorwhite/package](https://npmjs.com/package/@bconnorwhite/package): A utility for reading package.json of a project, and forming paths relative to it.
- [@bconnorwhite/run-env](https://npmjs.com/package/@bconnorwhite/run-env): Run package.json scripts suffixed with NODE_ENV.
