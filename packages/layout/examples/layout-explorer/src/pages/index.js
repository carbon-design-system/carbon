/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import layoutJson from '../../../../src/dtcg/layout.json';

// ── Resolve token values from layout.json ─────────────────────────────────────

const MINI_UNIT = 8;
const BASE_FONT_SIZE = 16;
// Max rem value across all tokens — used to scale dimension bars
const MAX_REM = 10;

function resolveValue(value, extensions) {
  const converter = extensions?.['carbon.layout']?.converter;
  if (converter === 'miniUnits') {
    return `${(Number(value) * MINI_UNIT) / BASE_FONT_SIZE}rem`;
  }
  if (converter === 'rem') {
    return `${Number(value) / BASE_FONT_SIZE}rem`;
  }
  return String(value);
}

// ── Flatten layout.json into groups ──────────────────────────────────────────

function buildGroups(json) {
  const groups = [];
  for (const [groupKey, groupVal] of Object.entries(json)) {
    if (groupKey.startsWith('$')) continue;
    const tokens = [];
    for (const [tokenKey, tokenVal] of Object.entries(groupVal)) {
      if (tokenKey.startsWith('$')) continue;
      const resolved = resolveValue(tokenVal.$value, tokenVal.$extensions);
      const deprecated =
        tokenVal.$extensions?.['carbon.layout']?.deprecated === true;
      tokens.push({
        name: tokenKey,
        value: resolved,
        description: tokenVal.$description ?? '',
        deprecated,
      });
    }
    groups.push({
      key: groupKey,
      description: groupVal.$description ?? '',
      tokens,
    });
  }
  return groups;
}

const ALL_GROUPS = buildGroups(layoutJson);
const GROUP_OPTIONS = ['All', ...ALL_GROUPS.map((g) => g.key)];

// ── Dimension bar (proportional to rem value, capped at MAX_REM) ──────────────

function DimensionBar({ value }) {
  if (!value || !value.endsWith('rem')) return null;
  const rem = parseFloat(value);
  if (isNaN(rem) || rem <= 0) return null;
  const pct = Math.min((rem / MAX_REM) * 100, 100);
  return (
    <div className="dimension-preview">
      <div className="dimension-bar-wrap">
        <div className="dimension-bar" style={{ width: `${pct}%` }} />
      </div>
      <span className="dimension-value">{value}</span>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function IndexPage({ lastBuiltOn }) {
  const [activeGroup, setActiveGroup] = React.useState('All');
  const [search, setSearch] = React.useState('');
  const [showDeprecated, setShowDeprecated] = React.useState(false);

  const query = search.trim().toLowerCase();
  const hasFilters = activeGroup !== 'All' || query || showDeprecated;

  const visibleGroups = ALL_GROUPS.filter(
    (g) => activeGroup === 'All' || g.key === activeGroup
  ).map((g) => ({
    ...g,
    tokens: g.tokens.filter((t) => {
      if (!showDeprecated && t.deprecated) return false;
      if (!query) return true;
      return (
        t.name.toLowerCase().includes(query) ||
        t.value.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
      );
    }),
  })).filter((g) => g.tokens.length > 0);

  const totalVisible = visibleGroups.reduce((n, g) => n + g.tokens.length, 0);

  return (
    <main>
      <section>
        <header className="header">
          <div className="header-title">
            <h1>Layout tokens ({totalVisible})</h1>
            <p>Last built on {lastBuiltOn}</p>
          </div>
          <div className="controls">
            {hasFilters && (
              <button
                className="reset-btn"
                onClick={() => {
                  setActiveGroup('All');
                  setSearch('');
                  setShowDeprecated(false);
                }}>
                Reset
              </button>
            )}
            <div className="control-group">
              <label htmlFor="search">Search</label>
              <input
                id="search"
                type="search"
                placeholder="token name or value…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="control-group">
              <label htmlFor="group-select">Group</label>
              <select
                id="group-select"
                value={activeGroup}
                onChange={(e) => setActiveGroup(e.target.value)}>
                {GROUP_OPTIONS.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </div>
            <div className="control-group control-group--checkbox">
              <input
                id="show-deprecated"
                type="checkbox"
                checked={showDeprecated}
                onChange={(e) => setShowDeprecated(e.target.checked)}
              />
              <label htmlFor="show-deprecated">Show deprecated</label>
            </div>
          </div>
        </header>

        <div className="content">
          {visibleGroups.length === 0 && (
            <p className="no-results">No tokens match your search.</p>
          )}
          {visibleGroups.map((group) => (
            <div key={group.key}>
              <h2 className="group-heading">{group.key}</h2>
              {group.description && (
                <p className="group-description">{group.description}</p>
              )}
              <table aria-label={`${group.key} tokens`}>
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Value</th>
                    <th>Visual</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {group.tokens.map((token) => (
                    <tr
                      key={token.name}
                      id={token.name}
                      className={token.deprecated ? 'deprecated-row' : ''}>
                      <td className="token-name">
                        <a href={`#${token.name}`}>${token.name}</a>
                        {token.deprecated && (
                          <span className="deprecated-badge">deprecated</span>
                        )}
                      </td>
                      <td>
                        <code>{token.value}</code>
                      </td>
                      <td>
                        <DimensionBar value={token.value} />
                      </td>
                      <td className="description-cell">{token.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {
      lastBuiltOn: new Date().toISOString().slice(0, 10),
    },
  };
}
