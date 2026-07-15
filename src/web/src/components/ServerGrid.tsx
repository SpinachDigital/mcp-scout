"use client";
import { ServerCard } from "./ServerCard";

interface ServerGridProps {
  trending?: boolean;
  limit?: number;
  servers?: any[];
}

export function ServerGrid({ trending = false, limit = 6, servers }: ServerGridProps) {
  const mockServers = [
    {
      name: "modelcontextprotocol/filesystem",
      description: "Secure file system access with sandboxing",
      author: "modelcontextprotocol",
      stars: 8234,
      forks: 412,
      license: "MIT",
      tags: ["filesystem", "security", "sandbox"],
      verified: true,
      featured: true,
      lastUpdated: "2024-07-10"
    },
    {
      name: "wonderwhy-er/DesktopCommanderMCP",
      description: "Terminal control, file system search, diff editing",
      author: "wonderwhy-er",
      stars: 8304,
      forks: 1006,
      license: "MIT",
      tags: ["terminal", "filesystem", "editor"],
      verified: true,
      featured: true,
      lastUpdated: "2024-07-14"
    },
    {
      name: "github/octokit-mcp",
      description: "Full GitHub API access via MCP",
      author: "github",
      stars: 3421,
      forks: 287,
      license: "MIT",
      tags: ["github", "api", "git"],
      verified: true,
      featured: false,
      lastUpdated: "2024-07-08"
    },
    {
      name: "supabase/mcp-server",
      description: "Supabase database, auth, storage via MCP",
      author: "supabase",
      stars: 2156,
      forks: 198,
      license: "Apache-2.0",
      tags: ["database", "postgres", "auth"],
      verified: true,
      featured: false,
      lastUpdated: "2024-07-12"
    },
    {
      name: "vercel/ai-mcp",
      description: "Vercel AI SDK tools for MCP agents",
      author: "vercel",
      stars: 1876,
      forks: 134,
      license: "MIT",
      tags: ["ai", "vercel", "sdk"],
      verified: true,
      featured: false,
      lastUpdated: "2024-07-11"
    },
    {
      name: "anthropics/claude-code-mcp",
      description: "Claude Code integration for MCP",
      author: "anthropics",
      stars: 4291,
      forks: 312,
      license: "MIT",
      tags: ["claude", "coding", "agent"],
      verified: true,
      featured: true,
      lastUpdated: "2024-07-13"
    }
  ];

  const displayServers = servers || (trending ? mockServers.slice(0, limit) : mockServers);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayServers.map((server) => (
        <ServerCard key={server.name} server={server} />
      ))}
    </div>
  );
}
