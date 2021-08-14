import { createCommand } from "commander-version";
import updateChangelogCommand, { updateChangelogAction, updateChangelog } from "./changelog";
import updateGitignoreCommand, { updateGitignoreAction, updateGitignore } from "./gitignore";
import updateEditorConfigCommand, { updateEditorConfigAction, updateEditorConfig } from "./editorconfig";

export default createCommand("update")
  .addCommand(updateChangelogCommand)
  .addCommand(updateGitignoreCommand)
  .addCommand(updateEditorConfigCommand);

export {
  updateChangelog,
  updateChangelogAction,
  updateChangelogCommand,
  updateGitignore,
  updateGitignoreAction,
  updateGitignoreCommand,
  updateEditorConfig,
  updateEditorConfigAction,
  updateEditorConfigCommand
};
