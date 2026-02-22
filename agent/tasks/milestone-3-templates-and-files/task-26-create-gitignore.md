# Task 26: Create .gitignore Template

**Milestone**: [M3 - Templates and Configuration Files](../milestones/milestone-3-templates-and-files.md)
**Estimated Time**: 1 hour
**Dependencies**: None
**Status**: Not Started

---

## Objective

Create a `.gitignore` template (`templates/config/.gitignore`) that excludes build outputs, dependencies, secrets, and temporary files from version control.

---

## Context

The `.gitignore` file prevents sensitive and generated files from being committed to git. This is critical for:
- Security (excluding .env files with secrets)
- Clean repository (excluding node_modules, dist)
- Build efficiency (excluding generated files)
- Collaboration (excluding IDE-specific files)

---

## Steps

### 1. Review Reference Projects

Examine .gitignore files from:
- remember-mcp-server
- task-mcp-server
- Common Node.js/TypeScript projects

### 2. Create Template File

Create `templates/config/.gitignore`:

```gitignore
# Dependencies
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

# Build outputs
dist/
build/
*.tsbuildinfo
*.js.map

# Environment variables (CRITICAL - NEVER COMMIT)
.env
.env.local
.env.*.local
.env.production
.env.development

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pino-*.log

# Testing
coverage/
.nyc_output/
*.lcov

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Temporary files
tmp/
temp/
*.tmp

# Google Cloud
.gcloud/
service-account-key.json
*-credentials.json

# Secrets (CRITICAL - NEVER COMMIT)
secrets/
*.key
*.pem
*.p12

# OS
Thumbs.db
.DS_Store
```

### 3. Add Critical Security Comments

Add prominent warnings for sensitive files:

```gitignore
# ============================================
# ⚠️  CRITICAL SECURITY - NEVER COMMIT THESE
# ============================================
.env
.env.*
secrets/
*.key
service-account-key.json
*-credentials.json
```

### 4. Test Exclusions

Verify files are properly excluded:
```bash
# Create test project
mkdir -p test-project
cd test-project
git init
cp templates/config/.gitignore .

# Create test files
touch .env node_modules/.keep dist/.keep

# Check git status
git status

# Verify excluded files don't appear
```

### 5. Cross-Reference with Patterns

Ensure exclusions align with:
- [Secrets Management Pattern](../patterns/mcp-auth-server-base.secrets-management.md)
- [Environment Configuration Pattern](../patterns/mcp-auth-server-base.environment-configuration.md)
- [Docker Multi-Stage Pattern](../patterns/mcp-auth-server-base.docker-multistage.md)

---

## Verification

- [ ] `templates/config/.gitignore` file created
- [ ] Excludes node_modules and dependencies
- [ ] Excludes build outputs (dist, *.tsbuildinfo)
- [ ] Excludes .env files (ALL variants)
- [ ] Excludes secrets and credentials
- [ ] Excludes test coverage and logs
- [ ] Excludes IDE and OS files
- [ ] Security warnings prominent
- [ ] Tested with git status
- [ ] Aligns with Secrets Management Pattern

---

## Expected Output

**File Created**:
- `templates/config/.gitignore`: Git exclusion template

**File Structure**:
```
templates/
└── config/
    ├── tsconfig.json (from Task 22)
    ├── jest.config.js (from Task 23)
    ├── .dockerignore (from Task 24)
    ├── .env.example (from Task 25)
    └── .gitignore (new)
```

**Exclusion Categories**:
- Dependencies (node_modules, lock files)
- Build outputs (dist, build, source maps)
- Environment variables (.env files)
- Secrets (keys, credentials)
- Testing (coverage, test outputs)
- Development (logs, IDE files, OS files)

---

## Common Issues and Solutions

### Issue 1: .env file committed accidentally

**Symptom**: Secrets exposed in git history
**Solution**: Ensure `.env` and all variants (`.env.*`) are in .gitignore. If already committed, use `git filter-branch` to remove from history.

### Issue 2: node_modules committed

**Symptom**: Repository is huge (hundreds of MB)
**Solution**: Ensure `node_modules/` is in .gitignore. Remove from git: `git rm -r --cached node_modules`

### Issue 3: Build outputs committed

**Symptom**: Merge conflicts in dist/ directory
**Solution**: Ensure `dist/` is in .gitignore. Build outputs should be generated, not committed.

---

## Resources

- [GitHub .gitignore Templates](https://github.com/github/gitignore): Collection of useful .gitignore templates
- [Git Documentation - gitignore](https://git-scm.com/docs/gitignore): Official git documentation
- [Secrets Management Pattern](../patterns/mcp-auth-server-base.secrets-management.md): Security best practices

---

## Notes

- .gitignore is one of the most critical security files
- Always exclude .env files and secrets
- Test exclusions with `git status` before committing
- Can be extended per project needs
- Reference projects use similar exclusions

---

**Next Task**: [Task 27: Create Dockerfile.development Template](task-27-create-dockerfile-development.md)
**Related Design Docs**: [Security Considerations](../design/mcp-auth-server-base.security-considerations.md)
**Related Patterns**: [Secrets Management Pattern](../patterns/mcp-auth-server-