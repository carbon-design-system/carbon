#!/usr/bin/env node
/* eslint-disable no-console */
// Capture every Carbon React story that exists in both the V11 and V12 Storybooks:
// screenshots, computed styles of every `cds--` element, and a pixel diff.
//
// node capture.mjs                 # incremental: skips stories already captured against the same builds
// node capture.mjs --force         # recapture everything
// node capture.mjs --only button   # only story ids containing "button" (comma-separate several)
// node capture.mjs --limit 20 --concurrency 4
//
// Output (all under compare-data/):
//   meta.json       build fingerprints for each Storybook + run settings
//   manifest.json   story matching: matched pairs, V11-only, V12-only (story and component level)
//   docs.json       V12 Changelog + Feature Flags docs pages, parsed
//   tokens.json     --cds-* custom properties that differ between the two iframe-*.css bundles
//   captures.json   one summary row per captured story: pixel diff, element counts, errors
//   stories/<id>.json  full per-story capture: computed styles for both versions + pixel diff
//   shots/{v11,ibmp,v12,diff}/   (ibmp = Carbon for IBM Products, the "before" for migrated components)

import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const SOURCES = {
  v11: 'https://react.carbondesignsystem.com',
  v12: 'https://v12-react.carbondesignsystem.com',
  // Carbon for IBM Products: the "before" for components that move into @carbon/react in V12.
  ibmp: 'https://ibm-products.carbondesignsystem.com',
};

const DATA = path.resolve(import.meta.dirname, './data');

// Sass token index: plain CSS value → Sass variable name.
// Built by `node compare/sass-index.mjs` after a source-map-enabled Storybook build.
// If the file isn't present the capture falls back to the existing heuristics.
const SASS_INDEX_PATH = path.join(DATA, 'sass-index.json');
const SASS_INDEX = existsSync(SASS_INDEX_PATH)
  ? JSON.parse(readFileSync(SASS_INDEX_PATH, 'utf8'))
  : null;

const VIEWPORT = { width: 1280, height: 800 };
const RENDER_TIMEOUT = 20000;
const SETTLE_MS = 400;
const args = parseArgs(process.argv.slice(2));

// Computed-style properties recorded for every cds-- element.
const PROPS = [
  'display',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-right-radius',
  'border-bottom-left-radius',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'row-gap',
  'column-gap',
  'background-color',
  'background-image',
  'color',
  'border-top-width',
  'border-top-style',
  'border-top-color',
  'border-right-width',
  'border-right-style',
  'border-right-color',
  'border-bottom-width',
  'border-bottom-style',
  'border-bottom-color',
  'border-left-width',
  'border-left-style',
  'border-left-color',
  'box-shadow',
  'font-size',
  'font-weight',
  'line-height',
  'letter-spacing',
  'outline-width',
  'outline-style',
  'outline-color',
  'outline-offset',
];

// Token lookup (see recordAuthored): max elements per story side, and how physical properties
// map to the logical/shorthand declarations that can set them (LTR).
const AUTHORED_MAX = 250;
const SIDE = {
  top: ['block-start', 0],
  right: ['inline-end', 1],
  bottom: ['block-end', 2],
  left: ['inline-start', 3],
};
const CORNER = {
  'top-left': 'start-start',
  'top-right': 'start-end',
  'bottom-right': 'end-end',
  'bottom-left': 'end-start',
};
const INHERITED = new Set([
  'color',
  'font-size',
  'font-weight',
  'line-height',
  'letter-spacing',
]);

const FREEZE_CSS = `
*, *::before, *::after {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  animation-iteration-count: 1 !important;
  transition: none !important;
  caret-color: transparent !important;
  scroll-behavior: auto !important;
}`;

await main();

async function main() {
  await fs.mkdir(path.join(DATA, 'stories'), { recursive: true });
  for (const v of ['v11', 'v12', 'ibmp', 'diff'])
    await fs.mkdir(path.join(DATA, 'shots', v), { recursive: true });

  if (SASS_INDEX)
    log(
      `sass-index.json loaded — ${Object.keys(SASS_INDEX).length} Sass token entries available`
    );
  else
    log(
      'sass-index.json not found — run "yarn compare:sass-index" after "yarn storybook:build:sourcemaps" for full token coverage'
    );

  log('Fetching story manifests…');
  const [idx11, idx12, idxP] = await Promise.all([
    fetchJson(`${SOURCES.v11}/index.json`),
    fetchJson(`${SOURCES.v12}/index.json`),
    fetchJson(`${SOURCES.ibmp}/index.json`),
  ]);

  const manifest = buildManifest(idx11.entries, idx12.entries, idxP.entries);
  await writeJson('manifest.json', manifest);
  log(
    `${manifest.matched.length} matched stories, ${manifest.migrated.length} migrated from IBM Products, ${manifest.onlyV11.stories.length} V11-only, ${manifest.onlyV12.stories.length} V12-only`
  );

  const browser = await chromium.launch();
  try {
    const builds = await fingerprintBuilds(browser, {
      v11: idx11,
      v12: idx12,
      ibmp: idxP,
    });
    const prevMeta = await readJson('meta.json');
    await writeJson('meta.json', {
      capturedAt: new Date().toISOString(),
      viewport: VIEWPORT,
      sources: SOURCES,
      builds,
      props: PROPS,
    });
    await captureDocs(browser);
    const meta = await readJson('meta.json');
    await diffTokens(builds);

    // Every pair compares a "before" (base: V11, or IBM Products for migrated components) with V12.
    let todo = [...manifest.matched, ...manifest.migrated];
    if (args.only) {
      const parts = args.only
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean);
      todo = todo.filter((m) =>
        parts.some((p) => m.v12.includes(p) || m.baseId.includes(p))
      );
    }
    if (args.limit) todo = todo.slice(0, args.limit);

    // Incremental: a story is fresh if it was captured against the same two builds.
    // Changing what gets recorded (PROPS, collectStyles) also invalidates earlier captures.
    const schema = sha(PROPS.join() + collectStyles.toString()).slice(0, 8);
    const keyFor = (base) =>
      `${builds[base].fingerprint}:${builds.v12.fingerprint}:${schema}`;
    const buildKey = `${builds.v11.fingerprint}:${builds.ibmp.fingerprint}:${builds.v12.fingerprint}:${schema}`;

    if (!args.force) {
      const before = todo.length;
      const fresh = [];
      for (const m of todo) {
        const prev = await readJson(path.join('stories', `${m.v12}.json`));
        if (prev?.buildKey === keyFor(m.base) && !prev.error) fresh.push(m.v12);
      }
      todo = todo.filter((m) => !fresh.includes(m.v12));
      if (fresh.length)
        log(
          `Skipping ${fresh.length}/${before} stories already captured against these builds (use --force to redo)`
        );
    }

    if (prevMeta?.buildKey && prevMeta.buildKey !== buildKey)
      log(
        'A Storybook build (or the capture schema) changed since the last run; stories will be recaptured.'
      );

    await writeJson('meta.json', { ...meta, buildKey });
    log(
      `Capturing ${todo.length} stories with concurrency ${args.concurrency}…`
    );

    let done = 0;
    await pool(todo, args.concurrency, browser, async (ctx, m) => {
      const result = await capturePair(ctx, m, keyFor(m.base));
      await writeJson(path.join('stories', `${m.v12}.json`), result);
      done++;
      const pct = result.pixel
        ? `${(result.pixel.ratio * 100).toFixed(2)}% px`
        : 'ERR';
      log(
        `[${done}/${todo.length}] ${m.v12} ${pct}${result.error ? ' ' + result.error : ''}`
      );
    });
  } finally {
    await browser.close();
  }

  await writeSummary(manifest);
  log('Done. Run `node diff.mjs` to build the changelog.');
}

// ---------------------------------------------------------------------------
// Manifest matching
function buildManifest(e11, e12, eP) {
  const stories = (e) => Object.values(e).filter((x) => x.type === 'story');
  const s11 = stories(e11),
    s12 = stories(e12);
  const ids12 = new Set(s12.map((s) => s.id));
  const ids11 = new Set(s11.map((s) => s.id));

  const matched = [];
  const used12 = new Set();
  for (const s of s11) {
    if (ids12.has(s.id)) {
      matched.push(pair(s, e12[s.id], 'exact'));
      used12.add(s.id);
    }
  }

  for (const s of s11) {
    if (ids12.has(s.id)) continue;
    const graduated = s.id.replace(/-feature-flags?--/, '--');
    if (
      graduated !== s.id &&
      ids12.has(graduated) &&
      !ids11.has(graduated) &&
      !used12.has(graduated)
    ) {
      matched.push(pair(s, e12[graduated], 'flag-graduated'));
      used12.add(graduated);
    }
  }

  const matched11 = new Set(matched.map((m) => m.v11));
  const keyOf = (title) =>
    title
      .split('/')
      .pop()
      .replace(/^preview_+/, '')
      .replace(/[^a-z0-9]/gi, '')
      .toLowerCase();
  const sP = stories(eP).filter((x) => !/^deprecated\b/i.test(x.title));
  const pByKey = new Map();
  for (const p of sP) {
    if (!pByKey.has(keyOf(p.title))) pByKey.set(keyOf(p.title), []);
    pByKey.get(keyOf(p.title)).push(p);
  }

  const idsP = new Map(sP.map((p) => [p.id, p]));
  const migrated = [];
  const migratedComponents = new Map();
  const usedP = new Set();

  for (const s of s12) {
    if (used12.has(s.id) || ids11.has(s.id)) continue;
    const tagged = (s.tags ?? []).includes('ibm-products-migrated');
    const candidates = pByKey.get(keyOf(s.title)) ?? [];
    if (!tagged && !candidates.length) continue;
    const comp = componentOf(s.title);
    if (!migratedComponents.has(comp)) {
      migratedComponents.set(comp, {
        component: comp,
        v12Title: s.title,
        ibmpTitles: [...new Set(candidates.map((p) => p.title))],
        tagged,
        matched: 0,
        unmatched: [],
      });
    }
    const mc = migratedComponents.get(comp);
    const p =
      (idsP.has(s.id) && !usedP.has(s.id) ? idsP.get(s.id) : null) ??
      candidates.find(
        (c) => !usedP.has(c.id) && c.name.toLowerCase() === s.name.toLowerCase()
      );
    if (p) {
      usedP.add(p.id);
      used12.add(s.id);
      mc.matched++;
      migrated.push({
        base: 'ibmp',
        baseId: p.id,
        v12: s.id,
        title: s.title,
        name: s.name,
        component: comp,
        match: p.id === s.id ? 'exact' : 'name',
        ibmpTitle: p.title,
      });
    } else {
      mc.unmatched.push({ id: s.id, name: s.name });
    }
  }

  const onlyStories = (list, taken) =>
    list
      .filter((s) => !taken.has(s.id))
      .map((s) => ({ id: s.id, title: s.title, name: s.name }));
  const onlyV11 = onlyStories(s11, matched11);
  const onlyV12 = onlyStories(s12, used12);
  const titles = (e) =>
    new Map(Object.values(e).map((x) => [x.title.toLowerCase(), x.title]));
  const t11 = titles(e11),
    t12 = titles(e12);
  const onlyTitles = (a, b) =>
    [...a.keys()]
      .filter((k) => !b.has(k))
      .map((k) => a.get(k))
      .sort();

  return {
    generatedAt: new Date().toISOString(),
    counts: {
      v11Stories: s11.length,
      v12Stories: s12.length,
      ibmpStories: sP.length,
      matched: matched.length,
      migrated: migrated.length,
    },
    matched: matched.sort((a, b) => a.v12.localeCompare(b.v12)),
    migrated: migrated.sort((a, b) => a.v12.localeCompare(b.v12)),
    migratedComponents: [...migratedComponents.values()].sort((a, b) =>
      a.component.localeCompare(b.component)
    ),
    onlyV11: { titles: onlyTitles(t11, t12), stories: onlyV11 },
    onlyV12: { titles: onlyTitles(t12, t11), stories: onlyV12 },
  };

  function pair(a, b, match) {
    return {
      base: 'v11',
      baseId: a.id,
      v11: a.id,
      v12: b.id,
      title: b.title,
      name: b.name,
      component: componentOf(b.title),
      match,
    };
  }
}

function componentOf(title) {
  const parts = title.split('/');
  return (parts.length > 1 ? parts[1] : parts[0]).trim();
}

// ---------------------------------------------------------------------------
// Build fingerprints
async function fingerprintBuilds(browser, indexes) {
  const out = {};
  const page = await browser.newPage();
  for (const [v, idx] of Object.entries(indexes)) {
    await page.goto(`${SOURCES[v]}/iframe.html`, {
      waitUntil: 'domcontentloaded',
    });
    const css = await page.evaluate(() =>
      [...document.querySelectorAll('link[rel=stylesheet]')]
        .map((l) => l.href)
        .find((h) => /\/assets\/iframe-[^/]+\.css$/.test(h))
    );
    const indexHash = sha(JSON.stringify(idx)).slice(0, 12);
    out[v] = {
      url: SOURCES[v],
      iframeCss: css ?? null,
      indexHash,
      fingerprint: sha(`${indexHash}|${css}`).slice(0, 12),
    };
  }
  await page.close();
  return out;
}

// ---------------------------------------------------------------------------
// Token diff
async function diffTokens(builds) {
  const extract = (css) => {
    const map = {};
    for (const block of css.matchAll(/([^{}]+)\{([^{}]*--cds-[^{}]*)\}/g)) {
      const sel = block[1].trim().replace(/\s+/g, ' ');
      if (sel.length > 120) continue;
      for (const d of block[2].matchAll(/(--cds-[\w-]+)\s*:\s*([^;]+)/g)) {
        (map[d[1]] ??= {})[sel] = d[2].trim();
      }
    }
    return map;
  };
  const texts = {};
  for (const v of ['v11', 'v12']) {
    if (!builds[v].iframeCss) {
      log(`No iframe-*.css found for ${v}; skipping token diff`);
      return;
    }
    texts[v] = await (await fetch(builds[v].iframeCss)).text();
  }
  const t11 = extract(texts.v11),
    t12 = extract(texts.v12);
  const rootValue = (m) =>
    m[':root'] ??
    m[':root,.cds--white'] ??
    m['.cds--white'] ??
    Object.values(m)[0];
  const added = [],
    removed = [],
    changed = [];
  for (const k of Object.keys(t12).sort()) {
    if (!t11[k]) added.push({ token: k, v12: rootValue(t12[k]) });
    else if (rootValue(t11[k]) !== rootValue(t12[k]))
      changed.push({
        token: k,
        v11: rootValue(t11[k]),
        v12: rootValue(t12[k]),
      });
  }
  for (const k of Object.keys(t11).sort())
    if (!t12[k]) removed.push({ token: k, v11: rootValue(t11[k]) });
  await writeJson('tokens.json', {
    source: { v11: builds.v11.iframeCss, v12: builds.v12.iframeCss },
    bytes: { v11: texts.v11.length, v12: texts.v12.length },
    added,
    removed,
    changed,
  });
  log(`Tokens: +${added.length} −${removed.length} ~${changed.length}`);
}

// ---------------------------------------------------------------------------
// V12 docs pages
async function captureDocs(browser) {
  const page = await browser.newPage();
  const open = async (id) => {
    await page.goto(`${SOURCES.v12}/iframe.html?id=${id}&viewMode=docs`, {
      waitUntil: 'load',
    });
    await page.waitForSelector(
      '#storybook-docs .sbdocs-content, #storybook-docs h1',
      { timeout: RENDER_TIMEOUT }
    );
    await page.waitForTimeout(500);
  };
  let changelog = [];
  try {
    await open('getting-started-changelog--changelog');
    const text = await page.locator('#storybook-docs').innerText();
    const dateRe =
      /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/;
    let cur = null;
    for (const line of text
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)) {
      if (dateRe.test(line)) {
        cur = { date: line, text: [] };
        changelog.push(cur);
      } else if (cur) cur.text.push(line);
    }
    changelog = changelog.map((c) => ({
      date: c.date,
      text: c.text.join('\n'),
    }));
  } catch (e) {
    log(`Changelog docs page failed: ${e.message}`);
  }

  let flags = [];
  try {
    await open('getting-started-feature-flags--overview');
    flags = await page.evaluate(() => {
      const table = [
        ...document.querySelectorAll('#storybook-docs table'),
      ].find((t) => /flag/i.test(t.querySelector('th')?.textContent ?? ''));
      if (!table) return [];
      let section = 'current';
      const rows = [];
      for (const tr of table.querySelectorAll('tbody tr')) {
        const cells = [...tr.querySelectorAll('td')].map((td) =>
          td.textContent.trim()
        );
        if (/^deprecated flags$/i.test(cells[0])) {
          section = 'deprecated';
          continue;
        }
        if (!cells[0]) continue;
        rows.push({
          flag: cells[0],
          description: cells[1] ?? '',
          availability: (cells[2] ?? '').split(/,\s*/).filter(Boolean),
          codemod: cells[3] || null,
          section,
        });
      }
      return rows;
    });
  } catch (e) {
    log(`Feature Flags docs page failed: ${e.message}`);
  }

  await page.close();
  await writeJson('docs.json', {
    source: SOURCES.v12,
    changelog: {
      id: 'getting-started-changelog--changelog',
      entries: changelog,
    },
    featureFlags: { id: 'getting-started-feature-flags--overview', flags },
  });
  log(
    `Docs: ${changelog.length} changelog entries, ${flags.length} feature flags`
  );
}

// ---------------------------------------------------------------------------
// Per-story capture
async function capturePair(ctx, m, buildKey) {
  const result = {
    id: m.v12,
    base: m.base,
    baseId: m.baseId,
    v11Id: m.v11 ?? null,
    title: m.title,
    name: m.name,
    component: m.component,
    match: m.match,
    buildKey,
    capturedAt: new Date().toISOString(),
  };
  const prepared = {};
  for (const v of [m.base, 'v12']) {
    try {
      prepared[v] = await prepare(
        ctx[v],
        `${SOURCES[v]}/iframe.html?id=${v === 'v12' ? m.v12 : m.baseId}&viewMode=story`
      );
    } catch (e) {
      result[v] = { error: e.message.split('\n')[0] };
      result.error = `${v}: ${result[v].error}`;
    }
  }
  if (!Object.keys(prepared).length) return result;
  const clip = unionClip(Object.values(prepared).map((p) => p.bounds));
  const shots = {};
  for (const v of Object.keys(prepared)) {
    const { styles, warnings, renamed } = prepared[v];
    try {
      shots[v] = await ctx[v].screenshot({
        clip,
        fullPage: true,
        animations: 'disabled',
        caret: 'hide',
      });
      await fs.writeFile(path.join(DATA, 'shots', v, `${m.v12}`), shots[v]);
    } catch (e) {
      warnings.push(`screenshot failed: ${e.message.split('\n')[0]}`);
    }
    result[v] = {
      clip,
      elementCount: styles.length,
      warnings,
      renamed,
      elements: styles,
    };
  }
  if (shots[m.base] && shots.v12)
    result.pixel = await pixelDiff(
      shots[m.base],
      shots.v12,
      path.join(DATA, 'shots', 'diff', `${m.v12}`)
    );
  if (prepared[m.base] && prepared.v12) {
    try {
      await recordAuthored(
        ctx[m.base],
        ctx.v12,
        prepared[m.base].styles,
        prepared.v12.styles
      );
    } catch (e) {
      result.v12.warnings.push(
        `token lookup failed: ${e.message.split('\n')[0]}`
      );
    }
  }
  return result;
}

async function recordAuthored(pageA, pageB, elsA, elsB) {
  const byKey = new Map(elsA.filter((e) => !e.pseudo).map((e) => [e.key, e]));
  const work = [];
  for (const b of elsB) {
    if (b.pseudo) continue;
    const a = byKey.get(b.key);
    if (!a) continue;
    const props = PROPS.filter(
      (p) => p !== 'display' && a.style[p] !== b.style[p]
    );
    if (props.length) work.push([a, b, props]);
  }
  if (!work.length) return;
  const lookA = await authoredLookup(pageA),
    lookB = await authoredLookup(pageB);
  for (const [a, b, props] of work.slice(0, AUTHORED_MAX)) {
    a.authored = await lookA(a.i, props);
    b.authored = await lookB(b.i, props);
  }
}

async function authoredLookup(page) {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable');
  await cdp.send('CSS.enable');
  const { root } = await cdp.send('DOM.getDocument', { depth: 0 });
  return async (i, props) => {
    const { nodeId } = await cdp.send('DOM.querySelector', {
      nodeId: root.nodeId,
      selector: `[data-cmp-i="${i}"]`,
    });
    if (!nodeId) return null;
    const m = await cdp.send('CSS.getMatchedStylesForNode', { nodeId });
    const out = {};
    for (const p of props) {
      const v = winningValue(m, p);
      if (v != null) out[p] = v;
    }
    return out;
  };
}

function sourcesFor(prop) {
  let m;
  if ((m = prop.match(/^(padding|margin)-(top|right|bottom|left)$/))) {
    const [box, side] = [m[1], m[2]];
    const [logical, idx] = SIDE[side];
    const axis = logical.split('-')[0];
    return [
      [prop, 'whole'],
      [`${box}-${logical}`, 'whole'],
      [`${box}-${axis}`, ['start', 'end'].indexOf(logical.split('-')[1])],
      [box, idx],
    ];
  }
  if (
    (m = prop.match(
      /^border-(top|right|bottom|left)-(left|right)?-?radius$/
    )) ||
    (m = prop.match(
      /^border-(top-left|top-right|bottom-right|bottom-left)-radius$/
    ))
  ) {
    const corner = prop.slice(7, -7);
    return [
      [prop, 'whole'],
      [`border-${CORNER[corner]}-radius`, 'whole'],
      [
        'border-radius',
        ['top-left', 'top-right', 'bottom-right', 'bottom-left'].indexOf(
          corner
        ),
      ],
    ];
  }
  if (
    (m = prop.match(/^border-(top|right|bottom|left)-(width|style|color)$/))
  ) {
    const [side, part] = [m[1], m[2]];
    const [logical, idx] = SIDE[side];
    const axis = logical.split('-')[0];
    return [
      [prop, 'whole'],
      [`border-${logical}-${part}`, 'whole'],
      [`border-${side}`, part],
      [`border-${logical}`, part],
      [`border-${part}`, idx],
      [`border-${axis}-${part}`, 'whole'],
      [`border-${axis}`, part],
      ['border', part],
    ];
  }
  if ((m = prop.match(/^outline-(width|style|color)$/)))
    return [
      [prop, 'whole'],
      ['outline', m[1]],
    ];
  if (prop === 'row-gap')
    return [
      [prop, 'whole'],
      ['gap', 0],
    ];
  if (prop === 'column-gap')
    return [
      [prop, 'whole'],
      ['gap', 1],
    ];
  if (prop === 'background-color' || prop === 'background-image')
    return [
      [prop, 'whole'],
      ['background', 'whole'],
    ];
  if (['font-size', 'font-weight', 'line-height'].includes(prop))
    return [
      [prop, 'whole'],
      ['font', 'whole'],
    ];
  return [[prop, 'whole']];
}

function splitTop(v) {
  const parts = [];
  let depth = 0,
    cur = '';
  for (const ch of v) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (/\s/.test(ch) && depth === 0) {
      if (cur) parts.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (cur) parts.push(cur);
  return parts;
}

function pick(value, how) {
  if (how === 'whole') return value;
  const parts = splitTop(value.split('/')[0].trim());
  if (typeof how === 'number') {
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return parts[how % 2];
    if (parts.length === 3) return parts[[0, 1, 2, 1][how]];
    return parts[how] ?? null;
  }
  const isStyle = (p) =>
    /^(none|hidden|solid|dashed|dotted|double|groove|ridge|inset|outset|auto)$/.test(
      p
    );
  const isWidth = (p) =>
    /^(thin|medium|thick|0|[\d.]+[a-z%]*)$/.test(p) ||
    /^(calc|min|max|clamp)\(/.test(p) ||
    /^var\(--[\w-]*(width|size|thickness)/.test(p);
  if (how === 'style') return parts.find(isStyle) ?? null;
  if (how === 'width') return parts.find(isWidth) ?? null;
  return parts.find((p) => !isStyle(p) && !isWidth(p)) ?? null;
}

function winningValue(matched, prop) {
  const sources = sourcesFor(prop);
  const scan = (rules, inline) => {
    let best = null;
    const consider = (decls, origin) => {
      for (const d of decls ?? []) {
        if (d.disabled || d.parsedOk === false || !d.value) continue;
        if (!d.range && origin !== 'user-agent') continue;
        const src = sources.find(([name]) => name === d.name);
        if (!src) continue;
        const part = pick(d.value.replace(/\s*!important\s*$/, ''), src[1]);
        if (part == null) continue;
        const cand = { value: part, important: !!d.important, origin };
        if (!best || cand.important || !best.important) best = cand;
      }
    };
    for (const r of rules ?? [])
      consider(r.rule.style.cssProperties, r.rule.origin);
    if (inline) consider(inline.cssProperties, 'inline');
    return best;
  };
  let best = scan(matched.matchedCSSRules, matched.inlineStyle);
  if (!best && INHERITED.has(prop)) {
    for (const anc of matched.inherited ?? []) {
      best = scan(anc.matchedCSSRules, anc.inlineStyle);
      if (best) {
        best.inherited = true;
        break;
      }
    }
  }
  if (!best) return null;
  if (best.origin === 'user-agent') return `ua:${best.value}`;

  // If the winning value is a plain literal (no var()), try to resolve it to a
  // Sass variable name via the sass-index built from source maps. This fills in
  // tokens like $border-radius-04 that compile to plain numbers and can't be
  // traced via var(--cds-*).
  const v = best.value.trim();
  if (SASS_INDEX && !v.startsWith('var(') && SASS_INDEX[v.toLowerCase()]) {
    return `__sass:${SASS_INDEX[v.toLowerCase()]}:${v}`;
  }

  return v;
}

function unionClip(boundsList) {
  const pad = 16;
  const b = boundsList.reduce((u, x) => ({
    minX: Math.min(u.minX, x.minX),
    minY: Math.min(u.minY, x.minY),
    maxX: Math.max(u.maxX, x.maxX),
    maxY: Math.max(u.maxY, x.maxY),
    docW: Math.min(u.docW, x.docW),
    docH: Math.min(u.docH, x.docH),
  }));
  const x = Math.max(0, Math.floor(b.minX - pad)),
    y = Math.max(0, Math.floor(b.minY - pad));
  return {
    x,
    y,
    width: Math.max(1, Math.min(b.docW, Math.ceil(b.maxX + pad)) - x),
    height: Math.max(1, Math.min(b.docH, Math.ceil(b.maxY + pad)) - y),
  };
}

async function prepare(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: RENDER_TIMEOUT * 2 });
  await page.addStyleTag({ content: FREEZE_CSS });
  await page.waitForFunction(
    () => {
      const root = document.querySelector('#storybook-root');
      return (
        document.body.classList.contains('sb-show-errordisplay') ||
        (root && root.childElementCount > 0)
      );
    },
    null,
    { timeout: RENDER_TIMEOUT }
  );
  if (
    await page.evaluate(() =>
      document.body.classList.contains('sb-show-errordisplay')
    )
  ) {
    const msg = await page
      .locator('#error-message')
      .innerText()
      .catch(() => 'story failed to render');
    throw new Error(`Storybook error: ${msg.trim().slice(0, 200)}`);
  }
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images]
        .filter((i) => !i.complete)
        .map(
          (i) =>
            new Promise((r) => {
              i.onload = i.onerror = r;
            })
        )
    );
    document.getAnimations?.().forEach((a) => {
      try {
        a.finish();
      } catch {
        a.cancel();
      }
    });
    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(r))
    );
  });
  await page.waitForTimeout(SETTLE_MS);
  await page.mouse.move(0, 0);
  return page.evaluate(collectStyles, PROPS);
}

// Runs in the page.
function collectStyles(PROPS) {
  const warnings = [];
  let renamed = 0;
  const cdsClasses = (el) =>
    [...el.classList]
      .filter((c) => c.startsWith('cds--') || c.startsWith('c4p--'))
      .map((c) => c.replace(/^c4p--/, 'cds--'))
      .sort();
  const segment = (el) => {
    const cls = cdsClasses(el);
    return el.tagName.toLowerCase() + (cls.length ? '.' + cls.join('.') : '');
  };
  const pathOf = (el) => {
    const parts = [];
    for (
      let n = el;
      n && n !== document.body && n.nodeType === 1;
      n = n.parentElement
    ) {
      if (n.id === 'storybook-root') {
        parts.push('#root');
        break;
      }
      const sig = segment(n);
      let i = 0;
      for (let s = n.previousElementSibling; s; s = s.previousElementSibling)
        if (segment(s) === sig) i++;
      parts.push(i ? `${sig}:${i}` : sig);
    }
    return parts.reverse().join(' > ');
  };
  const els = [
    ...document.querySelectorAll('[class*="cds--"], [class*="c4p--"]'),
  ].filter((el) => cdsClasses(el).length);
  for (const el of els)
    if ([...el.classList].some((c) => c.startsWith('c4p--'))) renamed++;
  const out = [];
  const seen = new Map();
  els.forEach((el, i) => el.setAttribute('data-cmp-i', String(i)));
  for (const [i, el] of els.entries()) {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const visible =
      cs.display !== 'none' &&
      cs.visibility !== 'hidden' &&
      r.width > 0 &&
      r.height > 0;
    const classes = cdsClasses(el);
    let key = `${classes.join('.')} @ ${pathOf(el)}`;
    const dup = seen.get(key) ?? 0;
    seen.set(key, dup + 1);
    if (dup) key += ` #${dup}`;
    const style = {};
    for (const p of PROPS) style[p] = cs.getPropertyValue(p);
    style.width = +r.width.toFixed(2) + 'px';
    style.height = +r.height.toFixed(2) + 'px';
    out.push({
      key,
      i,
      tag: el.tagName.toLowerCase(),
      classes,
      visible,
      text: (el.textContent || '').trim().slice(0, 60),
      style,
    });
    for (const pseudo of ['::before', '::after']) {
      const ps = getComputedStyle(el, pseudo);
      if (ps.content === 'none' || ps.display === 'none') continue;
      const pstyle = {};
      for (const p of PROPS) pstyle[p] = ps.getPropertyValue(p);
      pstyle.width = ps.width;
      pstyle.height = ps.height;
      out.push({
        key: key + pseudo,
        tag: el.tagName.toLowerCase() + pseudo,
        classes,
        pseudo,
        visible,
        text: '',
        style: pstyle,
      });
    }
  }
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  const grow = (r) => {
    if (r.width < 1 || r.height < 1) return;
    minX = Math.min(minX, r.left + scrollX);
    minY = Math.min(minY, r.top + scrollY);
    maxX = Math.max(maxX, r.right + scrollX);
    maxY = Math.max(maxY, r.bottom + scrollY);
  };
  const REPLACED = new Set([
    'IMG',
    'SVG',
    'svg',
    'CANVAS',
    'VIDEO',
    'INPUT',
    'TEXTAREA',
    'SELECT',
    'IFRAME',
    'HR',
  ]);
  const paints = (el, cs) =>
    REPLACED.has(el.tagName) ||
    (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
      cs.backgroundColor !== 'transparent') ||
    cs.backgroundImage !== 'none' ||
    cs.boxShadow !== 'none' ||
    ['Top', 'Right', 'Bottom', 'Left'].some(
      (s) =>
        parseFloat(cs[`border${s}Width`]) > 0 &&
        cs[`border${s}Style`] !== 'none'
    );
  const clipped = (el) =>
    el.closest(
      '.cds--visually-hidden, .cds--assistive-text, [aria-hidden="true"][hidden]'
    );
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
  );
  const range = document.createRange();
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n.nodeType === 3) {
      if (!n.textContent.trim() || !n.parentElement || clipped(n.parentElement))
        continue;
      const pcs = getComputedStyle(n.parentElement);
      if (pcs.visibility === 'hidden' || pcs.opacity === '0') continue;
      range.selectNodeContents(n);
      for (const r of range.getClientRects()) grow(r);
    } else {
      if (n.tagName === 'SCRIPT' || n.tagName === 'STYLE' || clipped(n))
        continue;
      const cs = getComputedStyle(n);
      if (
        cs.display === 'none' ||
        cs.visibility === 'hidden' ||
        cs.opacity === '0'
      )
        continue;
      if (n === document.body || n.id === 'storybook-root' || n.id === 'root')
        continue;
      if (paints(n, cs)) grow(n.getBoundingClientRect());
    }
  }
  if (!isFinite(minX)) {
    warnings.push('no painted content; using viewport');
    minX = 0;
    minY = 0;
    maxX = innerWidth;
    maxY = innerHeight;
  }
  if (!out.length) warnings.push('no cds-- elements found');
  const bounds = {
    minX,
    minY,
    maxX,
    maxY,
    docW: Math.max(document.documentElement.scrollWidth, innerWidth),
    docH: Math.max(document.documentElement.scrollHeight, innerHeight),
  };
  return { styles: out, bounds, warnings, renamed };
}

async function pixelDiff(buf11, buf12, outPath) {
  const a = PNG.sync.read(buf11),
    b = PNG.sync.read(buf12);
  const width = Math.max(a.width, b.width),
    height = Math.max(a.height, b.height);
  const A = padTo(a, width, height),
    B = padTo(b, width, height);
  const out = new PNG({ width, height });
  const diffPixels = pixelmatch(A.data, B.data, out.data, width, height, {
    threshold: 0.1,
    includeAA: false,
  });
  await fs.writeFile(outPath, PNG.sync.write(out));
  return {
    diffPixels,
    totalPixels: width * height,
    ratio: +(diffPixels / (width * height)).toFixed(5),
    size: { before: [a.width, a.height], v12: [b.width, b.height] },
    sizeChanged: a.width !== b.width || a.height !== b.height,
  };
}

function padTo(png, w, h) {
  if (png.width === w && png.height === h) return png;
  const out = new PNG({ width: w, height: h });
  out.data.fill(255);
  PNG.bitblt(png, out, 0, 0, png.width, png.height, 0, 0);
  return out;
}

async function writeSummary(manifest) {
  const rows = [];
  for (const m of [...manifest.matched, ...manifest.migrated]) {
    const s = await readJson(path.join('stories', `${m.v12}.json`));
    if (!s) continue;
    rows.push({
      id: s.id,
      v11Id: s.v11Id,
      title: s.title,
      name: s.name,
      component: s.component,
      match: s.match,
      capturedAt: s.capturedAt,
      error: s.error ?? null,
      elements: {
        before: s[s.base ?? 'v11']?.elementCount ?? null,
        v12: s.v12?.elementCount ?? null,
      },
      pixel: s.pixel ?? null,
      base: s.base ?? 'v11',
      baseId: s.baseId ?? s.v11Id,
      shots: {
        before: `shots/${s.base ?? 'v11'}/${s.id}`,
        v12: `shots/v12/${s.id}`,
        diff: `shots/diff/${s.id}`,
      },
    });
  }
  await writeJson('captures.json', {
    generatedAt: new Date().toISOString(),
    count: rows.length,
    stories: rows,
  });
  const errs = rows.filter((r) => r.error).length;
  log(`captures.json: ${rows.length} stories (${errs} with errors)`);
}

// ---------------------------------------------------------------------------
async function pool(items, n, browser, fn) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      const opts = {
        viewport: VIEWPORT,
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
        colorScheme: 'light',
        locale: 'en-US',
        timezoneId: 'UTC',
      };
      const c11 = await browser.newContext(opts),
        c12 = await browser.newContext(opts),
        cP = await browser.newContext(opts);
      const ctx = {
        v11: await c11.newPage(),
        v12: await c12.newPage(),
        ibmp: await cP.newPage(),
      };
      try {
        while (queue.length) await fn(ctx, queue.shift());
      } finally {
        await c11.close();
        await c12.close();
        await cP.close();
      }
    })
  );
}

async function fetchJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  return r.json();
}
async function readJson(rel) {
  const p = path.join(DATA, rel);
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(await fs.readFile(p, 'utf8'));
  } catch {
    return null;
  }
}
async function writeJson(rel, obj) {
  await fs.writeFile(path.join(DATA, rel), JSON.stringify(obj, null, 1) + '\n');
}
function sha(s) {
  return createHash('sha256').update(s).digest('hex');
}
function log(...a) {
  console.log(`[capture] ${a.join(' ')}`);
}
function parseArgs(argv) {
  const o = { force: false, only: null, limit: 0, concurrency: 4 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--force') o.force = true;
    else if (a === '--only') o.only = argv[++i];
    else if (a === '--limit') o.limit = +argv[++i];
    else if (a === '--concurrency') o.concurrency = Math.max(1, +argv[++i]);
    else {
      console.error(`Unknown argument: ${a}`);
      process.exit(1);
    }
  }
  return o;
}
