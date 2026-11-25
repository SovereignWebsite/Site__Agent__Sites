#!/usr/bin/env node
// The site pipeline: every site request and where it stands, from the Factory's own data (sites.a, 24 Nov 2026, at
// Dinis Cruz's word: "a site that I can see the current pipeline and ask for new site").
//
//   node tools/pipeline.mjs <path to a SovereignWebsite__IaC clone with origin fetched>
//
// Reads requests/*/site.json on the clone's checked-out dev (and on every origin work/* branch not yet merged), names
// each repository and address with the Factory's own build/requests.mjs (so the names cannot drift), then checks each
// one live: does the repository exist (git ls-remote), does the address answer, is it still the seed page.
// Writes site/pipeline/pipeline.json and site/pipeline/index.html. No script on the page; no secret is read or printed.
// Private (vault) sites are left out, by name and by count.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const IAC = resolve(process.argv[2] || '');
if (!existsSync(join(IAC, 'build/requests.mjs'))) { console.error('usage: node tools/pipeline.mjs <SovereignWebsite__IaC clone>'); process.exit(1); }
const F = await import(pathToFileURL(join(IAC, 'build/requests.mjs')).href);
const git = (...a) => execFileSync('git', a, { cwd: IAC, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
const SEED = 'This site was made by one request to the Sovereign Website pipeline.';
// The agent seed (seed/agent-template/site/index.html) has no seed sentence: it is told by its visible text plus the key block (sites.a, 25 Nov 2026).
const AGENT_SEED = ["A Sovereign Website (SWS) agent's own site; this agent keeps it.", 'An SWS agent', 'Reading key.json'];
const isSeed = (t) => t.includes(SEED) || AGENT_SEED.every((x) => t.includes(x));
const ORG = 'https://github.com/SovereignWebsite';

// 1. Requests on dev.
const { requests } = F.load(join(IAC, 'requests'));
const onDev = new Set(requests.map((r) => r.folder));
const rows = requests.map((r) => ({ ...r, branch: 'dev' }));

// 2. Requests on work/* branches, not yet on dev: the ones waiting on a decision or a merge.
let branches = [];
try { branches = git('for-each-ref', '--format=%(refname:short)', 'refs/remotes/origin/work/').split('\n').filter(Boolean); } catch { }
for (const b of branches) {
  let files = [];
  try { files = git('ls-tree', '--name-only', '-r', b, 'requests/').split('\n').filter((f) => /^requests\/[^/]+\/site\.json$/.test(f)); } catch { continue; }
  for (const f of files) {
    const folder = f.split('/')[1];
    if (onDev.has(folder) || rows.some((x) => x.folder === folder)) continue;
    try {
      const req = JSON.parse(git('show', `${b}:${f}`));
      if (F.validate(req, folder).length) continue;
      // The same site asked on two branches is one request: keep the newest.
      const same = rows.findIndex((x) => F.host(x) === F.host(req));
      if (same >= 0) { if (rows[same].branch === 'dev' || rows[same].folder >= folder) continue; rows.splice(same, 1); }
      rows.push({ ...req, folder, branch: b.replace(/^origin\//, '') });
    } catch { }
  }
}

// 3. Live checks.
const repoExists = (name) => { try { execFileSync('git', ['ls-remote', '--exit-code', `${ORG}/${name}`, 'HEAD'], { stdio: 'ignore', timeout: 20000, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } }); return true; } catch { return false; } };
async function page(host) {
  try {
    const r = await fetch(`https://${host}/`, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
    const t = r.ok ? await r.text() : '';
    return { code: r.status, seed: isSeed(t) };
  } catch { return { code: 0, seed: false }; }
}
const hidden = rows.filter((r) => r.access === 'vault').length;
const pub = rows.filter((r) => r.access !== 'vault');
const out = [];
for (let i = 0; i < pub.length; i += 8) {
  out.push(...await Promise.all(pub.slice(i, i + 8).map(async (r) => {
    const name = F.repoName(r), host = F.host(r);
    const repo = r.branch === 'dev' ? repoExists(name) : false;
    const p = repo ? await page(host) : { code: 0, seed: false };
    const stage = r.branch !== 'dev' ? 'asked' : !repo ? 'approved' : p.code !== 200 ? 'building' : p.seed ? 'seeded' : 'live';
    return { stage, folder: r.folder, date: r.folder.slice(0, 10), label: r.label, group: r.group || '', title: r.title, kind: r.kind, repository: name, address: host, branch: r.branch, http: p.code };
  })));
}
const ORDER = ['asked', 'approved', 'building', 'seeded', 'live'];
out.sort((a, b) => ORDER.indexOf(a.stage) - ORDER.indexOf(b.stage) || b.date.localeCompare(a.date) || a.label.localeCompare(b.label));
const checked = new Date().toISOString().replace(/:\d\d\.\d+Z$/, 'Z');
const iacHead = git('rev-parse', '--short', 'HEAD');
const count = Object.fromEntries(ORDER.map((s) => [s, out.filter((r) => r.stage === s).length]));
const data = { schema: 'sws-pipeline/1', made_by: 'sites-pages.a@SovereignWebsite.dinis', checked, source: `SovereignWebsite__IaC dev ${iacHead} and its work/* branches`, private_left_out: hidden, count, sites: out };
mkdirSync(join(ROOT, 'site/pipeline'), { recursive: true });
writeFileSync(join(ROOT, 'site/pipeline/pipeline.json'), JSON.stringify(data, null, 1) + '\n');

// 4. The page.
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const STAGES = {
  asked: ['Asked', 'A request on a Factory branch, waiting on its review chain and a decision.'],
  approved: ['Approved', 'Merged in the Factory; the repository is made at the next Org apply run.'],
  building: ['Building', 'The repository exists; the address does not answer yet (Pages and DNS).'],
  seeded: ['Seeded', 'The address answers with the Factory\'s starter page; the keeper has not built it yet.'],
  live: ['Live', 'Built by its keeper and answering.'],
};
const section = (s) => {
  const list = out.filter((r) => r.stage === s); if (!list.length) return '';
  return `<h2 id="${s}">${STAGES[s][0]} <span class="n">${list.length}</span></h2>\n<p>${STAGES[s][1]}</p>\n<div class="tbl"><table><thead><tr><th>Site</th><th>Address</th><th>Repository</th><th>Asked</th></tr></thead><tbody>\n${list.map((r) => `<tr><td><strong>${esc(r.title)}</strong><br><span class="k">${esc(r.group || 'no group')} · ${esc(r.kind)}${r.branch !== 'dev' ? ` · on ${esc(r.branch)}` : ''}</span></td><td>${s === 'live' || s === 'seeded' ? `<a href="https://${esc(r.address)}/">${esc(r.address)}</a>` : esc(r.address)}</td><td>${s === 'asked' || s === 'approved' ? esc(r.repository) : `<a href="${ORG}/${esc(r.repository)}">${esc(r.repository)}</a>`}</td><td>${esc(r.date)}</td></tr>`).join('\n')}\n</tbody></table></div>`;
};
const html = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Site pipeline</title>
<meta name="description" content="Every Sovereign Website request and where it stands: asked, approved, building, seeded or live.">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'none'">
<style>
:root{--bg:#f7f7f5;--fg:#1d1d1b;--muted:#5f5f5a;--line:#deded8;--card:#fff;--accent:#0b5cad}
@media (prefers-color-scheme:dark){:root{--bg:#141413;--fg:#ededea;--muted:#a8a8a2;--line:#33332f;--card:#1c1c1a;--accent:#7ab8ff}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:17px/1.6 system-ui,sans-serif}
main{max-width:56rem;margin:0 auto;padding:8vh 1rem 4rem}.mark{font:600 .78rem/1 system-ui;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
h1{font-size:clamp(1.9rem,6vw,2.8rem);line-height:1.1;margin:.6rem 0 1rem}p{color:var(--muted)}a{color:var(--accent)}
h2{font-size:1.25rem;margin:2.6rem 0 .2rem}.n{font-weight:400;color:var(--muted)}
.flow{display:flex;flex-wrap:wrap;gap:.4rem;margin:1.5rem 0;padding:0;list-style:none}
.flow li{flex:1 1 8rem;padding:.7rem .8rem;border:1px solid var(--line);border-radius:10px;background:var(--card);margin:0}
.flow a{text-decoration:none;color:var(--fg)}.flow b{display:block;font-size:1.6rem;line-height:1.1}.flow span{font-size:.85rem;color:var(--muted)}
.cta{margin-top:1.5rem;padding:1rem 1.2rem;border:1px solid var(--line);border-radius:10px;background:var(--card)}
table{width:100%;border-collapse:collapse;font-size:.92rem}td,th{text-align:left;padding:.45rem .6rem .45rem 0;border-bottom:1px solid var(--line);vertical-align:top}th{color:var(--fg)}td{color:var(--muted);overflow-wrap:anywhere}td strong{color:var(--fg)}.k{font-size:.82rem}.tbl{overflow-x:auto}
footer{margin-top:3rem;font-size:.85rem;color:var(--muted)}
</style>
</head>
<body>
<main>
<div class="mark"><a href="../">sites</a> / pipeline</div>
<h1>Site pipeline</h1>
<p>Every site request in the Sovereign Website Factory and where it stands, checked ${esc(checked.replace('T', ' ').replace('Z', ' UTC'))} from ${esc(data.source)}.${hidden ? ` ${hidden} private site${hidden > 1 ? 's are' : ' is'} left out.` : ''}</p>
<ol class="flow">
${ORDER.map((s) => `<li><a href="#${s}"><b>${count[s]}</b>${STAGES[s][0]}</a><br><span>${STAGES[s][1].split(';')[0].split(':')[0]}</span></li>`).join('\n')}
</ol>
<div class="cta"><strong>Want a site?</strong> Ask on <a href="../request/">the request page</a> with your QR key. Your request joins this list as soon as a sites agent files it.</div>
${ORDER.map(section).join('\n')}
<footer>Made by <code>tools/pipeline.mjs</code> from the Factory's own request files and build/requests.mjs; the machine-readable list is <a href="pipeline.json">pipeline.json</a>. A machine check, not a review.</footer>
</main>
</body>
</html>
`;
writeFileSync(join(ROOT, 'site/pipeline/index.html'), html);
console.log(`pipeline: ${out.length} public requests (${ORDER.map((s) => `${s} ${count[s]}`).join(', ')}), ${hidden} private left out`);
