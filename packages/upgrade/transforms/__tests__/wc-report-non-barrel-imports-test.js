/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const jscodeshift = require('jscodeshift');
const { collectNonBarrelWebComponentImports } = require('../carbon-wc-imports');
const { formatFileBlock } = require('../wc-report-non-barrel-imports');

const j = jscodeshift.withParser('tsx');

function findings(source) {
  return collectNonBarrelWebComponentImports(j, j(source));
}

const sampleFindings = [
  {
    specifier: '@carbon/web-components/es/components/search/search.js',
    component: 'search',
    kind: 'side-effect',
    typeOnly: false,
    suggestedBarrel: '@carbon/web-components/es/components/search/index.js',
    line: 16,
  },
  {
    specifier:
      '@carbon/web-components/es/components/overflow-menu/overflow-menu-item.js',
    component: 'overflow-menu',
    kind: 'default',
    typeOnly: true,
    suggestedBarrel:
      '@carbon/web-components/es/components/overflow-menu/index.js',
    line: 8,
  },
];

describe('collectNonBarrelWebComponentImports', () => {
  it('flags a side-effect class-file import', () => {
    const found = findings(
      `import '@carbon/web-components/es/components/search/search.js';`
    );
    expect(found).toHaveLength(1);
    expect(found[0]).toMatchObject({
      component: 'search',
      kind: 'side-effect',
      typeOnly: false,
      suggestedBarrel: '@carbon/web-components/es/components/search/index.js',
    });
  });

  it('flags a default class import', () => {
    const found = findings(
      `import CDSSearch from '@carbon/web-components/es/components/search/search.js';`
    );
    expect(found).toHaveLength(1);
    expect(found[0].kind).toBe('default');
  });

  it('flags a named class import (no .js extension)', () => {
    const found = findings(
      `import { CDSSearch } from '@carbon/web-components/es/components/search/search';`
    );
    expect(found).toHaveLength(1);
    expect(found[0].kind).toBe('named');
  });

  it('flags a namespace import', () => {
    const found = findings(
      `import * as Search from '@carbon/web-components/es/components/search/search.js';`
    );
    expect(found[0].kind).toBe('namespace');
  });

  it('flags a nested class file and still suggests the top-level barrel', () => {
    const found = findings(
      `import CDSTable from '@carbon/web-components/es/components/data-table/table.js';`
    );
    expect(found[0]).toMatchObject({
      component: 'data-table',
      suggestedBarrel:
        '@carbon/web-components/es/components/data-table/index.js',
    });
  });

  it('marks type-only imports for review', () => {
    const found = findings(
      `import type CDSSearch from '@carbon/web-components/es/components/search/search.js';`
    );
    expect(found[0]).toMatchObject({ kind: 'type', typeOnly: true });
  });

  it('does NOT flag the component barrel (file, bare dir, or /index)', () => {
    expect(
      findings(`import '@carbon/web-components/es/components/search/index.js';`)
    ).toHaveLength(0);
    expect(
      findings(`import '@carbon/web-components/es/components/search';`)
    ).toHaveLength(0);
    expect(
      findings(
        `import { CDSSearch } from '@carbon/web-components/es/components/search/index';`
      )
    ).toHaveLength(0);
  });

  it('does NOT flag defs imports (constants/types, register nothing)', () => {
    expect(
      findings(
        `import { SEARCH_SIZE } from '@carbon/web-components/es/components/search/defs.js';`
      )
    ).toHaveLength(0);
  });

  it('does NOT flag non-carbon or top-level package imports', () => {
    expect(findings(`import { html } from 'lit';`)).toHaveLength(0);
    expect(
      findings(`import '@carbon/web-components/es/index.js';`)
    ).toHaveLength(0);
    expect(
      findings(
        `import { defineCustomElement } from '@carbon/web-components/es/globals/register.js';`
      )
    ).toHaveLength(0);
  });

  it('reports the source line number', () => {
    const source = [
      `import { html } from 'lit';`,
      `import CDSSearch from '@carbon/web-components/es/components/search/search.js';`,
    ].join('\n');
    expect(findings(source)[0].line).toBe(2);
  });

  it('collects multiple findings across a file', () => {
    const source = [
      `import '@carbon/web-components/es/components/search/search.js';`,
      `import '@carbon/web-components/es/components/button/index.js';`,
      `import CDSDropdown from '@carbon/web-components/es/components/dropdown/dropdown.js';`,
    ].join('\n');
    const found = findings(source);
    expect(found.map((f) => f.component)).toEqual(['search', 'dropdown']);
  });
});

describe('formatFileBlock', () => {
  it('renders a grouped, prefix-shortened tree (no ANSI when color off)', () => {
    const out = formatFileBlock('src/history-toolbar.ts', sampleFindings, {
      color: false,
    });

    // header + tree connectors, sorted by line (8 before 16)
    expect(out).toContain('src/history-toolbar.ts');
    expect(out.indexOf('overflow-menu/overflow-menu-item.js')).toBeLessThan(
      out.indexOf('search/search.js')
    );
    expect(out).toContain('├─');
    expect(out).toContain('└─');

    // component-prefix stripped on both the import and the barrel
    expect(out).toContain('search/search.js');
    expect(out).toContain('search/index.js');
    expect(out).not.toContain('@carbon/web-components/es/components');

    // kinds + review labeling + per-file summary
    expect(out).toContain('(side-effect)');
    expect(out).toContain('(type · review)');
    expect(out).toContain('1 needs a barrel, 1 to review');

    // no color codes when disabled
    expect(out).not.toContain('\x1b[');
  });

  it('emits ANSI escapes when color is on', () => {
    const out = formatFileBlock('src/a.ts', sampleFindings, { color: true });
    expect(out).toContain('\x1b[');
  });
});
