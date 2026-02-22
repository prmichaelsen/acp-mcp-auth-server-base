# Task 13: Create @mcp-auth-server-base.deploy Command

**Milestone**: Milestone 2 - Commands and Automation
**Estimated Time**: 4-5 hours
**Dependencies**: Task 11 (init), Task 12 (validate)
**Status**: Not Started
**Priority**: HIGH - Critical for deployment workflow

---

## Objective

Create the `@mcp-auth-server-base.deploy` command that deploys an MCP auth server to Google Cloud Run. This command handles building Docker images, pushing to Container Registry, and deploying to Cloud Run with proper configuration and secrets management.

---

## Context

After users have initialized and validated their project, they need a streamlined way to deploy to production. The deploy command automates the entire deployment workflow:
- Validates project is ready for deployment
- Builds Docker image using production Dockerfile
- Pushes image to Google Container Registry
- Deploys to Cloud Run with proper configuration
- Sets up secrets from Secret Manager
- Configures scaling, memory, and timeout settings
- Verifies deployment succeeded

This command makes deployment a single-command operation instead of multiple manual steps.

---

## Steps

### 1. Review Deployment Requirements

**Actions**:
- Read [`agent/design/requirements.md`](../design/requirements.md) section on deployment
- Review [`agent/patterns/mcp-auth-server-base.cloud-run-deployment.md`](../patterns/mcp-auth-server-base.cloud-run-deployment.md)
- Review [`agent/patterns/mcp-auth-server-base.cloud-build.md`](../patterns/mcp-auth-server-base.cloud-build.md)
- Review [`agent/patterns/mcp-auth-server-base.secrets-management.md`](../patterns/mcp-auth-server-base.secrets-management.md)
- Understand Cloud Run deployment requirements

**Expected Outcome**: Clear understanding of deployment process

### 2. Create Command File

**Actions**:
- Create `agent/commands/mcp-auth-server-base.deploy.md`
- Use ACP command template structure
- Set namespace: `mcp-auth-server-base`
- Set command name: `deploy`
- Set version: `1.0.0`

**Expected Outcome**: Command file created with proper structure

### 3. Define Deployment Workflow

**Actions**:
Design deployment workflow with these steps:

1. **Pre-Deployment Validation**
   - Run `@mcp-auth-server-base.validate` (quick mode)
   - Check Google Cloud SDK is installed
   - Verify gcloud is authenticated
   - Check project ID is set
   - Verify required APIs are enabled

2. **Environment Selection**
   - Ask user for environment (development, staging, production)
   - Load environment-specific configuration
   - Confirm deployment target

3. **Build Docker Image**
   - Use Dockerfile.production
   - Tag with git SHA and latest
   - Build using Cloud Build or local Docker
   - Display build progress

4. **Push to Container Registry**
   - Push image to gcr.io/{PROJECT_ID}/{SERVICE_NAME}
   - Tag with SHA and latest
   - Verify push succeeded

5. **Deploy to Cloud Run**
   - Deploy image to Cloud Run
   - Set service name
   - Configure region (default: us-central1)
   - Set memory (default: 512Mi)
   - Set CPU (default: 1)
   - Set timeout (default: 60s)
   - Set min/max instances (0-10)
   - Allow unauthenticated access
   - Mount secrets from Secret Manager

6. **Verify Deployment**
   - Check deployment status
   - Get service URL
   - Test health endpoint
   - Display deployment summary

7. **Post-Deployment Actions**
   - Display service URL
   - Show logs command
   - Suggest next steps

**Expected Outcome**: Complete deployment workflow defined

### 4. Document Each Deployment Step

**Actions**:
For each step, document:
- **Purpose**: Why this step is necessary
- **Actions**: Commands to run
- **Success Criteria**: What indicates success
- **Failure Handling**: What to do if step fails
- **Rollback**: How to rollback if needed

**Expected Outcome**: Each step fully documented

### 5. Add Deployment Options

**Actions**:
Define deployment options:

1. **Quick Deploy** (default)
   - Uses existing Docker image if available
   - Minimal validation
   - Fast deployment (~2-3 minutes)

2. **Full Deploy**
   - Rebuilds Docker image
   - Full validation
   - Complete deployment (~5-10 minutes)

3. **Cloud Build Deploy**
   - Uses cloudbuild.yaml
   - Runs in Cloud Build
   - Includes testing in build pipeline

**Expected Outcome**: Three deployment options documented

### 6. Add Configuration Options

**Actions**:
Document configurable parameters:

- **Service name**: Name of Cloud Run service
- **Region**: GCP region (default: us-central1)
- **Memory**: Memory allocation (default: 512Mi)
- **CPU**: CPU allocation (default: 1)
- **Min instances**: Minimum instances (default: 0)
- **Max instances**: Maximum instances (default: 10)
- **Timeout**: Request timeout (default: 60s)
- **Concurrency**: Max concurrent requests (default: 80)
- **Allow unauthenticated**: Public access (default: true)

**Expected Outcome**: All configuration options documented

### 7. Add Secrets Management

**Actions**:
Document secrets handling:

- Check secrets exist in Secret Manager
- Mount secrets as environment variables
- Reference secrets in deployment
- Warn if secrets are missing
- Link to `@mcp-auth-server-base.setup-secrets` command

**Expected Outcome**: Secrets management documented

### 8. Add Examples Section

**Actions**:
Create examples for:

1. **Example 1: First Deployment**
   - Fresh project
   - All steps shown
   - Success output

2. **Example 2: Update Deployment**
   - Existing service
   - Quick deploy
   - Show diff

3. **Example 3: Cloud Build Deployment**
   - Using cloudbuild.yaml
   - CI/CD workflow
   - Complete pipeline

**Expected Outcome**: 3 examples documented

### 9. Add Troubleshooting Section

**Actions**:
Document common issues:

1. **gcloud not authenticated**
2. **APIs not enabled**
3. **Insufficient permissions**
4. **Docker build failures**
5. **Image push failures**
6. **Deployment failures**
7. **Health check failures**
8. **Secrets not found**

**Expected Outcome**: Troubleshooting guide complete

### 10. Add Rollback Instructions

**Actions**:
Document rollback procedure:

- List previous revisions
- Rollback to specific revision
- Verify rollback succeeded
- Emergency rollback command

**Expected Outcome**: Rollback procedure documented

### 11. Reference Relevant Patterns

**Actions**:
Link to patterns:
- Cloud Run deployment pattern
- Cloud Build pattern
- Secrets management pattern
- Docker multi-stage pattern
- Health check pattern

**Expected Outcome**: All relevant patterns referenced

### 12. Update Package Metadata

**Actions**:
- Update `package.yaml` to include new command
- Update progress.yaml with task completion

**Expected Outcome**: Package metadata updated

---

## Verification

- [ ] Command file created: `agent/commands/mcp-auth-server-base.deploy.md`
- [ ] Command follows ACP template structure
- [ ] All 7 deployment steps documented
- [ ] Three deployment options defined
- [ ] Configuration options documented
- [ ] Secrets management documented
- [ ] 3 examples provided
- [ ] Troubleshooting section complete
- [ ] Rollback procedure documented
- [ ] Relevant patterns referenced
- [ ] Command is clear and actionable
- [ ] package.yaml updated
- [ ] progress.yaml updated

---

## Expected Output

### Files Created
- `agent/commands/mcp-auth-server-base.deploy.md` (1000-1200 lines expected)

### Files Modified
- `package.yaml` - Add command to include section
- `agent/progress.yaml` - Mark task complete

### Command Structure
```markdown
# Command: deploy

> **🤖 Agent Directive**: ...

**Namespace**: mcp-auth-server-base
**Version**: 1.0.0
**Status**: Active

---

## What This Command Does
[Comprehensive description]

## Prerequisites
[List of prerequisites]

## Steps
[7 deployment steps with detailed actions]

## Deployment Options
[Quick, Full, Cloud Build]

## Configuration
[All configurable parameters]

## Secrets Management
[How secrets are handled]

## Verification
[Checklist]

## Expected Output
[Deployment report format]

## Examples
[3 complete examples]

## Rollback
[Rollback procedure]

## Related Commands
[Links to other commands]

## Troubleshooting
[8+ common issues]

## Notes
[Additional information]
```

---

## Success Criteria

- [ ] Command document is 1000-1200 lines
- [ ] All 7 deployment steps are detailed and actionable
- [ ] Three deployment options clearly differentiated
- [ ] Configuration options are comprehensive
- [ ] Secrets management is secure and clear
- [ ] Examples cover first deploy, update, and Cloud Build
- [ ] Troubleshooting covers deployment failures
- [ ] Rollback procedure is clear
- [ ] Command can be executed by any agent
- [ ] Patterns are referenced appropriately

---

## Related Patterns

- [`mcp-auth-server-base.cloud-run-deployment`](../patterns/mcp-auth-server-base.cloud-run-deployment.md)
- [`mcp-auth-server-base.cloud-build`](../patterns/mcp-auth-server-base.cloud-build.md)
- [`mcp-auth-server-base.secrets-management`](../patterns/mcp-auth-server-base.secrets-management.md)
- [`mcp-auth-server-base.docker-multistage`](../patterns/mcp-auth-server-base.docker-multistage.md)
- [`mcp-auth-server-base.health-check`](../patterns/mcp-auth-server-base.health-check.md)

---

## Notes

- Deployment should validate project first
- Should support both local Docker and Cloud Build
- Should handle secrets securely
- Should provide clear deployment status
- Should verify deployment succeeded
- Should provide rollback instructions
- Should work with projects created by init command
- Should support multiple environments
- Should be idempotent (safe to run multiple times)

---

**Next Task**: task-14-create-setup-secrets-command.md
**Blockers**: None (Tasks 11-12 provide context)
