import { createCommand } from "commander";
import { getTSConfig } from "../../structure";
import { JSONObject } from "@bconnorwhite/package";

export type InitTSConfigArgs = {
  config: JSONObject;
}

const defaultConfig = {
  config: {
    compilerOptions: {
      declaration: true,
      emitDeclarationOnly: true,
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      jsx: "preserve",
      lib: [
        "dom",
        "esnext"
      ],
      module: "esnext",
      moduleResolution: "node",
      noFallthroughCasesInSwitch: true,
      noUnusedLocals: true,
      outDir: "build",
      removeComments: true,
      resolveJsonModule: true,
      skipLibCheck: true,
      strict: true,
      target: "esnext"
    },
    include: [
      "source"
    ]
  }
};

export async function initTSConfig({ config }: InitTSConfigArgs = defaultConfig) {
  const tsconfig = getTSConfig();
  return tsconfig.exists().then((exists) => {
    if(!exists) {
      tsconfig.write(config);
    }
  });
}

export function initTSConfigAction() {
  initTSConfig();
}

export default createCommand("tsconfig")
  .description("initialize tsconfig.json")
  .action(initTSConfigAction);