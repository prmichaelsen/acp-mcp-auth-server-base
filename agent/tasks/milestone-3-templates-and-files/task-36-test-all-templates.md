# Task 36: Test All Templates

**Milestone**: [M3 - Templates and Configuration Files](../../milestones/milestone-3-templates-and-files.md)
**Estimated Time**: 4-6 hours
**Dependencies**: Tasks 22-35 (all template creation tasks)
**Status**: Not Started

---

## Objective

Test all created templates in an isolated project to ensure they work together correctly. This is the quality gate for Milestone 3.

---

## Context

Before finalizing templates, they must be tested as a complete system. This task verifies:
- All templates process correctly
- Configuration files are valid
- Docker builds succeed
- TypeScript compiles
- Tests run successfully
- Scripts execute correctly

---

## Steps

### 1. Create Test Project

Set up an isolated test environment:
```bash
# Create test directory
mkdir -p /tmp/mcp-auth-test-project
cd /tmp/mcp-auth-test-project

# Copy all templates
cp -r templates/* .
```

### 2. Process Placeholders

Replace all placeholders with test values:
```bash
# Example placeholder replacement
find . -type f -name "*.template" -exec sed -i \
  -e 's/{{SERVICE_NAME}}/test-mcp-server/g' \
  -e 's/{{SERVICE_VERSION}}/0.1.0/g' \
  -e 's/{{PROJECT_ID}}/test-project-123/g' \
  {} \;

# Rename .template files
find . -name "*.template" -exec bash -c 'mv "$0" "${0%.template}"' {} \;
```

### 3. Test Configuration Files

Verify each configuration file works correctly.

### 4. Test Docker Builds

Build both development and production images.

### 5. Test TypeScript Compilation

Verify source templates compile without errors.

### 6. Integration Test

Run complete workflow from install to deployment.

### 7. Document Test Results

Create comprehensive test report.

---

## Verification

- [ ] Test project created successfully
- [ ] All placeholders processed correctly
- [ ] tsconfig.json valid and compiles
- [ ] jest.config.js valid and runs tests
- [ ] .dockerignore excludes correct files
- [ ] .env.example documents all variables
- [ ] .gitignore excludes correct files
- [ ] Dockerfile.development builds successfully
- [ ] Dockerfile.production builds successfully
- [ ] cloudbuild.yaml validates
- [ ] Source templates compile
- [ ] Scripts execute correctly
- [ ] Integration test passes
- [ ] Test report created

---

## Expected Output

**Test Report**: Document with results for all templates

**File Structure**:
```
templates/
├── config/ [5 files] ✅
├── docker/ [2 files] ✅
├── deployment/ [1 file] ✅
├── src/ [3+ files] ✅
├── scripts/ [2 files] ✅
└── package/ [1 file] ✅
```

---

## Common Issues and Solutions

### Issue 1: Placeholder not replaced

**Symptom**: Literal `{{PLACEHOLDER}}` appears in processed files
**Solution**: Verify placeholder replacement script covers all files. Check placeholder syntax.

### Issue 2: TypeScript compilation fails

**Symptom**: tsc reports errors
**Solution**: Fix template TypeScript errors. Ensure all imports are correct.

### Issue 3: Docker build fails

**Symptom**: Docker build errors
**Solution**: Check Dockerfile syntax. Verify all referenced files exist.

---

## Resources

- [Template Testing Best Practices](https://jestjs.io/docs/testing-frameworks): Testing strategies
- All Milestone 3 patterns and designs

---

## Notes

- This is the quality gate for Milestone 3
- All templates must pass before proceeding to Milestone 4
- Document any issues found and fixes applied
- Create comprehensive test report

---

**Next Task**: Milestone 4 begins
**Related Design Docs**: All design documents
**Related Patterns**: All patterns
**Estimated Completion Date**: TBD
