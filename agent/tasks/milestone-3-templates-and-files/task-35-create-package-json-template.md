# Task 35: Create package.json Template

**Milestone**: [M3 - Templates and Configuration Files](../../milestones/milestone-3-templates-and-files.md)
**Estimated Time**: 2-3 hours
**Dependencies**: [Task 22: Create tsconfig.json](task-22-create-tsconfig.md), [Task 23: Create jest.config.js](task-23-create-jest-config.md)
**Status**: Not Started

---

## Objective

Create a package.json template (`templates/package/package.json.template`) with placeholders for service name, dependencies, and scripts that will be customized during project initialization.

---

## Context

The package.json file defines the Node.js project configuration. It must include:
- Project metadata (name, version, description)
- Dependencies (MCP SDK, mcp-auth, service-specific)
- Scripts (build, dev, test, start)
- TypeScript configuration reference
- ES module support

---

## Steps

### 1. Review Reference Projects

Examine package.json from:
- remember-mcp-server
- task-mcp-server
- Identify common dependencies and scripts

### 2. Create Template File

Create `templates/package/package.json.template`:

```json
{
  "name": "{{SERVICE_NAME}}",
  "version": "{{SERVICE_VERSION}}",
  "description": "{{SERVICE_DESCRIPTION}}",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "bin": {
    "{{SERVICE_NAME}}": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "test": "NODE_OPTIONS=--experimental-vm-modules jest",
    "test:watch": "NODE_OPTIONS=--experimental-vm-modules jest --watch",
    "test:coverage": "NODE_OPTIONS=--experimental-vm-modules jest --coverage",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write 'src/**/*.ts'",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.4",
    "@prmichaelsen/mcp-auth": "^1.0.0",
    "dotenv": "^16.4.5",
    "jsonwebtoken": "^9.0.2"
    {{ADDITIONAL_DEPENDENCIES}}
  },
  "devDependencies": {
    "@types/jest": "^29.5.14",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/node": "^22.10.2",
    "@typescript-eslint/eslint-plugin": "^8.18.2",
    "@typescript-eslint/parser": "^8.18.2",
    "eslint": "^9.18.0",
    "jest": "^29.7.0",
    "prettier": "^3.4.2",
    "ts-jest": "^29.2.5",
    "tsx": "^4.19.2",
    "typescript": "^5.7.2"
  },
  "engines": {
    "node": ">=20.0.0"
  },
  "keywords": [
    "mcp",
    "model-context-protocol",
    "authentication",
    "{{SERVICE_KEYWORDS}}"
  ],
  "author": "{{AUTHOR_NAME}}",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "{{REPOSITORY_URL}}"
  }
}
```

### 3. Document Placeholders

Create placeholder documentation:
```markdown
# package.json Template Placeholders

- `{{SERVICE_NAME}}` - Name of the MCP service (e.g., "my-mcp-server")
- `{{SERVICE_VERSION}}` - Initial version (default: "0.1.0")
- `{{SERVICE_DESCRIPTION}}` - Brief description of the service
- `{{SERVICE_KEYWORDS}}` - Additional keywords for npm
- `{{AUTHOR_NAME}}` - Author name
- `{{REPOSITORY_URL}}` - Git repository URL
- `{{ADDITIONAL_DEPENDENCIES}}` - Service-specific dependencies (comma-separated)
```

### 4. Create Variant Examples

Create examples for different server types:
- `package.json.static.example` - Static server (minimal dependencies)
- `package.json.dynamic.example` - Dynamic server (includes platform client)

### 5. Test Template

Verify the template works:
```bash
# Process placeholders
sed 's/{{SERVICE_NAME}}/test-service/g' templates/package/package.json.template > test-package.json

# Validate JSON
node -e "JSON.parse(require('fs').readFileSync('test-package.json', 'utf-8'))"

# Test npm install
mkdir test-project
cp test-package.json test-project/package.json
cd test-project
npm install
```

### 6. Cross-Reference with Patterns

Ensure dependencies align with:
- [Server Wrapping Pattern](../../patterns/mcp-auth-server-base.server-wrapping.md)
- [Jest Configuration Pattern](../../patterns/mcp-auth-server-base.jest-configuration.md)
- [Testing Auth Providers Pattern](../../patterns/mcp-auth-server-base.testing-auth-providers.md)

---

## Verification

- [ ] `templates/package/package.json.template` file created
- [ ] Includes all required dependencies
- [ ] Scripts for build, dev, test, start
- [ ] ES module configuration (type: "module")
- [ ] TypeScript support configured
- [ ] Jest scripts with NODE_OPTIONS for ES modules
- [ ] Placeholders clearly marked
- [ ] Valid JSON after placeholder replacement
- [ ] npm install works with processed template
- [ ] Aligns with reference project dependencies

---

## Expected Output

**File Created**:
- `templates/package/package.json.template`: Package manifest template

**File Structure**:
```
templates/
├── config/ [5 files]
├── docker/ [2 files]
├── deployment/ [1 file]
├── src/ [3 files]
├── scripts/ [2 files]
└── package/
    └── package.json.template (new)
```

**Template Features**:
- ES module support
- TypeScript configuration
- MCP SDK and mcp-auth dependencies
- Development and production scripts
- Testing with Jest
- Linting and formatting tools

---

## Common Issues and Solutions

### Issue 1: ES module errors

**Symptom**: "Cannot use import statement outside a module"
**Solution**: Ensure `"type": "module"` is set in package.json.

### Issue 2: Jest fails with ES modules

**Symptom**: Jest cannot run tests with ES modules
**Solution**: Use `NODE_OPTIONS=--experimental-vm-modules` in test scripts.

### Issue 3: TypeScript compilation errors

**Symptom**: tsc fails to compile
**Solution**: Verify tsconfig.json is present and correctly configured. Check TypeScript version compatibility.

---

## Resources

- [package.json Documentation](https://docs.npmjs.com/cli/v10/configuring-npm/package-json): Official npm documentation
- [ES Modules in Node.js](https://nodejs.org/api/esm.html): Node.js ES module support
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk): MCP SDK usage

---

## Notes

- Template must be valid JSON
- Placeholders should be easily identifiable
- Dependencies should match reference projects
- Scripts should cover all common operations
- Consider creating variants for different server types

---

**Next Task**: [Task 36: Test All Templates](task-36-test-all-templates.md)
**Related Design Docs**: [Architecture Design](../../design/mcp-auth-server-base.architecture.md)
**Estimated Completion Date**: TBD
