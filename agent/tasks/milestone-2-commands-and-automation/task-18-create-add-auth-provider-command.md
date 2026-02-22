# Task 18: Create @mcp-auth-server-base.add-auth-provider Command

**Milestone**: Milestone 2 - Commands and Automation
**Estimated Time**: 3-4 hours
**Dependencies**: Task 11 (init)
**Status**: Not Started
**Priority**: MEDIUM - Useful for multi-auth scenarios

---

## Objective

Create the `@mcp-auth-server-base.add-auth-provider` command that adds an additional authentication provider to an existing MCP auth server project. This allows users to support multiple authentication methods (e.g., JWT + API Key).

---

## Context

Some MCP servers need to support multiple authentication methods:
- JWT for user authentication + API Key for service-to-service
- OAuth for users + Environment provider for development
- Multiple auth schemes for different client types

The add-auth-provider command makes it easy to add additional providers without manually modifying code.

---

## Steps

### 1. Review Auth Provider Patterns

**Actions**:
- Read all 4 auth provider patterns:
  - [`mcp-auth-server-base.auth-provider-jwt`](../patterns/mcp-auth-server-base.auth-provider-jwt.md)
  - [`mcp-auth-server-base.auth-provider-oauth`](../patterns/mcp-auth-server-base.auth-provider-oauth.md)
  - [`mcp-auth-server-base.auth-provider-apikey`](../patterns/mcp-auth-server-base.auth-provider-apikey.md)
  - [`mcp-auth-server-base.auth-provider-env`](../patterns/mcp-auth-server-base.auth-provider-env.md)
- Understand multi-provider configuration

**Expected Outcome**: Understanding of auth providers

### 2. Create Command File

**Actions**:
- Create `agent/commands/mcp-auth-server-base.add-auth-provider.md`
- Use ACP command template
- Set namespace: `mcp-auth-server-base`
- Set command name: `add-auth-provider`

**Expected Outcome**: Command file created

### 3. Define Addition Workflow

**Actions**:
Design workflow:

1. **Detect Existing Providers**
   - Read src/auth/provider.ts
   - Identify current auth provider(s)
   - Display to user

2. **Select New Provider**
   - Present 4 auth provider options
   - Explain each provider
   - Ask user to select
   - Validate selection

3. **Generate Provider Code**
   - Create new provider file or update existing
   - Add provider implementation
   - Configure provider options

4. **Update Dependencies**
   - Add required npm packages
   - Update package.json
   - Run npm install

5. **Update Server Configuration**
   - Modify src/index.ts to use multiple providers
   - Configure provider chain or selection logic
   - Update environment configuration

6. **Update Environment Files**
   - Add new environment variables to .env.example
   - Document new variables
   - Update .env

7. **Verify Addition**
   - Check TypeScript compiles
   - Verify configuration is valid
   - Display next steps

**Expected Outcome**: Workflow defined

### 4. Add Multi-Provider Patterns

**Actions**:
Document multi-provider configurations:
- Provider chain (try multiple in order)
- Provider selection (choose based on token type)
- Fallback providers
- Development vs production providers

**Expected Outcome**: Multi-provider patterns documented

### 5. Add Examples

**Actions**:
Create 3 examples:
1. Add API Key provider to JWT server
2. Add Environment provider for development
3. Add OAuth as alternative to JWT

**Expected Outcome**: Examples documented

### 6. Add Troubleshooting

**Actions**:
Document issues:
1. Provider conflicts
2. Dependency installation failures
3. TypeScript compilation errors
4. Configuration errors

**Expected Outcome**: Troubleshooting complete

### 7. Reference Patterns

**Actions**:
- Link to all 4 auth provider patterns
- Link to server wrapping pattern

**Expected Outcome**: Patterns referenced

### 8. Update Package Metadata

**Actions**:
- Update package.yaml
- Update progress.yaml

**Expected Outcome**: Metadata updated

---

## Verification

- [ ] Command file created
- [ ] Workflow documented
- [ ] Multi-provider patterns defined
- [ ] 3 examples provided
- [ ] Troubleshooting complete
- [ ] Patterns referenced
- [ ] package.yaml updated
- [ ] progress.yaml updated

---

## Expected Output

### Files Created
- `agent/commands/mcp-auth-server-base.add-auth-provider.md` (700-900 lines)

---

## Success Criteria

- [ ] Command is 700-900 lines
- [ ] Workflow is clear
- [ ] Supports all 4 auth providers
- [ ] Multi-provider patterns documented
- [ ] Examples cover common scenarios

---

## Related Patterns

- [`mcp-auth-server-base.auth-provider-jwt`](../patterns/mcp-auth-server-base.auth-provider-jwt.md)
- [`mcp-auth-server-base.auth-provider-oauth`](../patterns/mcp-auth-server-base.auth-provider-oauth.md)
- [`mcp-auth-server-base.auth-provider-apikey`](../patterns/mcp-auth-server-base.auth-provider-apikey.md)
- [`mcp-auth-server-base.auth-provider-env`](../patterns/mcp-auth-server-base.auth-provider-env.md)
- [`mcp-auth-server-base.server-wrapping`](../patterns/mcp-auth-server-base.server-wrapping.md)

---

## Notes

- Support adding multiple providers
- Warn about provider conflicts
- Update dependencies automatically
- Provide clear configuration guidance
- Document multi-provider patterns

---

**Next Task**: task-19-mcp-auth-version-check-command.md
**Blockers**: None
