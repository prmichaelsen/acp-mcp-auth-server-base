# Task 29: Create cloudbuild.yaml Template

**Milestone**: [M3 - Templates and Configuration Files](../milestones/milestone-3-templates-and-files.md)
**Estimated Time**: 3-4 hours
**Dependencies**: [Task 28: Create Dockerfile.production](task-28-create-dockerfile-production.md)
**Status**: Not Started

---

## Objective

Create a Cloud Build configuration template (`templates/deployment/cloudbuild.yaml`) with placeholders for automated CI/CD pipeline including build, test, and deployment to Cloud Run.

---

## Context

Cloud Build automates the deployment pipeline. The configuration must:
- Build Docker image using Dockerfile.production
- Run tests before deployment
- Push image to Artifact Registry
- Deploy to Cloud Run with secrets
- Support multiple environments (dev, staging, prod)
- Use substitution variables for flexibility

The [Cloud Build Pattern](../patterns/mcp-auth-server-base.cloud-build.md) documents the complete approach.

---

## Steps

### 1. Review Cloud Build Pattern

Read the [Cloud Build Pattern](../patterns/mcp-auth-server-base.cloud-build.md) to understand:
- Build step structure
- Secret management with Secret Manager
- Deployment configuration
- Substitution variables
- Testing integration

### 2. Create Template File

Create `templates/deployment/cloudbuild.yaml`:

```yaml
# Cloud Build Configuration for MCP Auth Server
# Substitution variables (provided by trigger or command line):
#   _SERVICE_NAME: Name of the Cloud Run service
#   _REGION: GCP region (e.g., us-central1)
#   _PROJECT_ID: GCP project ID
#   _IMAGE_NAME: Docker image name

steps:
  # Step 1: Install dependencies
  - name: 'node:20-alpine'
    entrypoint: 'npm'
    args: ['ci']
    id: 'install-dependencies'

  # Step 2: Run tests
  - name: 'node:20-alpine'
    entrypoint: 'npm'
    args: ['test']
    id: 'run-tests'
    waitFor: ['install-dependencies']

  # Step 3: Build TypeScript
  - name: 'node:20-alpine'
    entrypoint: 'npm'
    args: ['run', 'build']
    id: 'build-typescript'
    waitFor: ['run-tests']

  # Step 4: Build Docker image
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-f'
      - 'Dockerfile.production'
      - '-t'
      - '${_REGION}-docker.pkg.dev/${_PROJECT_ID}/${_IMAGE_NAME}/${_SERVICE_NAME}:$COMMIT_SHA'
      - '-t'
      - '${_REGION}-docker.pkg.dev/${_PROJECT_ID}/${_IMAGE_NAME}/${_SERVICE_NAME}:latest'
      - '.'
    id: 'build-docker-image'
    waitFor: ['build-typescript']

  # Step 5: Push Docker image
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - '${_REGION}-docker.pkg.dev/${_PROJECT_ID}/${_IMAGE_NAME}/${_SERVICE_NAME}:$COMMIT_SHA'
    id: 'push-docker-image'
    waitFor: ['build-docker-image']

  # Step 6: Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: 'gcloud'
    args:
      - 'run'
      - 'deploy'
      - '${_SERVICE_NAME}'
      - '--image=${_REGION}-docker.pkg.dev/${_PROJECT_ID}/${_IMAGE_NAME}/${_SERVICE_NAME}:$COMMIT_SHA'
      - '--region=${_REGION}'
      - '--platform=managed'
      - '--allow-unauthenticated'
      - '--set-env-vars=NODE_ENV=production'
      - '--set-secrets=PLATFORM_SERVICE_TOKEN=platform-service-token:latest'
      - '--set-secrets=JWT_SECRET=jwt-secret:latest'
      - '--memory=512Mi'
      - '--cpu=1'
      - '--min-instances=0'
      - '--max-instances=10'
      - '--timeout=300'
    id: 'deploy-to-cloud-run'
    waitFor: ['push-docker-image']

# Substitution variables with defaults
substitutions:
  _SERVICE_NAME: 'mcp-auth-server'
  _REGION: 'us-central1'
  _PROJECT_ID: '{{PROJECT_ID}}'
  _IMAGE_NAME: 'mcp-servers'

# Build configuration
options:
  machineType: 'N1_HIGHCPU_8'
  logging: 'CLOUD_LOGGING_ONLY'
  
# Build timeout
timeout: '1200s'
```

### 3. Add Placeholder Documentation

Document all placeholders in comments:
```yaml
# PLACEHOLDERS TO REPLACE:
# {{PROJECT_ID}} - Your GCP project ID
# 
# SUBSTITUTION VARIABLES (can be overridden):
# _SERVICE_NAME - Cloud Run service name
# _REGION - GCP region for deployment
# _IMAGE_NAME - Artifact Registry repository name
```

### 4. Create Environment Variants

Consider creating variants for different environments:
- `cloudbuild.yaml` - Production
- `cloudbuild.dev.yaml` - Development
- `cloudbuild.staging.yaml` - Staging

Or use substitution variables to handle all environments.

### 5. Test Configuration

Validate the Cloud Build configuration:
```bash
# Validate syntax
gcloud builds submit --config=templates/deployment/cloudbuild.yaml --no-source --dry-run

# Test with substitutions
gcloud builds submit \
  --config=templates/deployment/cloudbuild.yaml \
  --substitutions=_SERVICE_NAME=test-service,_PROJECT_ID=my-project
```

### 6. Document Secret Configuration

Add comments explaining secret setup:
```yaml
# SECRETS CONFIGURATION:
# Before deployment, create secrets in Secret Manager:
#   gcloud secrets create platform-service-token --data-file=- <<< "your-token"
#   gcloud secrets create jwt-secret --data-file=- <<< "your-secret"
# 
# Grant Cloud Run service account access:
#   gcloud secrets add-iam-policy-binding platform-service-token \
#     --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com \
#     --role=roles/secretmanager.secretAccessor
```

### 7. Cross-Reference with Patterns

Ensure configuration aligns with:
- [Cloud Build Pattern](../patterns/mcp-auth-server-base.cloud-build.md)
- [Cloud Run Deployment Pattern](../patterns/mcp-auth-server-base.cloud-run-deployment.md)
- [Secrets Management Pattern](../patterns/mcp-auth-server-base.secrets-management.md)

---

## Verification

- [ ] `templates/deployment/cloudbuild.yaml` file created
- [ ] Multi-stage Docker build configured
- [ ] Test step included before build
- [ ] Image pushed to Artifact Registry
- [ ] Cloud Run deployment configured
- [ ] Secrets mounted from Secret Manager
- [ ] Substitution variables documented
- [ ] Placeholders clearly marked
- [ ] Configuration validates with gcloud
- [ ] Aligns with Cloud Build Pattern
- [ ] Security best practices followed

---

## Expected Output

**File Created**:
- `templates/deployment/cloudbuild.yaml`: Cloud Build configuration template

**File Structure**:
```
templates/
├── config/
│   └── [5 config files from Tasks 22-26]
├── docker/
│   ├── Dockerfile.development (from Task 27)
│   └── Dockerfile.production (from Task 28)
└── deployment/
    └── cloudbuild.yaml (new)
```

**Build Pipeline Steps**:
1. Install dependencies
2. Run tests
3. Build TypeScript
4. Build Docker image
5. Push to Artifact Registry
6. Deploy to Cloud Run

**Configuration Features**:
- Automated testing before deployment
- Multi-stage Docker builds
- Secret Manager integration
- Substitution variables for flexibility
- Cloud Run deployment with scaling

---

## Common Issues and Solutions

### Issue 1: Build fails at test step

**Symptom**: Tests fail, build stops
**Solution**: This is expected behavior. Fix tests before deploying. To skip tests temporarily, comment out the test step.

### Issue 2: Secret not found

**Symptom**: "Secret not found" error during deployment
**Solution**: Create secrets in Secret Manager first. Grant service account access. See [Secrets Management Pattern](../patterns/mcp-auth-server-base.secrets-management.md).

### Issue 3: Image push fails

**Symptom**: "Permission denied" when pushing to Artifact Registry
**Solution**: Enable Artifact Registry API. Create repository. Grant Cloud Build service account push permissions.

### Issue 4: Substitution variable not replaced

**Symptom**: Literal `${_SERVICE_NAME}` appears in deployment
**Solution**: Provide substitution variables via `--substitutions` flag or configure in trigger.

---

## Resources

- [Cloud Build Configuration](https://cloud.google.com/build/docs/build-config-file-schema): Official schema documentation
- [Cloud Build Substitutions](https://cloud.google.com/build/docs/configuring-builds/substitute-variable-values): Variable substitution guide
- [Cloud Run Deployment](https://cloud.google.com/run/docs/deploying): Deployment documentation
- [Cloud Build Pattern](../patterns/mcp-auth-server-base.cloud-build.md): Project-specific pattern

---

## Notes

- Cloud Build configuration is critical for automated deployments
- Substitution variables make configuration reusable
- Testing before deployment prevents bad deployments
- Secret Manager integration is more secure than environment variables
- Configuration can be triggered manually or via git push
- Build timeout set to 20 minutes (sufficient for most builds)

---

**Next Task**: [Task 30: Create src/index.ts Template](task-30-create-index-template.md)
**Related Design Docs**: [Architecture Design](../design/mcp-auth-server-base.architecture.md), [Security Considerations](../design/mcp-auth-server-base.security-considerations.md)
**Related Patterns**: [Cloud Build Pattern](../patterns/mcp-auth-server-base.cloud-build.md), [Secrets Management Pattern](../patterns/mcp-auth-server-base.secrets-management.md)
**Estimated Completion Date**: TBD
