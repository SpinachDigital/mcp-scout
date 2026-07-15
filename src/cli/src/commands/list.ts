import { Command } from "commander";
import { RegistryClient } from "../lib/registry-client.js";
import { formatOutput } from "../lib/format.js";

export const listCommand = new Command("list")
  .description("List all MCP servers")
  .option("-c, --category <category>", "Filter by category")
  .option("-s, --sort <field>", "Sort by: stars | updated | name", "stars")
  .option("-o, --order <order>", "Sort order: asc | desc", "desc")
  .option("-l, --limit <number>", "Results per page", "50")
  .option("--verified", "Only verified servers")
  .action(async (options) => {
    const client = new RegistryClient();
    const params = {
      category: options.category,
      sortBy: options.sort,
      sortOrder: options.order,
      limit: parseInt(options.limit),
      verified: options.verified
    };
    
    const spinner = (await import("ora")).default("Loading...").start();
    try {
      const result = await client.search(params);
      spinner.succeed(`Showing ${result.servers.length} of ${result.total} servers`);
      console.log(formatOutput(result.servers, false));
    } catch (error) {
      spinner.fail("List failed");
      console.error(error);
      process.exit(1);
    }
  });
