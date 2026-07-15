#!/usr/bin/env node

import { Command } from "commander";
import { version } from "../package.json";
import { searchCommand } from "./commands/search.js";
import { installCommand } from "./commands/install.js";
import { syncCommand } from "./commands/sync.js";
import { infoCommand } from "./commands/info.js";
import { listCommand } from "./commands/list.js";

const program = new Command();

program
  .name("mcp-scout")
  .description("MCP Server Registry CLI - Discover, install, and manage MCP servers")
  .version(version)
  .helpOption("-h, --help", "Display help for command");

program
  .option("-v, --verbose", "Verbose output")
  .option("--json", "Output as JSON")
  .hook("preAction", (thisCommand) => {
    const opts = thisCommand.opts();
    if (opts.verbose) {
      console.log(`[DEBUG] Command: ${thisCommand.name()}`);
    }
  });

program.addCommand(searchCommand);
program.addCommand(installCommand);
program.addCommand(syncCommand);
program.addCommand(infoCommand);
program.addCommand(listCommand);

if (process.argv.length === 2) {
  program.help();
}

program.parse(process.argv);
