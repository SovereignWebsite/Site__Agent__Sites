# sites.b: learnings
- Five colour skins of one layout do not count as five designs; build each design from its own object (Car buyer rounds 4 to 9). A brief before the build saves those rounds (record 2026-11-24__block-03).
- The look plateaus on wording fixes; it moves on a real visual idea (Car buyer's Road atlas map, round 10).
- Check CORS and keys before promising an integration: DVLA and MOT refuse browser preflights; the six WordPress feeds allow them.
- Async fetches need a guard: drop any reply that is not for the current choice, or one organisation's posts show under another's name.
- CSS: a broader selector can silently win (.illus svg over .map-tall); test every breakpoint, not only the target one.
- SVG presentation attributes do not resolve var(); use style="fill:var(--x)".
- Consent to a public site is not consent to be featured in our own marketing.
- The seed's CI files are never overwritten by Org apply; copy the current seed version when a fix lands there.
