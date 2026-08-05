/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import motionJson from '../../../../src/dtcg/motion.json';
import surfacesJson from '../../../../src/dtcg/surfaces.json';

// ── Flatten motion.json into a list of token objects ─────────────────────────

function flattenMotion(obj, prefix = '') {
  const results = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const name = prefix ? `${prefix}-${key}` : key;
    if (value && typeof value === 'object' && '$value' in value) {
      const raw = value.$value;
      let resolved;
      let type;
      if (Array.isArray(raw)) {
        resolved = `cubic-bezier(${raw.join(', ')})`;
        type = 'cubicBezier';
      } else if (raw && typeof raw === 'object' && 'value' in raw && 'unit' in raw) {
        resolved = `${raw.value}${raw.unit}`;
        type = 'duration';
      } else {
        resolved = String(raw);
        type = value.$type ?? 'unknown';
      }
      results.push({
        name,
        resolved,
        type,
        description: value.$description ?? '',
        category: name.split('-')[0], // 'duration' or 'easing'
      });
    } else if (value && typeof value === 'object') {
      results.push(...flattenMotion(value, name));
    }
  }
  return results;
}

// ── Flatten surfaces.json ─────────────────────────────────────────────────────

function flattenSurfaces(obj, prefix = '') {
  const results = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const name = prefix ? `${prefix}-${key}` : key;
    if (
      value &&
      typeof value === 'object' &&
      '$extensions' in value &&
      value.$extensions['carbon.motion']
    ) {
      const recipe = value.$extensions['carbon.motion'];
      results.push({
        name,
        resolved: recipe.duration ?? '—',
        type: 'surface',
        description: value.$description ?? '',
        category: 'surface',
        recipe,
      });
    } else if (value && typeof value === 'object') {
      results.push(...flattenSurfaces(value, name));
    }
  }
  return results;
}

const motionTokens = flattenMotion(motionJson);
const surfaceTokens = flattenSurfaces(surfacesJson);
const allTokens = [...motionTokens, ...surfaceTokens];

const CATEGORIES = ['All', 'duration', 'easing', 'surface'];

const VIEW_OPTIONS = [
  { value: 'table', label: 'Table' },
  { value: 'graph', label: 'Graph' },
];

// ── Graph layout constants ────────────────────────────────────────────────────

const CAT_W = 130;
const CAT_H = 44;
const GRP_W = 130;
const GRP_H = 36;
const NODE_W = 200;
const NODE_H = 52;
const ROW_GAP = 10;
const GRP_GAP = 14;
const LEVEL_H = 180;
const CAT_X = 0;
const GRP_X = CAT_X + CAT_W + LEVEL_H;
const TOK_X = GRP_X + GRP_W + LEVEL_H;
const DESC_W = 260;
const DESC_GAP = 24;

// Lookup description for a token by name
const tokenDescMap = Object.fromEntries(allTokens.map((t) => [t.name, t.description]));

function buildGraphLayout(filteredTokens, expandedCats, expandedGroups) {
  // Group tokens by category → sub-group (second segment of name)
  const catMap = {};
  for (const t of filteredTokens) {
    const parts = t.name.split('-');
    const cat = parts[0];
    const grp = parts.slice(0, 2).join('-');
    if (!catMap[cat]) catMap[cat] = {};
    if (!catMap[cat][grp]) catMap[cat][grp] = [];
    catMap[cat][grp].push(t);
  }

  const nodes = [];
  const links = [];
  let catY = 60;

  for (const [cat, groups] of Object.entries(catMap)) {
    const catId = `cat:${cat}`;
    const isCatExpanded = expandedCats.has(catId);

    // measure category height
    let catH = CAT_H;
    if (isCatExpanded) {
      for (const [grp, tokens] of Object.entries(groups)) {
        catH += GRP_GAP + GRP_H;
        if (expandedGroups.has(`grp:${grp}`)) {
          catH += tokens.length * (NODE_H + ROW_GAP);
        }
      }
    }

    nodes.push({ id: catId, type: 'category', label: cat, cx: CAT_X + CAT_W / 2, cy: catY + CAT_H / 2, w: CAT_W, h: CAT_H });

    if (isCatExpanded) {
      let grpY = catY + CAT_H + GRP_GAP;
      for (const [grp, tokens] of Object.entries(groups)) {
        const grpId = `grp:${grp}`;
        const isGrpExpanded = expandedGroups.has(grpId);
        const grpLabel = grp.split('-').slice(1).join('-') || grp;
        nodes.push({ id: grpId, type: 'group', label: grpLabel, cx: GRP_X + GRP_W / 2, cy: grpY + GRP_H / 2, w: GRP_W, h: GRP_H });
        links.push({ from: catId, to: grpId });

        if (isGrpExpanded) {
          let tokY = grpY + GRP_H + ROW_GAP;
          for (const t of tokens) {
            const tokId = t.name;
            nodes.push({ id: tokId, type: 'token', label: t.name, value: t.resolved, typeLabel: t.type, cx: TOK_X + NODE_W / 2, cy: tokY + NODE_H / 2, w: NODE_W, h: NODE_H });
            links.push({ from: grpId, to: tokId });
            tokY += NODE_H + ROW_GAP;
          }
        }
        grpY += GRP_H + GRP_GAP + (isGrpExpanded ? tokens.length * (NODE_H + ROW_GAP) : 0);
      }
    }

    catY += catH + 24;
  }

  return { nodes, links, totalH: catY };
}

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

// ── Duration bar preview (animated) ──────────────────────────────────────────

function DurationBar({ resolved, easing = 'ease' }) {
  const [playing, setPlaying] = React.useState(false);
  const key = React.useRef(0);

  function play() {
    key.current += 1;
    setPlaying(false);
    requestAnimationFrame(() => setPlaying(true));
  }

  return (
    <div className="motion-preview">
      <div
        className="motion-bar-wrap"
        title="Click to preview"
        style={{ cursor: 'pointer' }}
        onClick={play}>
        <div
          key={key.current}
          className={`motion-bar${playing ? ' motion-bar--playing' : ''}`}
          style={{ '--bar-duration': resolved, '--bar-easing': easing }}
        />
      </div>
      <span className="motion-value">{resolved}</span>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function IndexPage({ lastBuiltOn }) {
  const [activeView, setActiveView] = React.useState('table');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [expandedCats, setExpandedCats] = React.useState(new Set());
  const [expandedGroups, setExpandedGroups] = React.useState(new Set());
  const [selectedTokens, setSelectedTokens] = React.useState(new Set());
  const [pan, setPan] = React.useState({ x: 40, y: 40 });
  const [zoom, setZoom] = React.useState(1);
  const svgRef = React.useRef(null);
  const dragging = React.useRef(null);

  const filteredTokens = activeCategory === 'All'
    ? allTokens
    : allTokens.filter((t) => t.category === activeCategory);

  const hasFilters = activeCategory !== 'All';
  const isGraph = activeView === 'graph';

  const { nodes, links, totalH } = React.useMemo(
    () => buildGraphLayout(filteredTokens, expandedCats, expandedGroups),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeCategory, expandedCats, expandedGroups]
  );
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

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
  function toggleSelectedToken(id) {
    setSelectedTokens((prev) => {
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
  function onMouseDown(e) {
    if (e.target.closest('.graph-node')) return;
    dragging.current = { startX: e.clientX - pan.x, startY: e.clientY - pan.y };
  }
  function onMouseMove(e) {
    if (!dragging.current) return;
    setPan({ x: e.clientX - dragging.current.startX, y: e.clientY - dragging.current.startY });
  }
  function onMouseUp() { dragging.current = null; }
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
  });

  return (
    <main style={isGraph ? { display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' } : undefined}>
      <header className="header">
        <div className="header-title">
          <h1 id="page-title">Motion Tokens DTCG ({filteredTokens.length})</h1>
          <p>Last built on {lastBuiltOn}</p>
        </div>

        <div className="controls">
          {/* View */}
          <div className="control-group">
            <label htmlFor="view-select">View</label>
            <select id="view-select" value={activeView} onChange={(e) => setActiveView(e.target.value)}>
              {VIEW_OPTIONS.map((v) => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="control-group">
            <label htmlFor="token-category">Token category</label>
            <select id="token-category" value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {hasFilters && (
            <button className="reset-btn" onClick={() => setActiveCategory('All')}>
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
                <th style={{ width: '20%' }}>Token</th>
                <th style={{ width: '25%' }}>Value</th>
                <th style={{ width: '15%' }}>Type</th>
                <th style={{ width: '40%' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredTokens.length === 0 && (
                <tr>
                  <td colSpan={4} className="no-results">No tokens match the current filters.</td>
                </tr>
              )}
              {filteredTokens.map((token) => (
                <tr key={token.name} id={token.name}>
                  <td className="token-name">
                    <a href={`#${token.name}`}>{token.name}</a>
                  </td>
                  <td>
                    {token.type === 'duration' ? (
                      <DurationBar resolved={token.resolved} />
                    ) : (
                      <div className="motion-preview">
                        <span className="motion-value">{token.resolved}</span>
                      </div>
                    )}
                  </td>
                  <td><span className="type-badge">{token.type}</span></td>
                  <td className="description-cell">{token.description || '—'}</td>
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
          style={{ flex: 1, cursor: 'grab', background: '#fafafa' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}>
          <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
            {links.map((l, i) => (
              <CurvedLink key={i} fromNode={nodeMap[l.from]} toNode={nodeMap[l.to]} />
            ))}
            {nodes.map((n) => {
              if (n.type === 'category') {
                const expanded = expandedCats.has(n.id);
                return (
                  <g key={n.id} className="graph-node" style={{ cursor: 'pointer' }} onClick={() => toggleCat(n.id)}>
                    <rect x={n.cx - n.w / 2} y={n.cy - n.h / 2} width={n.w} height={n.h} rx={4} fill={expanded ? '#0043ce' : '#0f62fe'} />
                    <text x={n.cx} y={n.cy - 5} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={600} fontFamily="IBM Plex Mono, monospace">{n.label}</text>
                    <text x={n.cx} y={n.cy + 10} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={9} fontFamily="IBM Plex Mono, monospace">{expanded ? 'collapse' : 'expand'}</text>
                  </g>
                );
              }
              if (n.type === 'group') {
                const expanded = expandedGroups.has(n.id);
                return (
                  <g key={n.id} className="graph-node" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); toggleGroup(n.id); }}>
                    <rect x={n.cx - n.w / 2} y={n.cy - n.h / 2} width={n.w} height={n.h} rx={3} fill={expanded ? '#e8e8e8' : '#f4f4f4'} stroke="#c6c6c6" strokeWidth={1} />
                    <text x={n.cx} y={n.cy - 4} textAnchor="middle" fill="#161616" fontSize={11} fontWeight={600} fontFamily="IBM Plex Mono, monospace">{n.label}</text>
                    <text x={n.cx} y={n.cy + 10} textAnchor="middle" fill="#6f6f6f" fontSize={9} fontFamily="IBM Plex Mono, monospace">{expanded ? 'collapse' : 'expand'}</text>
                  </g>
                );
              }
              if (n.type === 'token') {
                const isSelected = selectedTokens.has(n.id);
                return (
                  <g
                    key={n.id}
                    className="graph-node"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => { e.stopPropagation(); toggleSelectedToken(n.id); }}>
                    <rect x={n.cx - n.w / 2} y={n.cy - n.h / 2} width={n.w} height={n.h} rx={2}
                      fill={isSelected ? '#edf5ff' : '#fff'}
                      stroke={isSelected ? '#0f62fe' : '#e0e0e0'}
                      strokeWidth={isSelected ? 2 : 1} />
                    <text x={n.cx - n.w / 2 + 8} y={n.cy - 7} fill="#0f62fe" fontSize={9} fontFamily="IBM Plex Mono, monospace">{n.label}</text>
                    <text x={n.cx - n.w / 2 + 8} y={n.cy + 7} fill="#161616" fontSize={10} fontWeight={600} fontFamily="IBM Plex Mono, monospace">{n.value}</text>
                    <text x={n.cx - n.w / 2 + 8} y={n.cy + 20} fill="#6f6f6f" fontSize={8} fontFamily="IBM Plex Mono, monospace">{n.typeLabel}</text>
                  </g>
                );
              }
              return null;
            })}

            {/* Description panels for selected tokens */}
            {(() => {
              const CHARS_PER_LINE = 36;
              const LINE_H = 13;
              const PAD = 10;
              const GUTTER = 8;
              const descX = TOK_X + NODE_W + DESC_GAP;
              const visibleTokens = [...selectedTokens].filter((id) => nodeMap[id]);
              const items = visibleTokens.map((tokenId) => {
                const tokNode = nodeMap[tokenId];
                const desc = tokenDescMap[tokenId] || 'No description available.';
                const lines = Math.max(2, Math.ceil(desc.length / CHARS_PER_LINE));
                const h = PAD * 2 + lines * LINE_H;
                return { tokenId, tokNode, desc, h, idealY: tokNode.cy - h / 2 };
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
                      fill="none" stroke="#8a3ffc" strokeWidth={1} strokeDasharray="4 3" />
                    <rect x={descX} y={y} width={DESC_W} height={h} rx={3}
                      fill="#fff" stroke="#8a3ffc" strokeWidth={1.5} />
                    <foreignObject x={descX + PAD} y={y + PAD} width={DESC_W - PAD * 2} height={h - PAD * 2}>
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style={{ fontSize: 9, color: '#393939', fontFamily: 'IBM Plex Mono, monospace', lineHeight: '13px', overflow: 'hidden' }}>
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
    </main>
  );
}

export async function getStaticProps() {
  return { props: { lastBuiltOn: new Date().toISOString() } };
}
