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

Read current `package.yaml` to understand existing structure.

### 2. List All Content Files

Generate complete list of files to include:
```bash
# Patterns
ls agent/patterns/mcp-auth-server-base.*.md

# Commands
ls agent/commands/mcp-auth-server-base.*.md

# Designs
ls agent/design/mcp-auth-server-base.*.md

# User milestones
ls agent/milestones/user-milestone-*.template.md

# User tasks
ls agent/tasks/user-task-*.template.md

# Templates
find templates/ -type f
```

### 3. Update package.yaml Contents Section

Update the `contents` section with all files.

### 4. Verify All Files Exist

Check that all listed files actually exist.

### 5. Validate package.yaml

Run package validation:
```bash
@acp.package-validate
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

---

## Expected Output

**File Modified**: `package.yaml` with complete contents section

**Content Summary**:
- 18 patterns
- 10 commands
- 4 design documents
- 4 user milestones
- 11 user tasks
- 14 template files
- **Total: 61 files**

---

**Next Task**: [Task 40: Update README.md](task-40-update-readme.md)
**Estimated Completion Date**: TBD
