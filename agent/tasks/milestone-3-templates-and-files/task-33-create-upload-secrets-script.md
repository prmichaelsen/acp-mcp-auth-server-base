# Task 33: Create upload-secrets.ts Script

**Milestone**: [M3 - Templates and Configuration Files](../../milestones/milestone-3-templates-and-files.md)
**Estimated Time**: 3-4 hours
**Dependencies**: [Task 25: Create .env.example](task-25-create-env-example.md)
**Status**: Not Started

---

## Objective

Create a utility script (`templates/scripts/upload-secrets.ts`) that helps users upload environment variables from `.env` file to Google Cloud Secret Manager.

---

## Context

Deploying to Cloud Run requires secrets to be stored in Secret Manager, not in environment variables. This script automates:
- Reading secrets from .env file
- Creating secrets in Secret Manager
- Granting access to Cloud Run service account
- Verifying secret upload

The [Secrets Management Pattern](../../patterns/mcp-auth-server-base.secrets-management.md) documents the approach.

---

## Steps

### 1. Review Secrets Management Pattern

Read the [Secrets Management Pattern](../../patterns/mcp-auth-server-base.secrets-management.md) to understand:
- Secret Manager API usage
- Service account permissions
- Secret naming conventions
- Security best practices

### 2. Create Script File

Create `templates/scripts/upload-secrets.ts`:

```typescript
#!/usr/bin/env node

/**
 * Upload Secrets to Google Cloud Secret Manager
 * 
 * Reads .env file and uploads secrets to Secret Manager.
 * Grants Cloud Run service account access to secrets.
 */

import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { readFileSync, existsSync } from 'fs';
import { parse } from 'dotenv';

const client = new SecretManagerServiceClient();

// Configuration
const PROJECT_ID = process.env.GCP_PROJECT_ID || '{{PROJECT_ID}}';
const ENV_FILE = process.env.ENV_FILE || '.env';

// Secrets to upload (add your secrets here)
const SECRETS_TO_UPLOAD = [
  'PLATFORM_SERVICE_TOKEN',
  'JWT_SECRET',
  // Add more secrets as needed
];

async function createSecret(secretId: string, value: string): Promise<void> {
  const parent = `projects/${PROJECT_ID}`;
  const secretName = `${parent}/secrets/${secretId}`;

  try {
    // Check if secret exists
    await client.getSecret({ name: secretName });
    console.log(`✓ Secret ${secretId} already exists, adding new version...`);
  } catch (error: any) {
    if (error.code === 5) { // NOT_FOUND
      // Create secret
      console.log(`Creating secret ${secretId}...`);
      await client.createSecret({
        parent,
        secretId,
        secret: {
          replication: {
            automatic: {},
          },
        },
      });
      console.log(`✓ Secret ${secretId} created`);
    } else {
      throw error;
    }
  }

  // Add secret version
  await client.addSecretVersion({
    parent: secretName,
    payload: {
      data: Buffer.from(value, 'utf8'),
    },
  });
  console.log(`✓ Secret ${secretId} version added`);
}

async function grantAccess(secretId: string, serviceAccount: string): Promise<void> {
  const secretName = `projects/${PROJECT_ID}/secrets/${secretId}`;

  await client.setIamPolicy({
    resource: secretName,
    policy: {
      bindings: [
        {
          role: 'roles/secretmanager.secretAccessor',
          members: [`serviceAccount:${serviceAccount}`],
        },
      ],
    },
  });
  console.log(`✓ Granted access to ${serviceAccount}`);
}

async function main() {
  console.log('📦 Uploading secrets to Google Cloud Secret Manager...\n');

  // Check if .env file exists
  if (!existsSync(ENV_FILE)) {
    console.error(`Error: ${ENV_FILE} file not found`);
    process.exit(1);
  }

  // Parse .env file
  const envContent = readFileSync(ENV_FILE, 'utf-8');
  const envVars = parse(envContent);

  // Upload each secret
  for (const secretId of SECRETS_TO_UPLOAD) {
    const value = envVars[secretId];
    if (!value) {
      console.warn(`⚠️  Warning: ${secretId} not found in ${ENV_FILE}, skipping...`);
      continue;
    }

    console.log(`\nUploading ${secretId}...`);
    await createSecret(secretId, value);
  }

  console.log('\n✅ All secrets uploaded successfully!');
  console.log('\nNext steps:');
  console.log('1. Grant Cloud Run service account access to secrets');
  console.log('2. Update cloudbuild.yaml to reference secrets');
  console.log('3. Deploy to Cloud Run');
}

main().catch((error) => {
  console.error('Error uploading secrets:', error);
  process.exit(1);
});
```

### 3. Add Usage Documentation

Create README section for the script:
```markdown
## Usage

```bash
# Set your GCP project ID
export GCP_PROJECT_ID=your-project-id

# Upload secrets from .env file
npx tsx scripts/upload-secrets.ts

# Or specify custom .env file
ENV_FILE=.env.production npx tsx scripts/upload-secrets.ts
```

### 4. Create Test Script

Create a test that mocks Secret Manager API:
```typescript
// Mock test for upload-secrets.ts
// Verifies script logic without actual API calls
```

### 5. Test Script

Test the script with a sample .env file:
```bash
# Create test .env
cat > .env.test << 'EOF'
PLATFORM_SERVICE_TOKEN=test-token-123
JWT_SECRET=test-secret-456
EOF

# Run script (dry-run mode if possible)
ENV_FILE=.env.test npx tsx templates/scripts/upload-secrets.ts
```

### 6. Cross-Reference with Patterns

Ensure script aligns with:
- [Secrets Management Pattern](../../patterns/mcp-auth-server-base.secrets-management.md)
- [Environment Configuration Pattern](../../patterns/mcp-auth-server-base.environment-configuration.md)

---

## Verification

- [ ] `templates/scripts/upload-secrets.ts` file created
- [ ] Reads .env file correctly
- [ ] Creates secrets in Secret Manager
- [ ] Adds secret versions
- [ ] Handles existing secrets (adds new version)
- [ ] Handles missing secrets gracefully
- [ ] Error handling for API failures
- [ ] Usage documentation included
- [ ] Script executable (chmod +x)
- [ ] Tested with sample .env file
- [ ] Aligns with Secrets Management Pattern

---

## Expected Output

**File Created**:
- `templates/scripts/upload-secrets.ts`: Secret upload utility

**File Structure**:
```
templates/
├── config/ [5 files]
├── docker/ [2 files]
├── deployment/ [1 file]
├── src/ [3 files]
└── scripts/
    └── upload-secrets.ts (new)
```

**Script Features**:
- Reads .env file
- Creates/updates secrets in Secret Manager
- Configurable secret list
- Error handling and validation
- Progress reporting

---

## Common Issues and Solutions

### Issue 1: Permission denied

**Symptom**: "Permission denied" when creating secrets
**Solution**: Ensure you have `roles/secretmanager.admin` role. Run: `gcloud auth application-default login`

### Issue 2: .env file not found

**Symptom**: Script exits with ".env file not found"
**Solution**: Create .env file or specify custom path with ENV_FILE environment variable.

### Issue 3: Secret already exists error

**Symptom**: Error when secret already exists
**Solution**: Script should handle this by adding new version instead of creating. Verify error handling logic.

---

## Resources

- [Secret Manager Client Library](https://cloud.google.com/secret-manager/docs/reference/libraries): Official client library documentation
- [Secrets Management Pattern](../../patterns/mcp-auth-server-base.secrets-management.md): Project-specific pattern
- [dotenv Documentation](https://github.com/motdotla/dotenv): .env file parsing

---

## Notes

- Script requires @google-cloud/secret-manager dependency
- Must be run with authenticated gcloud credentials
- Secrets are created with automatic replication
- Script should be idempotent (safe to run multiple times)
- Consider adding dry-run mode for testing

---

**Next Task**: [Task 34: Create test-auth.ts Script](task-34-create-test-auth-script.md)
**Related Design Docs**: [Security Considerations](../../design/mcp-auth-server-base.security-considerations.md)
**Related Patterns**: [Secrets Management Pattern](../../patterns/mcp-auth-server-base.secrets-management.md)
**Estimated Completion Date**: TBD
