import { Command } from "commander";
import { RegistryClient } from "../lib/registry-client.js";
import { formatOutput } from "../lib/format.js";

export const searchCommand = new Command("search")
  .description("Search MCP servers")
  .argument("[query]", "Search query")
  .option("-c, --category <category>", "Filter by category")
  .option("-t, --tags <tags...>", "Filter by tags")
  .option("-s, --sort <field>", "Sort by: stars | updated | name | verified", "stars")
  .option("-o, --order <order>", "Sort order: asc | desc", "desc")
  .option("-l, --limit <number>", "Results per page", "20")
  .option("--verified", "Only verified servers")
  .action(async (query, options) => {
    const client = new RegistryClient();
    const params = {
      query: query || undefined,
      category: options.category,
      tags: options.tags,
      sortBy: options.sort,
      sortOrder: options.order,
      limit: parseInt(options.limit),
      verified: options.verified
    };
    
    const spinner = (await import("ora")).default("Searching...").start();
    try {
      const result = await client.search(params);
      spinner.succeed(`Found ${result.total} servers`);
      console.log(formatOutput(result.servers, options.json));
    } catch (error) {
      spinner.fail("Search failed");
      console.error(error);
      process.exit(1);
    }
  });
