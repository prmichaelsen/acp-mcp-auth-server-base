# Task 20: Create @mcp-auth-server-base.mcp-auth-version-update Command

**Milestone**: Milestone 2 - Commands and Automation
**Estimated Time**: 3-4 hours
**Dependencies**: Task 19 (version-check)
**Status**: Not Started
**Priority**: LOW - Maintenance command

---

## Objective

Create the `@mcp-auth-server-base.mcp-auth-version-update` command that updates the @prmichaelsen/mcp-auth library to the latest version (or specified version) and handles any necessary code migrations.

---

## Context

When updates are available for @prmichaelsen/mcp-auth, users need a safe way to update that:
- Updates package.json
- Installs new version
- Checks for breaking changes
- Provides migration guidance
- Updates code if needed
- Verifies update succeeded

The update command automates this process and ensures smooth upgrades.

---

## Steps

### 1. Review Update Requirements

**Actions**:
- Understand npm update process
- Review breaking change detection
- Understand code migration needs

**Expected Outcome**: Understanding of update process

### 2. Create Command File

**Actions**:
- Create `agent/commands/mcp-auth-server-base.mcp-auth-version-update.md`
- Use ACP command template
- Set namespace: `mcp-auth-server-base`
- Set command name: `mcp-auth-version-update`

**Expected Outcome**: Command file created

### 3. Define Update Workflow

**Actions**:
Design workflow:

1. **Pre-Update Check**
   - Run version-check command
   - Display what will be updated
   - Check for breaking changes
   - Ask for confirmation

2. **Backup Current State**
   - Recommend git commit
   - Check working directory is clean
   - Create backup if needed

3. **Update package.json**
   - Update @prmichaelsen/mcp-auth version
   - Update related dependencies if needed
   - Save package.json

4. **Install New Version**
   - Run npm install
   - Handle installation errors
   - Verify installation succeeded

5. **Check for Breaking Changes**
   - Scan changelog for BREAKING CHANGE
   - Display migration guide
   - Identify code changes needed

6. **Apply Code Migrations** (if needed)
   - Update import statements
   - Update API calls
   - Update configuration
   - Follow migration guide

7. **Verify Update**
   - Run TypeScript type check
   - Run tests
   - Verify build succeeds
   - Check for runtime errors

8. **Display Results**
   - Show old vs new version
   - List changes applied
   - Show verification results
   - Provide next steps

**Expected Outcome**: Workflow defined

### 4. Add Migration Guides

**Actions**:
Document common migrations:
- API changes
- Configuration changes
- Import path changes
- Breaking changes

**Expected Outcome**: Migration guides documented

### 5. Add Rollback Procedure

**Actions**:
Document rollback:
- Revert package.json
- Run npm install
- Restore code changes
- Verify rollback

**Expected Outcome**: Rollback procedure documented

### 6. Add Examples

**Actions**:
Create 3 examples:
1. Minor update (no breaking changes)
2. Major update (with breaking changes)
3. Update to specific version

**Expected Outcome**: Examples documented

### 7. Add Troubleshooting

**Actions**:
Document issues:
1. Installation failures
2. Breaking changes
3. Test failures after update
4. Compilation errors

**Expected Outcome**: Troubleshooting complete

### 8. Reference Related Commands

**Actions**:
- Link to version-check command
- Link to validate command

**Expected Outcome**: Commands referenced

### 9. Update Package Metadata

**Actions**:
- Update package.yaml
- Update progress.yaml

**Expected Outcome**: Metadata updated

---

## Verification

- [ ] Command file created
- [ ] Workflow documented
- [ ] Migration guides included
- [ ] Rollback procedure documented
- [ ] 3 examples provided
- [ ] Troubleshooting complete
- [ ] Commands referenced
- [ ] package.yaml updated
- [ ] progress.yaml updated

---

## Expected Output

### Files Created
- `agent/commands/mcp-auth-server-base.mcp-auth-version-update.md` (800-1000 lines)

---

## Success Criteria

- [ ] Command is 800-1000 lines
- [ ] Workflow is clear and safe
- [ ] Migration guides comprehensive
- [ ] Rollback procedure clear
- [ ] Examples cover update scenarios

---

## Notes

- Always check for breaking changes
- Recommend git commit before updating
- Provide clear migration guidance
- Support rollback if needed
- Verify update succeeded
- Run tests after update

---

**Next Task**: task-21-test-all-commands.md
**Blockers**: None
