/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from 'next/link';
import {
  themes,
  buttonTokens,
  tagTokens,
  notificationTokens,
  statusTokens,
  contentSwitcherTokens,
} from '../../../../src';
import { TokenFormat, group } from '../../../../src/tokens';
import * as componentGroups from '../../../../src/tokens/components';

import themesJson from '../../../../src/dtcg/themes.json';
import buttonJson from '../../../../src/dtcg/components/button.json';
import contentSwitcherJson from '../../../../src/dtcg/components/content-switcher.json';
import notificationJson from '../../../../src/dtcg/components/notification.json';
import statusJson from '../../../../src/dtcg/components/status.json';
import tagJson from '../../../../src/dtcg/components/tag.json';

// ─── Component token lookup: camelCase JS name → { whiteTheme, g10, g90, g100 } ──
// The generated files use 'whiteTheme' as the key for the white theme.
const COMP_TOKENS = Object.assign(
  {},
  buttonTokens,
  tagTokens,
  notificationTokens,
  statusTokens,
  contentSwitcherTokens
);
const THEME_KEY = { white: 'whiteTheme', g10: 'g10', g90: 'g90', g100: 'g100' };

// ─── DTCG helpers ─────────────────────────────────────────────────────────────

function flattenDtcg(obj, themeName, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const name = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === 'object') {
      const carbonThemes = val.$extensions?.['carbon.themes'];
      if (carbonThemes && themeName in carbonThemes) {
        result[name] = { ...val, $value: carbonThemes[themeName] };
      }
      Object.assign(result, flattenDtcg(val, themeName, name));
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
  white: flattenDtcg(themesJson, 'white'),
  g10: flattenDtcg(themesJson, 'g10'),
  g90: flattenDtcg(themesJson, 'g90'),
  g100: flattenDtcg(themesJson, 'g100'),
};

const componentDtcg = {
  ...flattenComponentDtcg(buttonJson),
  ...flattenComponentDtcg(contentSwitcherJson),
  ...flattenComponentDtcg(notificationJson),
  ...flattenComponentDtcg(statusJson),
  ...flattenComponentDtcg(tagJson),
};

function resolveColor(theme, tokenName) {
  const jsName = TokenFormat.convert({
    name: tokenName,
    format: TokenFormat.formats.js,
  });
  // Check component tokens first (they aren't in themes.white/g10/...)
  const compEntry = COMP_TOKENS[jsName];
  if (compEntry != null) {
    const val = compEntry[THEME_KEY[theme]] ?? compEntry[THEME_KEY.white];
    return val ?? null;
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
  const alpha = entry.$extensions?.['org.carbon']?.alphaModifier;
  return alpha != null ? `${ref} × ${alpha}α` : ref;
}

// ─── Static tree data ─────────────────────────────────────────────────────────

const rootSubGroups = group.getTokenGroups().filter((g) => g.name !== 'All');

const CATEGORIES = [
  {
    id: 'root',
    label: 'Root',
    groups: rootSubGroups.map((g) => ({
      id: `root-${g.name}`,
      label: g.name,
      tokens: g.getTokens(),
    })),
  },
  ...Object.values(componentGroups).map((g) => ({
    id: `comp-${g.name}`,
    label: g.name,
    groups: [
      { id: `comp-${g.name}-group`, label: g.name, tokens: g.getTokens() },
    ],
  })),
];

// ─── Layout constants (left → right) ─────────────────────────────────────────
//
//  CAT_X  GROUP_X  TOKEN_X   (horizontal levels, left to right)
//    │       │        │
//  [Cat]──[Group]──[Token]
//
// Categories are stacked vertically; their children fan out to the right.

const CAT_H = 44; // category node height
const CAT_W = 140; // category node width
const GRP_H = 36; // group node height
const GRP_W = 140; // group node width
const NODE_W = 160; // token node width
const NODE_H = 52; // token node height
const ROW_GAP = 10; // vertical gap between sibling nodes
const GRP_GAP = 14; // vertical gap between group rows
const LEVEL_H = 200; // horizontal distance between levels

const CAT_X = 0;
const GRP_X = CAT_X + CAT_W + LEVEL_H;
const TOK_X = GRP_X + GRP_W + LEVEL_H;

const THEME_OPTIONS = [
  { label: 'White', key: 'white' },
  { label: 'Gray 10 (g10)', key: 'g10' },
  { label: 'Gray 90 (g90)', key: 'g90' },
  { label: 'Gray 100 (g100)', key: 'g100' },
];

// ─── Build layout (left → right) ─────────────────────────────────────────────

function measureCatHeight(cat, expandedCats, expandedGroups) {
  if (!expandedCats.has(cat.id)) return CAT_H;
  let h = 0;
  for (const grp of cat.groups) {
    if (cat.groups.length > 1) {
      // multi-group: group node + its tokens (need separate expand)
      const tokH = expandedGroups.has(grp.id)
        ? grp.tokens.length * (NODE_H + ROW_GAP) - ROW_GAP
        : GRP_H;
      h += Math.max(GRP_H, tokH) + GRP_GAP;
    } else {
      // single-group: tokens expand directly from category, no group node
      h += grp.tokens.length * (NODE_H + ROW_GAP) - ROW_GAP;
    }
  }
  return h;
}

function buildLayout(expandedCats, expandedGroups, theme) {
  const nodes = [];
  const links = [];

  let catY = 20;

  for (const cat of CATEGORIES) {
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

        // height this group occupies
        const tokCount = grp.tokens.length;
        const tokBlockH = grpExpanded
          ? tokCount * (NODE_H + ROW_GAP) - ROW_GAP
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
              const color = resolveColor(theme, tok.name);
              const alias = getAlias(theme, tok.name);
              nodes.push({
                id: tok.name,
                type: 'token',
                label: tok.name,
                color,
                alias,
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
          // Single group — tokens expand directly from the category node,
          // no intermediate group node needed.
          let tokY = grpY;
          for (const tok of grp.tokens) {
            const color = resolveColor(theme, tok.name);
            const alias = getAlias(theme, tok.name);
            nodes.push({
              id: tok.name,
              type: 'token',
              label: tok.name,
              color,
              alias,
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

// ─── SVG link (curved) ────────────────────────────────────────────────────────

function CurvedLink({ fromNode, toNode }) {
  if (!fromNode || !toNode || toNode.hidden) return null;
  // left→right: exit right edge of source, enter left edge of target
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

// ─── Page ─────────────────────────────────────────────────────────────────────

// ─── Description lookup ───────────────────────────────────────────────────────

function getDescription(theme, tokenName) {
  if (componentDtcg[tokenName])
    return componentDtcg[tokenName].$description ?? null;
  const entry = dtcgFlat[theme]?.[tokenName] ?? dtcgFlat.white?.[tokenName];
  return entry?.$description ?? null;
}

// ─── Description node dimensions ─────────────────────────────────────────────

const DESC_W = 260;
const DESC_GAP = 24; // horizontal gap from right edge of token to left edge of desc node

export default function GraphPage() {
  const [activeTheme, setActiveTheme] = React.useState('white');
  const [expandedCats, setExpandedCats] = React.useState(new Set());
  const [expandedGroups, setExpandedGroups] = React.useState(new Set());
  const [selectedTokens, setSelectedTokens] = React.useState(new Set());
  const [pan, setPan] = React.useState({ x: 20, y: 90 });
  const [zoom, setZoom] = React.useState(1);
  const svgRef = React.useRef(null);
  const dragging = React.useRef(null);

  const { nodes, links } = buildLayout(
    expandedCats,
    expandedGroups,
    activeTheme
  );
  const nodeMap = React.useMemo(
    () => Object.fromEntries(nodes.map((n) => [n.id, n])),
    [nodes]
  );

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

  // Pan drag
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
      // Ctrl/Cmd + scroll = zoom
      e.preventDefault();
      setZoom((z) => Math.min(2, Math.max(0.3, z - e.deltaY * 0.001)));
    } else if (e.shiftKey) {
      // Shift + scroll = pan horizontally
      setPan((p) => ({ ...p, x: p.x - e.deltaY }));
    } else {
      // plain scroll = pan vertically
      setPan((p) => ({ ...p, y: p.y - e.deltaY }));
    }
  }

  React.useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    // must be non-passive to allow preventDefault for zoom
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}>
      <header className="header">
        <div className="header-title">
          <h1>Theme Tokens DTCG — Graph</h1>
          <p>
            Scroll to pan · Shift+scroll to pan horizontally · Ctrl+scroll to
            zoom · Drag to pan
          </p>
        </div>
        <div className="controls">
          <div className="control-group">
            <label htmlFor="theme-select-graph">Theme</label>
            <select
              id="theme-select-graph"
              value={activeTheme}
              onChange={(e) => setActiveTheme(e.target.value)}>
              {THEME_OPTIONS.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <button className="reset-btn" onClick={collapseAll}>
            Collapse all
          </button>
          <Link href="/" className="nav-link">
            Table view
          </Link>
        </div>
      </header>

      <svg
        ref={svgRef}
        style={{ flex: 1, cursor: 'grab', background: '#fafafa' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}>
        <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
          {/* Links */}
          {links.map((l, i) => (
            <CurvedLink
              key={i}
              fromNode={nodeMap[l.from]}
              toNode={nodeMap[l.to]}
            />
          ))}

          {/* Nodes */}
          {nodes
            .filter((n) => !n.hidden)
            .map((n) => {
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

          {/* ── Description nodes for selected tokens ──
              Stack vertically at a fixed X column (TOK_X + NODE_W + DESC_GAP)
              so they never overlap each other or the token nodes.           */}
          {(() => {
            const CHARS_PER_LINE = 38;
            const LINE_H = 13;
            const PAD = 10;
            const GUTTER = 8;
            const descX = TOK_X + NODE_W + DESC_GAP;

            // Only keep tokens that are currently visible in the layout
            const visibleTokens = [...selectedTokens].filter(
              (id) => nodeMap[id]
            );

            // 1. Compute ideal Y (centred on token) and height for each desc node
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
              return { tokenId, tokNode, desc, h, idealY: tokNode.cy - h / 2 };
            });

            // Sort by ideal Y so we resolve top-to-bottom
            items.sort((a, b) => a.idealY - b.idealY);

            // 2. Push down any item that would overlap the one above it
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

            // 3. Render
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
      <button className="fit-btn" onClick={fitToScreen} title="Fit to screen">
        ⤢
      </button>
    </main>
  );
}
