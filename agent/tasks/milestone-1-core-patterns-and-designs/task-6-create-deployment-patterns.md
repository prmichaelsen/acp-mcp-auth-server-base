# Task 6: Create Deployment Patterns

**Milestone**: [M1 - Core Patterns and Designs](../milestones/milestone-1-core-patterns-and-designs.md)
**Estimated Time**: 5-6 hours
**Dependencies**: None
**Status**: Not Started

---

## Objective

Document deployment patterns for Docker, Cloud Build, Cloud Run, and secrets management.

---

## Context

Deployment patterns provide proven approaches for containerizing and deploying MCP servers to production environments, specifically Google Cloud Platform.

---

## Steps

### 1. Create Docker Multi-Stage Pattern

Create `agent/patterns/docker-multistage.md` documenting:
- Multi-stage build pattern (builder + production)
- Node.js 20 alpine base image
- Dependency optimization
- Health check configuration
- Best practices

Extract from reference Dockerfiles.

### 2. Create Cloud Build Pattern

Create `agent/patterns/cloud-build.md` documenting:
- cloudbuild.yaml structure
- Build steps (build, push, deploy)
- Container Registry integration
- Environment variable configuration
- Secrets mounting

### 3. Create Cloud Run Deployment Pattern

Create `agent/patterns/cloud-run-deployment.md` documenting:
- Cloud Run configuration
- Scaling settings (0-10 instances)
- Memory and CPU allocation
- Timeout configuration
- Public vs authenticated endpoints

### 4. Create Secrets Management Pattern

Create `agent/patterns/secrets-management.md` documenting:
- Google Cloud Secret Manager integration
- Secret naming conventions (service-name-secret-name)
- upload-secrets.ts script pattern
- Security best practices

### 5. Review and Validate

Ensure all patterns are complete with examples.

---

## Verification

- [ ] docker-multistage.md created
- [ ] cloud-build.md created
- [ ] cloud-run-deployment.md created
- [ ] secrets-management.md created
- [ ] All patterns follow ACP template
- [ ] Examples extracted from reference projects

---

**Next Task**: [Task 7: Create Testing Patterns](task-7-create-testing-patterns.md)
