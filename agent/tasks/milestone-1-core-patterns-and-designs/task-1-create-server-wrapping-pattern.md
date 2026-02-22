# Task 1: Create Server Wrapping Pattern

**Milestone**: [M1 - Core Patterns and Designs](../milestones/milestone-1-core-patterns-and-designs.md)
**Estimated Time**: 3-4 hours
**Dependencies**: None
**Status**: Not Started

---

## Objective

Document the server wrapping pattern that shows how to use `wrapServer` from @prmichaelsen/mcp-auth to create authenticated, multi-tenant MCP servers.

---

## Context

The server wrapping pattern is the foundational pattern for all MCP auth-wrapped servers. It demonstrates how to take an existing MCP server factory function and wrap it with authentication and multi-tenancy support. This pattern is extracted from remember-mcp-server and task-mcp-server implementations and should be made generic and reusable.

---

## Steps

### 1. Review Reference Implementations

Read the index.ts files from reference projects:
- `/home/prmichaelsen/remember-mcp-server/src/index.ts`
- `/home/prmichaelsen/task-mcp-server/src/index.ts`

Identify common patterns and structure.

### 2. Create Pattern File

Create `agent/patterns/server-wrapping.md` following the ACP pattern template.

### 3. Document Pattern Overview

Write the overview section explaining:
- What server wrapping is
- When to use it
- Benefits of wrapping servers with mcp-auth

### 4. Document Core Principles

Explain the key concepts:
- Server factory function pattern
- Authentication provider integration
- Transport configuration (SSE, stdio)
- Middleware options (rate limiting, logging)

### 5. Provide Implementation Example

Include complete code example showing:
```typescript
import { wrapServer } from '@prmichaelsen/mcp-auth';
import { createServer } from './your-mcp-server/factory';
import { YourAuthProvider } from './auth/provider';

const authProvider = new YourAuthProvider(config);

const wrappedServer = wrapServer({
  serverFactory: async (accessToken: string, userId: string) => {
    return await createServer(accessToken, userId);
  },
  authProvider,
  resourceType: 'your-resource',
  transport: {
    type: 'sse',
    port: 8080,
    host: '0.0.0.0',
    basePath: '/mcp',
    cors: true,
    corsOrigin: process.env.CORS_ORIGIN
  },
  middleware: {
    rateLimit: {
      enabled: true,
      maxRequests: 100,
      windowMs: 60 * 60 * 1000
    },
    logging: {
      enabled: true,
      level: 'info'
    }
  }
});

await wrappedServer.start();
```

### 6. Document Configuration Options

Detail all wrapServer configuration options:
- serverFactory (required)
- authProvider (required)
- resourceType (required)
- transport options
- middleware options
- tokenResolver (optional)

### 7. Document Common Patterns

Include sections for:
- Static servers (no tokenResolver)
- Dynamic servers (with tokenResolver)
- Graceful shutdown handling
- Error handling

### 8. Document Anti-Patterns

List what NOT to do:
- Don't create server instances outside serverFactory
- Don't share state between user instances
- Don't skip authentication validation
- Don't expose health check with sensitive data

### 9. Add Examples Section

Provide multiple examples:
- Minimal static server
- Server with token resolver
- Server with custom middleware
- Server with stdio transport

### 10. Review and Validate

- Ensure code examples are syntactically correct
- Verify pattern is generic (no project-specific references)
- Check that pattern follows ACP template structure
- Confirm all sections are complete

---

## Verification

- [ ] Pattern file created at agent/patterns/server-wrapping.md
- [ ] Overview section explains what and why
- [ ] Core principles documented
- [ ] Complete implementation example provided
- [ ] All configuration options documented
- [ ] Common patterns documented
- [ ] Anti-patterns documented
- [ ] Multiple examples provided
- [ ] Code examples are syntactically correct
- [ ] Pattern is generic and reusable
- [ ] Follows ACP pattern template structure

---

## Notes

- Focus on extracting proven patterns from reference projects
- Make pattern generic - remove project-specific details
- Include code examples that users can copy and adapt
- Document both static and dynamic server patterns
- Reference mcp-auth documentation where appropriate

---

**Next Task**: [Task 2: Create Auth Provider Patterns](task-2-create-auth-provider-patterns.md)
