# ACP Package: mcp-auth-server-base

Use with MCP server projects that depend on @prmichaelsen/mcp-auth.

> **This package is designed for use with the [Agent Context Protocol](https://github.com/prmichaelsen/agent-context-protocol). Read more about ACP [here](https://github.com/prmichaelsen/agent-context-protocol).**

## Installation

### Quick Start (Bootstrap New Project)

Install ACP and this package in one command:

```bash
curl -fsSL https://github.com/username/acp-mcp-auth-server-base/raw/main/scripts/bootstrap.sh | bash
```

This will:
1. Install ACP if not already installed
2. Install this package
3. Initialize your project with ACP

### Install Package Only (ACP Already Installed)

If you already have ACP installed in your project:

```bash
@acp.package-install https://github.com/username/acp-mcp-auth-server-base
```

Or using the installation script:

```bash
./agent/scripts/acp.package-install.sh https://github.com/username/acp-mcp-auth-server-base
```

## What's Included

<!-- ACP_AUTO_UPDATE_START:CONTENTS -->
### Commands

(No commands yet - use @acp.command-create to add commands)

### Patterns

- **[Server Wrapping](agent/patterns/mcp-auth-server-base.server-wrapping.md)** - How to wrap MCP servers with authentication and multi-tenancy using wrapServer

### Designs

(No designs yet - use @acp.design-create to add designs)
<!-- ACP_AUTO_UPDATE_END:CONTENTS -->

## Why Use This Package

(Add benefits and use cases here)

## Usage

(Add usage examples here)

## Development

### Setup

1. Clone this repository
2. Make changes
3. Run `@acp.package-validate` to validate
4. Run `@acp.package-publish` to publish

### Adding New Content

- Use `@acp.pattern-create` to create patterns
- Use `@acp.command-create` to create commands
- Use `@acp.design-create` to create designs

These commands automatically:
- Add namespace prefix to filenames
- Update package.yaml contents section
- Update this README.md

### Testing

Run `@acp.package-validate` to validate your package locally.

### Publishing

Run `@acp.package-publish` to publish updates. This will:
- Validate the package
- Detect version bump from commits
- Update CHANGELOG.md
- Create git tag
- Push to remote
- Test installation

## Namespace Convention

All files in this package use the `mcp-auth-server-base` namespace:
- Commands: `mcp-auth-server-base.command-name.md`
- Patterns: `mcp-auth-server-base.pattern-name.md`
- Designs: `mcp-auth-server-base.design-name.md`

## Dependencies

(List any required packages or project dependencies here)

## Contributing

Contributions are welcome! Please:

1. Follow the existing pattern structure
2. Use entity creation commands (@acp.pattern-create, etc.)
3. Run @acp.package-validate before committing
4. Document your changes in CHANGELOG.md
5. Test installation before submitting

## License

MIT

## Author

Patrick Michaelsen
