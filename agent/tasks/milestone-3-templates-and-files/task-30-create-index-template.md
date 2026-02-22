# Task 30: Create src/index.ts Template

**Milestone**: [M3 - Templates and Configuration Files](../milestones/milestone-3-templates-and-files.md)
**Estimated Time**: 4-5 hours
**Dependencies**: [Task 1: Server Wrapping Pattern](task-1-create-server-wrapping-pattern.md), [Task 2: Auth Provider Patterns](task-2-create-auth-provider-patterns.md)
**Status**: Not Started

---

## Objective

Create the main server entry point template (`templates/src/index.ts.template`) that demonstrates how to use `wrapServer()` with different server types and authentication providers. Include placeholders for customization.

---

## Context

The `index.ts` file is the entry point for MCP auth servers. It must demonstrate:
- Importing and configuring wrapServer
- Setting up authentication providers
- Configuring server options (CORS, health checks, logging)
- Supporting all three server types (static, static_with_credentials, dynamic)
- Proper error handling and logging

The [Server Wrapping Pattern](../patterns/mcp-auth-server-base.server-wrapping.md) provides the complete specification.

---

## Steps

### 1. Review Server Wrapping Pattern

Read the [Server Wrapping Pattern](../patterns/mcp-auth-server-base.server-wrapping.md) to understand:
- wrapServer() configuration options
- Server type differences
- Authentication provider setup
- Middleware configuration

### 2. Create Template with Placeholders

Create `templates/src/index.ts.template` with conditional sections based on server type and auth provider. Use placeholder syntax that the `@mcp-auth-server-base.init` command can process.

**Template Structure**:
```typescript
#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { wrapServer } from '@prmichaelsen/mcp-auth';
// {{IMPORTS}} - Conditional imports based on configuration

// Environment configuration
const PORT = parseInt(process.env.PORT || '8080', 10);
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
// {{ENV_VARS}} - Additional environment variables

// Create base MCP server
function createMCPServer(): Server {
  const server = new Server(
    {
      name: '{{SERVICE_NAME}}',
      version: '{{SERVICE_VERSION}}',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // {{TOOLS}} - Add your tools here

  return server;
}

// Main server initialization
async function main() {
  const mcpServer = createMCPServer();
  
  // {{SERVER_CONFIG}} - Server-specific configuration
  
  const wrappedServer = wrapServer({
    server: mcpServer,
    serverType: '{{SERVER_TYPE}}',
    // {{AUTH_CONFIG}} - Authentication configuration
    corsOrigin: CORS_ORIGIN,
    port: PORT,
    healthCheck: { enabled: true },
  });

  await wrappedServer.start();
  console.log(`{{SERVICE_NAME}} running on port ${PORT}`);
}

main().catch(console.error);
```

### 3. Create Variant Examples

Create example variants for documentation:
- `index.static.example.ts` - Static server example
- `index.dynamic.example.ts` - Dynamic server example
- `index.static-with-credentials.example.ts` - Static with credentials example

### 4. Document Placeholder System

Create documentation explaining placeholders:
```markdown
# Template Placeholders

- `{{SERVICE_NAME}}` - Name of the MCP service
- `{{SERVICE_VERSION}}` - Version number
- `{{SERVER_TYPE}}` - One of: static, static_with_credentials, dynamic
- `{{AUTH_PROVIDER}}` - One of: jwt, oauth, apikey, environment
- `{{IMPORTS}}` - Conditional imports based on configuration
- `{{ENV_VARS}}` - Additional environment variables
- `{{TOOLS}}` - Tool implementations
- `{{SERVER_CONFIG}}` - Server-specific configuration
- `{{AUTH_CONFIG}}` - Authentication configuration
```

### 5. Test Template Processing

Create a test script that processes placeholders:
```typescript
// Test placeholder replacement
const template = readFileSync('templates/src/index.ts.template', 'utf-8');
const processed = template
  .replace(/{{SERVICE_NAME}}/g, 'test-service')
  .replace(/{{SERVER_TYPE}}/g, 'static')
  .replace(/{{AUTH_PROVIDER}}/g, 'jwt');

// Verify processed template compiles
writeFileSync('test-output.ts', processed);
// Run: npx tsc test-output.ts --noEmit
```

### 6. Cross-Reference with Patterns

Ensure template demonstrates:
- [Server Wrapping Pattern](../patterns/mcp-auth-server-base.server-wrapping.md)
- [Auth Provider Patterns](../patterns/mcp-auth-server-base.auth-provider-jwt.md) (all 4 types)
- [Token Resolver Pattern](../patterns/mcp-auth-server-base.token-resolver.md) (for dynamic)
- [Static Server Pattern](../patterns/mcp-auth-server-base.static-server.md)
- [Error Handling Pattern](../patterns/mcp-auth-server-base.error-handling.md)
- [Logging Pattern](../patterns/mcp-auth-server-base.logging.md)

---

## Verification

- [ ] `templates/src/index.ts.template` file created
- [ ] Demonstrates wrapServer() usage
- [ ] Supports all three server types
- [ ] Supports all four auth providers
- [ ] Placeholders clearly marked
- [ ] Conditional sections documented
- [ ] Example variants created
- [ ] Template processes correctly
- [ ] Processed template compiles without errors
- [ ] Aligns with Server Wrapping Pattern
- [ ] Includes error handling and logging

---

## Expected Output

**File Created**:
- `templates/src/index.ts.template`: Main server template with placeholders

**File Structure**:
```
templates/
├── config/ [5 files]
├── docker/ [2 files]
├── deployment/ [1 file]
└── src/
    └── index.ts.template (new)
```

**Template Features**:
- Conditional imports based on configuration
- Environment variable validation
- wrapServer() configuration
- Health check support
- CORS configuration
- Error handling
- Logging setup

---

## Common Issues and Solutions

### Issue 1: Placeholder syntax conflicts

**Symptom**: Template syntax interferes with TypeScript
**Solution**: Use comment-based placeholders or ensure placeholder syntax is TypeScript-compatible.

### Issue 2: Conditional sections unclear

**Symptom**: Users don't know which sections to keep/remove
**Solution**: Use clear conditional markers and provide example variants.

### Issue 3: Template doesn't compile

**Symptom**: TypeScript errors in template
**Solution**: Test template with all placeholder combinations. Ensure each variant compiles.

---

## Resources

- [Server Wrapping Pattern](../patterns/mcp-auth-server-base.server-wrapping.md): Complete wrapServer() documentation
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk): MCP server creation
- [Template Processing Best Practices](https://handlebarsjs.com/guide/): Template syntax reference

---

## Notes

- Template must be valid TypeScript after placeholder replacement
- Consider using Handlebars-style syntax for conditionals
- Provide complete examples for each server type
- Document all placeholders clearly
- Test with multiple configurations

---

**Next Task**: [Task 31: Create platform-jwt-provider.ts Template](task-31-create-jwt-provider-template.md)
**Related Design Docs**: [Architecture Design](../design/mcp-auth-server-base.architecture.md)
**Related Patterns**: [Server Wrapping Pattern](../patterns/mcp-auth-server-base.server-wrapping.md)
**Estimated Completion Date**: TBD
