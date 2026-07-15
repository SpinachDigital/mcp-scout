import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";

export interface MCPServer {
  name: string;
  description: string;
  author: string;
  repository: string;
  homepage?: string;
  stars: number;
  forks: number;
  license: string;
  version: string;
  mcpVersion: string;
  lastUpdated: string;
  tags: string[];
  categories: string[];
  capabilities: string[];
  verified: boolean;
  featured: boolean;
  installCommand: string;
  configSchema?: Record<string, any>;
  readme?: string;
}

export interface RegistrySource {
  name: string;
  url: string;
  fetcher: "json" | "github" | "html" | "api";
  parser: (data: any) => MCPServer[];
  schedule: "daily" | "weekly";
}

export interface SyncResult {
  added: number;
  updated: number;
  removed: number;
  duration: number;
  errors: string[];
}

export interface RegistryIndex {
  servers: MCPServer[];
  categories: string[];
  tags: string[];
  totalServers: number;
  totalStars: number;
  lastSync: string;
  registries: RegistryInfo[];
}

export interface RegistryInfo {
  name: string;
  url: string;
  serverCount: number;
  lastFetched: string;
  status: "active" | "degraded" | "down";
}

export class RegistryAggregator {
  private sources: RegistrySource[] = [
    {
      name: "official",
      url: "https://raw.githubusercontent.com/modelcontextprotocol/registry/main/data/servers.json",
      fetcher: "json",
      parser: this.parseOfficial,
      schedule: "daily"
    },
    {
      name: "agentic-gateway",
      url: "https://raw.githubusercontent.com/agentic-community/mcp-gateway-registry/main/servers.json",
      fetcher: "json",
      parser: this.parseAgentic,
      schedule: "daily"
    },
    {
      name: "toolsdk",
      url: "https://api.toolsdk.ai/mcp/servers",
      fetcher: "api",
      parser: this.parseToolSDK,
      schedule: "daily"
    },
    {
      name: "mcpm",
      url: "https://mcpm.sh/api/servers",
      fetcher: "api",
      parser: this.parseMCPM,
      schedule: "daily"
    }
  ];
  
  private servers: Map<string, MCPServer> = new Map();
  
  async sync(full = false): Promise<SyncResult> {
    const start = Date.now();
    let added = 0, updated = 0, removed = 0;
    const errors: string[] = [];
    
    for (const source of this.sources) {
      try {
        console.log(`Fetching ${source.name}...`);
        const data = await this.fetchSource(source);
        const servers = source.parser(data);
        
        for (const server of servers) {
          const existing = this.servers.get(server.name);
          if (!existing) {
            this.servers.set(server.name, server);
            added++;
          } else if (full || this.hasChanged(existing, server)) {
            this.servers.set(server.name, server);
            updated++;
          }
        }
      } catch (error) {
        errors.push(`${source.name}: ${error}`);
      }
    }
    
    // Remove stale (only on full sync)
    if (full) {
      const currentNames = new Set(this.servers.keys());
      const fetchedNames = new Set();
      for (const source of this.sources) {
        try {
          const data = await this.fetchSource(source);
          source.parser(data).forEach(s => fetchedNames.add(s.name));
        } catch {}
      }
      
      for (const name of currentNames) {
        if (!fetchedNames.has(name)) {
          this.servers.delete(name);
          removed++;
        }
      }
    }
    
    return { added, updated, removed, duration: Date.now() - start, errors };
  }
  
  private async fetchSource(source: { fetcher: string; url: string }): Promise<any> {
    const response = await fetch(source.url, {
      headers: { "User-Agent": "MCP-Scout/0.1" }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    return source.fetcher === "json" || source.fetcher === "api" 
      ? response.json() 
      : response.text();
  }
  
  private hasChanged(old: MCPServer, newServer: MCPServer): boolean {
    return old.version !== newServer.version || 
           old.lastUpdated !== newServer.lastUpdated ||
           old.stars !== newServer.stars;
  }
  
  generateIndex() {
    const servers = Array.from(this.servers.values());
    return {
      servers,
      categories: [...new Set(servers.flatMap(s => s.categories))].sort(),
      tags: [...new Set(servers.flatMap(s => s.tags))].sort(),
      totalServers: servers.length,
      totalStars: servers.reduce((sum, s) => sum + s.stars, 0),
      lastSync: new Date().toISOString(),
      registries: this.sources.map(s => ({
        name: s.name,
        url: s.url,
        serverCount: 0,
        lastFetched: new Date().toISOString(),
        status: "active"
      }))
    };
  }
  
  // Parsers
  parseOfficial = (data: any): MCPServer[] => data.servers || [];
  parseAgentic = (data: any): MCPServer[] => data.servers || [];
  parseToolSDK = (data: any): MCPServer[] => data.data || [];
  parseMCPM = (data: any): MCPServer[] => data.servers || [];
}
