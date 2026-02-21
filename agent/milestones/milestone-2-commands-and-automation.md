# Milestone 2: Commands and Automation

**Goal**: Implement all @mcp-auth-server-base.* commands for package functionality
**Duration**: 3-4 days
**Dependencies**: Milestone 1 (patterns must exist for commands to reference)
**Status**: Not Started

---

## Overview

This milestone creates the command system that provides automation and guidance for users. Commands handle initialization, code generation, deployment, and maintenance tasks. Each command is a markdown file that provides step-by-step instructions for agents to execute, making the package interactive and user-friendly.

---

## Deliverables

### 1. Core Commands
- `@mcp-auth-server-base.init` - Guided initialization workflow
- `@mcp-auth-server-base.validate` - Project validation

### 2. Deployment Commands
- `@mcp-auth-server-base.deploy` - Deploy to Cloud Run
- `@mcp-auth-server-base.setup-secrets` - Secrets management helper
- `@mcp-auth-server-base.logs` - Fetch Cloud Run logs (read-only)

### 3. Generation Commands
- `@mcp-auth-server-base.generate-dockerfile` - Generate Dockerfile
- `@mcp-auth-server-base.generate-cloudbuild` - Generate cloudbuild.yaml
- `@mcp-auth-server-base.add-auth-provider` - Add auth provider

### 4. Maintenance Commands
- `@mcp-auth-server-base.mcp-auth-version-check` - Check mcp-auth version
- `@mcp-auth-server-base.mcp-auth-version-update` - Update mcp-auth version

### 5. Development Commands (Optional)
- `@mcp-auth-server-base.tool-create` - Generate MCP tool boilerplate

---

## Success Criteria

- [ ] All 10+ commands implemented in `agent/commands/`
- [ ] Each command follows ACP command template structure
- [ ] Commands reference patterns from Milestone 1
- [ ] `@mcp-auth-server-base.init` provides complete guided workflow
- [ ] Commands are well-documented with examples
- [ ] Commands handle errors gracefully
- [ ] All commands tested manually

---

## Key Files to Create

```
agent/
└── commands/
    ├── mcp-auth-server-base.init.md
    ├── mcp-auth-server-base.validate.md
    ├── mcp-auth-server-base.deploy.md
    ├── mcp-auth-server-base.setup-secrets.md
    ├── mcp-auth-server-base.logs.md
    ├── mcp-auth-server-base.generate-dockerfile.md
    ├── mcp-auth-server-base.generate-cloudbuild.md
    ├── mcp-auth-server-base.add-auth-provider.md
    ├── mcp-auth-server-base.mcp-auth-version-check.md
    ├── mcp-auth-server-base.mcp-auth-version-update.md
    └── mcp-auth-server-base.tool-create.md (optional)
```

---

## Tasks

1. Create `@mcp-auth-server-base.init` command - Guided initialization workflow
2. Create `@mcp-auth-server-base.validate` command - Project validation
3. Create `@mcp-auth-server-base.deploy` command - Cloud Run deployment
4. Create `@mcp-auth-server-base.setup-secrets` command - Secrets management
5. Create `@mcp-auth-server-base.logs` command - Log fetching
6. Create `@mcp-auth-server-base.generate-dockerfile` command - Dockerfile generation
7. Create `@mcp-auth-server-base.generate-cloudbuild` command - Cloud Build generation
8. Create `@mcp-auth-server-base.add-auth-provider` command - Auth provider addition
9. Create `@mcp-auth-server-base.mcp-auth-version-check` command - Version checking
10. Create `@mcp-auth-server-base.mcp-auth-version-update` command - Version updating
11. Test all commands manually - Ensure they work correctly

---

## Environment Variables

Not applicable for this milestone (commands document env vars, don't use them).

---

## Testing Requirements

- [ ] Each command tested manually
- [ ] Commands produce expected outputs
- [ ] Error handling works correctly
- [ ] Commands reference correct patterns

---

## Documentation Requirements

- [ ] All commands follow ACP command template
- [ ] Each command has clear prerequisites
- [ ] Step-by-step instructions provided
- [ ] Examples and troubleshooting included

---

## Risks and Mitigation

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| Commands too complex | High | Medium | Break into smaller, focused commands |
| Commands reference non-existent patterns | High | Low | Ensure Milestone 1 complete before starting |
| Init command workflow unclear | High | Medium | Test with multiple scenarios, gather feedback |

---

**Next Milestone**: [milestone-3-templates-and-files.md](milestone-3-templates-and-files.md)
**Blockers**: Milestone 1 must be complete (patterns must exist)
**Notes**: Focus on `@mcp-auth-server-base.init` first as it's the most critical command
