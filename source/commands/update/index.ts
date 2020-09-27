import { createCommand } from "commander-version";
import updateChangelogCommand, { updateChangelogAction, updateChangelog } from "./changelog";

export default createCommand("update")
  .addCommand(updateChangelogCommand);

export {
  updateChangelog,
  updateChangelogAction,
  updateChangelogCommand
}
