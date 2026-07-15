# Contributing to MCP Scout

Thank you for contributing! 

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

## How to Contribute

### Reporting Bugs

1. Check existing issues first
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment (OS, Node version, CLI version)

### Suggesting Features

1. Check existing issues/discussions
2. Open a discussion for major features
3. For small features, open an issue with "enhancement" label

### Pull Requests

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Make changes with tests
4. Run `npm run lint && npm run typecheck && npm run test`
5. Commit with conventional commits: `feat: add amazing feature`
6. Push and open PR

## Development Setup

```bash
# Clone
git clone https://github.com/SpinachDigital/mcp-scout
cd mcp-scout

# Install
npm install

# Dev mode
npm run dev

# Run tests
npm run test

# Type check
npm run typecheck

# Lint
npm run lint
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting |
| `refactor` | Code restructuring |
| `test` | Tests |
| `chore` | Maintenance |

Examples:
- `feat: add category filter to web search`
- `fix: handle missing config in install command`
- `docs: update CLI usage examples`

## Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## Code Style

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
4. Update README registry table

## Questions?

Open a discussion or email abhishek@spinachdigital.com

Thank you for contributing!
