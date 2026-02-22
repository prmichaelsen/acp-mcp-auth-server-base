#!/usr/bin/env tsx
/**
 * Test Authentication Configuration
 * 
 * This script generates test JWT tokens and validates authentication setup.
 * Useful for testing auth providers locally before deployment.
 * 
 * Usage:
 *   npm run test-auth
 *   tsx scripts/test-auth.ts
 */

import jwt from 'jsonwebtoken';
import { createJwtProvider } from '../src/auth/platform-jwt-provider.js';

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
const JWT_ISSUER = process.env.JWT_ISSUER || 'test-platform';
const JWT_AUDIENCE = process.env.JWT_AUDIENCE || 'mcp-server';
const TEST_USER_ID = process.env.TEST_USER_ID || 'test-user-123';

/**
 * Generate a test JWT token
 */
function generateTestToken(userId: string): string {
  return jwt.sign(
    {
      sub: userId,
      iss: JWT_ISSUER,
      aud: JWT_AUDIENCE,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    },
    JWT_SECRET
  );
}

/**
 * Test authentication provider
 */
async function testAuthProvider(token: string) {
  console.log('Testing authentication provider...\n');

  try {
    const provider = createJwtProvider();
    const result = await provider.authenticate(token);

    console.log('✅ Authentication successful!');
    console.log(`User ID: ${result.userId}`);
    if (result.metadata) {
      console.log(`Metadata:`, JSON.stringify(result.metadata, null, 2));
    }
    return true;
  } catch (error) {
    console.error('✗ Authentication failed:', error);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🔐 Testing Authentication Configuration\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Display configuration
  console.log('Configuration:');
  console.log(`  JWT_SECRET: ${JWT_SECRET.substring(0, 10)}...`);
  console.log(`  JWT_ISSUER: ${JWT_ISSUER}`);
  console.log(`  JWT_AUDIENCE: ${JWT_AUDIENCE}`);
  console.log(`  TEST_USER_ID: ${TEST_USER_ID}\n`);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Generate test token
  console.log('Generating test JWT token...\n');
  const token = generateTestToken(TEST_USER_ID);
  console.log(`Token: ${token.substring(0, 50)}...\n`);

  // Decode token (without verification)
  const decoded = jwt.decode(token);
  console.log('Decoded token:');
  console.log(JSON.stringify(decoded, null, 2));
  console.log();

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Test authentication
  const success = await testAuthProvider(token);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (success) {
    console.log('✅ Authentication test passed!');
    console.log('\nYou can use this token to test your server:');
    console.log(`Authorization: Bearer ${token}\n`);
    process.exit(0);
  } else {
    console.log('✗ Authentication test failed!');
    console.log('\nCheck your JWT_SECRET and provider configuration.\n');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Test failed:', error);
  process.exit(1);
});
