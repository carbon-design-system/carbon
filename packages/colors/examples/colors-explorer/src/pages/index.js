/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { colors, hoverColors } from '../../../../src';
import whiteJson from '@carbon/themes/src/dtcg/white.json';
import g10Json from '@carbon/themes/src/dtcg/g10.json';
import g90Json from '@carbon/themes/src/dtcg/g90.json';
import g100Json from '@carbon/themes/src/dtcg/g100.json';

// ── Flatten colors into a flat list of token objects ─────────────────────────
// colors = { blue: { 10: '#edf5ff', 20: '#d0e2ff', ... }, ... }

const allTokens = [];
const swatchNames = [];

// hoverColors keys are camelCase: blueHover, coolGrayHover, etc.
// Build a map from swatch-name → hover object/string for quick lookup.
const hoverBySwatch = {};
for (const [key, val] of Object.entries(hoverColors)) {
  // strip trailing "Hover" → "blue", "coolGray", etc.
  if (!key.endsWith('Hover')) continue;
  const swatch = key.slice(0, -'Hover'.length);
  // convert camelCase swatch to kebab: "coolGray" → "cool-gray"
  const kebab = swatch.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  hoverBySwatch[kebab] = val;
  hoverBySwatch[swatch] = val; // also keep camelCase key for direct match
}

for (const [swatch, grades] of Object.entries(colors)) {
  if (typeof grades !== 'object') continue; // skip black/white scalars
  swatchNames.push(swatch);
  const hoverEntry = hoverBySwatch[swatch];
  for (const [grade, hex] of Object.entries(grades)) {
    let hover = null;
    if (hoverEntry) {
      hover = typeof hoverEntry === 'string' ? hoverEntry : (hoverEntry[grade] ?? null);
    }
    allTokens.push({ name: `${swatch}-${grade}`, swatch, grade, hex, hover });
  }
}

// Also add black / white as single-entry swatches
for (const [name, val] of [['black', colors.black], ['white', colors.white]]) {
  if (typeof val === 'string') {
    const hover = hoverBySwatch[name] ?? null;
    allTokens.push({ name, swatch: name, grade: null, hex: val, hover });
    if (!swatchNames.includes(name)) swatchNames.push(name);
  }
}

const SWATCHES = ['All', ...swatchNames.sort()];

const VIEW_OPTIONS = [
  { value: 'table', label: 'Table' },
  { value: 'graph', label: 'Graph' },
];

const GRAPH_MODES = [
  { value: 'details', label: 'Details' },
  { value: 'relations', label: 'Relations' },
];

const THEME_OPTIONS = [
  { value: 'white', label: 'White' },
  { value: 'g10', label: 'G10' },
  { value: 'g90', label: 'G90' },
  { value: 'g100', label: 'G100' },
];

// ── Theme token → color alias reverse map ────────────────────────────────────
// Flattens each theme's DTCG JSON and builds:
//   colorToThemeTokens['blue-60'] = { white: ['background-brand', ...], g10: [...], ... }

function flattenDtcg(obj, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const name = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === 'object' && '$value' in val) {
      result[name] = val.$value;
    } else if (val && typeof val === 'object') {
      Object.assign(result, flattenDtcg(val, name));
    }
  }
  return result;
}

const themeDtcg = {
  white: flattenDtcg(whiteJson),
  g10: flattenDtcg(g10Json),
  g90: flattenDtcg(g90Json),
  g100: flattenDtcg(g100Json),
};

// Convert DTCG alias "{blue.60}" → "blue-60"
function aliasToColorToken(alias) {
  if (typeof alias !== 'string' || !alias.startsWith('{')) return null;
  return alias.slice(1, -1).replace(/\./g, '-');
}

// colorToThemeTokens['blue-60']['white'] = ['background-brand', 'focus', ...]
const colorToThemeTokens = {};
for (const [theme, flat] of Object.entries(themeDtcg)) {
  for (const [tokenName, aliasVal] of Object.entries(flat)) {
    const colorToken = aliasToColorToken(aliasVal);
    if (!colorToken) continue;
    if (!colorToThemeTokens[colorToken]) colorToThemeTokens[colorToken] = {};
    if (!colorToThemeTokens[colorToken][theme]) colorToThemeTokens[colorToken][theme] = [];
    colorToThemeTokens[colorToken][theme].push(tokenName);
  }
}

// ── Graph layout constants ────────────────────────────────────────────────────

const CAT_W = 110;
const CAT_H = 44;
const NODE_W = 180;
const NODE_H = 44;
const REL_NODE_W = 200;
const REL_NODE_H = 36;
const ROW_GAP = 8;
const LEVEL_H = 200;
const CAT_X = 0;
const TOK_X = CAT_X + CAT_W + LEVEL_H;
const REL_X = TOK_X + NODE_W + LEVEL_H;
const DESC_W = 220;
const DESC_GAP = 20;

// ── Relations layout ──────────────────────────────────────────────────────────

function buildRelationsLayout(filteredTokens, expandedSwatches, selectedColorToken, activeTheme) {
  const swatchMap = {};
  for (const t of filteredTokens) {
    if (!swatchMap[t.swatch]) swatchMap[t.swatch] = [];
    swatchMap[t.swatch].push(t);
  }

  const nodes = [];
  const links = [];
  let swatchY = 60;

  for (const [swatch, tokens] of Object.entries(swatchMap)) {
    const swatchId = `swatch:${swatch}`;
    const isExpanded = expandedSwatches.has(swatchId);

    nodes.push({
      id: swatchId, type: 'swatch', label: swatch,
      cx: CAT_X + CAT_W / 2, cy: swatchY + CAT_H / 2, w: CAT_W, h: CAT_H,
    });

    if (isExpanded) {
      let tokY = swatchY;
      for (const t of tokens) {
        const isSelected = t.name === selectedColorToken;
        const usedBy = colorToThemeTokens[t.name]?.[activeTheme] ?? [];
        nodes.push({
          id: t.name, type: 'token', label: t.name, hex: t.hex,
          cx: TOK_X + NODE_W / 2, cy: tokY + NODE_H / 2, w: NODE_W, h: NODE_H,
          isSelected, usedByCount: usedBy.length,
        });
        links.push({ from: swatchId, to: t.name });

        // Fan out theme token relation nodes for the selected color token
        if (isSelected) {
          if (usedBy.length === 0) {
            // Placeholder node — no relations found
            const emptyId = `empty:${t.name}`;
            nodes.push({
              id: emptyId, type: 'empty-relations',
              cx: REL_X + REL_NODE_W / 2, cy: tokY + NODE_H / 2,
              w: REL_NODE_W, h: REL_NODE_H,
            });
            links.push({ from: t.name, to: emptyId, isRelation: true });
          } else {
            const HDR_H = 24;
            const HDR_GAP = 6;
            const totalH = HDR_H + HDR_GAP + usedBy.length * (REL_NODE_H + ROW_GAP);
            let relY = tokY + NODE_H / 2 - totalH / 2;

            // @carbon/themes header — no link, just a label above the tokens
            const hdrId = `hdr:${t.name}`;
            nodes.push({
              id: hdrId, type: 'relation-header',
              cx: REL_X + REL_NODE_W / 2, cy: relY + HDR_H / 2,
              w: REL_NODE_W, h: HDR_H,
            });
            relY += HDR_H + HDR_GAP;

            for (const themeToken of usedBy) {
              const relId = `rel:${themeToken}`;
              nodes.push({
                id: relId, type: 'relation', label: themeToken,
                cx: REL_X + REL_NODE_W / 2, cy: relY + REL_NODE_H / 2,
                w: REL_NODE_W, h: REL_NODE_H,
              });
              // line goes directly from the color token to each relation token
              links.push({ from: t.name, to: relId, isRelation: true });
              relY += REL_NODE_H + ROW_GAP;
            }
          }
        }

        tokY += NODE_H + ROW_GAP;
      }
      swatchY += Math.max(CAT_H, tokens.length * (NODE_H + ROW_GAP)) + 24;
    } else {
      swatchY += CAT_H + 16;
    }
  }

  return { nodes, links };
}

function buildGraphLayout(filteredTokens, expandedSwatches) {
  // Group by swatch preserving order
  const swatchMap = {};
  for (const t of filteredTokens) {
    if (!swatchMap[t.swatch]) swatchMap[t.swatch] = [];
    swatchMap[t.swatch].push(t);
  }

  const nodes = [];
  const links = [];
  let swatchY = 60;

  for (const [swatch, tokens] of Object.entries(swatchMap)) {
    const swatchId = `swatch:${swatch}`;
    const isExpanded = expandedSwatches.has(swatchId);

    nodes.push({
      id: swatchId,
      type: 'swatch',
      label: swatch,
      sample: tokens[Math.floor(tokens.length / 2)]?.hex ?? '#e0e0e0',
      cx: CAT_X + CAT_W / 2,
      cy: swatchY + CAT_H / 2,
      w: CAT_W,
      h: CAT_H,
    });

    if (isExpanded) {
      let tokY = swatchY;
      for (const t of tokens) {
        const tokId = t.name;
        nodes.push({
          id: tokId,
          type: 'token',
          label: t.name,
          hex: t.hex,
          hover: t.hover,
          cx: TOK_X + NODE_W / 2,
          cy: tokY + NODE_H / 2,
          w: NODE_W,
          h: NODE_H,
        });
        links.push({ from: swatchId, to: tokId });
        tokY += NODE_H + ROW_GAP;
      }
      swatchY += Math.max(CAT_H, tokens.length * (NODE_H + ROW_GAP)) + 24;
    } else {
      swatchY += CAT_H + 16;
    }
  }

  return { nodes, links };
}

function CurvedLink({ fromNode, toNode, isRelation }) {
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
      stroke={isRelation ? '#8a3ffc' : '#c6c6c6'}
      strokeWidth={isRelation ? 1 : 1.5}
      strokeDasharray={isRelation ? '4 3' : undefined}
    />
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function IndexPage({ lastBuiltOn }) {
  const [activeView, setActiveView] = React.useState('table');
  const [graphMode, setGraphMode] = React.useState('details');
  const [activeTheme, setActiveTheme] = React.useState('white');
  const [activeSwatch, setActiveSwatch] = React.useState('All');
  const [selectedTokens, setSelectedTokens] = React.useState(new Set());
  const [selectedColorToken, setSelectedColorToken] = React.useState(null);
  const [expandedSwatches, setExpandedSwatches] = React.useState(new Set());
  const [pan, setPan] = React.useState({ x: 40, y: 40 });
  const [zoom, setZoom] = React.useState(1);
  const svgRef = React.useRef(null);
  const dragging = React.useRef(null);

  const filteredTokens = React.useMemo(
    () => activeSwatch === 'All' ? allTokens : allTokens.filter((t) => t.swatch === activeSwatch),
    [activeSwatch]
  );

  const hasFilters = activeSwatch !== 'All';
  const isGraph = activeView === 'graph';

  const isRelations = isGraph && graphMode === 'relations';

  const { nodes, links } = React.useMemo(
    () => isRelations
      ? buildRelationsLayout(filteredTokens, expandedSwatches, selectedColorToken, activeTheme)
      : buildGraphLayout(filteredTokens, expandedSwatches),
    [filteredTokens, expandedSwatches, isRelations, selectedColorToken, activeTheme]
  );
  const nodeMap = React.useMemo(
    () => Object.fromEntries(nodes.map((n) => [n.id, n])),
    [nodes]
  );

  function toggleSwatch(id) {
    setExpandedSwatches((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function toggleSelectedToken(id) {
    setSelectedTokens((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function collapseAll() {
    setExpandedSwatches(new Set());
    setSelectedTokens(new Set());
    setSelectedColorToken(null);
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
  function onMouseUp() { dragging.current = null; }
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

  return (
    <main
      style={
        isGraph
          ? { display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }
          : undefined
      }>
      <header className="header">
        <div className="header-title">
          <h1 id="page-title">Colors ({filteredTokens.length})</h1>
          <p>Last built on {lastBuiltOn}</p>
        </div>

        <div className="controls">
          {/* View */}
          <div className="control-group">
            <label htmlFor="view-select">View</label>
            <select
              id="view-select"
              value={activeView}
              onChange={(e) => setActiveView(e.target.value)}>
              {VIEW_OPTIONS.map((v) => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
          </div>

          {/* Graph mode — only shown in graph view */}
          {isGraph && (
            <div className="control-group">
              <label htmlFor="graph-mode">Mode</label>
              <select
                id="graph-mode"
                value={graphMode}
                onChange={(e) => {
                  setGraphMode(e.target.value);
                  setSelectedColorToken(null);
                  setSelectedTokens(new Set());
                }}>
                {GRAPH_MODES.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
          )}

          {/* Theme — only shown in relations mode */}
          {isRelations && (
            <div className="control-group">
              <label htmlFor="theme-select">Theme</label>
              <select
                id="theme-select"
                value={activeTheme}
                onChange={(e) => setActiveTheme(e.target.value)}>
                {THEME_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          )}

          {/* Swatch filter */}
          <div className="control-group">
            <label htmlFor="swatch-select">Swatch</label>
            <select
              id="swatch-select"
              value={activeSwatch}
              onChange={(e) => setActiveSwatch(e.target.value)}>
              {SWATCHES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {hasFilters && (
            <button className="reset-btn" onClick={() => setActiveSwatch('All')}>
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
                <th style={{ width: '22%' }}>Token</th>
                <th style={{ width: '26%' }}>Value</th>
                <th style={{ width: '26%' }}>Hover</th>
              </tr>
            </thead>
            <tbody>
              {filteredTokens.length === 0 && (
                <tr>
                  <td colSpan={3} className="no-results">
                    No tokens match the current filters.
                  </td>
                </tr>
              )}
              {filteredTokens.map((token) => (
                <tr key={token.name} id={token.name}>
                  <td className="token-name">
                    <a href={`#${token.name}`}>{token.name}</a>
                  </td>
                  <td>
                    <div className="color-cell">
                      <div
                        className="color-swatch"
                        style={{ '--swatch-color': token.hex }}
                        title={token.hex}
                      />
                      <span className="color-hex">{token.hex}</span>
                    </div>
                  </td>
                  <td>
                    {token.hover ? (
                      <div className="color-cell">
                        <div
                          className="color-swatch"
                          style={{ '--swatch-color': token.hover }}
                          title={token.hover}
                        />
                        <span className="color-hex">{token.hover}</span>
                      </div>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── GRAPH VIEW ──────────────────────────────────────────────────── */}
      {isGraph && (
        <svg
          ref={svgRef}
          style={{ flex: 1, cursor: 'grab', background: '#fafafa', position: 'relative' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}>
          <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
            {links.map((l, i) => (
              <CurvedLink key={i} fromNode={nodeMap[l.from]} toNode={nodeMap[l.to]} isRelation={l.isRelation} />
            ))}

            {nodes.map((n) => {
              if (n.type === 'swatch') {
                const expanded = expandedSwatches.has(n.id);
                return (
                  <g
                    key={n.id}
                    className="graph-node"
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleSwatch(n.id)}>
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

              if (n.type === 'empty-relations') {
                return (
                  <g key={n.id} style={{ cursor: 'default' }}>
                    <rect
                      x={n.cx - n.w / 2} y={n.cy - n.h / 2}
                      width={n.w} height={n.h} rx={3}
                      fill="#fff8f8" stroke="#da1e28" strokeWidth={1}
                      strokeDasharray="4 3"
                    />
                    <text
                      x={n.cx} y={n.cy + 4}
                      textAnchor="middle"
                      fill="#da1e28" fontSize={9}
                      fontFamily="IBM Plex Mono, monospace">
                      No theme tokens linked
                    </text>
                  </g>
                );
              }

              if (n.type === 'relation-header') {
                return (
                  <g key={n.id} style={{ cursor: 'default' }}>
                    <rect
                      x={n.cx - n.w / 2} y={n.cy - n.h / 2}
                      width={n.w} height={n.h} rx={3}
                      fill="#6929c4"
                    />
                    <text
                      x={n.cx} y={n.cy + 4}
                      textAnchor="middle"
                      fill="#fff" fontSize={9} fontWeight={600}
                      fontFamily="IBM Plex Mono, monospace">
                      @carbon/themes
                    </text>
                  </g>
                );
              }

              if (n.type === 'relation') {
                return (
                  <g key={n.id} className="graph-node" style={{ cursor: 'default' }}>
                    <rect
                      x={n.cx - n.w / 2} y={n.cy - n.h / 2}
                      width={n.w} height={n.h} rx={3}
                      fill="#f4f4f4" stroke="#8a3ffc" strokeWidth={1}
                    />
                    <text
                      x={n.cx - n.w / 2 + 8} y={n.cy + 4}
                      fill="#393939" fontSize={9} fontWeight={500}
                      fontFamily="IBM Plex Mono, monospace">
                      {n.label}
                    </text>
                  </g>
                );
              }

              if (n.type === 'token') {
                // In relations mode: click selects the color token to fan out relations
                // In details mode: click shows hex/hover popup
                const isSelected = isRelations
                  ? n.id === selectedColorToken
                  : selectedTokens.has(n.id);
                const SW = 36; // swatch strip width
                return (
                  <g
                    key={n.id}
                    className="graph-node"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isRelations) {
                        setSelectedColorToken((prev) => prev === n.id ? null : n.id);
                      } else {
                        toggleSelectedToken(n.id);
                      }
                    }}>
                    {/* color swatch strip */}
                    <rect
                      x={n.cx - n.w / 2}
                      y={n.cy - n.h / 2}
                      width={SW}
                      height={n.h}
                      fill={n.hex}
                      stroke={isSelected ? '#0f62fe' : 'rgba(0,0,0,0.12)'}
                      strokeWidth={isSelected ? 2 : 1}
                    />
                    {/* label area */}
                    <rect
                      x={n.cx - n.w / 2 + SW}
                      y={n.cy - n.h / 2}
                      width={n.w - SW}
                      height={n.h}
                      fill={isSelected ? '#edf5ff' : '#fff'}
                      stroke={isSelected ? '#0f62fe' : '#e0e0e0'}
                      strokeWidth={isSelected ? 2 : 1}
                    />
                    <foreignObject
                      x={n.cx - n.w / 2 + SW + 6}
                      y={n.cy - n.h / 2 + 4}
                      width={n.w - SW - 12}
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
                          maxHeight: 16,
                        }}>
                        {n.label}
                      </div>
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style={{
                          fontSize: 9,
                          color: '#6f6f6f',
                          fontFamily: 'IBM Plex Mono, monospace',
                          lineHeight: 1.3,
                        }}>
                        {n.hex}
                      </div>
                    </foreignObject>
                  </g>
                );
              }
              return null;
            })}

            {/* Hex + hover panels for selected tokens */}
            {(() => {
              const LINE_H = 14;
              const PAD = 10;
              const GUTTER = 8;
              const descX = TOK_X + NODE_W + DESC_GAP;
              const visibleTokens = [...selectedTokens].filter((id) => nodeMap[id]);
              const items = visibleTokens.map((tokenId) => {
                const tok = nodeMap[tokenId];
                // find hover
                const tokenData = allTokens.find((t) => t.name === tokenId);
                const lines = tokenData?.hover ? 3 : 2;
                const h = PAD * 2 + lines * LINE_H;
                return { tokenId, tok, tokenData, h, idealY: tok.cy - h / 2 };
              });
              items.sort((a, b) => a.idealY - b.idealY);
              const placed = [];
              for (const item of items) {
                let y = item.idealY;
                if (placed.length > 0) {
                  const prev = placed[placed.length - 1];
                  if (y < prev.y + prev.h + GUTTER) y = prev.y + prev.h + GUTTER;
                }
                placed.push({ ...item, y });
              }
              return placed.map(({ tokenId, tok, tokenData, h, y }) => {
                const lx1 = tok.cx + tok.w / 2;
                const lx2 = descX;
                const ly1 = tok.cy;
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
                      x={descX} y={y}
                      width={DESC_W} height={h}
                      rx={3} fill="#fff"
                      stroke="#8a3ffc" strokeWidth={1.5}
                    />
                    {/* color chip */}
                    <rect
                      x={descX + PAD} y={y + PAD}
                      width={LINE_H} height={LINE_H}
                      fill={tokenData?.hex ?? '#e0e0e0'}
                      stroke="rgba(0,0,0,0.12)" strokeWidth={1}
                    />
                    <foreignObject
                      x={descX + PAD + LINE_H + 6}
                      y={y + PAD}
                      width={DESC_W - PAD * 2 - LINE_H - 6}
                      height={h - PAD * 2}>
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style={{
                          fontSize: 9,
                          color: '#161616',
                          fontFamily: 'IBM Plex Mono, monospace',
                          lineHeight: '14px',
                        }}>
                        <div style={{ fontWeight: 600 }}>{tokenId}</div>
                        <div style={{ color: '#6f6f6f' }}>{tokenData?.hex}</div>
                        {tokenData?.hover && (
                          <div style={{ color: '#6f6f6f' }}>hover: {tokenData.hover}</div>
                        )}
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
