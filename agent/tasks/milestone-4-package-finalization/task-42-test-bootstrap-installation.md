# Task 42: Test Bootstrap Installation

**Milestone**: [M4 - Package Finalization and Testing](../../milestones/milestone-4-package-finalization.md)
**Estimated Time**: 2-3 hours
**Dependencies**: [Task 39: Update package.yaml](task-39-update-package-yaml.md)
**Status**: Not Started

---

## Objective

Test the bootstrap.sh script to ensure one-command package installation works correctly in clean projects.

---

## Context

The bootstrap script provides the easiest installation method. It must:
- Download package files
- Install to correct locations
- Preserve existing files
- Report success/failure clearly

---

## Steps

### 1. Create Clean Test Project

```bash
mkdir -p /tmp/bootstrap-test
cd /tmp/bootstrap-test
```

### 2. Test Bootstrap Script

```bash
# Test bootstrap installation
curl -fsSL https://raw.githubusercontent.com/prmichaelsen/mcp-auth-server-base/main/scripts/bootstrap.sh | bash
```

### 3. Verify Installation

Check that all files installed correctly:
```bash
# Check patterns
ls agent/patterns/mcp-auth-server-base.*.md

# Check commands
ls agent/commands/mcp-auth-server-base.*.md

# Check templates
ls -R templates/
```

### 4. Test in Existing Project

Test installation in project with existing agent/ directory:
```bash
mkdir -p /tmp/existing-project/agent
cd /tmp/existing-project
# Run bootstrap
```

### 5. Document Test Results

Create test report with:
- Installation success/failure
- Files installed
- Any errors encountered
- Fixes needed

---

## Verification

- [ ] Bootstrap script tested in clean project
- [ ] Bootstrap script tested in existing project
- [ ] All files installed correctly
- [ ] No errors during installation
- [ ] Existing files preserved
- [ ] Test report created

---

## Expected Output

**Test Report**: Documentation of bootstrap testing results

---

**Next Task**: [Task 43: Test Package Installation via ACP](task-43-test-package-installation.md)
**Estimated Completion Date**: TBD
