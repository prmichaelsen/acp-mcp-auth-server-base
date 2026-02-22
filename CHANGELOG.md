# Changelog

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-02-22

### Added
- **@mcp-auth-server-base.init command** - Comprehensive initialization workflow for creating new MCP auth server projects
  - 18-step interactive workflow guiding users through project setup
  - Supports 3 server types: static, static_with_credentials, dynamic
  - Supports 4 auth providers: JWT, OAuth, API Key, Environment
  - Generates complete project structure with 20+ files
  - Includes package.json, TypeScript config, Jest config, esbuild scripts
  - Generates customized source files based on user selections
  - Creates Docker files (development & production multi-stage builds)
  - Generates Cloud Build configuration with secrets management
  - Includes utility scripts for secrets upload and auth testing
  - Initializes git repository with proper .gitignore
  - Creates comprehensive README.md with pattern references
  - 3 complete examples: calculator, Brave Search, GitHub
  - 7 troubleshooting scenarios documented
  - References all 18 patterns from Milestone 1
  - 1517 lines of comprehensive documentation
- **@mcp-auth-server-base.validate command** - Comprehensive project validation system
  - Validation script with 10 validation categories
  - Three validation levels: quick (~30s), standard (~2-3m), full (~5-10m)
  - Color-coded output with success rate percentage
  - Automatic remediation suggestions for failures
  - 900+ line validation script with systematic checks
  - 1100+ line command document with detailed instructions
- **@mcp-auth-server-base.deploy command** - Automated deployment to Google Cloud Run
  - Complete 7-step deployment workflow
  - Pre-deployment validation (gcloud, auth, APIs)
  - Environment selection (dev/staging/production)
  - Docker image build with multi-tagging (SHA, latest, environment)
  - Container Registry push with authentication
  - Cloud Run deployment with full configuration
  - Secrets integration from Secret Manager
  - Deployment verification with health checks
  - Three deployment options: Quick (~2-3m), Full (~5-10m), Cloud Build (~10-15m)
  - Complete configuration options (resources, scaling, access)
  - 4 complete examples (first deploy, update, Cloud Build, multi-region)
  - Rollback procedures (quick, gradual, emergency)
  - 8 troubleshooting scenarios with solutions
  - 1225 lines of comprehensive documentation
- Task 11, 12, and 13 documents for command creation
- Milestone 2 started (Commands and Automation) - 27% complete (3/11 tasks)

### Changed
- Updated to ACP 3.7.1 (from 3.6.0)
- Updated package scripts with bug fixes
- Enhanced progress tracking with Milestone 2 tasks

## [1.0.0] - 2026-02-21

### Added
- Initial release
- Package structure created with full ACP installation
