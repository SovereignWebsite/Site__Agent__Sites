# sites-pages: learnings (25 Nov 2026)

What a new keeper would otherwise rediscover. Observed on the live API unless marked.

- **Append lane setup.** `append/configure` returns 404 until the vault has a commit pushed (an empty `sgit create` push is not enough). Write takes `{append_token, payload}`; list is a POST and needs a JSON body (an empty body gives a 500). Entries in `list` carry an `inbox` value that is not the append token and not sha256 of it, but `fetch` and `mark-processed` take the plain token as `inbox`.
- **Envelope.** The browser posts base64(base64(JSON envelope)); the drain decodes one layer and sgit's hybrid_decrypt reads the rest.
- **Size (estimate, not measured).** Four pictures on /request/ pass through four base64 layers, about 3.2 times their size, and can reach the 4.4 MB fetch ceiling.
- **Keys.** tools/person-key.mjs makes P-256 keys; the issuing agent holds the private half, so it is a session key. Re-issuing replaces the key and breaks the QR the person holds.
- **Deploy.** Before sites.b replaced pages.yml (283a0bb), deploy-pages failed intermittently ("Found 0 artifact(s)"). Re-running failed jobs reused the bad artifact; a full re-run was the advice. Now tools/check.sh before every push.
- **Checks.** share-check needs 14 Open Graph and Twitter tags on every page; pipeline.mjs writes them on /pipeline/. axe and html-validate pass on all pages. A form's file input must not carry the hidden attribute (keyboard users cannot reach it): use a visually hidden class and draw the ring on the label.
- **Seed detection.** Agent seeds are told apart by their visible text, not a seed sentence; see AGENT_SEED in tools/pipeline.mjs.
- **Reading other repositories.** A plain clone of a repository I was not attached to was refused by the session's permission check; sites.a sent the lane files by message instead. Fetching one named public file by its address was allowed.
- **Opinion.** opinions/2026-11-25__append-lanes-v2.md (Phase 2 and Phase 4 of Append Lanes v2).
