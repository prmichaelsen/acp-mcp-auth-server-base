# Task 32: Create platform-token-resolver.ts Template

**Milestone**: [M3 - Templates and Configuration Files](../milestones/milestone-3-templates-and-files.md)
**Estimated Time**: 3-4 hours
**Dependencies**: [Task 3: Token Resolver Pattern](task-3-create-token-resolver-pattern.md)
**Status**: Not Started

---

## Objective

Create a token resolver template (`templates/src/auth/platform-token-resolver.ts.template`) that fetches user credentials on-demand from the platform API with caching and error handling.

---

## Context

The token resolver is used by dynamic servers to fetch user-specific credentials from the platform. It must:
- Fetch credentials from platform API
- Cache credentials (5-minute TTL)
- Forward platform JWT for authentication
- Handle missing credentials gracefully
- Support multiple credential types

The [Token Resolver Pattern](../patterns/mcp-auth-server-base.token-resolver.md) documents the complete implementation.

---

## Steps

### 1. Review Token Resolver Pattern

Read the [Token Resolver Pattern](../patterns/mcp-auth-server-base.token-resolver.md) to understand:
- Platform API integration
- Credential caching strategy
- JWT forwarding
- Error handling
- Multi-credential support

### 2. Create Template File

Create `templates/src/auth/platform-token-resolver.ts.template`:

```typescript
/**
 * Platform Token Resolver
 * 
 * Fetches user credentials on-demand from {{PLATFORM_NAME}} API.
 * Implements caching for performance (5-minute TTL).
 */

import type { TokenResolver } from '@prmichaelsen/mcp-auth';

interface PlatformCredentials {
  // Define your platform's credential structure
  // Example:
  apiKey?: string;
  accessToken?: string;
  refreshToken?: string;
  // Add platform-specific fields
}

interface CacheEntry {
  credentials: PlatformCredentials;
  expiresAt: number;
}

export class PlatformTokenResolver implements TokenResolver {
  private cache = new Map<string, CacheEntry>();
  private readonly platformUrl: string;
  private readonly serviceToken: string;
  private readonly cacheTTL = 5 * 60 * 1000; // 5 minutes

  constructor(config: {
    platformUrl: string;
    serviceToken: string;
  }) {
    this.platformUrl = config.platformUrl;
    this.serviceToken = config.serviceToken;
  }

  async resolveToken(userId: string, platformToken: string): Promise<Record<string, string>> {
    // Check cache first
    const cached = this.cache.get(userId);
    if (cached && Date.now() < cached.expiresAt) {
      return this.formatCredentials(cached.credentials);
    }

    try {
      // Fetch credentials from platform API
      const response = await fetch(
        `${this.platformUrl}/api/credentials/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${platformToken}`,
            'X-Service-Token': this.serviceToken,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`No credentials found for user ${userId}`);
          return {}; // Graceful degradation
        }
        throw new Error(`Platform API error: ${response.status} ${response.statusText}`);
      }

      const credentials: PlatformCredentials = await response.json();

      // Cache credentials
      this.cache.set(userId, {
        credentials,
        expiresAt: Date.now() + this.cacheTTL,
      });

      // Clean expired cache entries periodically
      this.cleanCache();

      return this.formatCredentials(credentials);
    } catch (error) {
      console.error(`Error fetching credentials for user ${userId}:`, error);
      return {}; // Graceful degradation
    }
  }

  private formatCredentials(credentials: PlatformCredentials): Record<string, string> {
    const formatted: Record<string, string> = {};

    // Map platform credentials to environment variables
    if (credentials.apiKey) {
      formatted.API_KEY = credentials.apiKey;
    }
    if (credentials.accessToken) {
      formatted.ACCESS_TOKEN = credentials.accessToken;
    }
    if (credentials.refreshToken) {
      formatted.REFRESH_TOKEN = credentials.refreshToken;
    }

    // Add platform-specific mappings here

    return formatted;
  }

  private cleanCache(): void {
    const now = Date.now();
    for (const [userId, entry] of this.cache.entries()) {
      if (now >= entry.expiresAt) {
        this.cache.delete(userId);
      }
    }
  }
}
```

### 3. Add Placeholders

Document placeholders:
```typescript
// PLACEHOLDERS:
// {{PLATFORM_NAME}} - Name of your platform
// {{PLATFORM_API_PATH}} - API path for credentials endpoint
// PlatformCredentials interface - Customize for your platform's credential structure
```

### 4. Create Test File

Create `templates/src/auth/platform-token-resolver.test.ts.template`:

```typescript
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PlatformTokenResolver } from './platform-token-resolver.js';

// Mock fetch
global.fetch = jest.fn();

describe('PlatformTokenResolver', () => {
  let resolver: PlatformTokenResolver;
  const platformUrl = 'https://platform.example.com';
  const serviceToken = 'service-token-123';

  beforeEach(() => {
    resolver = new PlatformTokenResolver({ platformUrl, serviceToken });
    jest.clearAllMocks();
  });

  it('should fetch credentials from platform API', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ apiKey: 'user-api-key-123' }),
    });

    const credentials = await resolver.resolveToken('user123', 'platform-jwt');

    expect(credentials).toEqual({ API_KEY: 'user-api-key-123' });
    expect(global.fetch).toHaveBeenCalledWith(
      `${platformUrl}/api/credentials/user123`,
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': 'Bearer platform-jwt',
          'X-Service-Token': serviceToken,
        }),
      })
    );
  });

  it('should cache credentials', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ apiKey: 'user-api-key-123' }),
    });

    // First call
    await resolver.resolveToken('user123', 'platform-jwt');
    // Second call (should use cache)
    await resolver.resolveToken('user123', 'platform-jwt');

    // Fetch should only be called once
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should handle missing credentials gracefully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const credentials = await resolver.resolveToken('user123', 'platform-jwt');

    expect(credentials).toEqual({});
  });

  it('should handle API errors gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const credentials = await resolver.resolveToken('user123', 'platform-jwt');

    expect(credentials).toEqual({});
  });
});
```

### 5. Test Template

Verify the template works:
```bash
# Compile TypeScript
npx tsc templates/src/auth/platform-token-resolver.ts.template --noEmit

# Run tests
npm test platform-token-resolver.test.ts
```

### 6. Cross-Reference with Patterns

Ensure template demonstrates:
- [Token Resolver Pattern](../patterns/mcp-auth-server-base.token-resolver.md)
- [Error Handling Pattern](../patterns/mcp-auth-server-base.error-handling.md)
- [Testing Auth Providers Pattern](../patterns/mcp-auth-server-base.testing-auth-providers.md)

---

## Verification

- [ ] `templates/src/auth/platform-token-resolver.ts.template` file created
- [ ] Implements TokenResolver interface
- [ ] Fetches credentials from platform API
- [ ] Caches credentials with 5-minute TTL
- [ ] Forwards platform JWT for authentication
- [ ] Handles missing credentials gracefully
- [ ] Handles API errors gracefully
- [ ] Cache cleanup mechanism
- [ ] Placeholders documented
- [ ] Test file created
- [ ] Template compiles without errors
- [ ] Tests pass
- [ ] Aligns with Token Resolver Pattern

---

## Expected Output

**Files Created**:
- `templates/src/auth/platform-token-resolver.ts.template`: Token resolver template
- `templates/src/auth/platform-token-resolver.test.ts.template`: Test template

**File Structure**:
```
templates/
└── src/
    ├── index.ts.template (from Task 30)
    └── auth/
        ├── platform-jwt-provider.ts.template (from Task 31)
        ├── platform-jwt-provider.test.ts.template (from Task 31)
        ├── platform-token-resolver.ts.template (new)
        └── platform-token-resolver.test.ts.template (new)
```

**Implementation Features**:
- Platform API integration
- Credential caching (5-minute TTL)
- JWT forwarding for authentication
- Graceful error handling
- Flexible credential mapping
- Comprehensive test coverage

---

## Common Issues and Solutions

### Issue 1: Platform API returns 401

**Symptom**: Unauthorized error when fetching credentials
**Solution**: Verify serviceToken is correct. Ensure platform JWT is valid and forwarded correctly.

### Issue 2: Credentials not found

**Symptom**: 404 errors for user credentials
**Solution**: This is expected for users without credentials. Template handles gracefully by returning empty object.

### Issue 3: Cache not working

**Symptom**: Fetch called on every request
**Solution**: Verify cache key (userId) is consistent. Check cache TTL is reasonable.

---

## Resources

- [Token Resolver Pattern](../patterns/mcp-auth-server-base.token-resolver.md): Complete implementation guide
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API): HTTP request documentation
- [Testing Auth Providers Pattern](../patterns/mcp-auth-server-base.testing-auth-providers.md): Testing strategies

---

## Notes

- Token resolver only needed for dynamic servers
- Caching is critical for performance
- Graceful degradation allows servers to work without credentials
- Platform API must be documented for users
- Template should be customizable for different platforms

---

**Next Task**: [Task 33: Create upload-secrets.ts Script](task-33-create-upload-secrets-script.md)
**Related Design Docs**: [Architecture Design](../design/mcp-auth-server-base.architecture.md)
**Related Patterns**: [Token Resolver Pattern](../patterns/mcp-auth-server-base.token-resolver.md)
**Estimated Completion Date**: TBD
