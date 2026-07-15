import { Command } from "commander";
import { RegistryClient } from "../lib/registry-client.js";
import { formatOutput } from "../lib/format.js";

export const syncCommand = new Command("sync")
  .description("Sync local registry with remote")
  .option("-f, --full", "Full sync (not incremental)")
  .option("--registry <url>", "Custom registry URL")
  .action(async (options) => {
    const client = new RegistryClient(options.registry);
    const spinner = (await import("ora")).default("Syncing registry...").start();
    try {
      const result = await client.sync(options.full);
      spinner.succeed("Sync complete");
      console.log(formatOutput(result, false));
    } catch (error) {
      spinner.fail("Sync failed");
      console.error(error);
      process.exit(1);
    }
  });
