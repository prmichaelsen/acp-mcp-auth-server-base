# Task 15: Create @mcp-auth-server-base.logs Command

**Milestone**: Milestone 2 - Commands and Automation
**Estimated Time**: 2-3 hours
**Dependencies**: Task 13 (deploy)
**Status**: Not Started
**Priority**: MEDIUM - Useful for debugging

---

## Objective

Create the `@mcp-auth-server-base.logs` command that fetches and displays logs from a deployed Cloud Run service. This command helps users debug and monitor their MCP auth server in production.

---

## Context

After deployment, users need to view logs to debug issues and monitor their service. The logs command provides easy access to Cloud Run logs without requiring users to navigate the Cloud Console or remember gcloud commands.

---

## Steps

### 1. Review Cloud Run Logging

**Actions**:
- Understand Cloud Run logging
- Review gcloud logging commands
- Understand log filtering
- Review log severity levels

**Expected Outcome**: Understanding of Cloud Run logs

### 2. Create Command File

**Actions**:
- Create `agent/commands/mcp-auth-server-base.logs.md`
- Use ACP command template
- Set namespace: `mcp-auth-server-base`
- Set command name: `logs`

**Expected Outcome**: Command file created

### 3. Define Log Fetching Workflow

**Actions**:
Design workflow:

1. **Identify Service**
   - Get service name from user or config
   - Verify service exists
   - Get service region

2. **Fetch Logs**
   - Use `gcloud run services logs read`
   - Fetch recent logs (default: last 100 lines)
   - Support pagination

3. **Filter Logs**
   - By severity (INFO, WARNING, ERROR)
   - By time range
   - By search term

4. **Display Logs**
   - Format for readability
   - Color-code by severity
   - Show timestamps

**Expected Outcome**: Workflow defined

### 4. Add Filtering Options

**Actions**:
Document filter options:
- `--severity`: Filter by log level
- `--limit`: Number of log entries
- `--since`: Time range (e.g., "1h", "30m")
- `--search`: Search term
- `--follow`: Tail logs (note: beta feature)

**Expected Outcome**: Filtering options documented

### 5. Add Examples

**Actions**:
Create 3 examples:
1. View recent logs
2. Filter by error severity
3. Search for specific term

**Expected Outcome**: Examples documented

### 6. Add Troubleshooting

**Actions**:
Document issues:
1. Service not found
2. Permission denied
3. No logs available
4. gcloud not authenticated

**Expected Outcome**: Troubleshooting complete

### 7. Reference Patterns

**Actions**:
- Link to Cloud Run deployment pattern
- Link to logging pattern

**Expected Outcome**: Patterns referenced

### 8. Update Package Metadata

**Actions**:
- Update package.yaml
- Update progress.yaml

**Expected Outcome**: Metadata updated

---

## Verification

- [ ] Command file created
- [ ] Workflow documented
- [ ] Filtering options defined
- [ ] 3 examples provided
- [ ] Troubleshooting complete
- [ ] Patterns referenced
- [ ] package.yaml updated
- [ ] progress.yaml updated

---

## Expected Output

### Files Created
- `agent/commands/mcp-auth-server-base.logs.md` (500-700 lines)

---

## Success Criteria

- [ ] Command is 500-700 lines
- [ ] Workflow is clear
- [ ] Filtering options documented
- [ ] Examples cover common scenarios
- [ ] Read-only operation (no modifications)

---

## Related Patterns

- [`mcp-auth-server-base.cloud-run-deployment`](../patterns/mcp-auth-server-base.cloud-run-deployment.md)
- [`mcp-auth-server-base.logging`](../patterns/mcp-auth-server-base.logging.md)

---

## Notes

- Read-only command (no modifications)
- Note that log streaming is a beta feature
- Provide clear formatting for readability
- Support common filtering use cases
- Document gcloud requirements

---

**Next Task**: task-16-generate-dockerfile-command.md
**Blockers**: None
