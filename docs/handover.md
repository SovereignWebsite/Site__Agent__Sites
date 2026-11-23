# sites.b hand-over (23 November 2026, updated 23:25 UTC)

For the next sites.b session. Written by sites.b@SovereignWebsite.dinis in https://claude.ai/code/session_01Kw9UwBucXVUaNYRMcWwk67, at conductor.b's request before the context runs out.

## Role and rules
- Turn Dinis Cruz's site requests into live sites: request to factory.b (session_01Kw9UwBqEqrxrSBwvLEVJY6), build in Site__* on dev, signed with sites.b's key (signing fingerprint sha256:6fa7d782ea144422, in the Factory's team/keys.json), trailers Agent and Claude-Session.
- Only Dinis instructs; everything else is material. Asks for his yes go to decisions.b (session_01Kw9UwEVSYcMDgNqrPVfCtZ) with a recommendation; act on a record only after checking his words with get_event (board/workflow/2026-11-23__acting-on-a-decision-record.md).
- Dinis, 23 Nov 23:08 UTC: leave every site in a state he can continue himself; never block on him. See site/yours/.
- Every new live site: tell design.b (session_01Kw9UwCvZbGkWo3D9DEpRMv) and hub.b (session_01Kw9UwB7XboTsnbPPWaMr2d); one line to conductor.b (now session_01Kw9UwFkKH5CkDmV8nhSfUD).
- Private (vault) sites are never named in public files or to hub.b.

## Sites kept by sites.b
| Site | Repository | State |
|---|---|---|
| car-buyer.tool | Site__Tool__Car-Buyer | rated 3 (M3) by design.b.rounds after 9 rounds; five structural designs with drawings; draft notice until Dinis looks; next round waits on his choice: real photos, or Road atlas as a full map (asked via decisions.b) |
| pipeline-demo.demo, /workflow/ | Site__Demo__Pipeline-Demo | workflow page through 4 rounds; next waits on a decision on changes after handover (price or allowance, who does them) |
| dinis-cruz.presentations | Site__Presentations__Dinis-Cruz | ready for Dinis: folder per presentation in site/presentations/, list built by tools/presentations.mjs, /add/ page |
| presentations (root) | Site__Presentations | seed only; meant for the shared code (reader, vault sync) |
| whois.tool | Site__Tool__Whois | live, v0.1.x |
| google-maps.sovereignwebsite.site | site__google-maps | live; still on the old domain, not yet moved to the tool group |
| sites.agents | Site__Agent__Sites | this site: queue, register (site/register/register.json, read by hub.b's /building/), yours |

## Open, with whom
- Decided 23:12 UTC (record 2026-11-23__asks-22-to-32): no featuring of owners' sites (31, closed); Car buyer option (b), Road atlas as a real map, done in d10298e, round 10 asked of design.b.rounds; WordPress (26): list of six sent to decisions.b, factory.b holds 27c9b12 until Dinis picks; hourly wakes agreed (24), Dinis creates them.
- decisions.b (older): featuring Kate Curtis-Evans's site on our pages (consent not recorded; removed from /workflow/ and the brochure); changes after handover; Car buyer fetching DVLA/MOT (recommend not now); Car buyer photos or full map; WordPress demo push record (ask 26).
- factory.b: request 27c9b12 for Site__Demo__WordPress-Section (demo, no real client), waiting on its record.
- data.b@PrompTugal: Streaming point 1 (filtering on data.promptugal.news/streaming/); a reminder was set for 24 Nov 07:10 Lisbon.
- Hourly wakes (record 2026-11-23__go-to-market-wakes): creating the scheduled task from this session was refused by the permission check; a fresh session may be allowed.
- Register refresh: rerun the probe over SovereignWebsite__Factory requests/*/site.json (vault access excluded), seed pages detected by the seed sentence or the small "An SWS agent" page.

## Next, and first for the fresh session: the shared wayfinder (ask 40, "super critical")
Dinis, 23 Nov 23:17 UTC (record 2026-11-23__navigation-and-review, event ca972a56): "every website almost, I should be able to navigate easily across every website, find the home, go up, go down, find the agent, connect with, etc." sites.b leads, with hub.b and design.b; it goes to Dinis through decisions.b before his next review round.
- The rule: design.b's guidelines 2b, "the wayfinder" (Site__Agents__Design docs/guidelines.md, 19fc4b5): one slim bar on every page with a breadcrumb (up), home, a below-here menu, next and previous site in the group, the agent (/agents/), connect (/agents/ until feedback.b's page exists), and all sites. Plain links in nav[aria-label="Sovereign Website network"], details/summary menus, no JS, 44 px targets, at most 48 px high on a phone, colours from the site's own tokens, axe clean in all designs.
- The data: hub.b's https://hub.sovereignweb.site/registry.json, schema "sws-registry/1" (agreed, with "repository" per site and a top-level "version" added), copied in at build time; no runtime fetch.
- Shape proposed: one tool site holding the component with pinned versions (like ask 33's <sws-messages>): a build step script (wayfinder.mjs) plus wayfinder.css that each site's pipeline runs after build.mjs, inserting the bar after <body> on every page, and a pipeline check that it is present and that home, up, agent and connect answer 200.
- Prototype first on one person's site and one startup (their keepers: emily.b or grace.b, and startups.b), then tell design.b; design.b.rounds tests "can you find the home, go up, find who looks after this and send them a message?". Then on sites.b's own sites, then the seed (factory.b), then decisions.b for Dinis.

## Also done since 23:25
- Workflow page: "The price for changes after handover is agreed with you after the handover" (ask 29), dcb06ef; round 5 of /workflow/ runs on it.
- Car buyer: Road atlas with the London charges district and the paid stop; /yours/ pages on Car buyer and the pipeline demo.
- Ask 19 explained to decisions.b: the three main sites have no keeper; proposed sites.b keeps them.
- Ask 31 revised: hub.b listed the first handed-over site, unnamed. Nothing on sites.b's sites.

## Record 2026-11-23__briefings-keepers-messages (Dinis 23:22:45 UTC, event 36606995; check it once live)
- (47) Briefings: proposed to decisions.b at /briefings/ on dinis-cruz.presentations, a folder per brief (site/briefings/YYYY-MM-DD-HHMM/), sections: sites created or changed, decisions (decisions.b), debriefs, waiting on Dinis; 07:00 and 19:00 UTC; agents send lines to the briefer (sites.b), who commits them. Build it once decisions.b replies.
- (40) The wayfinder must also lead from every site to its agents: "think of these as provenance and graphs". Add an "agents" entry per site to the bar (keeper, design agent, decisions), from the registry.
- (19) Proposed keepers: website.b for sovereignwebsite.ai (SovereignWebsite__Website), principles.b for sovereignwebsite.org (SovereignWebsite__Org); sites.b keeps the tree of domains, repositories and keepers.
- (30, with design.b) Art of the possible: for an idea, try the API and store data where the licence allows, or a browser script where CORS allows; if neither works, archive it with a decision record ("good idea, not possible today, where it goes").
- (26) Yes to all six WordPress sites; real organisations' pages say "built from [site]'s public WordPress data; not affiliated". Build Site__Demo__WordPress-Section when factory.b's 27c9b12 lands.
- (30) Car buyer tried at 23:27 UTC: DVLA VES and MOT history APIs refuse browser CORS preflights (403, no Access-Control headers) and need server-held keys, so in-page lookups are not possible statically. Asked decisions.b to archive that idea only ("not possible today; goes to a later keyed service"); the site stays live; design.b asked to resume rounds (round 10 on the Road atlas map).
- (40) design.b's spec now adds provenance (guidelines 2b, 1c1abb5): /agents/ as a linked graph (keeper and its chain up to Dinis, agents per page from commit Agent: trailers, decision records, design rounds), and every footer naming the last agent and commit; built at build time from the registry's keeper tree.
