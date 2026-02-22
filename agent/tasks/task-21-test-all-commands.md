# Task 21: Test All Commands Manually

**Milestone**: Milestone 2 - Commands and Automation
**Estimated Time**: 4-6 hours
**Dependencies**: Tasks 11-20 (all commands must be implemented)
**Status**: Not Started
**Priority**: CRITICAL - Quality gate for Milestone 2

---

## Objective

Manually test all 10 @mcp-auth-server-base commands to ensure they work correctly, handle errors gracefully, and provide a good user experience. This is the quality gate before completing Milestone 2.

---

## Context

Before declaring Milestone 2 complete, all commands must be tested to verify:
- Commands execute without errors
- User prompts are clear
- Generated files are correct
- Error handling works
- Documentation is accurate
- Commands reference correct patterns

This task ensures the package provides a high-quality user experience.

---

## Steps

### 1. Prepare Test Environment

**Actions**:
- Create clean test directory
- Install ACP if needed
- Install mcp-auth-server-base package
- Prepare test scenarios

**Expected Outcome**: Test environment ready

### 2. Test @mcp-auth-server-base.init

**Actions**:
- Run init command
- Test all 3 server types
- Test all 4 auth providers
- Verify all files generated
- Check TypeScript compiles
- Verify project structure

**Test Scenarios**:
1. Static server with JWT
2. Static with credentials + JWT
3. Dynamic server with JWT
4. Static server with Environment provider

**Expected Outcome**: Init command verified

### 3. Test @mcp-auth-server-base.validate

**Actions**:
- Run on freshly initialized project
- Test quick validation
- Test standard validation
- Test full validation
- Test with intentional errors
- Verify error messages

**Test Scenarios**:
1. Valid project (all checks pass)
2. Missing dependencies
3. TypeScript errors
4. Missing environment variables

**Expected Outcome**: Validate command verified

### 4. Test @mcp-auth-server-base.deploy

**Actions**:
- Test deployment to Cloud Run
- Verify Docker build
- Verify image push
- Verify service deployment
- Test health check
- Verify secrets mounted

**Test Scenarios**:
1. First deployment
2. Update deployment
3. Cloud Build deployment

**Expected Outcome**: Deploy command verified

### 5. Test @mcp-auth-server-base.setup-secrets

**Actions**:
- Test secret creation
- Test secret updates
- Test batch mode
- Verify Secret Manager integration
- Check IAM permissions

**Test Scenarios**:
1. First-time setup
2. Update existing secrets
3. Batch mode

**Expected Outcome**: Setup-secrets command verified

### 6. Test @mcp-auth-server-base.logs

**Actions**:
- Test log fetching
- Test filtering by severity
- Test time range filtering
- Test search functionality
- Verify output formatting

**Test Scenarios**:
1. View recent logs
2. Filter by ERROR
3. Search for specific term

**Expected Outcome**: Logs command verified

### 7. Test Generation Commands

**Actions**:
Test each generation command:
- generate-dockerfile (development, production, both)
- generate-cloudbuild (basic, with tests, multi-env)
- Verify generated files are valid
- Check customization options

**Test Scenarios**:
1. Generate both Dockerfiles
2. Regenerate production only
3. Generate cloudbuild with tests

**Expected Outcome**: Generation commands verified

### 8. Test @mcp-auth-server-base.add-auth-provider

**Actions**:
- Test adding second provider
- Verify code updates
- Check dependencies installed
- Verify TypeScript compiles
- Test multi-provider configuration

**Test Scenarios**:
1. Add API Key to JWT server
2. Add Environment provider for dev

**Expected Outcome**: Add-auth-provider command verified

### 9. Test Version Commands

**Actions**:
- Test mcp-auth-version-check
- Test mcp-auth-version-update
- Verify changelog fetching
- Test breaking change detection
- Verify update process

**Test Scenarios**:
1. Check when up to date
2. Check when update available
3. Update to latest version

**Expected Outcome**: Version commands verified

### 10. Document Test Results

**Actions**:
- Create test report
- Document any issues found
- List bugs to fix
- Note improvements needed
- Update commands if needed

**Expected Outcome**: Test report created

### 11. Fix Issues Found

**Actions**:
- Fix any bugs discovered
- Update command documentation
- Improve error messages
- Enhance user experience

**Expected Outcome**: All issues resolved

### 12. Final Verification

**Actions**:
- Re-test all commands
- Verify all fixes work
- Confirm quality standards met
- Update Milestone 2 success criteria

**Expected Outcome**: All commands verified and working

---

## Verification

- [ ] Test environment prepared
- [ ] All 10 commands tested
- [ ] Test report created
- [ ] Issues documented
- [ ] Bugs fixed
- [ ] Commands re-tested
- [ ] Quality standards met
- [ ] Milestone 2 success criteria updated

---

## Expected Output

### Files Created
- `agent/reports/milestone-2-testing-report.md` (comprehensive test results)

### Files Modified
- Command files (if bugs found)
- `agent/progress.yaml` - Mark task complete
- `agent/milestones/milestone-2-commands-and-automation.md` - Update success criteria

---

## Success Criteria

- [ ] All 10 commands execute without errors
- [ ] User prompts are clear and helpful
- [ ] Generated files are correct and valid
- [ ] Error handling works gracefully
- [ ] Documentation is accurate
- [ ] Commands reference correct patterns
- [ ] No critical bugs found
- [ ] User experience is smooth

---

## Test Checklist

### @mcp-auth-server-base.init
- [ ] Static server generation works
- [ ] Static with credentials generation works
- [ ] Dynamic server generation works
- [ ] All auth providers work
- [ ] All files generated correctly
- [ ] TypeScript compiles
- [ ] Git initialized

### @mcp-auth-server-base.validate
- [ ] Quick validation works
- [ ] Standard validation works
- [ ] Full validation works
- [ ] Error detection works
- [ ] Clear error messages

### @mcp-auth-server-base.deploy
- [ ] Docker build succeeds
- [ ] Image push succeeds
- [ ] Cloud Run deployment succeeds
- [ ] Health check passes
- [ ] Secrets mounted correctly

### @mcp-auth-server-base.setup-secrets
- [ ] Secret creation works
- [ ] Secret updates work
- [ ] Batch mode works
- [ ] IAM permissions set correctly

### @mcp-auth-server-base.logs
- [ ] Log fetching works
- [ ] Filtering works
- [ ] Search works
- [ ] Output is readable

### Generation Commands
- [ ] Dockerfile generation works
- [ ] Cloud Build generation works
- [ ] Generated files are valid

### @mcp-auth-server-base.add-auth-provider
- [ ] Provider addition works
- [ ] Dependencies installed
- [ ] Code updates correct
- [ ] TypeScript compiles

### Version Commands
- [ ] Version check works
- [ ] Changelog fetching works
- [ ] Version update works
- [ ] Breaking change detection works

---

## Notes

- This is a quality gate for Milestone 2
- All commands must pass testing
- Document all issues found
- Fix critical bugs before completing milestone
- Create comprehensive test report
- Update commands based on testing feedback

---

**Next Task**: None (Milestone 2 complete after this)
**Next Milestone**: Milestone 3 - Templates and Configuration Files
**Blockers**: All commands (Tasks 11-20) must be implemented first
