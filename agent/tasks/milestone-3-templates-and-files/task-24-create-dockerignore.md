# Task 24: Create .dockerignore Template

**Milestone**: [M3 - Templates and Configuration Files](../milestones/milestone-3-templates-and-files.md)
**Estimated Time**: 1 hour
**Dependencies**: None
**Status**: Not Started

---

## Objective

Create a `.dockerignore` template (`templates/config/.dockerignore`) that excludes unnecessary files from Docker builds, reducing image size and build time.

---

## Context

The `.dockerignore` file works like `.gitignore` but for Docker builds. It prevents unnecessary files from being copied into the Docker build context, which:
- Reduces Docker image size
- Speeds up Docker builds
- Prevents sensitive files from entering images
- Improves build cache efficiency

The [Docker Multi-Stage Pattern](../patterns/mcp-auth-server-base.docker-multistage.md) references this configuration.

---

## Steps

### 1. Review Docker Multi-Stage Pattern

Read the [Docker Multi-Stage Pattern](../patterns/mcp-auth-server-base.docker-multistage.md) to understand:
- What files are needed in Docker builds
- What files should be excluded
- Build optimization strategies

### 2. Create Template File

Create `templates/config/.dockerignore`:

```dockerignore
# Dependencies
node_modules
npm-debug.log
yarn-error.log
package-lock.json
yarn.lock

# Build outputs
dist
build
*.tsbuildinfo

# Tests
**/*.test.ts
**/*.test.js
tests
coverage
.nyc_output

# Development files
.env
.env.local
.env.*.local
*.log

# Git
.git
.gitignore
.gitattributes

# IDE
.vscode
.idea
*.swp
*.swo
*~

# Documentation
README.md
CHANGELOG.md
docs
*.md

# Agent directory (ACP)
agent

# CI/CD
.github
.gitlab-ci.yml
.travis.yml

# OS files
.DS_Store
Thumbs.db

# Temporary files
tmp
temp
*.tmp
```

### 3. Verify Exclusions

Ensure critical files are NOT excluded:
- ✅ `package.json` - Needed for dependencies
- ✅ `src/**/*.ts` - Source code
- ✅ `tsconfig.json` - TypeScript configuration
- ❌ `node_modules` - Will be installed in container
- ❌ `dist` - Will be built in container
- ❌ `.env` - Secrets should use Secret Manager

### 4. Test with Docker Build

Test the .dockerignore file:
```bash
# Create test project
mkdir -p test-project/src
cd test-project
cp templates/config/.dockerignore .

# Create dummy files
touch README.md .env node_modules/.keep dist/.keep

# Check Docker context size
docker build --no-cache -t test .

# Verify excluded files don't appear in image
docker run --rm test ls -la
```

### 5. Document Rationale

Add comments explaining key exclusions:
- Why node_modules is excluded (installed in container)
- Why .env is excluded (use Secret Manager)
- Why agent directory is excluded (development only)

---

## Verification

- [ ] `templates/config/.dockerignore` file created
- [ ] Excludes node_modules and build outputs
- [ ] Excludes test files and coverage
- [ ] Excludes development files (.env, logs)
- [ ] Excludes documentation and agent directory
- [ ] Excludes IDE and OS files
- [ ] Does NOT exclude package.json or src/
- [ ] Docker build context size reduced significantly
- [ ] Tested with sample Docker build
- [ ] Aligns with Docker Multi-Stage Pattern

---

## Expected Output

**File Created**:
- `templates/config/.dockerignore`: Docker exclusion template

**File Structure**:
```
templates/
└── config/
    ├── tsconfig.json (from Task 22)
    ├── jest.config.js (from Task 23)
    └── .dockerignore (new)
```

**Exclusion Categories**:
- Dependencies (node_modules)
- Build outputs (dist, coverage)
- Development files (.env, logs)
- Documentation (README, agent/)
- IDE and OS files

---

## Common Issues and Solutions

### Issue 1: Docker build includes node_modules

**Symptom**: Docker image is very large (hundreds of MB)
**Solution**: Ensure `node_modules` is in .dockerignore. Docker will install dependencies in the container.

### Issue 2: Source files excluded accidentally

**Symptom**: Docker build fails with "cannot find module"
**Solution**: Verify `src/` is NOT in .dockerignore. Only exclude test files (`**/*.test.ts`).

### Issue 3: .env file copied to image

**Symptom**: Secrets appear in Docker image
**Solution**: Ensure `.env` and `.env.*` are in .dockerignore. Use Secret Manager for production secrets.

---

## Resources

- [Docker .dockerignore Documentation](https://docs.docker.com/engine/reference/builder/#dockerignore-file): Official Docker documentation
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/): Docker development best practices
- [Docker Multi-Stage Pattern](../patterns/mcp-auth-server-base.docker-multistage.md): Project-specific pattern

---

## Notes

- .dockerignore uses same syntax as .gitignore
- Exclusions apply to entire Docker build context
- More exclusions = faster builds and smaller images
- Critical for production deployments
- Test with actual Docker builds to verify

---

**Next Task**: [Task 25: Create .env.example Template](task-25-create-env-example.md)
**Related Design Docs**: [Architecture Design](../design/mcp-auth-server-base.architecture.md)
**Related Patterns**: [Docker Multi-Stage Pattern](../patterns/mcp-auth-server-base.docker-multistage.md)
**Estimated Completion Date**: TBD
