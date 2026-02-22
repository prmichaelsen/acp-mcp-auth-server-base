# Task 46: Test User Workflow End-to-End

**Milestone**: [M4 - Package Finalization and Testing](../../milestones/milestone-4-package-finalization.md)
**Estimated Time**: 4-6 hours
**Dependencies**: Tasks 42-45 (all testing tasks)
**Status**: Not Started

---

## Objective

Test the complete user workflow from package installation through deployment to verify the entire system works as intended.

---

## Context

This is the most critical test - simulating a real user building an MCP auth server using the package. The workflow must be smooth, well-documented, and successful.

---

## Steps

### 1. Create Fresh Test Project

```bash
mkdir -p /tmp/e2e-test
cd /tmp/e2e-test
```

### 2. Install Package

```bash
@acp.package-install mcp-auth-server-base
```

### 3. Initialize Project

```bash
@mcp-auth-server-base.init
```

Follow prompts and select:
- Server type: dynamic
- Auth provider: JWT
- Platform URL: test platform
- Generate all files

### 4. Implement Server

Add a simple tool to the generated server:
```typescript
// Add to src/index.ts
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: 'test_tool',
    description: 'A test tool',
    inputSchema: { type: 'object', properties: {} },
  }],
}));
```

### 5. Test Locally

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Run locally
npm run dev
```

### 6. Test Docker Build

```bash
# Build development image
docker build -f Dockerfile.development -t e2e-test-dev .

# Build production image
docker build -f Dockerfile.production -t e2e-test-prod .

# Run production image
docker run -p 8080:8080 --env-file .env e2e-test-prod
```

### 7. Test Validation

```bash
@mcp-auth-server-base.validate
```

### 8. Test Deployment (if GCP available)

```bash
# Upload secrets
npx tsx scripts/upload-secrets.ts

# Deploy
@mcp-auth-server-base.deploy
```

### 9. Document Complete Workflow

Create comprehensive test report with:
- Each step executed
- Time taken per step
- Issues encountered
- User experience notes
- Suggestions for improvement

---

## Verification

- [ ] Package installed successfully
- [ ] Project initialized successfully
- [ ] All generated files correct
- [ ] TypeScript compiles
- [ ] Tests pass
- [ ] Docker builds succeed
- [ ] Local server runs
- [ ] Validation passes
- [ ] Deployment works (if tested)
- [ ] Complete workflow documented

---

## Expected Output

**End-to-End Test Report**: Complete documentation of user workflow

**Workflow Steps Verified**:
1. Package installation ✅
2. Project initialization ✅
3. Server implementation ✅
4. Local testing ✅
5. Docker builds ✅
6. Validation ✅
7. Deployment ✅

---

## Common Issues and Solutions

### Issue 1: Init command fails

**Symptom**: Error during project initialization
**Solution**: Check command documentation. Verify templates are correct.

### Issue 2: Generated code doesn't compile

**Symptom**: TypeScript errors in generated files
**Solution**: Fix templates. Ensure placeholders are replaced correctly.

### Issue 3: Docker build fails

**Symptom**: Docker build errors
**Solution**: Verify Dockerfile templates. Check that all referenced files exist.

---

## Resources

- All package documentation
- All patterns and commands

---

## Notes

- This is the ultimate quality gate
- Simulates real user experience
- Must be smooth and successful
- Document any friction points
- Suggest improvements

---

**Next Task**: [Task 47: Fix Any Issues Found](task-47-fix-issues.md)
**Estimated Completion Date**: TBD
