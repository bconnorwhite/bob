import { createCommand } from "commander-version";
import join from "join-newlines";
import { getEditorConfig } from "../../structure";

const defaultConfig = join([
  "root = true",
  "",
  "[*]",
  "indent_style = space",
  "indent_size = 2",
  "end_of_line = lf",
  "charset = utf-8",
  "trim_trailing_whitespace = true",
  "insert_final_newline = true"
]);

export async function initEditorConfig() {
  const editorConfig = getEditorConfig();
  return editorConfig.exists().then((exists) => {
    if(!exists) {
      return editorConfig.write(defaultConfig);
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
