# Claude Code – Project Instructions

## Figma MCP Check (run at session start)

At the start of every session, check whether the `figma-desktop` MCP tools are available.

- If Figma tools **are** available: proceed normally.
- If Figma tools **are not** available: immediately tell the user:
  > "The Figma MCP isn't connected. Please open the Figma desktop app, select your frame in Dev Mode, then restart this Claude Code session."

Do not wait for the user to discover this — surface it proactively at the top of the first response.
