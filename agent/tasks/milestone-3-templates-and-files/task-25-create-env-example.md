# Task 25: Create .env.example Template

**Milestone**: [M3 - Templates and Configuration Files](../milestones/milestone-3-templates-and-files.md)
**Estimated Time**: 2 hours
**Dependencies**: None
**Status**: Not Started

---

## Objective

Create an environment variable template (`templates/config/.env.example`) that documents all required and optional environment variables for MCP auth servers, with clear descriptions and placeholder values.

---

## Context

The `.env.example` file serves as documentation for environment variables and a template for creating `.env` files. It must document variables for:
- Server configuration (port, environment)
- Platform integration (URL, tokens)
- CORS configuration
- Service-specific variables
- Authentication settings

The [Environment Configuration Pattern](../patterns/mcp-auth-server-base.environment-configuration.md) defines the approach.

---

## Steps

### 1. Review Environment Configuration Pattern

Read the [Environment Configuration Pattern](../patterns/mcp-auth-server-base.environment-configuration.md) to understand:
- Required vs optional variables
- Variable naming conventions
- Validation requirements
- Security considerations

### 2. Create Template File

Create `templates/config/.env.example`:

```env
# ============================================
# MCP Auth Server Configuration
# ============================================
# Copy this file to .env and fill in your values
# NEVER commit .env to version control

# --------------------------------------------
# Server Configuration
# --------------------------------------------
PORT=8080
NODE_ENV=development

# --------------------------------------------
# Platform Integration (Required for Dynamic Servers)
# --------------------------------------------
# URL of the platform that manages user credentials
PLATFORM_URL=https://your-platform.example.com

# Service token for authenticating with the platform
# This is used to fetch user credentials from the platform API
PLATFORM_SERVICE_TOKEN=your-service-token-here

# --------------------------------------------
# CORS Configuration
# --------------------------------------------
# Allowed origin for CORS requests (required for SSE transport)
# For development: http://localhost:3000
# For production: https://your-platform.example.com
CORS_ORIGIN=http://localhost:3000

# --------------------------------------------
# Authentication Configuration
# --------------------------------------------
# JWT secret for verifying platform tokens (if using JWT auth)
JWT_SECRET=your-jwt-secret-here

# JWT issuer (expected 'iss' claim in tokens)
JWT_ISSUER=your-platform

# JWT audience (expected 'aud' claim in tokens)
JWT_AUDIENCE=mcp-server

# --------------------------------------------
# Service-Specific Configuration
# --------------------------------------------
# Add your service-specific environment variables below
# Examples:
# API_KEY=your-api-key-here
# DATABASE_URL=postgresql://localhost:5432/mydb
# EXTERNAL_SERVICE_URL=https://api.example.com

# --------------------------------------------
# Logging Configuration (Optional)
# --------------------------------------------
LOG_LEVEL=info
LOG_FORMAT=json

# --------------------------------------------
# Health Check Configuration (Optional)
# --------------------------------------------
HEALTH_CHECK_ENABLED=true
HEALTH_CHECK_PATH=/health
```

### 3. Add Inline Documentation

For each variable, add comments explaining:
- Purpose of the variable
- Required vs optional
- Example values
- Security considerations
- Where to find the value

### 4. Create Placeholder Variants

Consider creating variants for different server types:
- `.env.example.static` - For static servers (minimal variables)
- `.env.example.dynamic` - For dynamic servers (full variables)
- `.env.example.static-with-credentials` - For static servers with shared credentials

### 5. Document Security Best Practices

Add security warnings:
```env
# ⚠️  SECURITY WARNINGS:
# - NEVER commit .env to version control
# - Use Google Cloud Secret Manager for production secrets
# - Rotate tokens regularly
# - Use strong, unique secrets for JWT_SECRET
# - Restrict CORS_ORIGIN to specific domains in production
```

### 6. Cross-Reference with Patterns

Ensure variables align with:
- [Environment Configuration Pattern](../patterns/mcp-auth-server-base.environment-configuration.md)
- [Secrets Management Pattern](../patterns/mcp-auth-server-base.secrets-management.md)
- [CORS Configuration Pattern](../patterns/mcp-auth-server-base.cors-configuration.md)

---

## Verification

- [ ] `templates/config/.env.example` file created
- [ ] All required variables documented
- [ ] Optional variables clearly marked
- [ ] Inline comments explain each variable
- [ ] Placeholder values provided
- [ ] Security warnings included
- [ ] Organized into logical sections
- [ ] Aligns with Environment Configuration Pattern
- [ ] Covers all server types (static, dynamic, static_with_credentials)
- [ ] No actual secrets included (only placeholders)

---

## Expected Output

**File Created**:
- `templates/config/.env.example`: Environment variable template

**File Structure**:
```
templates/
└── config/
    ├── tsconfig.json (from Task 22)
    ├── jest.config.js (from Task 23)
    ├── .dockerignore (from Task 24)
    └── .env.example (new)
```

**Variable Categories**:
- Server configuration (PORT, NODE_ENV)
- Platform integration (PLATFORM_URL, PLATFORM_SERVICE_TOKEN)
- CORS configuration (CORS_ORIGIN)
- Authentication (JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE)
- Service-specific (placeholders for user additions)
- Logging (LOG_LEVEL, LOG_FORMAT)
- Health checks (HEALTH_CHECK_ENABLED, HEALTH_CHECK_PATH)

---

## Common Issues and Solutions

### Issue 1: Missing required variables

**Symptom**: Server fails to start with "Missing required environment variable"
**Solution**: Ensure all required variables are documented in .env.example with clear descriptions.

### Issue 2: Unclear placeholder values

**Symptom**: Users don't know what values to use
**Solution**: Provide example values and comments explaining where to find actual values.

### Issue 3: Security issues with example values

**Symptom**: Users use example values in production
**Solution**: Use obviously fake values (e.g., "your-secret-here") and add security warnings.

---

## Resources

- [The Twelve-Factor App - Config](https://12factor.net/config): Best practices for environment configuration
- [Environment Configuration Pattern](../patterns/mcp-auth-server-base.environment-configuration.md): Project-specific pattern
- [Secrets Management Pattern](../patterns/mcp-auth-server-base.secrets-management.md): Security best practices

---

## Notes

- .env files should NEVER be committed to version control
- Production deployments should use Google Cloud Secret Manager
- .env.example is committed and serves as documentation
- Variables should be validated at startup (see Environment Configuration Pattern)
- Consider creating variants for different server types

---

**Next Task**: [Task 26: Create .gitignore Template](task-26-create-gitignore.md)
**Related Design Docs**: [Security Considerations](../design/mcp-auth-server-base.security-considerations.md)
**Related Patterns**: [Environment Configuration Pattern](../patterns/mcp-auth-server-base.environment-configuration.md)
**Estimated Completion Date**: TBD
