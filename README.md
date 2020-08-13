# @bconnorwhite/bob
![dependencies](https://img.shields.io/david/bconnorwhite/bob)
![minzipped size](https://img.shields.io/bundlephobia/minzip/@bconnorwhite/bob)
![typescript](https://img.shields.io/github/languages/top/bconnorwhite/bob)
![npm](https://img.shields.io/npm/v/@bconnorwhite/bob)

Bob builds, watches, and runs typescript projects. He'll even clean up your build directory when you delete or move files.

```
yarn add @bconnorwhite/bob
```

Bob is also highly opinionated
###### build, watch, clean, list
- Your source directory must be `./src`
- Your build directory must be `./build`
- Bob only builds `.ts` and `.tsx` files, but he will copy over any other file types.
###### start, dev
- Bob will start `main` as defined in your package.json.
###### docker, docker-build
- For a single environment, use:
  - `./docker-compose.yml`
  - `./Dockerfile`
- For different environments, use:
  - `./docker/${NODE_ENV}/docker-compose.yml`
  - `./docker/${NODE_ENV}/Dockerfile`  
- `NODE_ENV` may be defined in `.env` or passed to bob on the command line

---

Bob also comes preinstalled with `@bconnorwhite/run-env`, which allows for running scrips suffixed by `NODE_ENV`.

For example, to run our `build:dev` script,
```sh
yarn run-env build

# If NODE_ENV=development, this will run build:dev
# If NODE_ENV=production, this will run build:prod
```
For full documentation visit https://www.npmjs.com/package/@bconnorwhite/run-env

---

### Commands

###### bob
```
Usage: bob [options] [command]

Options:
  -V, --version     output the version number
  -h, --help        display help for command

Commands:
  build [options]   build and output type declaration files
  watch [options]   watch code to build after changes
  start [options]   start the script defined in the main field of package.json
  dev [options]     start with NODE_ENV set to 'development' and watch for changes
  docker [options]  run docker-compose up
  clean             watch to clean up after files or directories are moved or removed
  list              list files to build
  help [command]    display help for command
```
###### bob build
```
Usage: bob build [options]

build and output type declaration files

Options:
  -b --build        Only output build files
  -d --declaration  Only output declaration files
  -w --watch        Watch files for changes
  -h, --help        display help for command
```
###### bob watch
```
Usage: bob watch [options]

watch code to build after changes

Options:
  -b --build        Only output build files
  -d --declaration  Only output declaration files
  -h, --help        display help for command
```
###### bob start
```
Usage: bob start [options]

start the script defined in the main field of package.json

Options:
  -d --dev                 set NODE_ENV to 'development' and watch for changes
  -i --ignore [ignore...]  files or directories to ignore for restart
  -h, --help               display help for command
```
###### bob dev
```
Usage: bob dev [options]

start with NODE_ENV set to 'development' and watch for changes

Options:
  -i --ignore [ignore...]  files or directories to ignore for restart
  -h, --help               display help for command
```
###### bob docker
```
Usage: bob docker [options]

run docker-compose up on a docker-compose file derived from NODE_ENV

Options:
  -d --detach  run containers in the background
  -h, --help   display help for command
```
###### bob clean
```
Usage: bob clean [options]

watch to clean up after files or directories are moved or removed

Options:
  -h, --help  display help for command
```
###### bob list
```
Usage: bob list [options]

list files included in build

Options:
  -h, --help  display help for command
```
###### bob count
```
Usage: bob count [options]

count lines across source files

Options:
  -h, --help  display help for command
```

Here is the eqivalent of Bob's babel.config.json:
```json
{
  "presets": [
    "@babel/preset-typescript",
    [
      "@babel/preset-env", {
        "loose": true
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}

```

Here is the equivalent of Bob's tsconfig.json:
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
    "target": "esnext"
  },
  "include": [
    "./src/*.ts*"
  ]
}
```

### API

```js
import { program } from "commander";
import {
  build,
  watch,
  clean,
  start,
  dev,
  dockerize,
  dockerBuild,
  list 
} from "@bconnorwhite/bob";

// These can be used as commander commands

build(program); // Add build command to program
watch(program); // Add watch command to program
clean(program); // Add clean command to program
start(program); // Add start command to program
dev(program); // Add dev command to program
dockerize(program); // Add dockerize command to program
dockerBuild(program); // Add docker-build command to program
list(program); // Add list command to program

program.parse(process.argv);

```
You can also run the actions, rather than adding to a commander program:
```js
import {
  buildAction,
  watchAction,
  cleanAction,
  startAction,
  devAction,
  dockerizeAction,
  dockerBuildAction,
  listAction
} from "@bconnorwhite/bob";

// These can be used as commander commands

// equivalent of `bob build`
buildAction({
  build: true,
  declaration: true,
  watch: false
});

// equivalent of `bob watch`
watchAction({
  build: true,
  declaration: true
});

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

// equivalent of `bob list`
listAction();

```
