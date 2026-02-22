# Task 39: Update package.yaml with All Content

**Milestone**: [M4 - Package Finalization and Testing](../../milestones/milestone-4-package-finalization.md)
**Estimated Time**: 2-3 hours
**Dependencies**: Milestones 1, 2, 3 complete
**Status**: Not Started

---

## Objective

Update `package.yaml` to include all patterns, commands, designs, milestones, tasks, and templates created in previous milestones. This makes all content available for package installation.

---

## Context

The `package.yaml` file defines what gets installed when users install the package. The `contents` section must list:
- All 18 patterns from M1
- All 10 commands from M2
- All 4 design documents from M1
- All 4 user milestones from M4
- All 11 user tasks from M4
- All template files from M3

---

## Steps

### 1. Review Current package.yaml

Read current `package.yaml` to understand existing structure:
```bash
cat package.yaml
```

### 2. List All Content Files

Generate complete list of files to include:
```bash
# Patterns
ls agent/patterns/*.md | grep -v template | grep -v bootstrap

# Commands
ls agent/commands/*.md | grep mcp-auth-server-base

# Designs
ls agent/design/*.md | grep -v template | grep -v requirements

# User milestones
ls agent/milestones/user-milestone-*.template.md

# User tasks
ls agent/tasks/user-task-*.template.md

# Templates
find templates/ -type f
```

### 3. Update package.yaml Contents Section

Update the `contents` section in `package.yaml`:

```yaml
contents:
  patterns:
    - agent/patterns/mcp-auth-server-base.server-wrapping.md
    - agent/patterns/mcp-auth-server-base.auth-provider-jwt.md
    - agent/patterns/mcp-auth-server-base.auth-provider-oauth.md
    - agent/patterns/mcp-auth-server-base.auth-provider-apikey.md
    - agent/patterns/mcp-auth-server-base.auth-provider-env.md
    - agent/patterns/mcp-auth-server-base.token-resolver.md
    - agent/patterns/mcp-auth-server-base.static-server.md
    - agent/patterns/mcp-auth-server-base.error-handling.md
    - agent/patterns/mcp-auth-server-base.logging.md
    - agent/patterns/mcp-auth-server-base.health-check.md
    - agent/patterns/mcp-auth-server-base.cors-configuration.md
    - agent/patterns/mcp-auth-server-base.environment-configuration.md
    - agent/patterns/mcp-auth-server-base.docker-multistage.md
    - agent/patterns/mcp-auth-server-base.cloud-build.md
    - agent/patterns/mcp-auth-server-base.cloud-run-deployment.md
    - agent/patterns/mcp-auth-server-base.secrets-management.md
    - agent/patterns/mcp-auth-server-base.jest-configuration.md
    - agent/patterns/mcp-auth-server-base.testing-auth-providers.md
  
  commands:
    - agent/commands/mcp-auth-server-base.init.md
    - agent/commands/mcp-auth-server-base.validate.md
    - agent/commands/mcp-auth-server-base.deploy.md
    - agent/commands/mcp-auth-server-base.setup-secrets.md
    - agent/commands/mcp-auth-server-base.logs.md
    - agent/commands/mcp-auth-server-base.generate-dockerfile.md
    - agent/commands/mcp-auth-server-base.generate-cloudbuild.md
    - agent/commands/mcp-auth-server-base.add-auth-provider.md
    - agent/commands/mcp-auth-server-base.mcp-auth-version-check.md
    - agent/commands/mcp-auth-server-base.mcp-auth-version-update.md
  
  designs:
    - agent/design/mcp-auth-server-base.architecture.md
    - agent/design/mcp-auth-server-base.security-considerations.md
  
  milestones:
    - agent/milestones/user-milestone-1-project-setup.template.md
    - agent/milestones/user-milestone-2-authentication.template.md
    - agent/milestones/user-milestone-3-server-implementation.template.md
    - agent/milestones/user-milestone-4-deployment.template.md
  
  tasks:
    - agent/tasks/user-task-1-initialize-nodejs.template.md
    - agent/tasks/user-task-2-typescript-config.template.md
    - agent/tasks/user-task-3-project-structure.template.md
    - agent/tasks/user-task-4-install-dependencies.template.md
    - agent/tasks/user-task-5-implement-auth-provider.template.md
    - agent/tasks/user-task-6-implement-token-resolver.template.md
    - agent/tasks/user-task-7-implement-main-server.template.md
    - agent/tasks/user-task-8-create-dockerfile.template.md
    - agent/tasks/user-task-9-create-cloudbuild.template.md
    - agent/tasks/user-task-10-deploy-to-cloudrun.template.md
    - agent/tasks/user-task-11-test-deployment.template.md
  
  files:
    - templates/config/tsconfig.json
    - templates/config/jest.config.js
    - templates/config/.dockerignore
    - templates/config/.env.example
    - templates/config/.gitignore
    - templates/docker/Dockerfile.development
    - templates/docker/Dockerfile.production
    - templates/deployment/cloudbuild.yaml
    - templates/src/index.ts.template
    - templates/src/auth/platform-jwt-provider.ts.template
    - templates/src/auth/platform-token-resolver.ts.template
    - templates/scripts/upload-secrets.ts
    - templates/scripts/test-auth.ts
    - templates/package/package.json.template
```

### 4. Verify All Files Exist

Check that all listed files actually exist:
```bash
# Verify patterns
for file in agent/patterns/mcp-auth-server-base.*.md; do
  [ -f "$file" ] && echo "✓ $file" || echo "✗ $file MISSING"
done

# Verify commands
for file in agent/commands/mcp-auth-server-base.*.md; do
  [ -f "$file" ] && echo "✓ $file" || echo "✗ $file MISSING"
done

# Verify templates
find templates/ -type f
```

### 5. Update Metadata

Update package metadata if needed:
- Version number
- Description
- Keywords
- Author

### 6. Validate package.yaml

Run package validation:
```bash
./agent/scripts/acp.package-validate.sh
```

---

## Verification

- [ ] package.yaml contents section updated
- [ ] All 18 patterns listed
- [ ] All 10 commands listed
- [ ] All 4 design documents listed
- [ ] All 4 user milestones listed
- [ ] All 11 user tasks listed
- [ ] All 14 template files listed
- [ ] All listed files exist
- [ ] package.yaml validates successfully
- [ ] No broken references

---

## Expected Output

**File Modified**:
- `package.yaml`: Complete contents section

**Content Summary**:
- 18 patterns
- 10 commands
- 4 design documents
- 4 user milestones
- 11 user tasks
- 14 template files
- **Total: 61 files**

---

## Common Issues and Solutions

### Issue 1: File path incorrect

**Symptom**: Package validation fails with "file not found"
**Solution**: Verify all file paths are relative to project root. Check for typos.

### Issue 2: Missing files

**Symptom**: Listed file doesn't exist
**Solution**: Create missing file or remove from package.yaml.

### Issue 3: Validation fails

**Symptom**: `@acp.package-validate` reports errors
**Solution**: Fix reported errors. Ensure YAML syntax is correct.

---

## Resources

- [Package Schema](../../schemas/package.schema.yaml): package.yaml schema definition
- [Package Validation Command](../../commands/acp.package-validate.md): Validation tool

---

## Notes

- This is critical for package installation
- All content must be listed to be installed
- File paths must be accurate
- Validation must pass before publication

---

**Next Task**: [Task 40: Update README.md](task-40-update-readme.md)
**Related Design Docs**: All design documents
**Estimated Completion Date**: TBD
