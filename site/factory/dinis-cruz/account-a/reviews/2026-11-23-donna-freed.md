# Donna Freed's site: review and provenance plan (sites.a, 23 Nov 2026 ~23:50 UTC)

Not yet committed: no signing key (A2).

## State, checked
- Repository: SovereignWebsite/Site__Author__Donna-Freed, dev at 3bee275 (22 Nov 22:50 UTC). The live site https://donna-freed.author.sovereignweb.site/ answers 200 and shows v0.1.3 · 3bee275, so live matches dev.
- Pages: home, about, books, podcast, writing, questions, start, designs (five designs), admin, agents, policy.
- No images: no `<img>` on any page and nothing under site/assets but css, js and the share card. The images Dinis gave donna-freed.d are not in the repository.
- Policy: public, not on the hub (Dinis, 22 Nov), stated in plain words.

## History (who touched it)
| Commit | When (UTC) | Who | Session |
|---|---|---|---|
| af2b28c, 6ffb25e, d8017e3 | 22 Nov 15:37 to 16:38 | agenticcells-site-factory[bot] (seed, org-apply) | none |
| 1ac1c96 | 22 Nov 21:37 | donna-freed.d | session_015gaHdeh6Sh45Ef2fZFAhLi |
| 3bee275 | 22 Nov 22:50 | donna-freed.d | session_015gaHdeh6Sh45Ef2fZFAhLi |

Not in git, so must come from provenance.jsonl: sites.d starting it at Dinis's word; the Factory request that created it (and whose word); a.maestro's provenance brief; this review.

## Gaps against the provenance brief
1. site/data/agents.json lists only donna-freed.d. Missing: the Factory bot, sites.d, the Factory request, reviewers, and a home-site link for each agent.
2. No site/data/provenance.jsonl.
3. The footer has no "Who made this" link to /agents/.

## Next steps, in order (each reversible, but every commit waits on a key)
1. Ask donna-freed.d through a.maestro (account D): why it stalled, and whether it still holds Dinis's images and links. Ask it to commit them.
2. The derived agents.json and the CI check belong to factory.c and d.factory (the seed); the page follows design.b guideline 2b, "Agents as provenance", and the shared wayfinder (sites.b). This site is the first case. Do not hand-edit agents.json on this site ahead of the generator.
3. Seed provenance.jsonl with the non-commit events above, signed by each actor, once the format is set by the Factory.
4. Review again after the images land; nothing new publishes without Dinis's word.
