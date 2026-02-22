# Task 23: Create jest.config.js Template

**Milestone**: [M3 - Templates and Configuration Files](../milestones/milestone-3-templates-and-files.md)
**Estimated Time**: 2-3 hours
**Dependencies**: [Task 22: Create tsconfig.json](task-22-create-tsconfig.md)
**Status**: Not Started

---

## Objective

Create a Jest configuration template (`templates/config/jest.config.js`) that supports ES modules, TypeScript, and colocated tests. The configuration must work with the MCP SDK and mcp-auth library testing requirements.

---

## Context

Jest configuration for ES modules with TypeScript requires specific settings. The [Jest Configuration Pattern](../patterns/mcp-auth-server-base.jest-configuration.md) documents the proven approach. This template enables:
- ES module support with ts-jest
- Colocated test files (*.test.ts next to source)
- Coverage reporting
- Module name mapping for path aliases

---

## Steps

### 1. Review Jest Configuration Pattern

Read the [Jest Configuration Pattern](../patterns/mcp-auth-server-base.jest-configuration.md) to understand:
- ES module configuration requirements
- ts-jest preset and transform settings
- Module name mapper configuration
- Coverage settings

### 2. Create Template File

Create `templates/config/jest.config.js`:

```javascript
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testMatch: [
    '**/*.test.ts',
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

### 3. Add Configuration Comments

Document key settings:
- Why ts-jest/presets/default-esm is used
- Module name mapper purpose (handles .js extensions in imports)
- Coverage thresholds rationale
- Test file location strategy (colocated)

### 4. Test Configuration

Verify the configuration works:
```bash
# Create test project
mkdir -p test-project/src
cd test-project
cp templates/config/jest.config.js .
cp templates/config/tsconfig.json .

# Install dependencies
npm install --save-dev jest ts-jest @types/jest typescript

# Create simple test
cat > src/example.test.ts << 'EOF'
describe('Example', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
EOF

# Run tests
npm test
```

### 5. Verify Coverage Reporting

Ensure coverage reports generate correctly:
```bash
npm test -- --coverage
```

Check that coverage reports are created in `coverage/` directory.

### 6. Cross-Reference with Patterns

Ensure configuration matches:
- [Jest Configuration Pattern](../patterns/mcp-auth-server-base.jest-configuration.md)
- [Testing Auth Providers Pattern](../patterns/mcp-auth-server-base.testing-auth-providers.md)

---

## Verification

- [ ] `templates/config/jest.config.js` file created
- [ ] Uses ts-jest/presets/default-esm preset
- [ ] ES module support configured (extensionsToTreatAsEsm)
- [ ] Module name mapper handles .js extensions
- [ ] Test match pattern finds colocated tests
- [ ] Coverage collection configured
- [ ] Coverage thresholds set (70% minimum)
- [ ] Configuration runs tests successfully
- [ ] Coverage reports generate correctly
- [ ] Aligns with Jest Configuration Pattern

---

## Expected Output

**File Created**:
- `templates/config/jest.config.js`: Jest configuration template

**File Structure**:
```
templates/
└── config/
    ├── tsconfig.json (from Task 22)
    └── jest.config.js (new)
```

**Configuration Features**:
- ES module support with ts-jest
- Colocated test files (*.test.ts)
- Coverage reporting with HTML output
- 70% coverage thresholds
- Node test environment

---

## Common Issues and Solutions

### Issue 1: ES module import errors

**Symptom**: `SyntaxError: Cannot use import statement outside a module`
**Solution**: Ensure `preset: 'ts-jest/presets/default-esm'` is set and `extensionsToTreatAsEsm: ['.ts']` is configured.

### Issue 2: Module not found errors

**Symptom**: Jest cannot resolve imports with .js extensions
**Solution**: Module name mapper should transform `.js` imports to TypeScript files: `'^(\\.{1,2}/.*)\\.js$': '$1'`

### Issue 3: Coverage not collecting

**Symptom**: Coverage reports show 0% coverage
**Solution**: Verify `collectCoverageFrom` patterns match your source files. Ensure test files are excluded.

### Issue 4: Tests not found

**Symptom**: Jest reports "No tests found"
**Solution**: Check `testMatch` pattern. Ensure test files end with `.test.ts` and are in the correct location.

---

## Resources

- [Jest Configuration Documentation](https://jestjs.io/docs/configuration): Official Jest configuration reference
- [ts-jest Documentation](https://kulshekhar.github.io/ts-jest/): TypeScript Jest transformer
- [Jest ES Modules Support](https://jestjs.io/docs/ecmascript-modules): Guide for ES module configuration
- [Jest Configuration Pattern](../patterns/mcp-auth-server-base.jest-configuration.md): Project-specific pattern

---

## Notes

- ES module support in Jest requires specific configuration
- Module name mapper is critical for handling TypeScript's .js extension requirement
- Coverage thresholds can be adjusted per project needs
- Colocated tests keep test files close to source files
- Configuration tested with reference projects

---

**Next Task**: [Task 24: Create .dockerignore Template](task-24-create-dockerignore.md)
**Related Design Docs**: [Architecture Design](../design/mcp-auth-server-base.architecture.md)
**Related Patterns**: [Jest Configuration Pattern](../patterns/mcp-auth-server-base.jest-configuration.md)
**Estimated Completion Date**: TBD
