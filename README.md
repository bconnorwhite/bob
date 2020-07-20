# @bconnorwhite/bob
![dependencies](https://img.shields.io/david/bconnorwhite/bob)
![minzipped size](https://img.shields.io/bundlephobia/minzip/@bconnorwhite/bob)
![typescript](https://img.shields.io/github/languages/top/bconnorwhite/bob)
![npm](https://img.shields.io/npm/v/@bconnorwhite/bob)

Bob builds and watches typescript projects. He'll even clean up your build directory when you delete or move files.

```
yarn add @bconnorwhite/bob
```

Bob is also highly opinionated.
- Your source directory must be `./src`
- Your build directory must be `./build`
- Bob only builds `.ts` and `.tsx` files, but he will copy over any other file types.


### Commands

###### bob
```
Usage: bob [options] [command]

Options:
  -V, --version    output the version number
  -h, --help       display help for command

Commands:
  build [options]
  watch [options]
  clean
  help [command]   display help for command
```
###### bob build
```
Usage: bob build [options]

Options:
  -b --build        Only output build files
  -d --declaration  Only output declaration files
  -w --watch        Watch files for changes
  -h, --help        display help for command
```
###### bob watch
```
Usage: bob watch [options]

Options:
  -b --build        Only output build files
  -d --declaration  Only output declaration files
  -h, --help        display help for command
```
###### bob clean
```
Usage: bob clean [options]

Options:
  -h, --help  display help for command
```

Here is Bob's babel.config.json:
```json
{
  "presets": [
    "@babel/preset-typescript",
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```

Here is Bob's tsconfig.json:
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
import { build, watch, clean } from "@bconnorwhite/bob";

// These can be used as commander commands

build(); // program.command("build")...
watch(); // program.command("watch")...
clean(); // program.command("clean")...

program.parse(process.argv);

```
You can also run the actions, rather than adding to a commander program:
```js
import { buildAction, watchAction, cleanAction } from "@bconnorwhite/bob";

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

```
