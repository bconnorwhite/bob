import { createCommand } from "commander-version";
import { exec } from "@bconnorwhite/exec";
import config from "../init/commitizen/config.json";
import { getScope, CommitArgs } from "./";

export async function commitDocs(args: CommitArgs) {
  return exec("git", [
    "commit", {
      m: `docs${getScope(args.scope)}: ${args.message}`
    }
  ]);
}

export async function commitDocsAction(message: string, { scope }: { scope?: string }) {
  commitDocs({ message, scope });
}

export default createCommand("docs")
  .description(config.types.docs.description)
  .arguments("<message>")
  .option("-s --scope <scope>", "scope of changes")
  .action(commitDocsAction);
