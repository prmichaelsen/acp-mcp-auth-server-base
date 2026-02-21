# Task 3: Create Token Resolver Pattern

**Milestone**: [M1 - Core Patterns and Designs](../milestones/milestone-1-core-patterns-and-designs.md)
**Estimated Time**: 3-4 hours
**Dependencies**: None
**Status**: Not Started

---

## Objective

Document the token resolver pattern for dynamic credential fetching from multi-tenant platforms.

---

## Context

Token resolvers fetch per-user credentials from external platforms. The platform-token-resolver.ts from remember-mcp-server provides the reference implementation. This pattern is used for dynamic servers that need user-specific access tokens.

---

## Steps

### 1. Review Reference Implementation

Read `/home/prmichaelsen/remember-mcp-server/src/auth/platform-token-resolver.ts`.

### 2. Create Pattern File

Create `agent/patterns/token-resolver.md`.

### 3. Document Pattern Overview

Explain what token resolvers are and when to use them.

### 4. Document Implementation

Include complete code example showing:
- Token caching (5min TTL)
- Platform API integration
- JWT forwarding
- Error handling for missing credentials

### 5. Document Configuration

Detail all configuration options and best practices.

### 6. Provide Examples

Show examples for different platform integrations.

### 7. Review and Validate

Ensure pattern is complete and follows ACP template.

---

## Verification

- [ ] token-resolver.md created
- [ ] Pattern explains when to use token resolvers
- [ ] Complete implementation example provided
- [ ] Caching strategy documented
- [ ] Error handling documented
- [ ] Pattern is generic and reusable

---

**Next Task**: [Task 4: Create Static Server Pattern](task-4-create-static-server-pattern.md)
