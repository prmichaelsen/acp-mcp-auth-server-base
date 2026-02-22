# Task 20: Create @mcp-auth-server-base.mcp-auth-version-update Command

**Milestone**: Milestone 2 - Commands and Automation
**Estimated Time**: 3-4 hours
**Dependencies**: Task 19 (version-check)
**Status**: Not Started
**Priority**: LOW - Maintenance command

---

## Objective

Create the `@mcp-auth-server-base.mcp-auth-version-update` command that updates @prmichaelsen/mcp-auth to the latest version, handles breaking changes, and updates code if needed.

---

## Context

Users need an automated way to update mcp-auth that:
- Updates package.json
- Runs npm install
- Shows migration guide for breaking changes
- Updates code if API changed
- Verifies update succeeded

---

## Steps

1. Review version update patterns from ACP
2. Create command file
3. Define update workflow
4. Add migration handling
5. Add code update logic
6. Add examples
7. Add troubleshooting
8. Update package metadata

---

## Verification

- [ ] Command file created
- [ ] Update workflow documented
- [ ] Migration handling included
- [ ] Code update logic defined
- [ ] Examples provided
- [ ] package.yaml updated
- [ ] progress.yaml updated

---

**Next Task**: task-21-test-all-commands.md
