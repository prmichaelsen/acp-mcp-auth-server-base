# Milestone 1: Core Patterns and Designs

**Goal**: Create foundational patterns and design documents that define how MCP auth servers should be structured
**Duration**: 2-3 days
**Dependencies**: None (requirements.md already complete)
**Status**: Not Started

---

## Overview

This milestone establishes the core documentation and patterns that will guide users in building MCP auth-wrapped servers. It creates the knowledge base that all commands and templates will reference. These patterns extract best practices from the reference projects (mcp-auth, remember-mcp-server, task-mcp-server) and make them reusable and generic.

---

## Deliverables

### 1. Core Patterns
- Server wrapping pattern (how to use wrapServer from mcp-auth)
- Auth provider implementation pattern (JWT, OAuth, API Key, Env)
- Token resolver pattern (for dynamic credential fetching)
- Static server pattern (no tokenResolver)
- Multi-tenant data isolation pattern

### 2. Operational Patterns
- Error handling pattern
- Logging pattern
- Health check endpoint pattern
- CORS configuration pattern
- Environment configuration pattern

### 3. Deployment Patterns
- Docker multi-stage build pattern
- Cloud Build configuration pattern
- Cloud Run deployment pattern
- Secrets management pattern

### 4. Testing Patterns
- Jest configuration pattern
- Testing auth providers pattern
- Mocking external dependencies pattern

### 5. Design Documents
- Overall architecture design
- Security considerations design
- Performance optimization design (if applicable)

---

## Success Criteria

- [x] All 12+ patterns documented in `agent/patterns/` (18 created)
- [x] Each pattern includes overview, implementation, examples, and anti-patterns
- [x] Patterns reference actual code from reference projects
- [x] Design documents provide architectural guidance
- [x] All patterns are generic (no project-specific references)
- [x] Patterns follow ACP pattern template structure

---

## Key Files to Create

```
agent/
└── patterns/
    ├── server-wrapping.md
    ├── auth-provider-jwt.md
    ├── auth-provider-oauth.md
    ├── auth-provider-apikey.md
    ├── auth-provider-env.md
    ├── token-resolver.md
    ├── static-server.md
    ├── multi-tenant-isolation.md
    ├── error-handling.md
    ├── logging.md
    ├── health-check.md
    ├── cors-configuration.md
    ├── environment-configuration.md
    ├── docker-multistage.md
    ├── cloud-build.md
    ├── cloud-run-deployment.md
    ├── secrets-management.md
    ├── jest-configuration.md
    └── testing-auth-providers.md
```

```
agent/
└── design/
    ├── architecture.md
    ├── security-considerations.md
    └── performance-optimization.md (if applicable)
```

---

## Tasks

1. Create server wrapping pattern - Extract from remember/task-mcp-server index.ts
2. Create auth provider patterns - Extract from platform-jwt-provider.ts
3. Create token resolver pattern - Extract from platform-token-resolver.ts
4. Create static server pattern - Document no-tokenResolver approach
5. Create operational patterns - Error handling, logging, health check, CORS, env config
6. Create deployment patterns - Docker, Cloud Build, Cloud Run, secrets
7. Create testing patterns - Jest config, auth provider testing
8. Create architecture design - Overall system design
9. Create security design - Security considerations and best practices
10. Review and validate all patterns - Ensure completeness and accuracy

---

## Environment Variables

Not applicable for this milestone (documentation only).

---

## Testing Requirements

- [ ] All patterns reviewed for accuracy against reference projects
- [ ] Code examples in patterns are syntactically correct
- [ ] Patterns are generic and reusable

---

## Documentation Requirements

- [ ] All patterns follow ACP pattern template
- [ ] Each pattern has clear examples
- [ ] Anti-patterns documented where applicable
- [ ] Design documents provide architectural guidance

---

## Risks and Mitigation

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| Patterns too specific to reference projects | High | Medium | Review each pattern for generalizability, remove project-specific details |
| Missing important patterns | Medium | Low | Cross-reference with requirements.md and reference projects |
| Patterns unclear or incomplete | Medium | Medium | Include code examples and anti-patterns for clarity |

---

**Next Milestone**: [milestone-2-commands-and-automation.md](milestone-2-commands-and-automation.md)
**Blockers**: None
**Notes**: Focus on extracting proven patterns from reference projects, not inventing new ones
