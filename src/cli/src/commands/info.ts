import { Command } from "commander";
import { RegistryClient } from "../lib/registry-client.js";
import { formatOutput } from "../lib/format.js";

export const infoCommand = new Command("info")
  .description("Show detailed info about an MCP server")
  .argument("<name>", "Server name")
  .option("--json", "Output as JSON")
  .action(async (name, options) => {
    const client = new RegistryClient();
    const spinner = (await import("ora")).default("Fetching info...").start();
    try {
      const server = await client.getServer(name);
      spinner.succeed(`Info for ${name}`);
      console.log(formatOutput(server, options.json));
    } catch (error) {
      spinner.fail("Failed to fetch info");
      console.error(error);
      process.exit(1);
    }
  });
