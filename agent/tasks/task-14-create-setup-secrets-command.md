# Task 14: Create @mcp-auth-server-base.setup-secrets Command

**Milestone**: Milestone 2 - Commands and Automation
**Estimated Time**: 3-4 hours
**Dependencies**: Task 11 (init), Task 13 (deploy)
**Status**: Not Started
**Priority**: HIGH - Required for deployment

---

## Objective

Create the `@mcp-auth-server-base.setup-secrets` command that helps users set up secrets in Google Cloud Secret Manager for their MCP auth server. This command guides users through creating and uploading secrets required for deployment.

---

## Context

Before deploying to Cloud Run, users need to configure secrets in Secret Manager. The setup-secrets command automates this process by:
- Identifying required secrets from .env file
- Creating secrets in Secret Manager
- Uploading secret values
- Verifying secrets are accessible
- Providing deployment-ready secret references

This command makes secrets management straightforward and secure.

---

## Steps

### 1. Review Secrets Management Requirements

**Actions**:
- Read [`agent/patterns/mcp-auth-server-base.secrets-management.md`](../patterns/mcp-auth-server-base.secrets-management.md)
- Understand Secret Manager API
- Review naming conventions
- Understand access control requirements

**Expected Outcome**: Clear understanding of secrets management

### 2. Create Command File

**Actions**:
- Create `agent/commands/mcp-auth-server-base.setup-secrets.md`
- Use ACP command template
- Set namespace: `mcp-auth-server-base`
- Set command name: `setup-secrets`

**Expected Outcome**: Command file created

### 3. Define Setup Workflow

**Actions**:
Design workflow with these steps:

1. **Prerequisites Check**
   - Verify gcloud is installed and authenticated
   - Check Secret Manager API is enabled
   - Verify project ID is set
   - Check user has secretmanager.admin role

2. **Identify Required Secrets**
   - Read .env file
   - Parse environment variables
   - Identify which are secrets (JWT_SECRET, API keys, tokens)
   - List required secrets

3. **Secret Naming**
   - Apply naming convention: `{service-name}-{secret-name}`
   - Convert env var names to secret names
   - Display mapping to user

4. **Create Secrets**
   - For each secret:
     - Check if already exists
     - Create if doesn't exist
     - Skip if exists (with option to update)

5. **Upload Secret Values**
   - Read values from .env
   - Upload to Secret Manager
   - Create new version
   - Verify upload succeeded

6. **Set Access Control**
   - Grant Cloud Run service account access
   - Set IAM policy
   - Verify permissions

7. **Verification**
   - List all secrets
   - Verify values are accessible
   - Display secret references for deployment

**Expected Outcome**: Complete workflow defined

### 4. Add Interactive Mode

**Actions**:
- Prompt user for each secret value
- Option to read from .env or enter manually
- Mask secret values in output
- Confirm before uploading

**Expected Outcome**: Interactive workflow documented

### 5. Add Batch Mode

**Actions**:
- Non-interactive mode for CI/CD
- Read all values from .env
- Upload all secrets at once
- No prompts

**Expected Outcome**: Batch mode documented

### 6. Add Update Mode

**Actions**:
- Update existing secrets
- Create new versions
- Option to update specific secrets
- Preserve old versions

**Expected Outcome**: Update mode documented

### 7. Add Examples

**Actions**:
Create 3 examples:
1. First-time setup
2. Updating existing secrets
3. Batch mode for CI/CD

**Expected Outcome**: Examples documented

### 8. Add Troubleshooting

**Actions**:
Document common issues:
1. API not enabled
2. Insufficient permissions
3. Secret already exists
4. Invalid secret names
5. Upload failures

**Expected Outcome**: Troubleshooting complete

### 9. Reference Patterns

**Actions**:
- Link to secrets management pattern
- Link to Cloud Run deployment pattern
- Link to environment configuration pattern

**Expected Outcome**: Patterns referenced

### 10. Update Package Metadata

**Actions**:
- Update package.yaml
- Update progress.yaml

**Expected Outcome**: Metadata updated

---

## Verification

- [ ] Command file created
- [ ] 7-step workflow documented
- [ ] Interactive mode defined
- [ ] Batch mode defined
- [ ] Update mode defined
- [ ] 3 examples provided
- [ ] Troubleshooting complete
- [ ] Patterns referenced
- [ ] package.yaml updated
- [ ] progress.yaml updated

---

## Expected Output

### Files Created
- `agent/commands/mcp-auth-server-base.setup-secrets.md` (800-1000 lines)

### Files Modified
- `package.yaml`
- `agent/progress.yaml`

---

## Success Criteria

- [ ] Command is 800-1000 lines
- [ ] All workflow steps detailed
- [ ] Interactive and batch modes documented
- [ ] Examples cover common scenarios
- [ ] Troubleshooting is comprehensive
- [ ] Security best practices followed

---

## Related Patterns

- [`mcp-auth-server-base.secrets-management`](../patterns/mcp-auth-server-base.secrets-management.md)
- [`mcp-auth-server-base.cloud-run-deployment`](../patterns/mcp-auth-server-base.cloud-run-deployment.md)
- [`mcp-auth-server-base.environment-configuration`](../patterns/mcp-auth-server-base.environment-configuration.md)

---

## Notes

- Never display secret values in output
- Always mask sensitive information
- Verify permissions before operations
- Support both interactive and batch modes
- Provide clear error messages
- Document IAM requirements

---

**Next Task**: task-15-create-logs-command.md
**Blockers**: None
