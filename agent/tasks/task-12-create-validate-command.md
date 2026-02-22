# Task 12: Create @mcp-auth-server-base.validate Command

**Milestone**: Milestone 2 - Commands and Automation
**Estimated Time**: 3-4 hours
**Dependencies**: Task 11 (init command provides context for what to validate)
**Status**: Not Started
**Priority**: HIGH - Critical for ensuring project quality

---

## Objective

Create the `@mcp-auth-server-base.validate` command that validates an MCP auth server project's configuration, dependencies, and structure. This command ensures projects created by `@mcp-auth-server-base.init` are correctly configured and ready for development or deployment.

---

## Context

After users run `@mcp-auth-server-base.init`, they need a way to verify their project is correctly configured. The validate command checks:
- All required files exist
- Dependencies are installed
- Configuration files are valid
- TypeScript compiles without errors
- Tests can run
- Environment variables are configured
- Docker builds successfully

This command provides confidence that the project is ready for development and deployment.

---

## Steps

### 1. Review Requirements

**Actions**:
- Read [`agent/design/requirements.md`](../design/requirements.md) sections on project structure
- Review [`agent/commands/mcp-auth-server-base.init.md`](../commands/mcp-auth-server-base.init.md) to understand what files are created
- Understand validation requirements for each component

**Expected Outcome**: Clear understanding of what needs validation

### 2. Create Command File

**Actions**:
- Create `agent/commands/mcp-auth-server-base.validate.md`
- Use ACP command template structure
- Set namespace: `mcp-auth-server-base`
- Set command name: `validate`
- Set version: `1.0.0`

**Expected Outcome**: Command file created with proper structure

### 3. Define Validation Checks

**Actions**:
Design validation checks for:

1. **File Structure Validation**
   - Check all required files exist
   - Verify directory structure matches requirements
   - List missing files if any

2. **Dependency Validation**
   - Check node_modules/ exists
   - Verify package.json dependencies match package-lock.json
   - Check for security vulnerabilities (npm audit)

3. **Configuration Validation**
   - Validate package.json structure
   - Validate tsconfig.json syntax
   - Validate jest.config.js syntax
   - Check esbuild scripts are executable

4. **Environment Validation**
   - Check .env file exists
   - Verify required environment variables are set
   - Warn about placeholder values still in use

5. **TypeScript Validation**
   - Run `npm run type-check`
   - Report compilation errors if any
   - Check for type definition issues

6. **Build Validation**
   - Run `npm run build`
   - Verify dist/ directory is created
   - Check build artifacts are valid

7. **Test Validation**
   - Run `npm test`
   - Report test results
   - Check test coverage if configured

8. **Docker Validation** (optional)
   - Validate Dockerfile syntax
   - Check .dockerignore exists
   - Optionally build Docker image

9. **Cloud Build Validation** (optional)
   - Validate cloudbuild.yaml syntax
   - Check for required substitutions
   - Verify secrets are referenced correctly

**Expected Outcome**: Comprehensive validation checklist defined

### 4. Document Each Validation Step

**Actions**:
For each validation check, document:
- **Purpose**: Why this check is important
- **Actions**: What commands to run or files to check
- **Success Criteria**: What indicates passing validation
- **Failure Handling**: What to do if validation fails
- **Remediation**: How to fix common issues

**Expected Outcome**: Each validation step fully documented

### 5. Add Validation Levels

**Actions**:
Define three validation levels:

1. **Quick Validation** (default)
   - File structure
   - Dependencies installed
   - Configuration files valid
   - TypeScript compiles
   - ~30 seconds

2. **Standard Validation**
   - Quick validation +
   - Build succeeds
   - Tests pass
   - ~2-3 minutes

3. **Full Validation**
   - Standard validation +
   - Docker build
   - Security audit
   - ~5-10 minutes

**Expected Outcome**: Three validation levels documented

### 6. Add Examples Section

**Actions**:
Create examples for:

1. **Example 1: Quick Validation**
   - Fresh project after init
   - All checks pass
   - Show success output

2. **Example 2: Validation with Errors**
   - Missing dependencies
   - TypeScript errors
   - Show error output and remediation

3. **Example 3: Full Validation**
   - Complete validation including Docker
   - Show comprehensive report

**Expected Outcome**: 3 examples documented

### 7. Add Troubleshooting Section

**Actions**:
Document common issues:

1. **Dependencies not installed**
2. **TypeScript compilation errors**
3. **Environment variables not set**
4. **Build failures**
5. **Test failures**
6. **Docker build failures**

**Expected Outcome**: Troubleshooting guide complete

### 8. Add Output Format

**Actions**:
Design validation report format:

```
🔍 Validating MCP Auth Server Project

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ File Structure (5/5 checks passed)
✓ Dependencies (3/3 checks passed)
✓ Configuration (4/4 checks passed)
✓ Environment (2/3 checks passed)
  ⚠ Warning: Using placeholder JWT_SECRET
✓ TypeScript (compilation successful)
✓ Build (dist/ created successfully)
✓ Tests (10/10 passing, 85% coverage)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Validation Complete: 7/8 checks passed

Warnings:
  - Replace placeholder JWT_SECRET in .env

Next steps:
  - Update .env with real credentials
  - Run @mcp-auth-server-base.deploy when ready
```

**Expected Outcome**: Clear, actionable validation report format

### 9. Reference Relevant Patterns

**Actions**:
Link to patterns:
- Environment configuration pattern
- Testing patterns
- Docker patterns
- Cloud Build pattern

**Expected Outcome**: All relevant patterns referenced

### 10. Update Package Metadata

**Actions**:
- Update `package.yaml` to include new command
- Update progress.yaml with task completion

**Expected Outcome**: Package metadata updated

---

## Verification

- [ ] Command file created: `agent/commands/mcp-auth-server-base.validate.md`
- [ ] Command follows ACP template structure
- [ ] All 9 validation checks documented
- [ ] Three validation levels defined (quick, standard, full)
- [ ] 3 examples provided
- [ ] Troubleshooting section complete
- [ ] Output format designed
- [ ] Relevant patterns referenced
- [ ] Command is clear and actionable
- [ ] package.yaml updated
- [ ] progress.yaml updated

---

## Expected Output

### Files Created
- `agent/commands/mcp-auth-server-base.validate.md` (800-1000 lines expected)

### Files Modified
- `package.yaml` - Add command to include section
- `agent/progress.yaml` - Mark task complete

### Command Structure
```markdown
# Command: validate

> **🤖 Agent Directive**: ...

**Namespace**: mcp-auth-server-base
**Version**: 1.0.0
**Status**: Active

---

## What This Command Does
[Comprehensive description]

## Prerequisites
[List of prerequisites]

## Steps
[9 validation steps with detailed actions]

## Verification
[Checklist]

## Expected Output
[Validation report format]

## Examples
[3 complete examples]

## Related Commands
[Links to other commands]

## Troubleshooting
[6+ common issues]

## Notes
[Additional information]
```

---

## Success Criteria

- [ ] Command document is 800-1000 lines
- [ ] All 9 validation checks are detailed and actionable
- [ ] Three validation levels clearly differentiated
- [ ] Examples cover success and failure scenarios
- [ ] Troubleshooting covers common validation failures
- [ ] Output format is clear and actionable
- [ ] Command can be executed by any agent
- [ ] Patterns are referenced appropriately

---

## Related Patterns

- [`mcp-auth-server-base.environment-configuration`](../patterns/mcp-auth-server-base.environment-configuration.md)
- [`mcp-auth-server-base.jest-configuration`](../patterns/mcp-auth-server-base.jest-configuration.md)
- [`mcp-auth-server-base.testing-auth-providers`](../patterns/mcp-auth-server-base.testing-auth-providers.md)
- [`mcp-auth-server-base.docker-multistage`](../patterns/mcp-auth-server-base.docker-multistage.md)
- [`mcp-auth-server-base.cloud-build`](../patterns/mcp-auth-server-base.cloud-build.md)

---

## Notes

- Validation should be non-destructive (read-only checks)
- Should provide actionable feedback for failures
- Quick validation should be fast (<30 seconds)
- Full validation is optional and takes longer
- Should work on projects created by init command
- Should detect common configuration mistakes
- Should provide clear remediation steps

---

**Next Task**: task-13-create-deploy-command.md
**Blockers**: None (Task 11 complete)
