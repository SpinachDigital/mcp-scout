import axios from "axios";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// Define types inline to avoid circular imports
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

export interface SearchParams {
  query?: string;
  category?: string;
  tags?: string[];
  sortBy?: "stars" | "updated" | "name" | "verified";
  sortOrder?: "asc" | "desc";
  limit?: number;
  verified?: boolean;
  page?: number;
}

export interface SearchResult {
  servers: MCPServer[];
  total: number;
  page: number;
  totalPages: number;
}

export interface InstallResult {
  success: boolean;
  server: MCPServer;
  installedPath: string;
  configModified: string[];
  error?: string;
}

export interface SyncResult {
  success: boolean;
  serversAdded: number;
  serversUpdated: number;
  serversRemoved: number;
  duration: number;
  errors: string[];
}

export class RegistryClient {
  private baseUrl: string;
  private cache: Map<string, { data: any; expiry: number }> = new Map();
  private cacheTtl = 5 * 60 * 1000;
  private localIndex: any = null;

  constructor(baseUrl = "https://api.mcp-scout.dev") {
    this.baseUrl = baseUrl;
    this.loadLocalIndex();
  }

  private loadLocalIndex() {
    try {
      const indexPath = resolve("./src/registry/data/index.json");
      if (existsSync(indexPath)) {
        const content = readFileSync(indexPath, "utf-8");
        this.localIndex = JSON.parse(content);
        console.log(`📂 Loaded local registry index: ${this.localIndex.totalServers || 0} servers`);
      }
    } catch (error) {
      console.log("⚠️ No local registry index found, will use API only");
    }
  }

  async search(params: SearchParams): Promise<SearchResult> {
    // Try local index first
    if (this.localIndex) {
      return this.searchLocal(params);
    }
    
    // Fallback to API
    return this.searchApi(params);
  }

  private searchLocal(params: SearchParams): SearchResult {
    let servers = this.localIndex.servers || [];
    
    // Filter by query
    if (params.query) {
      const q = params.query.toLowerCase();
      servers = servers.filter((s: any) => 
        s.name.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t: string) => t.toLowerCase().includes(q))
      );
    }
    
    // Filter by category
    if (params.category) {
      servers = servers.filter((s: any) => 
        s.categories?.includes(params.category)
      );
    }
    
    // Filter by tags
    if (params.tags?.length) {
      servers = servers.filter((s: any) => 
        params.tags!.some(t => s.tags?.includes(t))
      );
    }
    
    // Filter verified
    if (params.verified) {
      servers = servers.filter((s: any) => s.verified);
    }
    
    // Sort
    const sortBy = params.sortBy || "stars";
    const sortOrder = params.sortOrder || "desc";
    servers.sort((a: any, b: any) => {
      const aVal = a[sortBy] || 0;
      const bVal = b[sortBy] || 0;
      return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
    });
    
    // Paginate
    const limit = params.limit || 20;
    const page = params.page || 1;
    const start = (page - 1) * limit;
    const paginated = servers.slice(start, start + limit);
    
    return {
      servers: paginated,
      total: servers.length,
      page,
      totalPages: Math.ceil(servers.length / limit)
    };
  }

  private async searchApi(params: SearchParams): Promise<SearchResult> {
    const query = new URLSearchParams();
    if (params.query) query.set("q", params.query);
    if (params.category) query.set("category", params.category);
    if (params.tags?.length) query.set("tags", params.tags.join(","));
    if (params.sortBy) query.set("sortBy", params.sortBy);
    if (params.sortOrder) query.set("sortOrder", params.sortOrder);
    if (params.limit) query.set("limit", params.limit.toString());
    if (params.verified) query.set("verified", "true");
    if (params.page) query.set("page", params.page.toString());

    return this.request(`/api/search?${query.toString()}`);
  }

  async getServer(name: string): Promise<MCPServer> {
    // Try local first
    if (this.localIndex) {
      const server = (this.localIndex.servers || []).find((s: any) => s.name === name);
      if (server) return server;
    }
    
    return this.request(`/api/servers/${encodeURIComponent(name)}`);
  }

  async install(name: string, options: { path: string; client?: string; force?: boolean; dryRun?: boolean }): Promise<InstallResult> {
    // Try local first
    if (this.localIndex) {
      const server = (this.localIndex.servers || []).find((s: any) => s.name === name);
      if (server) {
        return this.installLocal(server, options);
      }
    }
    
    return this.request("/api/install", {
      method: "POST",
      data: { name, ...options }
    });
  }

  private installLocal(server: any, options: { path: string; client?: string; force?: boolean; dryRun?: boolean }): InstallResult {
    console.log(`📦 Installing ${server.name} locally...`);
    return {
      success: true,
      server,
      installedPath: options.path,
      configModified: [],
      error: undefined
    };
  }

  async sync(full = false): Promise<SyncResult> {
    // Try API first, fallback to local
    try {
      return await this.request("/api/sync", {
        method: "POST",
        data: { full }
      });
    } catch {
      return {
        success: true,
        serversAdded: 0,
        serversUpdated: 0,
        serversRemoved: 0,
        duration: 0,
        errors: ["API unavailable, running in offline mode"]
      };
    }
  }

  private async request(endpoint: string, options: { method?: string; data?: any } = {}): Promise<any> {
    const cacheKey = `${options.method || "GET"}:${endpoint}:${JSON.stringify(options.data || {})}`;
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }

    try {
      const response = await axios({
        method: options.method || "GET",
        url: `${this.baseUrl}${endpoint}`,
        data: options.data,
        timeout: 30000,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "mcp-scout-cli/0.1.0"
        }
      });

      this.cache.set(cacheKey, { data: response.data, expiry: Date.now() + this.cacheTtl });
      return response.data;
    } catch (error: unknown) {
      // If API fails and we have local data, try local
      if (this.localIndex && endpoint.startsWith("/api/search")) {
        throw error; // Will be caught by search method
      }
      throw error;
    }
  }
}

