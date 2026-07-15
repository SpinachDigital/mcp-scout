import axios from "axios";

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
  server: any;
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

  constructor(baseUrl = "https://api.mcp-scout.dev") {
    this.baseUrl = baseUrl;
  }

  async search(params: any): Promise<any> {
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

  async getServer(name: string): Promise<any> {
    return this.request(`/api/servers/${encodeURIComponent(name)}`);
  }

  async install(name: string, options: { path: string; client?: string; force?: boolean; dryRun?: boolean }): Promise<any> {
    return this.request("/api/install", {
      method: "POST",
      data: { name, ...options }
    });
  }

  async sync(full = false): Promise<any> {
    return this.request("/api/sync", {
      method: "POST",
      data: { full }
    });
  }

  private async request(endpoint: string, options: { method?: string; data?: any } = {}): Promise<any> {
    const cacheKey = `${options.method || "GET"}:${endpoint}:${JSON.stringify(options.data || {})}`;
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }

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
  }
}
