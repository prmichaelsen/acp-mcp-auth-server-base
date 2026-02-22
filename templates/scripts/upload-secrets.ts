#!/usr/bin/env tsx
/**
 * Upload Secrets to Google Cloud Secret Manager
 * 
 * This script reads secrets from .env file and uploads them to Secret Manager.
 * Secrets are named with the pattern: {service-name}-{secret-name}
 * 
 * Usage:
 *   npm run upload-secrets
 *   tsx scripts/upload-secrets.ts
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Configuration
const SERVICE_NAME = process.env.SERVICE_NAME || '{{SERVICE_NAME}}';
const ENV_FILE = process.env.ENV_FILE || '.env';

// Parse .env file
function parseEnvFile(filePath: string): Record<string, string> {
  const content = readFileSync(filePath, 'utf-8');
  const vars: Record<string, string> = {};

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      vars[key.trim()] = valueParts.join('=').trim();
    }
  }

  return vars;
}

// Upload secret to Secret Manager
function uploadSecret(secretName: string, secretValue: string) {
  console.log(`Uploading secret: ${secretName}`);

  try {
    // Check if secret exists
    try {
      execSync(`gcloud secrets describe ${secretName}`, { stdio: 'ignore' });
      // Secret exists, add new version
      execSync(`echo -n "${secretValue}" | gcloud secrets versions add ${secretName} --data-file=-`, {
        stdio: 'inherit',
      });
      console.log(`✓ Updated ${secretName}`);
    } catch {
      // Secret doesn't exist, create it
      execSync(`echo -n "${secretValue}" | gcloud secrets create ${secretName} --data-file=-`, {
        stdio: 'inherit',
      });
      console.log(`✓ Created ${secretName}`);
    }
  } catch (error) {
    console.error(`✗ Failed to upload ${secretName}:`, error);
    throw error;
  }
}

// Main function
async function main() {
  console.log('📤 Uploading Secrets to Google Cloud Secret Manager\n');

  // Parse .env file
  const envPath = resolve(process.cwd(), ENV_FILE);
  console.log(`Reading secrets from: ${envPath}\n`);

  let envVars: Record<string, string>;
  try {
    envVars = parseEnvFile(envPath);
  } catch (error) {
    console.error(`Failed to read ${ENV_FILE}:`, error);
    process.exit(1);
  }

  // Secrets to upload (exclude non-secret variables)
  const secretKeys = [
    'PLATFORM_SERVICE_TOKEN',
    'JWT_SECRET',
    'API_KEYS',
    'OAUTH_CLIENT_SECRET',
    'DATABASE_URL',
    // Add more secret keys as needed
  ];

  let uploadedCount = 0;
  let skippedCount = 0;

  for (const key of secretKeys) {
    const value = envVars[key];
    if (!value || value.includes('your-') || value.includes('example')) {
      console.log(`⊘ Skipping ${key} (not set or placeholder value)`);
      skippedCount++;
      continue;
    }

    const secretName = `${SERVICE_NAME}-${key.toLowerCase().replace(/_/g, '-')}`;
    
    try {
      uploadSecret(secretName, value);
      uploadedCount++;
    } catch (error) {
      console.error(`Failed to upload ${key}`);
    }
  }

  console.log(`\n✅ Upload complete!`);
  console.log(`Uploaded: ${uploadedCount} secrets`);
  console.log(`Skipped: ${skippedCount} secrets`);

  console.log(`\nNext steps:`);
  console.log(`1. Grant Cloud Run service account access to secrets`);
  console.log(`2. Update Cloud Run deployment to mount secrets`);
  console.log(`3. Deploy your service`);
}

main().catch((error) => {
  console.error('Upload failed:', error);
  process.exit(1);
});
