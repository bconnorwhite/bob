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
- Bob only builds `.ts` and `.tsx` files, but he will copy over any other types.


### Commands

```
Usage: bob [options] [command]

Options:
  -h, --help       display help for command

Commands:
  build [options]
  watch
  clean
  help [command]   display help for command
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
    "lib": [
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
