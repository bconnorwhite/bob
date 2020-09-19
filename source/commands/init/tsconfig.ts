import { createCommand } from "commander-version";
import { TSConfigJSON } from "types-tsconfig";
import { getTSConfig, getBuildDir, getSourceDir } from "../../structure";

export type InitTSConfigArgs = {
  config: TSConfigJSON;
}

const defaultConfig: InitTSConfigArgs = {
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
      module: "commonjs",
      noFallthroughCasesInSwitch: true,
      noUnusedLocals: true,
      outDir: getBuildDir().relative,
      removeComments: false,
      resolveJsonModule: true,
      skipLibCheck: true,
      strict: true,
      target: "esnext"
    },
    include: [
      getSourceDir().relative
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
