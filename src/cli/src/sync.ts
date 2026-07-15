#!/usr/bin/env tsx

import { RegistryClient } from "./lib/registry-client.js";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";

async function main() {
  const fullSync = process.argv.includes("--full");
  console.log(`🔄 Starting ${fullSync ? "full" : "incremental"} registry sync...`);
  
  const client = new RegistryClient();
  
  try {
    const result = await client.sync(fullSync);
    
    console.log("✅ Sync complete!");
    console.log(`   Added: ${result.serversAdded}`);
    console.log(`   Updated: ${result.serversUpdated}`);
    console.log(`   Removed: ${result.serversRemoved}`);
    console.log(`   Duration: ${result.duration}ms`);
    
    if (result.errors.length > 0) {
      console.log("⚠️ Errors:");
      result.errors.forEach(e => console.log(`   - ${e}`));
    }
    
    // Write index
    const index = generateIndex();
    const dataDir = resolve("./src/registry/data");
    if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
    
    writeFileSync(
      resolve(dataDir, "index.json"),
      JSON.stringify(index, null, 2)
    );
    
    console.log("📁 Index written to src/registry/data/index.json");
    
    process.exit(result.errors.length > 0 ? 1 : 0);
  } catch (error) {
    console.error("❌ Sync failed:", error);
    process.exit(1);
  }
}

function generateIndex() {
  return {
    servers: [],
    categories: [],
    tags: [],
    lastUpdated: new Date().toISOString(),
    registries: []
  };
}

main();
