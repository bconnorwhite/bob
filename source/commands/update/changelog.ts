import { createCommand } from "commander-version";
import run from "package-run";
import { getChangelog } from "../../structure";

export async function updateChangelog() {
  return run({
    command: "conventional-changelog",
    args: {
      "preset": "angular",
      "infile": getChangelog().relative,
      "same-file": true,
      "release-count": 0 // whole changelog will be regenerated and the outfile will be overwritten
    }
  }, {
    silent: true
  });
}

export async function updateChangelogAction() {
  updateChangelog();
}

export default createCommand("changelog")
  .description(`update ${getChangelog().relative}`)
  .action(updateChangelogAction);
