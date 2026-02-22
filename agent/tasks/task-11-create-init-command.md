# Task 11: Create @mcp-auth-server-base.init Command

**Milestone**: Milestone 2 - Commands and Automation
**Estimated Time**: 4-5 hours
**Dependencies**: Milestone 1 complete (all patterns exist)
**Status**: Not Started
**Priority**: CRITICAL - This is the most important command

---

## Objective

Create the `@mcp-auth-server-base.init` command that provides a guided, interactive workflow for initializing a new MCP auth server project. This command is the primary entry point for users and must provide a complete, user-friendly experience.

---

## Context

The init command is the most critical command in the package because it:
1. Is the first command users will run
2. Sets up the entire project structure
3. Guides users through complex configuration decisions
4. Must handle multiple server types and auth providers
5. Creates all necessary files from templates

This command must be comprehensive, well-documented, and handle all edge cases gracefully.

---

## Steps

### 1. Review Requirements and Patterns

**Actions**:
- Read [`agent/design/requirements.md`](../design/requirements.md) sections 2, 3, 10
- Review all 18 patterns in [`agent/patterns/`](../patterns/)
- Understand the 3 server types (static, static_with_credentials, dynamic)
- Understand the 4 auth providers (JWT, OAuth, API Key, Environment)
- Review command template structure

**Expected Outcome**: Complete understanding of what init command must do

### 2. Create Command File Structure

**Actions**:
- Create `agent/commands/mcp-auth-server-base.init.md`
- Use ACP command template from [`agent/commands/command.template.md`](../commands/command.template.md)
- Set namespace: `mcp-auth-server-base`
- Set command name: `init`
- Set version: `1.0.0`
- Set status: `Active`

**Expected Outcome**: Command file created with proper structure

### 3. Define Command Metadata

**Actions**:
- **Purpose**: "Initialize a new MCP auth server project with guided workflow"
- **Category**: "Initialization"
- **Frequency**: "Once Per Project"
- **Prerequisites**:
  - [ ] Node.js 20+ installed
  - [ ] npm or compatible package manager
  - [ ] Git installed (optional but recommended)
  - [ ] Google Cloud SDK installed (for deployment)

**Expected Outcome**: Clear command metadata defined

### 4. Design Interactive Workflow Steps

**Actions**:
Create step-by-step workflow that:

1. **Welcome & Project Info**
   - Display welcome message
   - Ask for project name
   - Ask for project description
   - Validate inputs

2. **Server Type Selection**
   - Present 3 options with descriptions:
     - Static (no credentials)
     - Static with credentials (shared credentials)
     - Dynamic (per-user credentials)
   - Reference patterns for each type
   - Guide user to correct choice

3. **Auth Provider Selection**
   - Present 4 options with descriptions:
     - JWT Provider (recommended)
     - OAuth Provider
     - API Key Provider
     - Environment Provider (dev only)
   - Explain when to use each
   - Reference auth provider patterns

4. **Platform Configuration**
   - Ask for platform URL
   - Ask for CORS origin
   - Explain platform integration
   - Reference token resolver pattern (if dynamic)

5. **Project Structure Setup**
   - Create directory structure
   - Initialize package.json
   - Install dependencies
   - Create configuration files

6. **Generate Source Files**
   - Create src/index.ts from template
   - Create src/auth/provider.ts from template
   - Create src/config/environment.ts from template
   - Create src/types/index.ts from template
   - Customize based on selections

7. **Generate Configuration Files**
   - Create tsconfig.json
   - Create jest.config.js
   - Create .env.example
   - Create .dockerignore
   - Create Dockerfile.development
   - Create Dockerfile.production
   - Create cloudbuild.yaml (with placeholders)
   - Create esbuild.build.js
   - Create esbuild.watch.js

8. **Generate Scripts**
   - Create scripts/upload-secrets.ts
   - Create scripts/test-auth.ts
   - Make scripts executable

9. **Initialize Git Repository**
   - Run `git init` (if not exists)
   - Create .gitignore
   - Create initial commit

10. **Final Setup**
    - Display success message
    - Show next steps
    - Reference relevant patterns
    - Suggest running `@mcp-auth-server-base.validate`

**Expected Outcome**: Complete workflow designed with all steps

### 5. Document Each Step in Detail

**Actions**:
For each step above, document:
- **Actions**: What the agent should do
- **User Prompts**: Questions to ask user (with examples)
- **Validation**: How to validate user input
- **Error Handling**: What to do if step fails
- **Expected Outcome**: What should result from the step

**Expected Outcome**: Each step fully documented

### 6. Add Examples Section

**Actions**:
Create 3 complete examples:

1. **Example 1: Static Server (Calculator)**
   - Server type: static
   - Auth provider: JWT
   - No credentials needed
   - Show complete workflow

2. **Example 2: Static with Credentials (Brave Search)**
   - Server type: static_with_credentials
   - Auth provider: JWT
   - Shared API key
   - Show complete workflow

3. **Example 3: Dynamic Server (GitHub)**
   - Server type: dynamic
   - Auth provider: JWT
   - Per-user tokens
   - Show complete workflow with tokenResolver

**Expected Outcome**: 3 comprehensive examples documented

### 7. Add Troubleshooting Section

**Actions**:
Document common issues:

1. **Node.js version too old**
   - Symptom, cause, solution

2. **npm install fails**
   - Symptom, cause, solution

3. **TypeScript compilation errors**
   - Symptom, cause, solution

4. **Git not initialized**
   - Symptom, cause, solution

5. **Invalid project name**
   - Symptom, cause, solution

6. **Port already in use**
   - Symptom, cause, solution

**Expected Outcome**: Troubleshooting guide complete

### 8. Add Pattern References

**Actions**:
Link to relevant patterns throughout the command:
- Server wrapping pattern
- Auth provider patterns (all 4)
- Token resolver pattern
- Static server pattern
- Environment configuration pattern
- Docker patterns
- Cloud Build pattern
- Cloud Run deployment pattern

**Expected Outcome**: All relevant patterns referenced

### 9. Add Security Considerations

**Actions**:
Document:
- **File Access**: What files will be created/modified
- **Network Access**: What network calls will be made (npm install)
- **Sensitive Data**: How secrets are handled (.env.example only, no real secrets)
- **Permissions**: What permissions are needed

**Expected Outcome**: Security section complete

### 10. Add Verification Checklist

**Actions**:
Create checklist for command completion:
- [ ] Project directory created
- [ ] package.json created and valid
- [ ] Dependencies installed successfully
- [ ] All source files created
- [ ] All configuration files created
- [ ] TypeScript compiles without errors
- [ ] Git repository initialized
- [ ] .gitignore created
- [ ] Initial commit made
- [ ] Project structure matches requirements

**Expected Outcome**: Verification checklist complete

### 11. Review and Validate Command

**Actions**:
- Read through entire command document
- Verify all sections complete
- Check for consistency
- Verify pattern references are correct
- Ensure examples are complete
- Check troubleshooting covers common issues

**Expected Outcome**: Command document is complete and high quality

### 12. Update Package Metadata

**Actions**:
- Update `package.yaml` to include new command in `include` section
- Add command to README.md if needed
- Update progress.yaml

**Expected Outcome**: Package metadata updated

---

## Verification

- [ ] Command file created: `agent/commands/mcp-auth-server-base.init.md`
- [ ] Command follows ACP template structure
- [ ] All 10 workflow steps documented in detail
- [ ] 3 complete examples provided
- [ ] Troubleshooting section complete
- [ ] All relevant patterns referenced
- [ ] Security considerations documented
- [ ] Verification checklist included
- [ ] Command is clear and comprehensive
- [ ] package.yaml updated with command reference
- [ ] progress.yaml updated

---

## Expected Output

### Files Created
- `agent/commands/mcp-auth-server-base.init.md` (1500+ lines expected)

### Files Modified
- `package.yaml` - Add command to include section
- `agent/progress.yaml` - Mark task complete

### Command Structure
```markdown
# Command: init

> **🤖 Agent Directive**: ...

**Namespace**: mcp-auth-server-base
**Version**: 1.0.0
**Status**: Active

---

**Purpose**: Initialize a new MCP auth server project
**Category**: Initialization
**Frequency**: Once Per Project

---

## What This Command Does
[Comprehensive description]

## Prerequisites
[List of prerequisites]

## Steps
[10 detailed steps with actions, prompts, validation]

## Verification
[Checklist]

## Expected Output
[What gets created]

## Examples
[3 complete examples]

## Related Commands
[Links to other commands]

## Troubleshooting
[6+ common issues]

## Security Considerations
[File access, network, sensitive data]

## Notes
[Additional information]
```

---

## Success Criteria

- [ ] Command document is 1500+ lines
- [ ] All 10 workflow steps are detailed and actionable
- [ ] Examples cover all 3 server types
- [ ] Troubleshooting covers 6+ common issues
- [ ] All 18 patterns are referenced where relevant
- [ ] Command is clear enough for any agent to execute
- [ ] Security considerations are comprehensive
- [ ] Verification checklist is complete

---

## Related Patterns

- [`mcp-auth-server-base.server-wrapping`](../patterns/mcp-auth-server-base.server-wrapping.md)
- [`mcp-auth-server-base.auth-provider-jwt`](../patterns/mcp-auth-server-base.auth-provider-jwt.md)
- [`mcp-auth-server-base.auth-provider-oauth`](../patterns/mcp-auth-server-base.auth-provider-oauth.md)
- [`mcp-auth-server-base.auth-provider-apikey`](../patterns/mcp-auth-server-base.auth-provider-apikey.md)
- [`mcp-auth-server-base.auth-provider-env`](../patterns/mcp-auth-server-base.auth-provider-env.md)
- [`mcp-auth-server-base.token-resolver`](../patterns/mcp-auth-server-base.token-resolver.md)
- [`mcp-auth-server-base.static-server`](../patterns/mcp-auth-server-base.static-server.md)
- [`mcp-auth-server-base.environment-configuration`](../patterns/mcp-auth-server-base.environment-configuration.md)
- [`mcp-auth-server-base.docker-multistage`](../patterns/mcp-auth-server-base.docker-multistage.md)
- [`mcp-auth-server-base.cloud-build`](../patterns/mcp-auth-server-base.cloud-build.md)
- [`mcp-auth-server-base.cloud-run-deployment`](../patterns/mcp-auth-server-base.cloud-run-deployment.md)

---

## Notes

- This is the MOST IMPORTANT command in the package
- Must be extremely user-friendly and comprehensive
- Should handle all edge cases gracefully
- Must provide clear guidance for all decisions
- Should reference patterns extensively
- Must create a fully working project
- Should be testable with real project creation

---

**Next Task**: task-12-create-validate-command.md
**Blockers**: None (Milestone 1 complete)
