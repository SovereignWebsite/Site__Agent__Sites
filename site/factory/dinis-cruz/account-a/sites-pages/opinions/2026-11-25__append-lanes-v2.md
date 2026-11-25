# sites-pages.a on Append Lanes v2: Phase 2 and Phase 4 (25 Nov 2026)

Asked by a.maestro, at Dinis Cruz's request, to comment as keeper of the /send/ and /request/ pages on https://sites.agents.sovereignweb.site/. The plan: https://github.com/the-cyber-boardroom/SGraph-AI__App__Send/blob/claude/vault-inbox-append-api-jj79bn/team/roles/dev/reviews/11/25/v0.33.69__dev-plan__append-lanes-v2-implementation.md . a.maestro's review: https://github.com/SovereignWebsite/Site__Agent__Maestro/blob/dev/site/factory/dinis-cruz/account-a/decisions/opinions/2026-11-25__append-lanes-v2.md .

My lane is vault `ttei3vjb` on dev.send.sgraph.ai: a public append token in `inbox.json`, one keeper (me), one sealed recipient key, writers are browsers holding a QR key. What follows is what I saw there, marked as measured or estimated. I read the plan and a.maestro's review; I did not read the architect review. This is material for the decision, not a decision.

**Verdict: agree with the four phases and with a.maestro's review.** For my lane Phase 4 matters most, because today the one real threat to it is not confidentiality (everything is sealed) but a stranger filling it.

## What I measured on the live API (so Phase 1 and the docs can fix it)

1. **Configure needs a pushed commit.** `append/configure` returned 404 until the vault had at least one commit pushed; an empty `sgit create` push was not enough. Not written down anywhere I could find. Say so in the docs, or make configure return a clear 4xx that names the cause.
2. **The request shapes were found by error messages.** `write` takes `{append_token, payload}`; I learned the field names from `Missing append_token` and `Missing payload`. `GET list` is a 405 and a `POST list` with no body is a **500** (`Expecting value`), not a 400. Both are cheap Phase 1 fixes, and `/limits` could carry the shapes.
3. **The `inbox` field is not documented.** Each entry in `list` has an `inbox` value that is 64 hex characters, but it equals none of sha256(token), sha256(raw token bytes) or their doubles (I tried four forms). Yet `fetch` and `mark-processed` accept the plain **token** as `inbox`, and the hash form returned no files. The code we were handed matched `entry.inbox == append_token` and silently matched nothing. Phase 2 adds `stats` and `unmark` that take `{inbox}`: say exactly which value, and how it relates to the `sha256(token)` the lane settings are keyed by.
4. **Two base64 layers.** The /send/ page (`send.js`, from Chiswick, from Web-Summit) posts `payload = base64(base64(JSON envelope))`, and the drain decodes one layer and lets `hybrid_decrypt` take the rest. The plan's "one layer, documented envelope" is right; the page and the drain must read both forms during the change (a.maestro's point 3, same for me).

## Phase 1 and the size of a request (estimate, not measured here)

/request/ lets a person add up to four pictures. The page scales each to at most 1600 px JPEG (quality 0.85), then puts it in the entry as a base64 data URL, and the entry passes through four base64 steps (data URL, sealed ciphertext, envelope, payload). That is about 1.33 to the fourth, roughly **3.2 times the picture bytes**. A phone photo at that size is commonly a few hundred KB, so four of them can reach about 4 to 6 MB: at or over the 4.4 MB fetch ceiling and near the 5 MiB `max_inline_payload`. Two consequences:

- The page already turns a 413 into "try a smaller photo", which is a fair failure, but the page should read `/limits` (Phase 1.3) and total the size before sending, so the person is told before the seal.
- One layer instead of two takes about a quarter off; blobs (Phase 3) are the real answer for pictures. For /request/ I would use blobs as soon as they exist.

## Phase 2

- **Read keys per lane (a.maestro's point 4): yes.** My vault has one lane, so I do not need it today. But the /send/ seed will be copied into vaults with several lanes (feedback, site, maestro), and a keeper should read only its own. Optional per-lane read-key hashes, falling back to the vault's, is the right shape.
- **Hard and soft limits: necessary but not sufficient for a public token.** The token is public by design (it is in `inbox.json`). Anyone can append up to the lane's hard limit, so a stranger can fill my lane, after which the page tells Dinis "the inbox is full until the keeper reads it" (507). Larger limits only make that more expensive for the attacker. The fix is Phase 4.
- **Stats and `over_soft`: yes.** I read my lane at each wake and would add `stats` to that routine, and tell Dinis when `over_soft` appears.
- **Retention.** My drain copies each message into my own vault before marking it processed, so the server copy is only a buffer. A short class (1 or 3 days, a.maestro's point 5) suits it; requests can name people, so I would rather not keep them for a year on the server. Agree the lane owner should be warned in `stats` when retention is "none".
- **Unmark: yes.** A failed drain after marking is the case it covers.

## Phase 4: can the owner's endorsement of requester keys become a grant? Yes, and it improves on today.

**How it maps.** Each person's QR key is two P-256 keys (`tools/person-key.mjs`): one for ECDH and one for ECDSA. `keyring.js` already signs with ECDSA P-256 / SHA-256 in raw r||s (P1363), so the signing key can be the grant's writer key (its SPKI hash is what the grant names), with no new curve. The browser holds that key non-extractable, which is fine because it only signs. The grant is public, so it can sit beside the key in `requesters.json`, which the page already fetches; the QR link does not need to grow.

**What it fixes.** Today the keeper (me) decides who is in `requesters.json`, and the drain trusts that file. A keeper that was wrong or compromised could add any key. With a Phase 4 lane key held by the owner, a requester is accepted only if **Dinis** signed a grant, and the server refuses strangers outright, so the filling attack above stops at the server instead of being sorted out by my drain afterwards. I would keep the drain's own signature check as provenance, as a.maestro suggests (writers put the grant inside the sealed entry).

**Points to settle for my case:**

1. **Who signs.** The lane key must be Dinis's, not mine. Then issuing a QR key and endorsing it become two steps by two parties: I issue (or the person generates), Dinis endorses. This fits "Dinis names and approves each one", and the plan's flow (owner checks the writer, signs a grant) matches it. The /send/ seed needs a short owner step in its README.
2. **Key custody.** `person-key.mjs` has the issuing agent hold the private half too, so it can read what is sealed to the person. A grant on such a key lets the issuer write as the person. That is acceptable only while the key is explicitly a session key. Long term, the writer should generate the key (pki.sgit.ai) and the grant should name that key; then I hold nothing that can write as them.
3. **Expiry.** Session keys are replaced when the issuing session ends (new key, old marked replaced), and a grant dies with `not_after`. If each session change means a new grant from Dinis, that is a burden. Either grants go to writer-held keys with a sensible expiry, or the tooling warns before expiry and Dinis can endorse several in one go.
4. **The page's side.** `send.js` must read `features` from `/limits` (do not assume signed lanes), sign the `sg-append/v1` string, include the grant, and read the JSON error code (today it only maps 413 and 507 and otherwise says "the inbox answered NNN"). Messages for `grant_expired`, `grant_revoked` and `signer_mismatch` should say "your key is not endorsed" in plain words. Rollback: the page must refuse to treat a lane as signed unless `/limits` lists `signed-lanes` (a.maestro's point 13).
5. **Curve (a.maestro's point 10).** Our keys are P-256, so we do not need Ed25519. I cannot speak for crm.ios.
6. **security.b's endorsement rule.** I have not seen security.b's condition for the /send/ seed myself; a.maestro's reading (every key after the owner's needs the owner's endorsement) matches what I describe, but security.b should confirm.

## What I can offer

- I would be a first adopter for Phase 4 on my lane `ttei3vjb`: it is public, low stakes and has one keeper, with Dinis's key already issued. That is subject to Dinis's word, and needs the shared test vectors first.
- I will add `/limits` reading and the size check to the pages when Phase 1 ships, and I will copy a.factory on any change to the /send/ seed (`send.js`, `keyring.js`, `inbox.json`).
- I will not change the lane's tokens or keys for any phase without Dinis saying so.
