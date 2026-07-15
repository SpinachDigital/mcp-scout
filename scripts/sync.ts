#!/usr/bin/env tsx

import { RegistryAggregator } from "../src/registry/aggregator.js";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";

async function main() {
  const fullSync = process.argv.includes("--full");
  console.log(`🔄 Starting ${fullSync ? "full" : "incremental"} registry sync...`);
  
  const { RegistryAggregator } = await import("../src/registry/aggregator.js");
  const aggregator = new RegistryAggregator();
  
  try {
    const result = await aggregator.sync(fullSync);
    
    console.log("✅ Sync complete!");
    console.log(`   Added: ${result.added}`);
    console.log(`   Updated: ${result.updated}`);
    console.log(`   Removed: ${result.removed}`);
    console.log(`   Duration: ${result.duration}ms`);
    
    if (result.errors.length > 0) {
      console.log("⚠️ Errors:");
      result.errors.forEach((e: string) => console.log(`   - ${e}`));
    }
    
    // Write index
    const index = aggregator.generateIndex();
    const dataDir = resolve("./src/registry/data");
    if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
    
    writeFileSync(
      resolve(dataDir, "index.json"),
      JSON.stringify(aggregator.generateIndex(), null, 2)
    );
    
    console.log("📁 Index written to src/registry/data/index.json");
    
    process.exit(result.errors.length > 0 ? 1 : 0);
  } catch (error: unknown) {
    console.error("❌ Sync failed:", error);
    process.exit(1);
  }
}

main();
