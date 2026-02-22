# Task 31: Create platform-jwt-provider.ts Template

**Milestone**: [M3 - Templates and Configuration Files](../milestones/milestone-3-templates-and-files.md)
**Estimated Time**: 3-4 hours
**Dependencies**: [Task 2: Auth Provider Patterns](task-2-create-auth-provider-patterns.md)
**Status**: Not Started

---

## Objective

Create a JWT authentication provider template (`templates/src/auth/platform-jwt-provider.ts.template`) that implements JWT token verification with caching and proper error handling.

---

## Context

The JWT provider is the most common authentication method for MCP auth servers. It must:
- Verify JWT tokens from platform
- Cache verification results (5-minute TTL)
- Extract user ID from token claims
- Handle token expiration and errors
- Support configurable issuer and audience

The [JWT Auth Provider Pattern](../patterns/mcp-auth-server-base.auth-provider-jwt.md) documents the complete implementation.

---

## Steps

### 1. Review JWT Auth Provider Pattern

Read the [JWT Auth Provider Pattern](../patterns/mcp-auth-server-base.auth-provider-jwt.md) to understand:
- JWT verification with jsonwebtoken
- Token caching strategy
- Error handling
- Security considerations

### 2. Create Template File

Create `templates/src/auth/platform-jwt-provider.ts.template`:

```typescript
/**
 * Platform JWT Authentication Provider
 * 
 * Verifies JWT tokens issued by {{PLATFORM_NAME}}.
 * Implements caching for performance (5-minute TTL).
 */

import jwt from 'jsonwebtoken';
import type { AuthProvider } from '@prmichaelsen/mcp-auth';

interface JWTPayload {
  sub: string; // User ID
  iss: string; // Issuer
  aud: string; // Audience
  exp: number; // Expiration
  iat: number; // Issued at
  // Add platform-specific claims here
}

interface CacheEntry {
  userId: string;
  expiresAt: number;
}

export class PlatformJWTProvider implements AuthProvider {
  private cache = new Map<string, CacheEntry>();
  private readonly secret: string;
  private readonly issuer: string;
  private readonly audience: string;
  private readonly cacheTTL = 5 * 60 * 1000; // 5 minutes

  constructor(config: {
    secret: string;
    issuer: string;
    audience: string;
  }) {
    this.secret = config.secret;
    this.issuer = config.issuer;
    this.audience = config.audience;
  }

  async authenticate(token: string): Promise<string | null> {
    // Check cache first
    const cached = this.cache.get(token);
    if (cached && Date.now() < cached.expiresAt) {
      return cached.userId;
    }

    try {
      // Verify JWT
      const payload = jwt.verify(token, this.secret, {
        issuer: this.issuer,
        audience: this.audience,
      }) as JWTPayload;

      const userId = payload.sub;

      // Cache result
      this.cache.set(token, {
        userId,
        expiresAt: Date.now() + this.cacheTTL,
      });

      // Clean expired cache entries periodically
      this.cleanCache();

      return userId;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.warn('JWT token expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        console.warn('Invalid JWT token:', error.message);
      } else {
        console.error('JWT verification error:', error);
      }
      return null;
    }
  }

  private cleanCache(): void {
    const now = Date.now();
    for (const [token, entry] of this.cache.entries()) {
      if (now >= entry.expiresAt) {
        this.cache.delete(token);
      }
    }
  }
}
```

### 3. Add Configuration Comments

Document key implementation details:
- Why caching is important (performance)
- Cache TTL rationale (5 minutes)
- Error handling strategy
- Security considerations

### 4. Create Test File

Create corresponding test file template:
`templates/src/auth/platform-jwt-provider.test.ts.template`

```typescript
import { describe, it, expect, beforeEach } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { PlatformJWTProvider } from './platform-jwt-provider.js';

describe('PlatformJWTProvider', () => {
  const secret = 'test-secret';
  const issuer = 'test-platform';
  const audience = 'mcp-server';
  let provider: PlatformJWTProvider;

  beforeEach(() => {
    provider = new PlatformJWTProvider({ secret, issuer, audience });
  });

  it('should authenticate valid JWT token', async () => {
    const token = jwt.sign(
      { sub: 'user123' },
      secret,
      { issuer, audience, expiresIn: '1h' }
    );

    const userId = await provider.authenticate(token);
    expect(userId).toBe('user123');
  });

  it('should return null for invalid token', async () => {
    const userId = await provider.authenticate('invalid-token');
    expect(userId).toBeNull();
  });

  it('should return null for expired token', async () => {
    const token = jwt.sign(
      { sub: 'user123' },
      secret,
      { issuer, audience, expiresIn: '-1h' }
    );

    const userId = await provider.authenticate(token);
    expect(userId).toBeNull();
  });

  it('should cache verification results', async () => {
    const token = jwt.sign(
      { sub: 'user123' },
      secret,
      { issuer, audience, expiresIn: '1h' }
    );

    // First call
    const userId1 = await provider.authenticate(token);
    // Second call (should use cache)
    const userId2 = await provider.authenticate(token);

    expect(userId1).toBe('user123');
    expect(userId2).toBe('user123');
  });
});
```

### 5. Test Template

Verify the template works:
```bash
# Process placeholders
# Replace {{PLATFORM_NAME}} with actual platform name

# Compile TypeScript
npx tsc templates/src/auth/platform-jwt-provider.ts.template --noEmit

# Run tests
npm test platform-jwt-provider.test.ts
```

### 6. Cross-Reference with Patterns

Ensure template demonstrates:
- [JWT Auth Provider Pattern](../patterns/mcp-auth-server-base.auth-provider-jwt.md)
- [Error Handling Pattern](../patterns/mcp-auth-server-base.error-handling.md)
- [Testing Auth Providers Pattern](../patterns/mcp-auth-server-base.testing-auth-providers.md)

---

## Verification

- [ ] `templates/src/auth/platform-jwt-provider.ts.template` file created
- [ ] Implements AuthProvider interface
- [ ] JWT verification with jsonwebtoken
- [ ] Token caching with 5-minute TTL
- [ ] Cache cleanup mechanism
- [ ] Proper error handling
- [ ] Placeholders clearly marked
- [ ] Test file created
- [ ] Template compiles without errors
- [ ] Tests pass
- [ ] Aligns with JWT Auth Provider Pattern

---

## Expected Output

**Files Created**:
- `templates/src/auth/platform-jwt-provider.ts.template`: JWT provider template
- `templates/src/auth/platform-jwt-provider.test.ts.template`: Test template

**File Structure**:
```
templates/
├── config/ [5 files]
├── docker/ [2 files]
├── deployment/ [1 file]
└── src/
    ├── index.ts.template (from Task 30)
    └── auth/
        ├── platform-jwt-provider.ts.template (new)
        └── platform-jwt-provider.test.ts.template (new)
```

**Implementation Features**:
- JWT verification with secret
- Issuer and audience validation
- Token caching for performance
- Automatic cache cleanup
- Comprehensive error handling
- Type-safe payload interface

---

## Common Issues and Solutions

### Issue 1: JWT verification fails

**Symptom**: All tokens rejected as invalid
**Solution**: Verify JWT_SECRET matches the secret used to sign tokens. Check issuer and audience claims.

### Issue 2: Cache grows unbounded

**Symptom**: Memory usage increases over time
**Solution**: Ensure cleanCache() is called periodically. Consider adding max cache size limit.

### Issue 3: Type errors with JWT payload

**Symptom**: TypeScript errors accessing payload properties
**Solution**: Define JWTPayload interface with all expected claims. Cast verification result.

---

## Resources

- [jsonwebtoken Documentation](https://github.com/auth0/node-jsonwebtoken): JWT library documentation
- [JWT.io](https://jwt.io/): JWT debugger and documentation
- [JWT Auth Provider Pattern](../patterns/mcp-auth-server-base.auth-provider-jwt.md): Project-specific pattern

---

## Notes

- JWT provider is most common authentication method
- Caching is critical for performance (avoid re-verifying every request)
- Cache TTL should be shorter than token expiration
- Error handling must distinguish between expired and invalid tokens
- Template should be easily customizable for different platforms

---

**Next Task**: [Task 32: Create platform-token-resolver.ts Template](task-32-create-token-resolver-template.md)
**Related Design Docs**: [Architecture Design](../design/mcp-auth-server-base.architecture.md), [Security Considerations](../design/mcp-auth-server-base.security-considerations.md)
**Related Patterns**: [JWT Auth Provider Pattern](../patterns/mcp-auth-server-base.auth-provider-jwt.md)
**Estimated Completion Date**: TBD
