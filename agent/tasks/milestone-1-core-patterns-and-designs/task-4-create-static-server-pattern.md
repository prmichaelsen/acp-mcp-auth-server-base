# Task 4: Create Static Server Pattern

**Milestone**: [M1 - Core Patterns and Designs](../milestones/milestone-1-core-patterns-and-designs.md)
**Estimated Time**: 2-3 hours
**Dependencies**: Task 1 (Server Wrapping Pattern)
**Status**: Not Started

---

## Objective

Document the static server pattern for MCP servers that don't require per-user credential fetching.

---

## Context

Static servers use authentication for user identification but don't fetch per-user credentials. This is simpler than dynamic servers and suitable for servers that don't need external API access tokens.

---

## Steps

### 1. Create Pattern File

Create `agent/patterns/static-server.md`.

### 2. Document Pattern Overview

Explain:
- What static servers are
- Difference from dynamic servers
- When to use static pattern
- Benefits and limitations

### 3. Provide Implementation Example

Show wrapServer configuration without tokenResolver.

### 4. Document Static with Credentials Variant

Explain the static_with_credentials pattern where credentials are shared across all users.

### 5. Provide Examples

Include examples for both static and static_with_credentials patterns.

### 6. Review and Validate

Ensure pattern is complete and accurate.

---

## Verification

- [ ] static-server.md created
- [ ] Pattern explains static vs dynamic servers
- [ ] Implementation examples provided
- [ ] static_with_credentials variant documented
- [ ] Pattern follows ACP template

---

**Next Task**: [Task 5: Create Operational Patterns](task-5-create-operational-patterns.md)
