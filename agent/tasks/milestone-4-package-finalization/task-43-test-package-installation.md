# Task 43: Test Package Installation via ACP

**Milestone**: [M4 - Package Finalization and Testing](../../milestones/milestone-4-package-finalization.md)
**Estimated Time**: 2-3 hours
**Dependencies**: [Task 39: Update package.yaml](task-39-update-package-yaml.md)
**Status**: Not Started

---

## Objective

Test package installation using `@acp.package-install` command to ensure ACP package manager integration works correctly.

---

## Context

The ACP package manager provides structured package installation. Testing ensures:
- Package metadata is correct
- Files install to correct locations
- Dependencies are handled
- Installation is idempotent

---

## Steps

### 1. Publish Package Locally

Create local package for testing:
```bash
# In package repository
@acp.package-publish --local
```

### 2. Test Installation in Clean Project

```bash
mkdir -p /tmp/acp-install-test
cd /tmp/acp-install-test

# Initialize ACP
@acp.init

# Install package
@acp.package-install mcp-auth-server-base
```

### 3. Verify Installation

Check installed files:
```bash
# Verify patterns
ls agent/patterns/mcp-auth-server-base.*.md | wc -l
# Should be 18

# Verify commands
ls agent/commands/mcp-auth-server-base.*.md | wc -l
# Should be 10

# Verify templates
find templates/ -type f | wc -l
# Should be 14
```

### 4. Test in Existing Project

Test installation in project with existing content:
```bash
mkdir -p /tmp/existing-acp-project/agent
cd /tmp/existing-acp-project

# Install package
@acp.package-install mcp-auth-server-base
```

### 5. Test Package Update

Test updating to newer version:
```bash
@acp.package-update mcp-auth-server-base
```

### 6. Document Test Results

Create test report documenting:
- Installation success/failure
- Files installed
- Any conflicts or issues
- Update behavior

---

## Verification

- [ ] Package published locally
- [ ] Installation tested in clean project
- [ ] Installation tested in existing project
- [ ] All files installed correctly
- [ ] No installation errors
- [ ] Package update works
- [ ] Test report created

---

## Expected Output

**Test Report**: Documentation of ACP installation testing

---

**Next Task**: [Task 44: Validate All Commands](task-44-validate-all-commands.md)
**Estimated Completion Date**: TBD
