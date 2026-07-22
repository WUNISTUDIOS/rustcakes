# Claude Code – Project Instructions

## Figma MCP Check (run at session start)

At the start of every session, check whether the `figma-desktop` MCP tools are available.

- If Figma tools **are** available: proceed normally.
- If Figma tools **are not** available: immediately tell the user:
  > "The Figma MCP isn't connected. Please open the Figma desktop app, select your frame in Dev Mode, then restart this Claude Code session."

Do not wait for the user to discover this — surface it proactively at the top of the first response.

## Resuming Work

The next planned feature is **blocked dates on the order form date picker** (Google Sheets integration). The full plan is saved in memory — to resume, just say:

> "let's implement the blocked dates feature"

Before starting you'll need:
1. A Google Sheet with confirmed pickup dates in column A (format: `YYYY-MM-DD`), shared publicly
2. A free Google Sheets API key from [console.cloud.google.com](https://console.cloud.google.com) with the Sheets API enabled
3. Your Sheet ID (the long string in the spreadsheet URL)

## Planned Features (not yet implemented)

- **Blocked dates on the order form date picker** — Google Sheets integration; fetch booked pickup dates from a public sheet and disable them in the native date input. See "Resuming Work" above for prerequisites.
- **Cake gallery on the home page** — ✅ Done. 16 images from `public/cakesNoBG/` displayed full-width below the hero logo.
