# a.sites: restart (handing over to cl-4.sites@SovereignWebsite.dinis, 25 Nov 2026 18:44 UTC)

Brief for the move: https://github.com/SovereignWebsite/Site__Agent__Maestro__Claude__1/blob/dev/site/factory/dinis-cruz/cl-1/handover/2026-11-25-moves.md

## Who you are
Dinis Cruz's sites agent: take site requests, file them to the Factory (a.factory, becoming cl-1.infra) under the R4 chain, start and supervise one keeper per site, review every site before it is announced, keep provenance, log every request in requests.md. You never build a site in your own session (Dinis, 24 Nov). One-way doors (repositories, publishing a person's site, domains, money, main) stay Dinis's.

## First steps
1. Attach Site__Agent__Sites (this area: site/factory/dinis-cruz/account-a/) and read now.md, requests.md, learnings.md.
2. Make your own signing key (tools/setup-signing.sh), publish it alone first, and mark site/keys/sites.a.json superseded.
3. Clone SovereignWebsite__IaC (public) read-only for requests/ and build/requests.mjs.
4. Message each keeper below with your new session id; they move to cl-4 too, so expect new ids from cl-4's maestro.
5. Check https://sites.agents.sovereignweb.site/pipeline/pipeline.json and https://hub.sovereignweb.site/directory/ against each other.

## Repositories I push to
Site__Agent__Sites only (this area and site/keys/sites.a.json), on dev. My signing worked only from 25 Nov ~18:50 (a fresh key via tools/setup-signing.sh); before that everything was staged in my session and is committed here in one go.

## Keys I hold (ids only, no values)
- Lane vault 5zrg7jjk on dev.send.sgraph.ai (unused; keys sealed to a.maestro's inbox fbefxkfo, 25 Nov 00:12). Retire it or reuse it.
- Vault 3zfyaz2l: never pushed, local copy deleted (see learnings.md incident).
- Old sgit key sha256:e1f58fb2e442cee8: never used (superseded). Live signing key: site/keys/sites.a.json (sha256:f3e02a81763b897e), a session key that ends with this session.

## Scheduled wakes
- "a.sites wake" (trig_01H3cc3ke9ySCHdLQdBWB6Pb), 33 */2 * * *: already disabled since 24 Nov. No others.

## Keepers I started (all account A, all moving to cl-4)
| Keeper | Session | Repository | State |
|---|---|---|---|
| sites-pages.a | session_018yvwtPxpt5EDqNmEgLwpKV | Site__Agent__Sites (pipeline, request, send) | live; inbox lane ttei3vjb; Dinis's QR key issued |
| london-agentics.a | session_018yvwtMVWFdYp42B45qLWiJ | Site__Organisation__Agentics-Foundation__London | live; d8 default, chapter picks; hackathon details "to be confirmed" |
| tauguard.a | session_018yvwtN7yEdELAJzf5qHfEt | Site__Company__TauGuard | live; pick open (Briefing recommended); nothing to TauGuard until Dinis says |
| uk-driving-test.a | session_018yvwtNECHdUKSwpC27FFJg | Site__Tool__UK-Driving-Test | built; https pending; pick open (Quiz first) |
| startup-grants.a | session_018yvwtLncdL4FKwnYNpqFHY | Site__Tool__Startup-Grants | live; pick open (d5 timeline); vault read address waits on Dinis |
| domain-registrars.a | session_018yvwtQDzwZJMsPiQ4p9rSh | Site__Services__Domain-Registrars | built; https pending; pick open (d5 Dashboard); Namecheap manual re-check |
| apple.a | session_018yvwtMgcVvXzU5RNZ7M2Qj | Site__Platform__Apple | built; https pending; pick open (D2 Manual) |
| github-tool.a | session_018yvwtR4jMETPfBD6odJjbR | Site__Tool__GitHub | live, "in review"; real-GitHub run needs Dinis's throwaway token |
| website.a | session_018yvwtP1YZi2CGTZUdSyE8q | SovereignWebsite__Website | live; round 2 (designs 11 to 15) ready for Dinis's pick |
| one-human-nine-agents.a | session_018yvwtNfpegfLMBhUK1FCxb | Site__Author__Dinis__One-Human-Nine-Agents | built; https pending; pick open (The Day) |
| oscar.a | session_018yvwtR6ZF1gnjswENHqA2p | Site__Sport__Padel__Oscar | built; https pending; pick open (Court vs Poster) |
| puter.a | session_018yvwtR4NHV58Q5LtzMcaFQ | Site__Platform__Puter | built; https pending; pick open (Path) |
| nvidia.a | session_018yvwtP7ZD1uKjc4SanYNSh | Site__Platform__NVIDIA | on hold: Dinis to choose a site or a Nemotron page on OpenRouter |

Design reviewer: a.design (session_018yvwtMKHMBUBwQFbXVLVzn), also moving to cl-4.
