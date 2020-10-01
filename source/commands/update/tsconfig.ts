import { createCommand } from "commander-version";
import { TSConfigJSON } from "types-tsconfig";
import { getTSConfig, getSourceDir, getTypesDir } from "../../structure";

export type UpdateTSConfigArgs = {
  config?: TSConfigJSON;
}

const defaultConfig: UpdateTSConfigArgs = {
  config: {
    extends: "@bconnorwhite/bob",
    compilerOptions: {
      rootDirs: [
        getSourceDir().relative,
        getTypesDir().relative
      ]
    },
    include: [
      getSourceDir().relative,
      getTypesDir().relative
    ]
  }
};

export async function updateTSConfig({ config }: UpdateTSConfigArgs = defaultConfig) {
  return getTSConfig().merge(config);
}

export function updateTSConfigAction() {
  updateTSConfig();
}

export default createCommand("tsconfig")
  .description("update tsconfig.json")
  .action(updateTSConfigAction);
