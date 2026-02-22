# Task 37: Create User Milestone Templates

**Milestone**: [M4 - Package Finalization and Testing](../../milestones/milestone-4-package-finalization.md)
**Estimated Time**: 4-5 hours
**Dependencies**: Milestone 3 complete
**Status**: Not Started

---

## Objective

Create user-facing milestone templates that will guide users through building their MCP auth server. These templates are installed to user projects and provide structured guidance.

---

## Context

User milestones guide users through the development process. They need:
- Clear goals and deliverables
- Step-by-step task breakdown
- Success criteria
- Links to relevant patterns and commands

Four user milestones needed:
1. Project Setup
2. Authentication Implementation
3. Server Implementation
4. Deployment Configuration

---

## Steps

### 1. Create User Milestone 1: Project Setup

Create `agent/milestones/user-milestone-1-project-setup.template.md`:

```markdown
# Milestone 1: Project Setup

**Goal**: Initialize Node.js project with TypeScript, testing, and build configuration
**Duration**: 2-4 hours
**Status**: Not Started

## Deliverables
- Node.js project initialized
- TypeScript configured
- Jest testing configured
- Project structure created
- Dependencies installed

## Success Criteria
- [ ] package.json created with correct dependencies
- [ ] tsconfig.json configured for ES modules
- [ ] jest.config.js configured
- [ ] Project structure matches specification
- [ ] TypeScript compiles without errors
- [ ] Tests run successfully

## Tasks
- [Task 1: Initialize Node.js Project](../tasks/user-task-1-initialize-nodejs.template.md)
- [Task 2: Configure TypeScript](../tasks/user-task-2-typescript-config.template.md)
- [Task 3: Create Project Structure](../tasks/user-task-3-project-structure.template.md)
- [Task 4: Install Dependencies](../tasks/user-task-4-install-dependencies.template.md)

## Related Patterns
- [Server Wrapping Pattern](../patterns/mcp-auth-server-base.server-wrapping.md)
- [Jest Configuration Pattern](../patterns/mcp-auth-server-base.jest-configuration.md)

**Next Milestone**: [Milestone 2: Authentication Implementation](user-milestone-2-authentication.template.md)
```

### 2. Create User Milestone 2: Authentication Implementation

Create `agent/milestones/user-milestone-2-authentication.template.md`:

```markdown
# Milestone 2: Authentication Implementation

**Goal**: Implement authentication provider and token resolver (if needed)
**Duration**: 3-5 hours
**Dependencies**: Milestone 1 complete
**Status**: Not Started

## Deliverables
- Authentication provider implemented
- Token resolver implemented (for dynamic servers)
- Authentication tested locally

## Success Criteria
- [ ] Auth provider compiles without errors
- [ ] Auth provider tests pass
- [ ] Token resolver works (if dynamic server)
- [ ] Local authentication testing successful

## Tasks
- [Task 5: Implement Auth Provider](../tasks/user-task-5-implement-auth-provider.template.md)
- [Task 6: Implement Token Resolver](../tasks/user-task-6-implement-token-resolver.template.md) (dynamic only)

## Related Patterns
- [JWT Auth Provider Pattern](../patterns/mcp-auth-server-base.auth-provider-jwt.md)
- [Token Resolver Pattern](../patterns/mcp-auth-server-base.token-resolver.md)
- [Testing Auth Providers Pattern](../patterns/mcp-auth-server-base.testing-auth-providers.md)

**Next Milestone**: [Milestone 3: Server Implementation](user-milestone-3-server-implementation.template.md)
```

### 3. Create User Milestone 3: Server Implementation

Create `agent/milestones/user-milestone-3-server-implementation.template.md`:

```markdown
# Milestone 3: Server Implementation

**Goal**: Implement main MCP server with tools, resources, and prompts
**Duration**: 4-8 hours (varies by complexity)
**Dependencies**: Milestone 2 complete
**Status**: Not Started

## Deliverables
- Main server entry point implemented
- MCP tools implemented
- Server tested locally
- Health check endpoint working

## Success Criteria
- [ ] Server starts without errors
- [ ] Tools respond correctly
- [ ] Authentication works
- [ ] Health check endpoint responds
- [ ] Local testing successful

## Tasks
- [Task 7: Implement Main Server](../tasks/user-task-7-implement-main-server.template.md)

## Related Patterns
- [Server Wrapping Pattern](../patterns/mcp-auth-server-base.server-wrapping.md)
- [Static Server Pattern](../patterns/mcp-auth-server-base.static-server.md)
- [Error Handling Pattern](../patterns/mcp-auth-server-base.error-handling.md)
- [Logging Pattern](../patterns/mcp-auth-server-base.logging.md)
- [Health Check Pattern](../patterns/mcp-auth-server-base.health-check.md)

**Next Milestone**: [Milestone 4: Deployment Configuration](user-milestone-4-deployment.template.md)
```

### 4. Create User Milestone 4: Deployment Configuration

Create `agent/milestones/user-milestone-4-deployment.template.md`:

```markdown
# Milestone 4: Deployment Configuration

**Goal**: Configure Docker and Cloud Build for production deployment
**Duration**: 3-5 hours
**Dependencies**: Milestone 3 complete
**Status**: Not Started

## Deliverables
- Dockerfile created
- Cloud Build configuration created
- Secrets uploaded to Secret Manager
- Server deployed to Cloud Run
- Deployment tested

## Success Criteria
- [ ] Docker image builds successfully
- [ ] Cloud Build pipeline works
- [ ] Secrets configured in Secret Manager
- [ ] Server deployed to Cloud Run
- [ ] Production deployment tested and working

## Tasks
- [Task 8: Create Dockerfile](../tasks/user-task-8-create-dockerfile.template.md)
- [Task 9: Create Cloud Build Config](../tasks/user-task-9-create-cloudbuild.template.md)
- [Task 10: Deploy to Cloud Run](../tasks/user-task-10-deploy-to-cloudrun.template.md)
- [Task 11: Test Deployment](../tasks/user-task-11-test-deployment.template.md)

## Related Patterns
- [Docker Multi-Stage Pattern](../patterns/mcp-auth-server-base.docker-multistage.md)
- [Cloud Build Pattern](../patterns/mcp-auth-server-base.cloud-build.md)
- [Cloud Run Deployment Pattern](../patterns/mcp-auth-server-base.cloud-run-deployment.md)
- [Secrets Management Pattern](../patterns/mcp-auth-server-base.secrets-management.md)

**Next Milestone**: None (deployment complete)
```

### 5. Verify Template Structure

Ensure all four user milestones:
- Follow consistent format
- Link to user tasks
- Reference relevant patterns
- Include clear success criteria

### 6. Cross-Reference with Package Design

Verify milestones align with package goals and user workflow.

---

## Verification

- [ ] `user-milestone-1-project-setup.template.md` created
- [ ] `user-milestone-2-authentication.template.md` created
- [ ] `user-milestone-3-server-implementation.template.md` created
- [ ] `user-milestone-4-deployment.template.md` created
- [ ] All milestones follow consistent format
- [ ] All milestones link to user tasks
- [ ] All milestones reference relevant patterns
- [ ] Success criteria clear and measurable
- [ ] Milestones guide users through complete workflow

---

## Expected Output

**Files Created**:
- `agent/milestones/user-milestone-1-project-setup.template.md`
- `agent/milestones/user-milestone-2-authentication.template.md`
- `agent/milestones/user-milestone-3-server-implementation.template.md`
- `agent/milestones/user-milestone-4-deployment.template.md`

**Milestone Coverage**:
1. Project Setup (4 tasks)
2. Authentication (2 tasks)
3. Server Implementation (1 task)
4. Deployment (4 tasks)

---

## Common Issues and Solutions

### Issue 1: Milestones too granular

**Symptom**: Too many small milestones
**Solution**: Combine related tasks into logical phases.

### Issue 2: Unclear success criteria

**Symptom**: Users don't know when milestone is complete
**Solution**: Add objective, measurable success criteria.

### Issue 3: Missing pattern references

**Symptom**: Users don't know which patterns to follow
**Solution**: Link all relevant patterns in each milestone.

---

## Resources

- [Milestone Template](../milestones/milestone-1-{title}.template.md): Milestone template format
- All patterns from Milestone 1

---

## Notes

- User milestones are templates (installed to user projects)
- Different from development milestones (for package development)
- Should guide users through complete workflow
- Must reference patterns and commands from package

---

**Next Task**: [Task 38: Create User Task Templates](task-38-create-user-task-templates.md)
**Related Design Docs**: [Architecture Design](../../design/mcp-auth-server-base.architecture.md)
**Estimated Completion Date**: TBD
