# Task 17: Create @mcp-auth-server-base.generate-cloudbuild Command

**Milestone**: Milestone 2 - Commands and Automation
**Estimated Time**: 3-4 hours
**Dependencies**: Task 11 (init), Task 13 (deploy)
**Status**: Not Started
**Priority**: MEDIUM - Useful for CI/CD setup

---

## Objective

Create the `@mcp-auth-server-base.generate-cloudbuild` command that generates or regenerates cloudbuild.yaml configuration for Google Cloud Build CI/CD pipeline. This command helps users set up automated builds and deployments.

---

## Context

Users need cloudbuild.yaml for:
- Automated CI/CD pipeline
- Building Docker images in the cloud
- Running tests before deployment
- Deploying to Cloud Run automatically

The generate-cloudbuild command creates a properly configured cloudbuild.yaml with all necessary steps, secrets, and substitutions.

---

## Steps

### 1. Review Cloud Build Requirements

**Actions**:
- Read [`agent/patterns/mcp-auth-server-base.cloud-build.md`](../patterns/mcp-auth-server-base.cloud-build.md)
- Understand Cloud Build steps
- Review substitutions and secrets
- Understand triggers

**Expected Outcome**: Understanding of Cloud Build

### 2. Create Command File

**Actions**:
- Create `agent/commands/mcp-auth-server-base.generate-cloudbuild.md`
- Use ACP command template
- Set namespace: `mcp-auth-server-base`
- Set command name: `generate-cloudbuild`

**Expected Outcome**: Command file created

### 3. Define Generation Workflow

**Actions**:
Design workflow:

1. **Gather Configuration**
   - Ask for service name
   - Ask for region (default: us-central1)
   - Ask for secrets to mount
   - Ask if tests should run in pipeline

2. **Generate cloudbuild.yaml**
   - Build step (Docker build)
   - Test step (optional - run npm test)
   - Push step (push to GCR)
   - Deploy step (deploy to Cloud Run)
   - Include substitutions
   - Include secrets references

3. **Add Customizations**
   - Machine type selection
   - Timeout configuration
   - Cache configuration
   - Environment-specific builds

4. **Verify Generation**
   - Validate YAML syntax
   - Check all placeholders filled
   - Display next steps

**Expected Outcome**: Workflow defined

### 4. Add Pipeline Options

**Actions**:
Document pipeline options:
- Include tests (yes/no)
- Multi-environment (dev/staging/prod)
- Cache Docker layers
- Parallel builds
- Notification on failure

**Expected Outcome**: Options documented

### 5. Add Examples

**Actions**:
Create 3 examples:
1. Basic pipeline (build, push, deploy)
2. Pipeline with tests
3. Multi-environment pipeline

**Expected Outcome**: Examples documented

### 6. Add Troubleshooting

**Actions**:
Document issues:
1. Invalid YAML syntax
2. Missing substitutions
3. Secrets not found
4. Build failures
5. Deployment failures

**Expected Outcome**: Troubleshooting complete

### 7. Reference Patterns

**Actions**:
- Link to Cloud Build pattern
- Link to Cloud Run deployment pattern
- Link to secrets management pattern
- Link to Docker pattern

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
- [ ] Pipeline options defined
- [ ] 3 examples provided
- [ ] Troubleshooting complete
- [ ] Patterns referenced
- [ ] package.yaml updated
- [ ] progress.yaml updated

---

## Expected Output

### Files Created
- `agent/commands/mcp-auth-server-base.generate-cloudbuild.md` (800-1000 lines)

---

## Success Criteria

- [ ] Command is 800-1000 lines
- [ ] Workflow is clear
- [ ] Supports multiple pipeline configurations
- [ ] Examples cover common scenarios
- [ ] YAML validation included

---

## Related Patterns

- [`mcp-auth-server-base.cloud-build`](../patterns/mcp-auth-server-base.cloud-build.md)
- [`mcp-auth-server-base.cloud-run-deployment`](../patterns/mcp-auth-server-base.cloud-run-deployment.md)
- [`mcp-auth-server-base.secrets-management`](../patterns/mcp-auth-server-base.secrets-management.md)
- [`mcp-auth-server-base.docker-multistage`](../patterns/mcp-auth-server-base.docker-multistage.md)

---

## Notes

- Warn before overwriting existing cloudbuild.yaml
- Support multiple environments
- Include test step optionally
- Provide clear substitution documentation
- Validate generated YAML

---

**Next Task**: task-18-add-auth-provider-command.md
**Blockers**: None
