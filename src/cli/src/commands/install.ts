import { Command } from "commander";
import { RegistryClient } from "../lib/registry-client.js";
import { formatOutput } from "../lib/format.js";

export const installCommand = new Command("install")
  .description("Install an MCP server")
  .argument("<name>", "Server name (owner/repo or registry name)")
  .option("-p, --path <path>", "Install directory", process.cwd())
  .option("--force", "Overwrite existing installation")
  .option("--dry-run", "Show what would be installed without installing")
  .action(async (name, options) => {
    const client = new RegistryClient();
    const spinner = (await import("ora")).default(`Installing ${name}...`).start();
    try {
      const result = await client.install(name, {
        path: options.path,
        force: options.force,
        dryRun: options.dryRun
      });
      if (result.success) {
        spinner.succeed(`Installed ${name}`);
        console.log(formatOutput(result, options.json));
      } else {
        spinner.fail(`Failed to install ${name}`);
        console.error(result.error);
        process.exit(1);
      }
    } catch (error) {
      spinner.fail("Installation failed");
      console.error(error);
      process.exit(1);
    }
  });
