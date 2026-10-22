/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Recipe component — copy-and-customize, not a published package export.
 */

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import { iconToSVG } from './icon-to-svg';

// ─── Import web component definitions ────────────────────────────────────────
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/data-table/index.js';
import '@carbon/web-components/es/components/link/index.js';
import '@carbon/web-components/es/components/overflow-menu/index.js';
import '@carbon/web-components/es/components/tile/index.js';
import '@carbon/web-components/es/components/ui-shell/index.js';

import Settings16 from '@carbon/icons/es/settings/16.js';

import '../components/empty-state';
import notFoundSrc from '../assets/not-found.svg?url';
import unauthorizedSrc from '../assets/unauthorized.svg?url';
import errorSrc from '../assets/error.svg?url';

// ─── Static table data ────────────────────────────────────────────────────────

const TABLE_HEADERS = [
  { key: 'name', header: 'Name' },
  { key: 'protocol', header: 'Protocol' },
  { key: 'port', header: 'Port' },
  { key: 'rule', header: 'Rule' },
];

const TABLE_ROWS = [
  { id: 'a', name: 'Load Balancer 1', protocol: 'HTTP', port: 443, rule: 'Round robin' },
  { id: 'b', name: 'Load Balancer 2', protocol: 'HTTP', port: 80, rule: 'DNS delegation' },
  { id: 'c', name: 'Load Balancer 3', protocol: 'HTTP', port: 3000, rule: 'Round robin' },
];

/**
 * `cds-empty-state-unit`
 *
 * Full UI Shell demo showing three empty-state placement scenarios:
 *  1. Inside a DataTable (no search results)
 *  2. Inside a tall vertical tile
 *  3. Inside wide horizontal tiles
 *
 * Toggle `placement` between `left` and `centre`.
 *
 * @example
 * <!-- Left-aligned (default) -->
 * <cds-empty-state-unit></cds-empty-state-unit>
 *
 * <!-- Centred -->
 * <cds-empty-state-unit placement="centre"></cds-empty-state-unit>
 *
 * @element cds-empty-state-unit
 */
@customElement('cds-empty-state-unit')
export class CDSEmptyStateUnit extends LitElement {
  /**
   * Alignment of every empty state relative to its own container.
   * @default 'left'
   */
  @property({ reflect: true })
  placement: 'left' | 'centre' = 'left';

  @state()
  private _searchValue = '';

  private get _filteredRows() {
    const q = this._searchValue.trim().toLowerCase();
    if (!q) return TABLE_ROWS;
    return TABLE_ROWS.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q))
    );
  }

  private _handleSearch(e: Event) {
    this._searchValue = (e.target as HTMLInputElement).value ?? '';
  }

  private _clearSearch() {
    this._searchValue = '';
    const input = this.renderRoot
      ?.querySelector('cds-table-toolbar-search')
      ?.querySelector('input');
    if (input) input.value = '';
  }

  // No Shadow DOM — styles from src/index.scss must reach the rendered HTML directly.
  protected createRenderRoot() {
    return this;
  }

  render() {
    const { placement, _filteredRows: filteredRows } = this;
    const isCentre = placement === 'centre';
    const noResults = filteredRows.length === 0;
    const emptyWrapMod = isCentre
      ? 'es-example__empty-wrap--centre'
      : 'es-example__empty-wrap--left';

    return html`
      <cds-header aria-label="IBM Platform">
        <cds-skip-to-content></cds-skip-to-content>
        <cds-header-name href="#" prefix="IBM">[Platform]</cds-header-name>
        <cds-header-nav aria-label="IBM Platform">
          <cds-header-nav-item href="#">Link</cds-header-nav-item>
          <cds-header-nav-item href="#">Link</cds-header-nav-item>
          <cds-header-nav-item href="#">Link</cds-header-nav-item>
        </cds-header-nav>
      </cds-header>

      <main class="es-example__content">
        <div class="es-example__grid">

          <!-- ── DataTable with inline empty state ─────────────────────── -->
          <div class="es-example__col-full">
            <cds-table>
              <cds-table-header-title slot="title">Assets</cds-table-header-title>
              <cds-table-header-description slot="description">
                Search to filter results
              </cds-table-header-description>
              <cds-table-toolbar slot="toolbar">
                <cds-table-toolbar-content>
                  <cds-table-toolbar-search
                    persistent
                    placeholder="Search"
                    @cds-search-input="${this._handleSearch}">
                  </cds-table-toolbar-search>
                  <cds-overflow-menu toolbar-action>
                    ${unsafeSVG(iconToSVG(Settings16, {
                      slot: 'icon',
                      class: 'cds--overflow-menu__icon',
                    }))}
                    <span slot="tooltip-content">Settings</span>
                    <cds-overflow-menu-body flipped>
                      <cds-overflow-menu-item>Action 1</cds-overflow-menu-item>
                      <cds-overflow-menu-item>Action 2</cds-overflow-menu-item>
                    </cds-overflow-menu-body>
                  </cds-overflow-menu>
                  <cds-button kind="primary">Add asset</cds-button>
                </cds-table-toolbar-content>
              </cds-table-toolbar>
              <cds-table-head>
                <cds-table-header-row>
                  ${TABLE_HEADERS.map(
                    (h) => html`<cds-table-header-cell>${h.header}</cds-table-header-cell>`
                  )}
                </cds-table-header-row>
              </cds-table-head>
              <cds-table-body>
                ${!noResults
                  ? filteredRows.map(
                      (row) => html`
                        <cds-table-row>
                          <cds-table-cell>${row.name}</cds-table-cell>
                          <cds-table-cell>${row.protocol}</cds-table-cell>
                          <cds-table-cell>${row.port}</cds-table-cell>
                          <cds-table-cell>${row.rule}</cds-table-cell>
                        </cds-table-row>
                      `
                    )
                  : ''}
              </cds-table-body>
            </cds-table>

            ${noResults
              ? html`
                  <div class="es-example__empty-wrap ${emptyWrapMod}">
                    <cds-empty-state
                      illustration-src="${notFoundSrc}"
                      illustration-description="No results illustration"
                      heading="No results match the current search"
                      subtitle="Clear the search field to see all results, or try a different search term."
                      action-text="Clear search"
                      action-kind="tertiary"
                      @cds-empty-state-action-click="${this._clearSearch}">
                    </cds-empty-state>
                  </div>
                `
              : ''}
          </div>

          <!-- ── Vertical tile (spans 2 grid rows) ─────────────────────── -->
          <div class="es-example__col--span-2">
            <cds-tile class="es-example__tile">
              <p class="es-example__tile-label">Label</p>
              <p class="es-example__tile-title">Title</p>
              <div
                class="es-example__tile-empty--vertical${isCentre
                  ? ' es-example__tile-empty--vertical--centre'
                  : ''}">
                <cds-empty-state
                  size="sm"
                  illustration-src="${errorSrc}"
                  illustration-description="Error illustration"
                  heading="This insight is unavailable"
                  subtitle="Try loading the page once again after adding an asset."
                  link-text="Learn more"
                  link-href="https://carbondesignsystem.com/patterns/empty-states-pattern/">
                </cds-empty-state>
              </div>
            </cds-tile>
          </div>

          <!-- ── Horizontal tiles ───────────────────────────────────────── -->
          <div class="es-example__col-bottom">
            ${([0, 1] as const).map(
              () => html`
                <div class="es-example__col-half">
                  <cds-tile class="es-example__tile">
                    <p class="es-example__tile-label">Label</p>
                    <p class="es-example__tile-title">Title</p>
                    <div
                      class="es-example__tile-empty--horizontal${isCentre
                        ? ' es-example__tile-empty--horizontal--centre'
                        : ''}">
                      <cds-empty-state
                        size="sm"
                        illustration-src="${unauthorizedSrc}"
                        illustration-description="Unauthorized illustration"
                        heading="You do not have access"
                        subtitle="Unlock product insights by requesting view access from your admin."
                        action-text="Request access"
                        action-kind="tertiary">
                      </cds-empty-state>
                    </div>
                  </cds-tile>
                </div>
              `
            )}
          </div>

        </div>
      </main>
    `;
  }
}

export default CDSEmptyStateUnit;
