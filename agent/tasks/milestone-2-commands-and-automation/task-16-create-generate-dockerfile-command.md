# Task 16: Create @mcp-auth-server-base.generate-dockerfile Command

**Milestone**: Milestone 2 - Commands and Automation
**Estimated Time**: 2-3 hours
**Dependencies**: Task 11 (init)
**Status**: Not Started
**Priority**: MEDIUM - Useful for customization

---

## Objective

Create the `@mcp-auth-server-base.generate-dockerfile` command that generates or regenerates Dockerfile configurations for development and production environments. This command allows users to customize Docker builds or regenerate files if they were modified or deleted.

---

## Context

Users may need to regenerate Dockerfiles if:
- They accidentally deleted or corrupted the files
- They want to customize the Docker configuration
- They need to update to newer base images
- They want to add custom build steps

The generate-dockerfile command provides an easy way to recreate these files from templates.

---

## Steps

### 1. Review Docker Requirements

**Actions**:
- Read [`agent/patterns/mcp-auth-server-base.docker-multistage.md`](../patterns/mcp-auth-server-base.docker-multistage.md)
- Understand multi-stage build pattern
- Review development vs production differences

**Expected Outcome**: Understanding of Docker requirements

### 2. Create Command File

**Actions**:
- Create `agent/commands/mcp-auth-server-base.generate-dockerfile.md`
- Use ACP command template
- Set namespace: `mcp-auth-server-base`
- Set command name: `generate-dockerfile`

**Expected Outcome**: Command file created

### 3. Define Generation Workflow

**Actions**:
Design workflow:

1. **Select Target**
   - Ask which Dockerfile to generate:
     - Development only
     - Production only
     - Both
   - Confirm overwrite if file exists

2. **Generate Development Dockerfile**
   - Create Dockerfile.development
   - Single-stage build
   - Include dev dependencies
   - Enable hot reload

3. **Generate Production Dockerfile**
   - Create Dockerfile.production
   - Multi-stage build
   - Production dependencies only
   - Optimized for size
   - Include health check

4. **Generate .dockerignore**
   - Create or update .dockerignore
   - Exclude node_modules, dist, .env, logs

5. **Verify Generation**
   - Check files created
   - Validate Dockerfile syntax
   - Display next steps

**Expected Outcome**: Workflow defined

### 4. Add Customization Options

**Actions**:
Document customization options:
- Base image version
- Node.js version
- Port number
- Health check configuration
- Build optimizations

**Expected Outcome**: Customization options documented

### 5. Add Examples

**Actions**:
Create 3 examples:
1. Generate both Dockerfiles
2. Regenerate production only
3. Custom base image version

**Expected Outcome**: Examples documented

### 6. Add Troubleshooting

**Actions**:
Document issues:
1. File already exists
2. Invalid Dockerfile syntax
3. Docker not installed
4. Build failures

**Expected Outcome**: Troubleshooting complete

### 7. Reference Patterns

**Actions**:
- Link to Docker multi-stage pattern
- Link to health check pattern

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
- [ ] Customization options defined
- [ ] 3 examples provided
- [ ] Troubleshooting complete
- [ ] Patterns referenced
- [ ] package.yaml updated
- [ ] progress.yaml updated

---

## Expected Output

### Files Created
- `agent/commands/mcp-auth-server-base.generate-dockerfile.md` (600-800 lines)

---

## Success Criteria

- [ ] Command is 600-800 lines
- [ ] Workflow is clear
- [ ] Supports development and production
- [ ] Customization options documented
- [ ] Examples cover common scenarios

---

## Related Patterns

- [`mcp-auth-server-base.docker-multistage`](../patterns/mcp-auth-server-base.docker-multistage.md)
- [`mcp-auth-server-base.health-check`](../patterns/mcp-auth-server-base.health-check.md)

---

## Notes

- Warn before overwriting existing files
- Support both development and production
- Include .dockerignore generation
- Provide customization options
- Validate generated files

---

**Next Task**: task-17-generate-cloudbuild-command.md
**Blockers**: None
