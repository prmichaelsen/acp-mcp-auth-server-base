# Task 22: Create tsconfig.json Template

**Milestone**: [M3 - Templates and Configuration Files](../milestones/milestone-3-templates-and-files.md)
**Estimated Time**: 2-3 hours
**Dependencies**: [Task 1: Server Wrapping Pattern](task-1-create-server-wrapping-pattern.md)
**Status**: Not Started

---

## Objective

Create a TypeScript configuration template (`templates/config/tsconfig.json`) that will be installed to user projects. The configuration must support ES modules, strict type checking, and be compatible with the MCP SDK and mcp-auth library.

---

## Context

TypeScript configuration is critical for ensuring type safety and proper module resolution. The reference projects (remember-mcp-server, task-mcp-server) use specific TypeScript settings that work well with the MCP SDK. This template must:
- Support ES modules (Node16 module resolution)
- Enable strict type checking
- Generate source maps and declarations
- Be compatible with both development and production builds

---

## Steps

### 1. Review Reference Project Configurations

Examine TypeScript configurations from reference projects to understand proven patterns:
- remember-mcp-server tsconfig.json
- task-mcp-server tsconfig.json
- MCP SDK requirements

### 2. Create Template File

Create `templates/config/tsconfig.json` with the following structure:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "types": ["node", "jest"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### 3. Add Configuration Comments

Document key settings in comments (if JSON5 supported) or in separate documentation:
- Why Node16 module resolution is required
- Why strict mode is enabled
- Source map generation for debugging
- Declaration files for type checking

### 4. Test Configuration

Verify the configuration works:
```bash
# Create test project
mkdir -p test-project/src
cd test-project
cp templates/config/tsconfig.json .

# Create simple TypeScript file
echo 'console.log("test");' > src/index.ts

# Test compilation
npx tsc --noEmit
```

### 5. Document Placeholders

Identify any placeholders needed (likely none for tsconfig.json, but document if any).

### 6. Cross-Reference with Patterns

Ensure configuration aligns with:
- [Server Wrapping Pattern](../patterns/mcp-auth-server-base.server-wrapping.md)
- [Jest Configuration Pattern](../patterns/mcp-auth-server-base.jest-configuration.md)
- [Environment Configuration Pattern](../patterns/mcp-auth-server-base.environment-configuration.md)

---

## Verification

- [ ] `templates/config/tsconfig.json` file created
- [ ] Configuration uses Node16 module resolution
- [ ] Strict mode enabled
- [ ] Source maps and declarations enabled
- [ ] Include/exclude paths correct
- [ ] Configuration compiles test TypeScript file without errors
- [ ] Compatible with MCP SDK and mcp-auth library
- [ ] No placeholders needed (or documented if any)
- [ ] Aligns with reference project configurations

---

## Expected Output

**File Created**:
- `templates/config/tsconfig.json`: TypeScript configuration template

**File Structure**:
```
templates/
└── config/
    └── tsconfig.json
```

**Configuration Features**:
- ES2022 target for modern JavaScript
- Node16 module resolution for ES modules
- Strict type checking enabled
- Source maps for debugging
- Declaration files for type safety
- Excludes test files from build

---

## Common Issues and Solutions

### Issue 1: Module resolution errors

**Symptom**: TypeScript cannot resolve imports from MCP SDK or mcp-auth
**Solution**: Ensure `moduleResolution: "Node16"` and `module: "Node16"` are set. This is required for ES modules.

### Issue 2: Type errors in MCP SDK

**Symptom**: Type errors when using MCP SDK types
**Solution**: Add `"skipLibCheck": true` to avoid type errors in dependencies. Ensure `"esModuleInterop": true` is set.

### Issue 3: Cannot import JSON files

**Symptom**: Error importing JSON files (like package.json)
**Solution**: Ensure `"resolveJsonModule": true` is set.

---

## Resources

- [TypeScript Handbook - tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html): Official TypeScript configuration documentation
- [TypeScript Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html): Understanding Node16 resolution
- [MCP SDK TypeScript Examples](https://github.com/modelcontextprotocol/typescript-sdk): Reference implementations

---

## Notes

- This configuration is designed for server-side Node.js applications
- No browser-specific settings needed
- Configuration should work for both static and dynamic servers
- Keep configuration minimal and focused on essentials
- Reference projects use similar configurations successfully

---

**Next Task**: [Task 23: Create jest.config.js Template](task-23-create-jest-config.md)
**Related Design Docs**: [Architecture Design](../design/mcp-auth-server-base.architecture.md)
**Estimated Completion Date**: TBD
