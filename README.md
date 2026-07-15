# MCP Scout

> The definitive registry for Model Context Protocol servers. Search, install, and manage MCP servers for AI agents.

[![npm version](https://img.shields.io/npm/v/mcp-scout-cli?style=flat&color=00FFAA)](https://www.npmjs.com/package/mcp-scout-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node >=20](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-00FFAA.svg)](CONTRIBUTING.md)

## What is MCP Scout?

MCP (Model Context Protocol) servers are exploding - but they're scattered across 7+ registries with no unified search. **MCP Scout solves this.**

One CLI. One Web UI. Searches **all registries** (official, agentic-community, toolsdk, mcpm.sh, and more). Install directly to Claude Code, Cursor, Cline, Codex, or generic config.

## Features

| Feature | Description |
|---------|-------------|
| Unified Search | Searches 7+ registries simultaneously |
| One-Click Install | Auto-configures for Claude, Cursor, Cline, Codex |
| Smart Filters | By category, tags, verification status, stars |
| Local Sync | Cached registry for offline search |
| Verified Badges | Official + community-verified servers |
| Web UI | Beautiful search at mcp-scout.dev |
| Trending | Weekly trending servers |
| Auto-Update | `mcp-scout sync` keeps registry fresh |

## Quick Start

### Install CLI

```bash
npm install -g mcp-scout-cli
# or
npx mcp-scout
```

### Search Servers

```bash
# Search all registries
mcp-scout search "filesystem"

# Filter by category
mcp-scout search --category database

# Only verified servers
mcp-scout search --verified

# Sort by recently updated
mcp-scout search --sort updated
```

### Install Server

```bash
# Install to Claude Code (auto-detects config)
mcp-scout install filesystem

# Install to specific client
mcp-scout install owner/repo --client cursor

# Dry run (show what would happen)
mcp-scout install filesystem --dry-run
```

### Sync Registry

```bash
# Incremental (daily)
mcp-scout sync

# Full refresh (weekly)
mcp-scout sync --full
```

## Web UI

Visit **mcp-scout.dev** for the full web experience:
- Advanced filters and faceted search
- Server comparison view
- Trending & featured servers
- Category browsing
- Install commands copy-paste

## Supported Registries

| Registry | Servers | Source |
|----------|---------|--------|
| Official MCP | 7,000+ | [modelcontextprotocol/registry](https://github.com/modelcontextprotocol/registry) |
| Agentic Community | 800+ | [agentic-community/mcp-gateway-registry](https://github.com/agentic-community/mcp-gateway-registry) |
| ToolSDK | 180+ | [toolsdk-ai/toolsdk-mcp-registry](https://github.com/toolsdk-ai/toolsdk-mcp-registry) |
| mcpm.sh | 1,000+ | [mcpm.sh](https://mcpm.sh) |
| Awesome MCP | 300+ | [awesome-mcp](https://github.com/punkpeye/awesome-mcp) |
| GitHub Topics | 500+ | `topic:mcp-server` |

## Installation Targets

| Client | Config File | Auto-Detect |
|--------|-------------|-------------|
| **Claude Code** | `~/.claude/mcp_servers.json` | YES |
| **Cursor** | `.cursor/mcp.json` | YES |
| **Cline** | `~/.config/cline/mcp_servers.json` | YES |
| **Codex** | `~/.codex/mcp_servers.json` | YES |
| **Generic** | `mcp.json` | YES |

## Architecture

```
mcp-scout/
├── package.json                    # Root workspace config
├── .github/workflows/              # CI/CD pipelines
├── src/
│   ├── cli/                        # CLI Package (npm publishable)
│   │   ├── src/
│   │   │   ├── main.ts             # Entry point
│   │   │   ├── commands/           # CLI commands
│   │   │   ├── lib/                # Registry client, formatting
│   │   │   └── sync.ts             # Registry sync script
│   │   └── package.json
│   ├── web/                        # Next.js 14 Web App
│   │   ├── src/
│   │   │   ├── app/                # App router pages
│   │   │   ├── components/         # React components
│   │   │   └── lib/                # Utilities
│   │   └── package.json
│   ├── shared/                     # Shared TypeScript interfaces
│   └── registry/                   # Registry aggregator
└── scripts/                        # Sync cron jobs
```

## Development

### Prerequisites
- Node.js 20+
- npm 10+

### Setup

```bash
git clone https://github.com/SpinachDigital/mcp-scout
cd mcp-scout
npm install
npm run dev        # Starts CLI watch + Next.js dev server
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all dev servers |
| `npm run build` | Build all packages |
| `npm run lint` | Lint all packages |
| `npm run test` | Run tests |
| `npm run typecheck` | TypeScript check |
| `npm run sync` | Sync registry data |

### Project Structure

```
mcp-scout/
├── package.json                    # Root workspace config
├── .github/workflows/              # CI/CD pipelines
├── src/
│   ├── cli/                        # CLI Package (npm publishable)
│   │   ├── src/
│   │   │   ├── main.ts             # Entry point
│   │   │   ├── commands/           # CLI commands
│   │   │   ├── lib/                # Registry client, formatting
│   │   │   └── sync.ts             # Registry sync script
│   │   └── package.json
│   ├── web/                        # Next.js 14 Web App
│   │   ├── src/
│   │   │   ├── app/                # App router pages
│   │   │   ├── components/         # React components
│   │   │   └── lib/                # Utilities
│   │   └── package.json
│   ├── shared/                     # Shared TypeScript interfaces
│   └── registry/                   # Registry aggregator
└── scripts/                        # Sync cron jobs
```

## Contributing

We welcome contributions! See CONTRIBUTING.md for guidelines.

### Quick Contribution Ideas

- Add a new registry to `src/registry/sources.ts`
- Fix a bug in CLI install logic
- Add a new filter to web search
- Improve documentation
- Improve UI components

### Code Style

- TypeScript strict mode
- ESLint + Prettier
- 2 space indentation
- Single quotes
- Trailing commas
- 100 char line width

Run `npm run lint` and `npm run typecheck` before committing.

## Adding a New Registry

1. Add registry config to `src/registry/sources.ts`
2. Implement fetcher in `src/registry/fetchers/`
3. Add tests
3. Update README registry table

## License

MIT License - see LICENSE for details.

## Acknowledgments

- Model Context Protocol team
- DesktopCommanderMCP - inspiration
- OmniRoute - model routing
- All MCP server authors

## Support

- Issues: https://github.com/SpinachDigital/mcp-scout/issues
- Discussions: https://github.com/SpinachDigital/mcp-scout/discussions
- Email: abhishek@spinachdigital.com

---

Built with care by Abhishek Jha at Spinach Digital

MCP Scout is not affiliated with Anthropic or the Model Context Protocol project.