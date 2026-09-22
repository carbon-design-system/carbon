/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * ─── PATTERN RECIPE ──────────────────────────────────────────────────────────
 * This file is a copy-and-customize recipe, not a published package export.
 * Copy it into your own codebase and adapt it to your needs.
 *
 * What it shows:
 *   • EmptyState in a full UI Shell (header + side nav + main content)
 *   • EmptyState inside a DataTable (triggered by a search returning 0 rows)
 *   • EmptyState inside small tiles (vertical + horizontal placement)
 *   • Left-aligned vs centred empty-state placement — toggled via an attribute
 *
 * Dependencies (from @carbon/web-components):
 *   cds-empty-state, cds-table family, cds-tile, cds-grid, UI Shell elements
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from 'lit/decorators.js';

// ─── Import web component definitions ────────────────────────────────────────
import '../../components/empty-state/index';
import '../../components/button/button';
import '../../components/data-table/index';
import '../../components/grid/grid';
import '../../components/link/link';
import '../../components/tile/tile';
import '../../components/ui-shell/index';

// ─── Copy your own SVG assets ─────────────────────────────────────────────────
import notFoundSrc from './assets/not-found.svg';
import unauthorizedSrc from './assets/unauthorized.svg';
import errorSrc from './assets/error.svg';

import styles from './empty-state-example.scss?lit';

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

const SIDE_NAV_LINKS = [
  'Overview', 'Assets', 'Monitoring', 'Activity',
  'Configuration', 'Access', 'Billing',
];

/**
 * `cds-empty-state-example`
 *
 * Drop this into your own app and customize freely.
 *
 * @example
 * <!-- Left-aligned (default) -->
 * <cds-empty-state-example></cds-empty-state-example>
 *
 * <!-- Centred -->
 * <cds-empty-state-example placement="centre"></cds-empty-state-example>
 *
 * @element cds-empty-state-example
 */
@customElement('cds-empty-state-example')
class CDSEmptyStateExample extends LitElement {
  /**
   * Alignment of every empty state relative to its own container.
   * @default 'left'
   */
  @property({ reflect: true })
  placement: 'left' | 'centre' = 'left';

  @state()
  private _searchValue = '';

  @state()
  private _sideNavExpanded = false;

  private get _filteredRows() {
    const q = this._searchValue.trim().toLowerCase();
    if (!q) return TABLE_ROWS;
    return TABLE_ROWS.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q))
    );
  }

  private _handleSearch(e: Event) {
    const input = e.target as HTMLInputElement;
    this._searchValue = input.value ?? '';
  }

  private _clearSearch() {
    this._searchValue = '';
    // Reset the toolbar search input
    const search = this.shadowRoot?.querySelector('cds-table-toolbar-search') as HTMLInputElement | null;
    if (search) search.value = '';
  }

  private _toggleSideNav() {
    this._sideNavExpanded = !this._sideNavExpanded;
  }

  render() {
    const { placement, _filteredRows: filteredRows, _sideNavExpanded: expanded } = this;
    const isCentre = placement === 'centre';
    const noResults = filteredRows.length === 0;
    const emptyWrapMod = isCentre ? 'es-example__empty-wrap--centre' : 'es-example__empty-wrap--left';

    return html`
      <cds-header aria-label="IBM Platform">
        <cds-skip-to-content></cds-skip-to-content>
        <cds-header-menu-button
          aria-label="${expanded ? 'Close menu' : 'Open menu'}"
          ?active="${expanded}"
          @click="${this._toggleSideNav}">
        </cds-header-menu-button>
        <cds-header-name href="#" prefix="IBM">[Platform]</cds-header-name>
        <cds-header-nav aria-label="IBM Platform">
          <cds-header-nav-item href="#">Link</cds-header-nav-item>
          <cds-header-nav-item href="#">Link</cds-header-nav-item>
          <cds-header-nav-item href="#">Link</cds-header-nav-item>
        </cds-header-nav>
        <cds-side-nav
          aria-label="Side navigation"
          ?expanded="${expanded}"
          collapse-mode="rail">
          ${SIDE_NAV_LINKS.map((label) => html`
            <cds-side-nav-link href="#">${label}</cds-side-nav-link>
          `)}
        </cds-side-nav>
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
                  <cds-button kind="primary">Add asset</cds-button>
                </cds-table-toolbar-content>
              </cds-table-toolbar>
              <cds-table-head>
                <cds-table-header-row>
                  ${TABLE_HEADERS.map((h) => html`
                    <cds-table-header-cell>${h.header}</cds-table-header-cell>
                  `)}
                </cds-table-header-row>
              </cds-table-head>
              <cds-table-body>
                ${!noResults ? filteredRows.map((row) => html`
                  <cds-table-row>
                    <cds-table-cell>${row.name}</cds-table-cell>
                    <cds-table-cell>${row.protocol}</cds-table-cell>
                    <cds-table-cell>${row.port}</cds-table-cell>
                    <cds-table-cell>${row.rule}</cds-table-cell>
                  </cds-table-row>
                `) : ''}
              </cds-table-body>
            </cds-table>

            ${noResults ? html`
              <div class="es-example__empty-wrap ${emptyWrapMod}">
                <cds-empty-state
                  illustration-src="${notFoundSrc}"
                  illustration-description="No results illustration"
                  heading="No results match the current search"
                  subtitle="Clear the search field to see all results, or try a different search term."
                  action-text="Clear search"
                  action-kind="tertiary"
                  @click="${(e: Event) => { if ((e.target as HTMLElement).tagName === 'CDS-BUTTON') this._clearSearch(); }}">
                </cds-empty-state>
              </div>
            ` : ''}
          </div>

          <!-- ── Vertical tile (spans 2 grid rows) ─────────────────────── -->
          <div class="es-example__col--span-2">
            <cds-tile class="es-example__tile">
              <p class="es-example__tile-label">Label</p>
              <p class="es-example__tile-title">Title</p>
              <div class="es-example__tile-empty--vertical${isCentre ? ' es-example__tile-empty--vertical--centre' : ''}">
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
          ${([0, 1] as const).map(() => html`
            <div class="es-example__col-half">
              <cds-tile class="es-example__tile">
                <p class="es-example__tile-label">Label</p>
                <p class="es-example__tile-title">Title</p>
                <div class="es-example__tile-empty--horizontal${isCentre ? ' es-example__tile-empty--horizontal--centre' : ''}">
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
          `)}

        </div>
      </main>
    `;
  }

  static styles = styles;
}

export default CDSEmptyStateExample;
