import { createCommand } from "commander-version";
import { TSConfigJSON } from "types-tsconfig";
import { getTSConfig, getSourceDir } from "../../structure";

export type InitTSConfigArgs = {
  config: TSConfigJSON;
}

const defaultConfig: InitTSConfigArgs = {
  config: {
    extends: "@bconnorwhite/bob",
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
