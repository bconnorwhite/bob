import { createCommand } from "commander-version";
import { updateEditorConfig } from "../update/editorconfig";
import { getEditorConfig } from "../../structure";

export async function initEditorConfig() {
  const editorConfig = getEditorConfig();
  return editorConfig.exists().then((exists) => {
    if(!exists) {
      return updateEditorConfig();
    } else {
      return undefined;
    }
  });
}

export function initEditorConfigAction() {
  initEditorConfig();
}

export default createCommand("editorconfig")
  .description("initialize .editorconfig")
  .action(initEditorConfigAction);
