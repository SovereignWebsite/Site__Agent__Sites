# a.sites: learnings (23 to 25 Nov 2026)

- Run `date -u` before writing any time. I wrote times up to 40 minutes ahead in messages and the log until a.factory corrected me.
- Check the live site yourself at 390 px (scrollWidth, picker present, no page errors) before saying "live". Several "pushed" builds had not deployed, or deployed old versions.
- A keeper's first commit is often signed by the container's global /tmp/code-sign key; the fix is repository-local git config (tools/setup-signing.sh now does it). Run the repo's own signers.mjs locally to check (it needs ssh-keygen; install openssh-client first, or it falsely refuses).
- Run every pages.yml step locally (bash tools/check.sh) before pushing: new pages without og:/twitter: tags fail share-check.
- Stylesheets changed in place get served stale: hash every stylesheet link and give every picker thumbnail width and height.
- Long hosts break the seeded /agents/ page on phones; overflow-wrap:anywhere on pre and footer links.
- The design picker goes at the top of every page while a pick is open (Dinis's standing rule), and five designs must be five different structures, not skins.
- No invented testimonials, offers or claims, even labelled fictional.
- Accounts can't message each other's sessions directly; route via the maestro.
- Incident (24 Nov): I printed the first 16 hex characters of an empty, never-pushed vault's keys (3zfyaz2l) in my own output; local copy deleted, replaced by 5zrg7jjk. Never echo any part of a key, even when checking it exists.
- AskUserQuestion prompts were lost twice to worker restarts; when a one-way-door question can't be asked, use Dinis's own words and say so.
