# Task 28: Create Dockerfile.production Template

**Milestone**: [M3 - Templates and Configuration Files](../milestones/milestone-3-templates-and-files.md)
**Estimated Time**: 3-4 hours
**Dependencies**: [Task 27: Create Dockerfile.development](task-27-create-dockerfile-development.md)
**Status**: Not Started

---

## Objective

Create a production Dockerfile template (`templates/docker/Dockerfile.production`) using multi-stage builds, optimized for security, size, and performance in Cloud Run deployments.

---

## Context

The production Dockerfile is used for Cloud Run deployments. It must:
- Use multi-stage builds (builder + runtime)
- Minimize image size (< 100MB target)
- Run as non-root user for security
- Include only production dependencies
- Be optimized for cold start performance

The [Docker Multi-Stage Pattern](../patterns/mcp-auth-server-base.docker-multistage.md) provides the complete specification.

---

## Steps

### 1. Review Docker Multi-Stage Pattern

Read the [Docker Multi-Stage Pattern](../patterns/mcp-auth-server-base.docker-multistage.md) to understand:
- Multi-stage build structure
- Security hardening (non-root user, minimal base)
- Size optimization techniques
- Cloud Run requirements

### 2. Create Template File

Create `templates/docker/Dockerfile.production`:

```dockerfile
# ============================================
# Stage 1: Builder
# ============================================
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++

WORKDIR /build

# Copy package files
COPY package*.json ./

# Install ALL dependencies (needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Remove devDependencies
RUN npm prune --production

# ============================================
# Stage 2: Runtime
# ============================================
FROM node:20-alpine

# Install runtime dependencies only
RUN apk add --no-cache \
    dumb-init \
    curl

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy built application from builder
COPY --from=builder --chown=nodejs:nodejs /build/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /build/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /build/package*.json ./

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start server
CMD ["node", "dist/index.js"]
```

### 3. Add Security Hardening

Implement security best practices:
- Non-root user (nodejs:nodejs)
- Minimal base image (Alpine)
- Only production dependencies
- dumb-init for proper signal handling
- Health check for monitoring

### 4. Optimize Image Size

Apply size optimization techniques:
- Multi-stage build (discard build tools)
- Alpine base (minimal OS)
- npm prune --production (remove devDependencies)
- Only copy necessary files
- No source code in final image

### 5. Test Production Build

Build and test the production image:
```bash
# Build production image
docker build -f templates/docker/Dockerfile.production -t mcp-auth-prod .

# Check image size (should be < 100MB)
docker images mcp-auth-prod

# Run production image
docker run -p 8080:8080 --env-file .env mcp-auth-prod

# Test health check
curl http://localhost:8080/health

# Verify non-root user
docker run --rm mcp-auth-prod whoami
# Should output: nodejs
```

### 6. Add Placeholders (if needed)

Identify any placeholders needed:
- Port numbers (if configurable)
- Health check paths (if customizable)
- User/group IDs (if customizable)

### 7. Cross-Reference with Patterns

Ensure Dockerfile aligns with:
- [Docker Multi-Stage Pattern](../patterns/mcp-auth-server-base.docker-multistage.md)
- [Cloud Run Deployment Pattern](../patterns/mcp-auth-server-base.cloud-run-deployment.md)
- [Health Check Pattern](../patterns/mcp-auth-server-base.health-check.md)
- [Security Considerations](../design/mcp-auth-server-base.security-considerations.md)

---

## Verification

- [ ] `templates/docker/Dockerfile.production` file created
- [ ] Uses multi-stage build (builder + runtime)
- [ ] Builder stage compiles TypeScript
- [ ] Runtime stage uses Alpine base
- [ ] Runs as non-root user (nodejs)
- [ ] Only production dependencies included
- [ ] dumb-init used for signal handling
- [ ] Health check configured
- [ ] Image size < 100MB
- [ ] Builds successfully
- [ ] Runs successfully
- [ ] Health check endpoint responds
- [ ] Aligns with Docker Multi-Stage Pattern

---

## Expected Output

**File Created**:
- `templates/docker/Dockerfile.production`: Production Dockerfile template

**File Structure**:
```
templates/
├── config/
│   └── [5 config files from Tasks 22-26]
└── docker/
    ├── Dockerfile.development (from Task 27)
    └── Dockerfile.production (new)
```

**Build Stages**:
1. **Builder**: Compiles TypeScript, installs dependencies
2. **Runtime**: Minimal image with only production files

**Security Features**:
- Non-root user (nodejs:nodejs)
- Minimal base image (Alpine)
- No build tools in final image
- dumb-init for signal handling

**Optimization Features**:
- Multi-stage build (smaller final image)
- Production dependencies only
- No source code (only compiled dist/)
- Layer caching for faster rebuilds

---

## Common Issues and Solutions

### Issue 1: Build fails in builder stage

**Symptom**: TypeScript compilation errors
**Solution**: Ensure tsconfig.json is correct. Verify all source files are valid TypeScript.

### Issue 2: Runtime stage missing dependencies

**Symptom**: Module not found errors when running
**Solution**: Ensure `npm prune --production` runs AFTER build. Verify node_modules copied from builder.

### Issue 3: Permission denied errors

**Symptom**: Cannot write to /app directory
**Solution**: Ensure `--chown=nodejs:nodejs` is used when copying files. Verify USER nodejs is set after COPY.

### Issue 4: Health check fails

**Symptom**: Container marked unhealthy
**Solution**: Verify curl is installed in runtime stage. Ensure health endpoint exists. Adjust timing if needed.

### Issue 5: Image size too large

**Symptom**: Image > 100MB
**Solution**: Verify multi-stage build is working. Check that devDependencies are pruned. Ensure only dist/ is copied, not src/.

---

## Resources

- [Docker Multi-Stage Builds](https://docs.docker.com/build/building/multi-stage/): Official Docker documentation
- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/): Security guidelines
- [Cloud Run Container Requirements](https://cloud.google.com/run/docs/container-contract): Cloud Run specifications
- [Docker Multi-Stage Pattern](../patterns/mcp-auth-server-base.docker-multistage.md): Project-specific pattern

---

## Notes

- Production Dockerfile must be secure and optimized
- Multi-stage builds are essential for small images
- Non-root user required for Cloud Run best practices
- dumb-init handles signals properly (important for graceful shutdown)
- Health checks enable Cloud Run monitoring
- Image size directly impacts cold start time

---

**Next Task**: [Task 29: Create cloudbuild.yaml Template](task-29-create-cloudbuild.md)
**Related Design Docs**: [Architecture Design](../design/mcp-auth-server-base.architecture.md), [Security Considerations](../design/mcp-auth-server-base.security-considerations.md)
**Related Patterns**: [Docker Multi-Stage Pattern](../patterns/mcp-auth-server-base.docker-multistage.md), [Cloud Run Deployment Pattern](../patterns/mcp-auth-server-base.cloud-run-deployment.md)
**Estimated Completion Date**: TBD
