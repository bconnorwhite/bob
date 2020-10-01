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

export async function updateEditorConfig() {
  return getEditorConfig().write(defaultConfig);
}

export function updateEditorConfigAction() {
  updateEditorConfig();
}

export default createCommand("editorconfig")
  .description("update .editorconfig")
  .action(updateEditorConfigAction);
