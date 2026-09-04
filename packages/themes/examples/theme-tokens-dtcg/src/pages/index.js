/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  themes,
  buttonTokens,
  tagTokens,
  notificationTokens,
  statusTokens,
  contentSwitcherTokens,
} from '../../../../src';
import { TokenFormat, group, set as tokenSet } from '../../../../src/tokens';
import * as componentGroups from '../../../../src/tokens/components';

import themesJson from '../../../../src/dtcg/themes.json';
import buttonJson from '../../../../src/dtcg/components/button.json';
import contentSwitcherJson from '../../../../src/dtcg/components/content-switcher.json';
import notificationJson from '../../../../src/dtcg/components/notification.json';
import statusJson from '../../../../src/dtcg/components/status.json';
import tagJson from '../../../../src/dtcg/components/tag.json';

// ─── Component token lookup ───────────────────────────────────────────────────

const COMP_TOKENS = Object.assign(
  {},
  buttonTokens,
  tagTokens,
  notificationTokens,
  statusTokens,
  contentSwitcherTokens
);
const THEME_KEY = { white: 'whiteTheme', g10: 'g10', g90: 'g90', g100: 'g100' };

// ─── DTCG flatten helpers ─────────────────────────────────────────────────────

function flattenThemesDtcg(obj, theme, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const name = prefix ? `${prefix}-${key}` : key;
    if (
      val &&
      typeof val === 'object' &&
      '$extensions' in val &&
      'carbon.themes' in val.$extensions
    ) {
      const themeVal = val.$extensions['carbon.themes'][theme];
      const $value =
        themeVal && typeof themeVal === 'object' ? themeVal.value : themeVal;
      const _alphaModifier =
        themeVal && typeof themeVal === 'object' ? themeVal.alpha : undefined;
      result[name] = {
        $type: val.$type,
        $description: val.$description,
        $value,
        _alphaModifier,
        $extensions: val.$extensions,
      };
    } else if (val && typeof val === 'object') {
      Object.assign(result, flattenThemesDtcg(val, theme, name));
    }
  }
  return result;
}

function flattenComponentDtcg(obj, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const name = prefix ? `${prefix}-${key}` : key;
    if (
      val &&
      typeof val === 'object' &&
      '$extensions' in val &&
      'carbon.themes' in val.$extensions
    ) {
      result[name] = val;
    } else if (val && typeof val === 'object') {
      Object.assign(result, flattenComponentDtcg(val, name));
    }
  }
  return result;
}

const dtcgFlat = {
  white: flattenThemesDtcg(themesJson, 'white'),
  g10: flattenThemesDtcg(themesJson, 'g10'),
  g90: flattenThemesDtcg(themesJson, 'g90'),
  g100: flattenThemesDtcg(themesJson, 'g100'),
};

const componentDtcg = {
  ...flattenComponentDtcg(buttonJson),
  ...flattenComponentDtcg(contentSwitcherJson),
  ...flattenComponentDtcg(notificationJson),
  ...flattenComponentDtcg(statusJson),
  ...flattenComponentDtcg(tagJson),
};

// ─── Color / alias helpers ────────────────────────────────────────────────────

function resolveColor(theme, tokenName) {
  const jsName = TokenFormat.convert({
    name: tokenName,
    format: TokenFormat.formats.js,
  });
  const compEntry = COMP_TOKENS[jsName];
  if (compEntry != null) {
    return compEntry[THEME_KEY[theme]] ?? compEntry[THEME_KEY.white] ?? null;
  }
  const raw = themes[theme]?.[jsName];
  if (raw == null) return null;
  if (typeof raw === 'object') {
    return (
      raw.hex ??
      (raw.r !== undefined
        ? `rgba(${raw.r},${raw.g},${raw.b},${raw.a ?? 1})`
        : null)
    );
  }
  return String(raw);
}

function getAlias(theme, tokenName) {
  if (componentDtcg[tokenName]) {
    const entry = componentDtcg[tokenName];
    const val =
      entry.$extensions?.['carbon.themes']?.[theme] ??
      entry.$extensions?.['carbon.themes']?.white ??
      null;
    const alpha =
      entry.$extensions?.['org.carbon']?.alphaModifiers?.[theme] ??
      entry.$extensions?.['org.carbon']?.alphaModifier ??
      null;
    if (!val) return null;
    return alpha != null ? `${val} × ${alpha}α` : String(val);
  }
  const entry = dtcgFlat[theme]?.[tokenName] ?? dtcgFlat.white?.[tokenName];
  if (!entry) return null;
  const ref = String(entry.$value ?? '');
  const alpha =
    entry._alphaModifier ?? entry.$extensions?.['org.carbon']?.alphaModifier;
  return alpha != null ? `${ref} × ${alpha}α` : ref;
}

function getDtcgEntry(theme, tokenName) {
  if (componentDtcg[tokenName]) {
    const entry = componentDtcg[tokenName];
    const themeAlias =
      entry.$extensions?.['carbon.themes']?.[theme] ??
      entry.$extensions?.['carbon.themes']?.white ??
      null;
    const alphaModifier =
      entry.$extensions?.['org.carbon']?.alphaModifiers?.[theme] ??
      entry.$extensions?.['org.carbon']?.alphaModifier ??
      null;
    return {
      $type: entry.$type,
      $description: entry.$description,
      $value: themeAlias,
      _alphaModifier: alphaModifier,
      _isFallback: !entry.$extensions?.['carbon.themes']?.[theme],
    };
  }
  const direct = dtcgFlat[theme]?.[tokenName];
  if (direct) return { ...direct, _isFallback: false };
  const fallback = dtcgFlat.white?.[tokenName];
  if (fallback) return { ...fallback, _isFallback: true };
  return null;
}

function formatAlias(entry) {
  if (!entry || entry.$value == null) return null;
  const ref =
    typeof entry.$value === 'object'
      ? JSON.stringify(entry.$value)
      : String(entry.$value);
  const alpha =
    entry._alphaModifier ??
    entry.$extensions?.['org.carbon']?.alphaModifier ??
    null;
  return alpha != null ? `${ref} × ${alpha}α` : ref;
}

function getDescription(theme, tokenName) {
  if (componentDtcg[tokenName])
    return componentDtcg[tokenName].$description ?? null;
  const entry = dtcgFlat[theme]?.[tokenName] ?? dtcgFlat.white?.[tokenName];
  return entry?.$description ?? null;
}

// ─── Static token list ────────────────────────────────────────────────────────

const baseTokens = group.getTokens().map((t) => ({ ...t, _category: 'Root' }));
const componentTokens = Object.values(componentGroups).flatMap((g) =>
  g.getTokens().map((t) => ({ ...t, _category: g.name }))
);
const allTokens = [...baseTokens, ...componentTokens];

const CATEGORIES = [
  'All',
  'Root',
  ...Object.values(componentGroups).map((g) => g.name),
];
const groups = group.getTokenGroups();
const properties = group.getTokenProperties();
const tokenSets = tokenSet.getTokenSets();

const THEME_OPTIONS = [
  { label: 'White', key: 'white' },
  { label: 'Gray 10 (g10)', key: 'g10' },
  { label: 'Gray 90 (g90)', key: 'g90' },
  { label: 'Gray 100 (g100)', key: 'g100' },
];

const VIEW_OPTIONS = [
  { label: 'Table', value: 'table' },
  { label: 'Graph', value: 'graph' },
];

// ─── Graph layout constants ───────────────────────────────────────────────────

const CAT_H = 44;
const CAT_W = 140;
const GRP_H = 36;
const GRP_W = 140;
const NODE_W = 160;
const NODE_H = 52;
const ROW_GAP = 10;
const GRP_GAP = 14;
const LEVEL_H = 200;
const CAT_X = 0;
const GRP_X = CAT_X + CAT_W + LEVEL_H;
const TOK_X = GRP_X + GRP_W + LEVEL_H;
const DESC_W = 260;
const DESC_GAP = 24;

// ─── Graph layout builder ─────────────────────────────────────────────────────
// Takes the filtered token list and groups it into categories for the graph.

function buildGraphCategories(filteredTokens) {
  // Group filtered tokens by _category, preserving sub-group structure for Root
  const rootSubGroups = group.getTokenGroups().filter((g) => g.name !== 'All');
  const filteredNames = new Set(filteredTokens.map((t) => t.name));

  const rootGroups = rootSubGroups
    .map((g) => ({
      id: `root-${g.name}`,
      label: g.name,
      tokens: g.getTokens().filter((t) => filteredNames.has(t.name)),
    }))
    .filter((g) => g.tokens.length > 0);

  const cats = [];
  if (rootGroups.length > 0) {
    cats.push({ id: 'root', label: 'Root', groups: rootGroups });
  }

  for (const compGroup of Object.values(componentGroups)) {
    const tokens = compGroup
      .getTokens()
      .filter((t) => filteredNames.has(t.name));
    if (tokens.length > 0) {
      cats.push({
        id: `comp-${compGroup.name}`,
        label: compGroup.name,
        groups: [
          {
            id: `comp-${compGroup.name}-group`,
            label: compGroup.name,
            tokens,
          },
        ],
      });
    }
  }
  return cats;
}

function measureCatHeight(cat, expandedCats, expandedGroups) {
  if (!expandedCats.has(cat.id)) return CAT_H;
  let h = 0;
  for (const grp of cat.groups) {
    if (cat.groups.length > 1) {
      const tokH = expandedGroups.has(grp.id)
        ? grp.tokens.length * (NODE_H + ROW_GAP) - ROW_GAP
        : GRP_H;
      h += Math.max(GRP_H, tokH) + GRP_GAP;
    } else {
      h += grp.tokens.length * (NODE_H + ROW_GAP) - ROW_GAP;
    }
  }
  return h;
}

function buildLayout(graphCategories, expandedCats, expandedGroups, theme) {
  const nodes = [];
  const links = [];
  let catY = 20;

  for (const cat of graphCategories) {
    const catExpanded = expandedCats.has(cat.id);
    const catH = measureCatHeight(cat, expandedCats, expandedGroups);
    const catCy = catY + catH / 2;

    nodes.push({
      id: cat.id,
      type: 'category',
      label: cat.label,
      cx: CAT_X + CAT_W / 2,
      cy: catCy,
      w: CAT_W,
      h: CAT_H,
    });

    if (catExpanded) {
      let grpY = catY;
      for (const grp of cat.groups) {
        const grpExpanded = expandedGroups.has(grp.id);
        const hasGroupLevel = cat.groups.length > 1;
        const tokBlockH = grpExpanded
          ? grp.tokens.length * (NODE_H + ROW_GAP) - ROW_GAP
          : 0;
        const grpBlockH = hasGroupLevel
          ? Math.max(GRP_H, tokBlockH) + GRP_GAP
          : Math.max(CAT_H, tokBlockH);
        const grpCy = grpY + grpBlockH / 2;

        if (hasGroupLevel) {
          nodes.push({
            id: grp.id,
            type: 'group',
            label: grp.label,
            cx: GRP_X + GRP_W / 2,
            cy: grpCy,
            w: GRP_W,
            h: GRP_H,
          });
          links.push({ from: cat.id, to: grp.id });
          if (grpExpanded) {
            let tokY = grpY;
            for (const tok of grp.tokens) {
              nodes.push({
                id: tok.name,
                type: 'token',
                label: tok.name,
                color: resolveColor(theme, tok.name),
                alias: getAlias(theme, tok.name),
                cx: TOK_X + NODE_W / 2,
                cy: tokY + NODE_H / 2,
                w: NODE_W,
                h: NODE_H,
              });
              links.push({ from: grp.id, to: tok.name });
              tokY += NODE_H + ROW_GAP;
            }
          }
        } else {
          // Single-group: tokens expand directly from category
          let tokY = grpY;
          for (const tok of grp.tokens) {
            nodes.push({
              id: tok.name,
              type: 'token',
              label: tok.name,
              color: resolveColor(theme, tok.name),
              alias: getAlias(theme, tok.name),
              cx: GRP_X + NODE_W / 2,
              cy: tokY + NODE_H / 2,
              w: NODE_W,
              h: NODE_H,
            });
            links.push({ from: cat.id, to: tok.name });
            tokY += NODE_H + ROW_GAP;
          }
        }
        grpY += grpBlockH;
      }
    }
    catY += catH + ROW_GAP;
  }
  return { nodes, links };
}

// ─── SVG helpers ─────────────────────────────────────────────────────────────

function CurvedLink({ fromNode, toNode }) {
  if (!fromNode || !toNode) return null;
  const x1 = fromNode.cx + fromNode.w / 2;
  const y1 = fromNode.cy;
  const x2 = toNode.cx - toNode.w / 2;
  const y2 = toNode.cy;
  const mx = (x1 + x2) / 2;
  return (
    <path
      d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
      fill="none"
      stroke="#c6c6c6"
      strokeWidth={1.5}
    />
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function IndexPage({ lastBuiltOn }) {
  // ── Shared filter state ──────────────────────────────────────────────────
  const [activeView, setActiveView] = React.useState('table');
  const [activeTheme, setActiveTheme] = React.useState('white');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [activeGroup, setActiveGroup] = React.useState('All');
  const [activeProperty, setActiveProperty] = React.useState('All');
  const [activeSet, setActiveSet] = React.useState('All');

  // ── Graph-specific state ─────────────────────────────────────────────────
  const [expandedCats, setExpandedCats] = React.useState(new Set());
  const [expandedGroups, setExpandedGroups] = React.useState(new Set());
  const [selectedTokens, setSelectedTokens] = React.useState(new Set());
  const [pan, setPan] = React.useState({ x: 20, y: 90 });
  const [zoom, setZoom] = React.useState(1);
  const svgRef = React.useRef(null);
  const dragging = React.useRef(null);

  // ── Filtering ────────────────────────────────────────────────────────────
  const hasFilters =
    activeCategory !== 'All' ||
    activeGroup !== 'All' ||
    activeProperty !== 'All' ||
    activeSet !== 'All';

  const themeValues = themes[activeTheme];

  const filteredTokens = allTokens.filter((token) => {
    if (activeCategory !== 'All' && token._category !== activeCategory)
      return false;
    if (
      activeGroup !== 'All' &&
      token.groups &&
      !token.groups.includes(activeGroup)
    )
      return false;
    if (
      activeProperty !== 'All' &&
      token.properties &&
      !token.properties.includes(activeProperty)
    )
      return false;
    if (activeSet !== 'All') {
      const set = tokenSet.getTokenSet(activeSet);
      if (!set.hasToken(token.name)) return false;
    }
    return true;
  });

  // ── Graph categories derived from filtered tokens ────────────────────────
  const graphCategories = React.useMemo(
    () => buildGraphCategories(filteredTokens),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeCategory, activeGroup, activeProperty, activeSet]
  );

  const { nodes, links } = buildLayout(
    graphCategories,
    expandedCats,
    expandedGroups,
    activeTheme
  );
  const nodeMap = React.useMemo(
    () => Object.fromEntries(nodes.map((n) => [n.id, n])),
    [nodes]
  );

  // ── Graph interaction ────────────────────────────────────────────────────
  function toggleCat(id) {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function toggleGroup(id) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function collapseAll() {
    setExpandedCats(new Set());
    setExpandedGroups(new Set());
    setSelectedTokens(new Set());
  }
  function toggleSelectedToken(id) {
    setSelectedTokens((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function onMouseDown(e) {
    if (e.target.closest('.graph-node')) return;
    dragging.current = { startX: e.clientX - pan.x, startY: e.clientY - pan.y };
  }
  function onMouseMove(e) {
    if (!dragging.current) return;
    setPan({
      x: e.clientX - dragging.current.startX,
      y: e.clientY - dragging.current.startY,
    });
  }
  function onMouseUp() {
    dragging.current = null;
  }
  function fitToScreen() {
    if (!svgRef.current || nodes.length === 0) return;
    const { width, height } = svgRef.current.getBoundingClientRect();
    const PAD = 40;
    const minX = Math.min(...nodes.map((n) => n.cx - n.w / 2));
    const maxX = Math.max(...nodes.map((n) => n.cx + n.w / 2));
    const minY = Math.min(...nodes.map((n) => n.cy - n.h / 2));
    const maxY = Math.max(...nodes.map((n) => n.cy + n.h / 2));
    const contentW = maxX - minX;
    const contentH = maxY - minY;
    const z = Math.min(
      (width - PAD * 2) / contentW,
      (height - PAD * 2) / contentH,
      1
    );
    setPan({
      x: PAD - minX * z,
      y: PAD - minY * z + (height - PAD * 2 - contentH * z) / 2,
    });
    setZoom(z);
  }
  function onWheel(e) {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setZoom((z) => Math.min(2, Math.max(0.3, z - e.deltaY * 0.001)));
    } else if (e.shiftKey) {
      setPan((p) => ({ ...p, x: p.x - e.deltaY }));
    } else {
      setPan((p) => ({ ...p, y: p.y - e.deltaY }));
    }
  }
  React.useEffect(() => {
    if (activeView !== 'graph') return;
    const el = svgRef.current;
    if (!el) return;
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [activeView]);

  // ── Render ───────────────────────────────────────────────────────────────
  const isGraph = activeView === 'graph';

  return (
    <main
      style={
        isGraph
          ? {
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              overflow: 'hidden',
            }
          : undefined
      }>
      <header className="header">
        <div className="header-title">
          <h1 id="page-title">Theme Tokens DTCG ({filteredTokens.length})</h1>
          <p>Last built on {lastBuiltOn}</p>
        </div>

        <div className="controls">
          {/* View switcher */}
          <div className="control-group">
            <label htmlFor="view-select">View</label>
            <select
              id="view-select"
              value={activeView}
              onChange={(e) => setActiveView(e.target.value)}>
              {VIEW_OPTIONS.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          {/* Theme */}
          <div className="control-group">
            <label htmlFor="theme-select">Theme</label>
            <select
              id="theme-select"
              value={activeTheme}
              onChange={(e) => setActiveTheme(e.target.value)}>
              {THEME_OPTIONS.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="control-group">
            <label htmlFor="token-category">Token category</label>
            <select
              id="token-category"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Token group */}
          <div className="control-group">
            <label htmlFor="token-group">Token group</label>
            <select
              id="token-group"
              value={activeGroup}
              onChange={(e) => setActiveGroup(e.target.value)}>
              {groups.map((g) => (
                <option key={g.name}>{g.name}</option>
              ))}
            </select>
          </div>

          {/* Token set */}
          <div className="control-group">
            <label htmlFor="token-set">Token set</label>
            <select
              id="token-set"
              value={activeSet}
              onChange={(e) => setActiveSet(e.target.value)}>
              {tokenSets.map((s) => (
                <option key={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Properties */}
          <div className="control-group">
            <label htmlFor="property">Properties</label>
            <select
              id="property"
              value={activeProperty}
              onChange={(e) => setActiveProperty(e.target.value)}>
              <option>All</option>
              {properties.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {hasFilters && (
            <button
              className="reset-btn"
              onClick={() => {
                setActiveCategory('All');
                setActiveGroup('All');
                setActiveProperty('All');
                setActiveSet('All');
              }}>
              Reset filters
            </button>
          )}

          {isGraph && (
            <button className="reset-btn" onClick={collapseAll}>
              Collapse all
            </button>
          )}
        </div>
      </header>

      {/* ── TABLE VIEW ──────────────────────────────────────────────────── */}
      {!isGraph && (
        <div className="content">
          <table aria-labelledby="page-title">
            <thead>
              <tr>
                <th style={{ width: '18%' }}>Token</th>
                <th style={{ width: '25%' }}>Value</th>
                <th style={{ width: '35%' }}>Description</th>
                <th style={{ width: '22%' }}>Properties</th>
              </tr>
            </thead>
            <tbody>
              {filteredTokens.length === 0 && (
                <tr>
                  <td colSpan={4} className="no-results">
                    No tokens match the current filters.
                  </td>
                </tr>
              )}
              {filteredTokens.map((token) => {
                const jsName = TokenFormat.convert({
                  name: token.name,
                  format: TokenFormat.formats.js,
                });
                const compEntry = COMP_TOKENS[jsName];
                const rawValue =
                  compEntry != null
                    ? (compEntry[THEME_KEY[activeTheme]] ??
                      compEntry[THEME_KEY.white])
                    : themeValues?.[jsName];
                const resolvedValue =
                  rawValue == null
                    ? null
                    : typeof rawValue === 'object'
                      ? (rawValue.hex ??
                        (rawValue.r !== undefined
                          ? `rgba(${rawValue.r}, ${rawValue.g}, ${rawValue.b}, ${rawValue.a ?? 1})`
                          : JSON.stringify(rawValue)))
                      : String(rawValue);
                const dtcgEntry = getDtcgEntry(activeTheme, token.name);
                const isFallback = !!dtcgEntry?._isFallback;
                const dtcgRef = formatAlias(dtcgEntry);
                const dtcgDesc = dtcgEntry?.$description ?? '—';

                return (
                  <tr key={token.name} id={token.name}>
                    <td className="token-name">
                      <a href={`#${token.name}`}>{token.name}</a>
                    </td>
                    <td>
                      <div className="token-cell">
                        {resolvedValue && (
                          <div
                            className="color-swatch"
                            style={{ '--swatch-color': resolvedValue }}
                            title={resolvedValue}
                          />
                        )}
                        <div className="token-value-details">
                          {dtcgRef && (
                            <span
                              className={
                                isFallback
                                  ? 'token-ref token-ref--fallback'
                                  : 'token-ref'
                              }>
                              {dtcgRef}
                            </span>
                          )}
                          {resolvedValue && (
                            <span className="token-hex">{resolvedValue}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="description-cell">{dtcgDesc}</td>
                    <td className="properties-cell">
                      {token.properties ? (
                        <ul>
                          {token.properties.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── GRAPH VIEW ──────────────────────────────────────────────────── */}
      {isGraph && (
        <svg
          ref={svgRef}
          style={{ flex: 1, cursor: 'grab', background: '#fafafa' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}>
          <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
            {links.map((l, i) => (
              <CurvedLink
                key={i}
                fromNode={nodeMap[l.from]}
                toNode={nodeMap[l.to]}
              />
            ))}

            {nodes.map((n) => {
              if (n.type === 'category') {
                const expanded = expandedCats.has(n.id);
                return (
                  <g
                    key={n.id}
                    className="graph-node"
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleCat(n.id)}>
                    <rect
                      x={n.cx - n.w / 2}
                      y={n.cy - n.h / 2}
                      width={n.w}
                      height={n.h}
                      rx={4}
                      fill={expanded ? '#0043ce' : '#0f62fe'}
                    />
                    <text
                      x={n.cx}
                      y={n.cy - 5}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize={12}
                      fontWeight={600}
                      fontFamily="IBM Plex Mono, monospace">
                      {n.label}
                    </text>
                    <text
                      x={n.cx}
                      y={n.cy + 10}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.7)"
                      fontSize={9}
                      fontFamily="IBM Plex Mono, monospace">
                      {expanded ? 'collapse' : 'expand'}
                    </text>
                  </g>
                );
              }
              if (n.type === 'group') {
                const expanded = expandedGroups.has(n.id);
                return (
                  <g
                    key={n.id}
                    className="graph-node"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleGroup(n.id);
                    }}>
                    <rect
                      x={n.cx - n.w / 2}
                      y={n.cy - n.h / 2}
                      width={n.w}
                      height={n.h}
                      rx={3}
                      fill={expanded ? '#e8e8e8' : '#f4f4f4'}
                      stroke="#c6c6c6"
                      strokeWidth={1}
                    />
                    <text
                      x={n.cx}
                      y={n.cy - 4}
                      textAnchor="middle"
                      fill="#161616"
                      fontSize={11}
                      fontWeight={600}
                      fontFamily="IBM Plex Mono, monospace">
                      {n.label}
                    </text>
                    <text
                      x={n.cx}
                      y={n.cy + 10}
                      textAnchor="middle"
                      fill="#6f6f6f"
                      fontSize={9}
                      fontFamily="IBM Plex Mono, monospace">
                      {expanded ? 'collapse' : 'expand'}
                    </text>
                  </g>
                );
              }
              if (n.type === 'token') {
                const sw = 24;
                const isSelected = selectedTokens.has(n.id);
                return (
                  <g
                    key={n.id}
                    className="graph-node"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelectedToken(n.id);
                    }}>
                    <rect
                      x={n.cx - n.w / 2}
                      y={n.cy - n.h / 2}
                      width={sw}
                      height={n.h}
                      rx={2}
                      fill={n.color ?? '#e0e0e0'}
                      stroke={isSelected ? '#0f62fe' : '#8a3ffc'}
                      strokeWidth={isSelected ? 2 : 1}
                    />
                    <rect
                      x={n.cx - n.w / 2 + sw}
                      y={n.cy - n.h / 2}
                      width={n.w - sw}
                      height={n.h}
                      rx={2}
                      fill={isSelected ? '#edf5ff' : '#fff'}
                      stroke={isSelected ? '#0f62fe' : '#e0e0e0'}
                      strokeWidth={isSelected ? 2 : 1}
                    />
                    <foreignObject
                      x={n.cx - n.w / 2 + sw + 4}
                      y={n.cy - n.h / 2 + 4}
                      width={n.w - sw - 8}
                      height={n.h - 8}>
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style={{
                          fontSize: 9,
                          color: '#0f62fe',
                          fontFamily: 'IBM Plex Mono, monospace',
                          lineHeight: 1.3,
                          wordBreak: 'break-all',
                          overflow: 'hidden',
                          maxHeight: n.alias ? 20 : 42,
                        }}>
                        {n.label}
                      </div>
                      {n.alias && (
                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style={{
                            fontSize: 8,
                            color: '#6f6f6f',
                            fontFamily: 'IBM Plex Mono, monospace',
                            lineHeight: 1.3,
                            wordBreak: 'break-all',
                            overflow: 'hidden',
                            maxHeight: 16,
                          }}>
                          {n.alias}
                        </div>
                      )}
                      {n.color && (
                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style={{
                            fontSize: 8,
                            color: '#8d8d8d',
                            fontFamily: 'IBM Plex Mono, monospace',
                          }}>
                          {n.color}
                        </div>
                      )}
                    </foreignObject>
                  </g>
                );
              }
              return null;
            })}

            {/* Description nodes for selected tokens */}
            {(() => {
              const CHARS_PER_LINE = 38;
              const LINE_H = 13;
              const PAD = 10;
              const GUTTER = 8;
              const descX = TOK_X + NODE_W + DESC_GAP;
              const visibleTokens = [...selectedTokens].filter(
                (id) => nodeMap[id]
              );
              const items = visibleTokens.map((tokenId) => {
                const tokNode = nodeMap[tokenId];
                const desc =
                  getDescription(activeTheme, tokenId) ??
                  'No description available.';
                const lines = Math.max(
                  2,
                  Math.ceil(desc.length / CHARS_PER_LINE)
                );
                const h = PAD * 2 + lines * LINE_H;
                return {
                  tokenId,
                  tokNode,
                  desc,
                  h,
                  idealY: tokNode.cy - h / 2,
                };
              });
              items.sort((a, b) => a.idealY - b.idealY);
              const placed = [];
              for (const item of items) {
                let y = item.idealY;
                if (placed.length > 0) {
                  const prev = placed[placed.length - 1];
                  const minY = prev.y + prev.h + GUTTER;
                  if (y < minY) y = minY;
                }
                placed.push({ ...item, y });
              }
              return placed.map(({ tokenId, tokNode, desc, h, y }) => {
                const lx1 = tokNode.cx + tokNode.w / 2;
                const lx2 = descX;
                const ly1 = tokNode.cy;
                const ly2 = y + h / 2;
                const mx = (lx1 + lx2) / 2;
                return (
                  <g key={`desc-${tokenId}`}>
                    <path
                      d={`M${lx1},${ly1} C${mx},${ly1} ${mx},${ly2} ${lx2},${ly2}`}
                      fill="none"
                      stroke="#8a3ffc"
                      strokeWidth={1}
                      strokeDasharray="4 3"
                    />
                    <rect
                      x={descX}
                      y={y}
                      width={DESC_W}
                      height={h}
                      rx={3}
                      fill="#fff"
                      stroke="#8a3ffc"
                      strokeWidth={1.5}
                    />
                    <foreignObject
                      x={descX + PAD}
                      y={y + PAD}
                      width={DESC_W - PAD * 2}
                      height={h - PAD * 2}>
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style={{
                          fontSize: 9,
                          color: '#393939',
                          fontFamily: 'IBM Plex Mono, monospace',
                          lineHeight: '13px',
                          overflow: 'hidden',
                        }}>
                        {desc}
                      </div>
                    </foreignObject>
                  </g>
                );
              });
            })()}
          </g>
        </svg>
      )}
      {isGraph && (
        <button className="fit-btn" onClick={fitToScreen} title="Fit to screen">
          ⤢
        </button>
      )}
    </main>
  );
}

export async function getStaticProps() {
  return { props: { lastBuiltOn: new Date().toISOString() } };
}
