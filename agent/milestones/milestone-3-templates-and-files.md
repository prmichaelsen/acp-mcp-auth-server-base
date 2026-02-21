# Milestone 3: Templates and Configuration Files

**Goal**: Create all configuration files and source code templates that will be installed to user projects
**Duration**: 3-4 days
**Dependencies**: Milestone 1 (patterns define what templates should contain)
**Status**: Not Started

---

## Overview

This milestone creates the actual files that will be copied to user projects when they install the package. These include configuration files (tsconfig.json, jest.config.js, Dockerfile, etc.), source code templates (index.ts, auth providers, etc.), and utility scripts. All files use placeholders where needed and follow patterns from Milestone 1.

---

## Deliverables

### 1. Configuration Files
- `tsconfig.json` - TypeScript configuration
- `jest.config.js` - Jest testing configuration
- `.dockerignore` - Docker exclusions
- `.env.example` - Environment variable template
- `.gitignore` - Git exclusions

### 2. Docker Files
- `Dockerfile.development` - Development Docker build
- `Dockerfile.production` - Production multi-stage build

### 3. Build Files
- `esbuild.build.js` - Build script (if using esbuild)
- `esbuild.watch.js` - Watch script (if using esbuild)
- Or rely on `tsc` only (based on reference projects)

### 4. Deployment Files
- `cloudbuild.yaml` - Cloud Build configuration (with placeholders)

### 5. Source Templates
- `src/index.ts.template` - Main server entry point
- `src/auth/platform-jwt-provider.ts.template` - JWT auth provider
- `src/auth/platform-token-resolver.ts.template` - Token resolver (optional)

### 6. Scripts
- `scripts/upload-secrets.ts` - Secret upload utility
- `scripts/test-auth.ts` - Auth testing utility

### 7. Package Files
- `package.json.template` - Package manifest with placeholders

---

## Success Criteria

- [ ] All configuration files created and validated
- [ ] Docker files build successfully
- [ ] Source templates compile without errors (after placeholder replacement)
- [ ] Scripts are functional
- [ ] All files follow patterns from Milestone 1
- [ ] Placeholders clearly marked (e.g., `{{SERVICE_NAME}}`, `{{PLATFORM_URL}}`)
- [ ] Files tested in a sample project

---

## Key Files to Create

```
templates/
├── config/
│   ├── tsconfig.json
│   ├── jest.config.js
│   ├── .dockerignore
│   ├── .env.example
│   └── .gitignore
├── docker/
│   ├── Dockerfile.development
│   └── Dockerfile.production
├── build/
│   ├── esbuild.build.js (optional)
│   └── esbuild.watch.js (optional)
├── deployment/
│   └── cloudbuild.yaml
├── src/
│   ├── index.ts.template
│   └── auth/
│       ├── platform-jwt-provider.ts.template
│       └── platform-token-resolver.ts.template
├── scripts/
│   ├── upload-secrets.ts
│   └── test-auth.ts
└── package/
    └── package.json.template
```

---

## Tasks

1. Create tsconfig.json - TypeScript configuration following reference projects
2. Create jest.config.js - Jest configuration with colocated tests
3. Create .dockerignore - Docker exclusions
4. Create .env.example - Environment variable template
5. Create .gitignore - Git exclusions
6. Create Dockerfile.development - Development Docker build
7. Create Dockerfile.production - Production multi-stage build
8. Create cloudbuild.yaml - Cloud Build configuration with placeholders
9. Create src/index.ts.template - Main server template
10. Create src/auth/platform-jwt-provider.ts.template - JWT provider template
11. Create src/auth/platform-token-resolver.ts.template - Token resolver template
12. Create scripts/upload-secrets.ts - Secret upload utility
13. Create scripts/test-auth.ts - Auth testing utility
14. Create package.json.template - Package manifest template
15. Test all templates - Ensure they work in a sample project

---

## Environment Variables

Templates will document these environment variables in `.env.example`:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Platform Integration
PLATFORM_URL={{PLATFORM_URL}}
PLATFORM_SERVICE_TOKEN={{PLATFORM_SERVICE_TOKEN}}

# CORS
CORS_ORIGIN={{CORS_ORIGIN}}

# Service-Specific
# Add your service-specific environment variables here
```

---

## Testing Requirements

- [ ] All configuration files validated
- [ ] Docker files build successfully
- [ ] TypeScript templates compile
- [ ] Scripts execute without errors
- [ ] Templates tested in sample project

---

## Documentation Requirements

- [ ] Each template includes comments explaining placeholders
- [ ] .env.example documents all variables
- [ ] README.template.md created (if needed)

---

## Risks and Mitigation

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| Templates don't compile | High | Medium | Test templates in isolated project before finalizing |
| Placeholders unclear | Medium | Medium | Use consistent placeholder format, document in comments |
| Missing configuration | Medium | Low | Cross-reference with reference projects |
| Docker builds fail | High | Low | Test Docker builds locally before committing |

---

**Next Milestone**: [milestone-4-package-finalization.md](milestone-4-package-finalization.md)
**Blockers**: Milestone 1 must be complete (patterns define template structure)
**Notes**: Extract templates directly from reference projects where possible, add placeholders as needed
