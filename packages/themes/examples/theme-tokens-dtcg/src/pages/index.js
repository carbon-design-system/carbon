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
import { TokenFormat, group, set as tokenSet } from '../../../../src/tokens';
import * as componentGroups from '../../../../src/tokens/components';

import whiteJson from '../../../../src/dtcg/white.json';
import g10Json from '../../../../src/dtcg/g10.json';
import g90Json from '../../../../src/dtcg/g90.json';
import g100Json from '../../../../src/dtcg/g100.json';

// Component DTCG files — these embed per-theme values in $extensions.carbon.themes
import buttonJson from '../../../../src/dtcg/components/button.json';
import contentSwitcherJson from '../../../../src/dtcg/components/content-switcher.json';
import notificationJson from '../../../../src/dtcg/components/notification.json';
import statusJson from '../../../../src/dtcg/components/status.json';
import tagJson from '../../../../src/dtcg/components/tag.json';

// ─── Component token lookup: camelCase JS name → { whiteTheme, g10, g90, g100 } ──
const COMP_TOKENS = Object.assign(
  {},
  buttonTokens,
  tagTokens,
  notificationTokens,
  statusTokens,
  contentSwitcherTokens
);
const THEME_KEY = { white: 'whiteTheme', g10: 'g10', g90: 'g90', g100: 'g100' };

// ─── Flatten theme DTCG JSON → kebab-name: { $type, $value, $description, $extensions } ──

function flattenDtcg(obj, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const tokenName = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === 'object' && !('$value' in val)) {
      Object.assign(result, flattenDtcg(val, tokenName));
    } else if (val && '$value' in val) {
      result[tokenName] = val;
    }
  }
  return result;
}

// ─── Flatten component DTCG JSON → kebab-name: { $type, $description, $extensions } ──
// Component files have no $value; per-theme aliases live in $extensions.carbon.themes

function flattenComponentDtcg(obj, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const tokenName = prefix ? `${prefix}-${key}` : key;
    if (
      val &&
      typeof val === 'object' &&
      '$extensions' in val &&
      'carbon.themes' in val.$extensions
    ) {
      result[tokenName] = val;
    } else if (val && typeof val === 'object') {
      Object.assign(result, flattenComponentDtcg(val, tokenName));
    }
  }
  return result;
}

const dtcgFlat = {
  white: flattenDtcg(whiteJson),
  g10: flattenDtcg(g10Json),
  g90: flattenDtcg(g90Json),
  g100: flattenDtcg(g100Json),
};

// Merged component DTCG map (same structure for all themes, theme selected at render time)
const componentDtcg = {
  ...flattenComponentDtcg(buttonJson),
  ...flattenComponentDtcg(contentSwitcherJson),
  ...flattenComponentDtcg(notificationJson),
  ...flattenComponentDtcg(statusJson),
  ...flattenComponentDtcg(tagJson),
};

// White is the most complete — use it as fallback for missing entries in other themes
function getDtcgEntry(theme, tokenName) {
  // Component tokens: look up in component map, normalise into a consistent shape
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
  // Theme tokens: theme-specific, fall back to white
  const direct = dtcgFlat[theme][tokenName];
  if (direct) return { ...direct, _isFallback: false };
  const fallback = dtcgFlat.white[tokenName];
  if (fallback) return { ...fallback, _isFallback: true };
  return null;
}

// Format the alias: "{gray.50}" or "{gray.50} × 0.5α"
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

// ─── Build token rows from the full token registry (group + components) ──────

const baseTokens = group.getTokens().map((t) => ({ ...t, _category: 'Root' }));
const componentTokens = Object.values(componentGroups).flatMap((g) =>
  g.getTokens().map((t) => ({ ...t, _category: g.name }))
);
const tokens = [...baseTokens, ...componentTokens];

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

export default function IndexPage({ lastBuiltOn }) {
  const [activeTheme, setActiveTheme] = React.useState('white');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [activeGroup, setActiveGroup] = React.useState('All');
  const [activeProperty, setActiveProperty] = React.useState('All');
  const [activeSet, setActiveSet] = React.useState('All');

  const hasFilters =
    activeCategory !== 'All' ||
    activeGroup !== 'All' ||
    activeProperty !== 'All' ||
    activeSet !== 'All';

  const themeValues = themes[activeTheme];

  const filteredTokens = tokens.filter((token) => {
    if (activeCategory !== 'All' && token._category !== activeCategory) {
      return false;
    }
    if (
      activeGroup !== 'All' &&
      token.groups &&
      !token.groups.includes(activeGroup)
    ) {
      return false;
    }
    if (
      activeProperty !== 'All' &&
      token.properties &&
      !token.properties.includes(activeProperty)
    ) {
      return false;
    }
    if (activeSet !== 'All') {
      const set = tokenSet.getTokenSet(activeSet);
      if (!set.hasToken(token.name)) {
        return false;
      }
    }
    return true;
  });

  return (
    <main>
      <section>
        {/* ── Fixed header ─────────────────────────────────────────────── */}
        <header className="header">
          <div className="header-title">
            <h1 id="table-title">
              Theme Tokens DTCG ({filteredTokens.length})
            </h1>
            <p>Last built on {lastBuiltOn}</p>
          </div>

          <div className="controls">
            {/* Theme selector */}
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
            <Link href="/graph" className="nav-link">
              Graph view
            </Link>
          </div>
        </header>

        {/* ── Table ──────────────────────────────────────────────────────── */}
        <div className="content">
          <table aria-labelledby="table-title">
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
                  <td colSpan={5} className="no-results">
                    No tokens match the current filters.
                  </td>
                </tr>
              )}
              {filteredTokens.map((token) => {
                const jsName = TokenFormat.convert({
                  name: token.name,
                  format: TokenFormat.formats.js,
                });
                // Component tokens aren't in themes.white — check COMP_TOKENS first
                const compEntry = COMP_TOKENS[jsName];
                const rawValue =
                  compEntry != null
                    ? (compEntry[THEME_KEY[activeTheme]] ??
                      compEntry[THEME_KEY.white])
                    : themeValues?.[jsName];
                // Some theme values are rgba objects; convert to CSS string
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
                const dtcgType = dtcgEntry?.$type ?? '—';
                const dtcgDesc = dtcgEntry?.$description ?? '—';

                return (
                  <tr key={token.name} id={token.name}>
                    {/* Token name */}
                    <td className="token-name">
                      <a href={`#${token.name}`}>{token.name}</a>
                    </td>

                    {/* Value: color swatch + DTCG ref + resolved hex */}
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

                    {/* Description */}
                    <td className="description-cell">{dtcgDesc}</td>

                    {/* Properties */}
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
      </section>
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {
      lastBuiltOn: new Date().toISOString(),
    },
  };
}
