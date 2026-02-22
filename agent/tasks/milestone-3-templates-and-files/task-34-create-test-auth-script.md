# Task 34: Create test-auth.ts Script

**Milestone**: [M3 - Templates and Configuration Files](../../milestones/milestone-3-templates-and-files.md)
**Estimated Time**: 2-3 hours
**Dependencies**: [Task 31: Create JWT Provider Template](task-31-create-jwt-provider-template.md)
**Status**: Not Started

---

## Objective

Create a utility script (`templates/scripts/test-auth.ts`) that helps users test their authentication configuration locally before deploying.

---

## Context

Testing authentication locally is critical before deployment. This script:
- Tests JWT token verification
- Tests platform API connectivity
- Tests credential fetching
- Validates environment configuration
- Provides clear error messages

---

## Steps

### 1. Review Testing Patterns

Read the [Testing Auth Providers Pattern](../../patterns/mcp-auth-server-base.testing-auth-providers.md) to understand:
- Auth provider testing strategies
- Mock vs real API testing
- Error scenario testing

### 2. Create Script File

Create `templates/scripts/test-auth.ts`:

```typescript
#!/usr/bin/env node

/**
 * Test Authentication Configuration
 * 
 * Tests JWT verification, platform API connectivity, and credential fetching.
 */

import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

// Load environment variables
config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ISSUER = process.env.JWT_ISSUER || 'your-platform';
const JWT_AUDIENCE = process.env.JWT_AUDIENCE || 'mcp-server';
const PLATFORM_URL = process.env.PLATFORM_URL;
const PLATFORM_SERVICE_TOKEN = process.env.PLATFORM_SERVICE_TOKEN;

async function testJWTVerification() {
  console.log('\n🔐 Testing JWT Verification...');

  if (!JWT_SECRET) {
    console.error('❌ JWT_SECRET not configured');
    return false;
  }

  try {
    // Create test token
    const testToken = jwt.sign(
      { sub: 'test-user-123' },
      JWT_SECRET,
      { issuer: JWT_ISSUER, audience: JWT_AUDIENCE, expiresIn: '1h' }
    );

    // Verify token
    const payload = jwt.verify(testToken, JWT_SECRET, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });

    console.log('✅ JWT verification working');
    console.log('   Payload:', payload);
    return true;
  } catch (error) {
    console.error('❌ JWT verification failed:', error);
    return false;
  }
}

async function testPlatformAPI() {
  console.log('\n🌐 Testing Platform API Connectivity...');

  if (!PLATFORM_URL) {
    console.warn('⚠️  PLATFORM_URL not configured (OK for static servers)');
    return true;
  }

  if (!PLATFORM_SERVICE_TOKEN) {
    console.error('❌ PLATFORM_SERVICE_TOKEN not configured');
    return false;
  }

  try {
    // Test platform API health
    const response = await fetch(`${PLATFORM_URL}/health`, {
      headers: {
        'X-Service-Token': PLATFORM_SERVICE_TOKEN,
      },
    });

    if (response.ok) {
      console.log('✅ Platform API reachable');
      return true;
    } else {
      console.error(`❌ Platform API returned ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Platform API unreachable:', error);
    return false;
  }
}

async function testCredentialFetching() {
  console.log('\n🔑 Testing Credential Fetching...');

  if (!PLATFORM_URL || !PLATFORM_SERVICE_TOKEN) {
    console.warn('⚠️  Platform not configured (OK for static servers)');
    return true;
  }

  try {
    // Create test JWT
    const testToken = jwt.sign(
      { sub: 'test-user-123' },
      JWT_SECRET!,
      { issuer: JWT_ISSUER, audience: JWT_AUDIENCE, expiresIn: '1h' }
    );

    // Test credential fetch
    const response = await fetch(
      `${PLATFORM_URL}/api/credentials/test-user-123`,
      {
        headers: {
          'Authorization': `Bearer ${testToken}`,
          'X-Service-Token': PLATFORM_SERVICE_TOKEN,
        },
      }
    );

    if (response.ok) {
      const credentials = await response.json();
      console.log('✅ Credential fetching working');
      console.log('   Credentials:', Object.keys(credentials));
      return true;
    } else if (response.status === 404) {
      console.log('⚠️  No credentials found for test user (this is OK)');
      return true;
    } else {
      console.error(`❌ Credential fetch failed: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Credential fetching failed:', error);
    return false;
  }
}

async function main() {
  console.log('🧪 Testing Authentication Configuration\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const results = {
    jwt: await testJWTVerification(),
    platform: await testPlatformAPI(),
    credentials: await testCredentialFetching(),
  };

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n📊 Test Results:');
  console.log(`   JWT Verification: ${results.jwt ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Platform API: ${results.platform ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Credential Fetching: ${results.credentials ? '✅ PASS' : '❌ FAIL'}`);

  const allPassed = Object.values(results).every(r => r);
  if (allPassed) {
    console.log('\n✅ All tests passed! Authentication is configured correctly.');
    process.exit(0);
  } else {
    console.log('\n❌ Some tests failed. Check configuration and try again.');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error running tests:', error);
  process.exit(1);
});
```

### 3. Add Usage Documentation

Document how to use the script:
```markdown
## Usage

```bash
# Load environment variables and run tests
npx tsx scripts/test-auth.ts

# Or with custom .env file
ENV_FILE=.env.production npx tsx scripts/test-auth.ts
```

### 4. Test Script

Verify the script works:
```bash
# Create test .env
cat > .env.test << 'EOF'
JWT_SECRET=test-secret
JWT_ISSUER=test-platform
JWT_AUDIENCE=mcp-server
PLATFORM_URL=https://platform.example.com
PLATFORM_SERVICE_TOKEN=test-token
EOF

# Run test script
ENV_FILE=.env.test npx tsx templates/scripts/test-auth.ts
```

### 5. Cross-Reference with Patterns

Ensure script demonstrates:
- [JWT Auth Provider Pattern](../../patterns/mcp-auth-server-base.auth-provider-jwt.md)
- [Token Resolver Pattern](../../patterns/mcp-auth-server-base.token-resolver.md)
- [Testing Auth Providers Pattern](../../patterns/mcp-auth-server-base.testing-auth-providers.md)

---

## Verification

- [ ] `templates/scripts/test-auth.ts` file created
- [ ] Tests JWT verification
- [ ] Tests platform API connectivity
- [ ] Tests credential fetching
- [ ] Handles missing configuration gracefully
- [ ] Clear success/failure reporting
- [ ] Usage documentation included
- [ ] Script executable (chmod +x)
- [ ] Tested with sample configuration
- [ ] Aligns with Testing Auth Providers Pattern

---

## Expected Output

**File Created**:
- `templates/scripts/test-auth.ts`: Authentication testing utility

**File Structure**:
```
templates/
└── scripts/
    ├── upload-secrets.ts (from Task 33)
    └── test-auth.ts (new)
```

**Test Coverage**:
- JWT token creation and verification
- Platform API health check
- Credential fetching from platform
- Configuration validation

---

## Common Issues and Solutions

### Issue 1: JWT_SECRET not set

**Symptom**: Script reports "JWT_SECRET not configured"
**Solution**: Add JWT_SECRET to .env file. Generate a strong secret: `openssl rand -base64 32`

### Issue 2: Platform API unreachable

**Symptom**: "Platform API unreachable" error
**Solution**: Verify PLATFORM_URL is correct. Check network connectivity. Verify platform is running.

### Issue 3: Credential fetch returns 401

**Symptom**: Unauthorized error when fetching credentials
**Solution**: Verify PLATFORM_SERVICE_TOKEN is correct. Ensure platform accepts the token.

---

## Resources

- [jsonwebtoken Documentation](https://github.com/auth0/node-jsonwebtoken): JWT library
- [dotenv Documentation](https://github.com/motdotla/dotenv): Environment variable loading
- [Testing Auth Providers Pattern](../../patterns/mcp-auth-server-base.testing-auth-providers.md): Testing strategies

---

## Notes

- Script helps catch configuration errors before deployment
- Should be run before first deployment
- Can be integrated into CI/CD pipeline
- Provides clear feedback for debugging
- Safe to run multiple times

---

**Next Task**: [Task 35: Create package.json Template](task-35-create-package-json-template.md)
**Related Design Docs**: [Security Considerations](../../design/mcp-auth-server-base.security-considerations.md)
**Related Patterns**: [Testing Auth Providers Pattern](../../patterns/mcp-auth-server-base.testing-auth-providers.md)
**Estimated Completion Date**: TBD
