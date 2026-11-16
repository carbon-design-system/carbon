/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../../../../../components/button/index';
import '../../../../../components/notification/toast-notification';
import '../../../../../components/tag/index';

import '../../../../../components/tearsheet/index';
import '../../../../../components/add-select/index';
import { AddSelectData } from '@carbon/utilities';
import type { AddSelectItem, ItemDetailEntry } from '@carbon/utilities';

import styles from './single-add-select-with-hierarchy-side-panel.scss?lit';

/**
 * Helper: build the preferred ItemDetailEntry[] form from a key→value map.
 * This is the form consumed by AddSelectItemPanel / AddSelectSelectionSummaryItem
 * defaultContent() renderers.
 */
function makeDetails(map: Record<string, string>): ItemDetailEntry[] {
  return Object.entries(map).map(([label, value]) => ({ label, value }));
}

// Hierarchical data matching the React AddSingleItemFromHierarchy preview.
//
// itemDetails uses the preferred ItemDetailEntry[] form (array of {label, value}).
// description and tags are stored as top-level custom properties — valid because
// AddSelectItem has an `[key: string]: unknown` index signature.
const sampleItems: AddSelectItem[] = [
  {
    id: 'connection-1',
    title: 'Connection',
    value: 'connection',
    subtitle: '7 schemas',
    description:
      'Description text can go here in multiple lines to describe this category a little more and give the user more metadata. No more than 4 lines of text will be show.',
    tags: ['Tag here', 'Long tag name here'],
    itemDetails: makeDetails({ Columns: '19', Rows: '1,852', Size: '89.834 MB' }),
    children: {
      entries: [
        {
          id: 'schema-1',
          title: 'Schema 1',
          value: 'schema',
          subtitle: '54 tables',
          description:
            'Primary schema containing 54 tables with comprehensive data collections and regional information.',
          tags: ['Schema', 'Primary', 'Regional Data'],
          itemDetails: makeDetails({ Tables: '54', 'Total Rows': '78,456', 'Total Size': '3.8 GB' }),
          children: {
            entries: [
              {
                id: 'table-1',
                title: 'Data table',
                value: 'data-table',
                subtitle: 'CSV from local',
                description:
                  'Description text can go here in multiple lines to describe this category a little more.',
                tags: ['Tag here', 'Long tag name here'],
                itemDetails: makeDetails({ Columns: '19', Rows: '1,852', Size: '89.834 MB' }),
              },
              {
                id: 'table-2',
                title: 'Quito table',
                value: 'quito-table',
                subtitle: 'CSV from local',
                description: 'This table contains data from Quito region with comprehensive information.',
                tags: ['Regional', 'CSV'],
                itemDetails: makeDetails({ Columns: '25', Rows: '3,421', Size: '125.5 MB' }),
              },
              {
                id: 'table-3',
                title: 'Hyderabad table',
                value: 'hyderabad-table',
                subtitle: 'CSV from local',
                description: 'Hyderabad regional data with detailed metrics and analytics.',
                tags: ['Regional', 'Analytics'],
                itemDetails: makeDetails({ Columns: '18', Rows: '2,156', Size: '95.2 MB' }),
              },
              {
                id: 'table-4',
                title: 'Durban table',
                value: 'durban-table',
                subtitle: 'CSV from local',
                description: 'Durban data collection with various metrics.',
                tags: ['Regional'],
                itemDetails: makeDetails({ Columns: '22', Rows: '1,987', Size: '102.3 MB' }),
              },
            ],
          },
        },
        {
          id: 'schema-2',
          title: 'Schema 2',
          value: 'schema-2',
          subtitle: '32 tables',
          description: 'Schema 2 contains 32 tables with various data collections and analytics information.',
          tags: ['Schema', 'Database'],
          itemDetails: makeDetails({ Tables: '32', 'Total Rows': '45,234', 'Total Size': '2.1 GB' }),
        },
        {
          id: 'schema-3',
          title: 'Schema 3',
          value: 'schema-3',
          subtitle: '18 tables',
          description: 'Schema 3 provides access to 18 specialized tables for data analysis.',
          tags: ['Schema', 'Analytics'],
          itemDetails: makeDetails({ Tables: '18', 'Total Rows': '28,567', 'Total Size': '1.3 GB' }),
        },
      ],
    },
  },
];

interface NavLevel {
  items: AddSelectItem[];
  parentId: string;
  parentTitle: string;
}

@customElement('single-add-select-with-hierarchy-side-panel-example')
export class SingleAddSelectWithHierarchySidePanelExample extends LitElement {
  static styles = styles;

  private dataManager = new AddSelectData();

  @state() private _open = true;
  @state() private _showNotification = false;
  @state() private _selectedItemId = '';
  @state() private _selectedItem: AddSelectItem | null = null;
  @state() private _searchTerm = '';
  @state() private _currentItems: AddSelectItem[] = [];
  @state() private _navigationLevels: NavLevel[] = [];
  @state() private _breadcrumbPath: Array<{ id: string; title: string }> = [
    { id: 'root', title: 'Assets' },
  ];

  constructor() {
    super();
    this.dataManager.setItems(sampleItems);
    this._currentItems = [...sampleItems];
  }

  private _openAddSelect() {
    this.dataManager.clearSelections();
    this._selectedItemId = '';
    this._selectedItem = null;
    this._searchTerm = '';
    this._navigationLevels = [];
    this._breadcrumbPath = [{ id: 'root', title: 'Assets' }];
    this._currentItems = [...sampleItems];
    this._open = true;
  }

  private _handleClose() {
    this._open = false;
  }

  private _handleSearch(e: CustomEvent) {
    const term = e.detail.searchTerm;
    this._searchTerm = term;
    if (term) {
      this._currentItems = this.dataManager.search(term.toLowerCase(), {
        caseSensitive: false,
        searchFields: ['title', 'value', 'subtitle'],
      });
      this._navigationLevels = [];
    } else {
      this._currentItems = [...sampleItems];
      this._navigationLevels = [];
      this._breadcrumbPath = [{ id: 'root', title: 'Assets' }];
    }
  }

  private _handleItemSelect(e: CustomEvent) {
    const { itemId, selected } = e.detail;
    if (selected) {
      this._selectedItemId = itemId;
      this._selectedItem = this.dataManager.getItem(itemId) ?? null;
      this.dataManager.setSelectedItems(itemId, true);
    } else {
      this._selectedItemId = '';
      this._selectedItem = null;
      this.dataManager.clearSelections();
    }
  }

  private _handleNavigate(e: CustomEvent) {
    const { itemId, title } = e.detail;

    // Find which level is the source of navigation
    let sourceColumnIndex = -1;
    for (let i = 0; i < this._navigationLevels.length; i++) {
      if (this._navigationLevels[i].items.some((item) => item.id === itemId)) {
        sourceColumnIndex = i;
        break;
      }
    }

    const isFromRoot = sourceColumnIndex === -1;
    const parentItem = isFromRoot
      ? sampleItems.find((i) => i.id === itemId)
      : this._navigationLevels[sourceColumnIndex]?.items.find((i) => i.id === itemId);

    const children = parentItem?.children?.entries ?? [];
    if (children.length === 0) return;

    // Cap at 2 extra columns (3 total)
    if (isFromRoot) {
      if (this._navigationLevels.length === 2) {
        this._navigationLevels = [{ items: children, parentId: itemId, parentTitle: title }];
        this._breadcrumbPath = [this._breadcrumbPath[0], { id: itemId, title }];
      } else {
        this._navigationLevels = [
          ...this._navigationLevels,
          { items: children, parentId: itemId, parentTitle: title },
        ];
        this._breadcrumbPath = [...this._breadcrumbPath, { id: itemId, title }];
      }
    } else {
      this._navigationLevels = [
        ...this._navigationLevels.slice(0, sourceColumnIndex + 1),
        { items: children, parentId: itemId, parentTitle: title },
      ];
      this._breadcrumbPath = [
        ...this._breadcrumbPath.slice(0, sourceColumnIndex + 2),
        { id: itemId, title },
      ];
    }
  }

  private _handleColumnSearch(columnIndex: number, term: string, items: AddSelectItem[]) {
    // Column-level search: filter displayed items for that column
    // We store per-column filtered items in a parallel array
    const filtered = term
      ? items.filter(
          (item) =>
            item.title?.toLowerCase().includes(term.toLowerCase()) ||
            item.value?.toLowerCase().includes(term.toLowerCase())
        )
      : items;
    // Trigger re-render by updating the navigation levels copy
    const newLevels = [...this._navigationLevels];
    if (newLevels[columnIndex]) {
      newLevels[columnIndex] = { ...newLevels[columnIndex], items: filtered };
      this._navigationLevels = newLevels;
    }
  }

  private _handleBreadcrumbClick(e: CustomEvent) {
    const { index } = e.detail;
    if (index === 0) {
      this._navigationLevels = [];
      this._breadcrumbPath = [{ id: 'root', title: 'Assets' }];
    } else {
      this._navigationLevels = this._navigationLevels.slice(0, index);
      this._breadcrumbPath = this._breadcrumbPath.slice(0, index + 1);
    }
    this._selectedItemId = '';
    this._selectedItem = null;
    this.dataManager.clearSelections();
  }

  private _handleSubmit() {
    if (!this._selectedItemId || !this._selectedItem) return;
    this._handleClose();
    this._showNotification = true;
    setTimeout(() => { this._showNotification = false; }, 3000);
  }

  private _renderSidePanelContent(item: AddSelectItem): TemplateResult {
    // description and tags are stored as top-level custom properties on the item
    // (via AddSelectItem's [key: string]: unknown index signature).
    const description = item.description as string | undefined;
    const tags = item.tags as string[] | undefined;

    // itemDetails is ItemDetailEntry[] — the preferred array form.
    // Each entry has { label: string, value: string | number }.
    const detailEntries = Array.isArray(item.itemDetails)
      ? (item.itemDetails as ItemDetailEntry[])
      : [];

    return html`
      <div class="side-panel-content">
        <div class="side-panel-header">
          <div class="side-panel-title-section">
            <h4 class="side-panel-item-title">${item.title}</h4>
            ${item.subtitle
              ? html`<p class="side-panel-item-subtitle">${item.subtitle}</p>`
              : ''}
          </div>
        </div>

        ${description
          ? html`
              <div class="side-panel-section">
                <h5 class="side-panel-section-title">Description</h5>
                <p class="side-panel-description">${description}</p>
              </div>
            `
          : ''}

        ${detailEntries.length > 0
          ? html`
              <div class="side-panel-section">
                <h5 class="side-panel-section-title">Asset details</h5>
                <div class="side-panel-details">
                  ${detailEntries.map(
                    ({ label, value }) => html`
                      <div class="side-panel-detail-item">
                        <span class="side-panel-detail-key">${label}:</span>
                        <span class="side-panel-detail-value">${value}</span>
                      </div>
                    `
                  )}
                </div>
              </div>
            `
          : ''}

        ${tags && tags.length > 0
          ? html`
              <div class="side-panel-section">
                <h5 class="side-panel-section-title">Tags</h5>
                <div class="side-panel-tags">
                  ${tags.map(
                    (tag) => html`<cds-tag type="gray" size="sm">${tag}</cds-tag>`
                  )}
                </div>
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _renderColumn(
    items: AddSelectItem[],
    columnTitle: string,
    searchPlaceholder = 'Find'
  ): TemplateResult {
    return html`
      <cds-add-select-column
        title="${columnTitle}"
        search-label="${searchPlaceholder}"
        search-placeholder="${searchPlaceholder}"
        .itemCount="${items.length}"
        @cds-add-select-column-search="${(e: CustomEvent) => {
          const colIdx = this._navigationLevels.findIndex(
            (l) => l.parentTitle === columnTitle
          );
          this._handleColumnSearch(colIdx, e.detail.searchTerm, items);
        }}"
      >
        ${items.map(
          (item) => html`
            <cds-add-select-row
              item-id="${item.id}"
              title="${item.title}"
              value="${item.value}"
              subtitle="${item.subtitle ?? ''}"
              ?has-children="${!!(item.children?.entries?.length)}"
              ?selected="${this._selectedItemId === item.id}"
              ?item-panel-open="${this._selectedItemId === item.id}"
              @cds-add-select-row-select="${this._handleItemSelect}"
              @cds-add-select-row-navigate="${this._handleNavigate}"
              @cds-add-select-row-item-panel-click="${this._handleItemSelect}"
            ></cds-add-select-row>
          `
        )}
      </cds-add-select-column>
    `;
  }

  render() {
    const breadcrumbPath = this._searchTerm ? [] : this._breadcrumbPath;

    return html`
      <div class="example-container">
        <h3>Add Single Item From Hierarchy Pattern Example</h3>
        <p>Click the button below to open the add single item dialog with hierarchical navigation and side panel for item details.</p>

        <cds-button kind="primary" class="launch-button" @click="${this._openAddSelect}">
          Add asset
        </cds-button>
      </div>

      <div class="add-single-item-from-hierarchy-pattern">
      <cds-add-select ?multi=${false}>
        <cds-tearsheet
          ?open=${this._open}
          variant="wide"
          summary-content-width="22.5rem"
          @cds-tearsheet-closed="${this._handleClose}"
        >
          <cds-tearsheet-header hide-close-button disable-header-collapse slot="header">
            <cds-tearsheet-header-content title="Add asset">
              <div slot="description">Select asset from the list lorem ipsum dolor infotext.</div>
            </cds-tearsheet-header-content>
          </cds-tearsheet-header>

          <cds-tearsheet-body is-flush>
            <cds-add-select-body
              slot="main-content"
              layout="horizontal"
              global-search-label="Find assets"
              global-search-placeholder="Find assets"
              items-label="Assets"
              search-results-title="Search results"
              .itemCount="${this._currentItems.length}"
              .path="${breadcrumbPath}"
              @cds-add-select-body-search="${this._handleSearch}"
              @cds-add-select-body-breadcrumb-click="${this._handleBreadcrumbClick}"
            >
              ${this._currentItems.length > 0
                ? html`
                    ${this._renderColumn(this._currentItems, 'Assets')}
                    ${this._navigationLevels.map((level) =>
                      this._renderColumn(level.items, level.parentTitle)
                    )}
                  `
                : html`
                    <div class="no-results">
                      <h4 class="no-results__title">No results found</h4>
                      <p class="no-results__description">Try adjusting your search or browse categories</p>
                    </div>
                  `}
            </cds-add-select-body>

            <!-- Side panel summary content -->
            <cds-tearsheet-summary-content is-flush slot="summary-content">
              <cds-add-select-selection-summary
                title="Selected asset"
                .selectedItemCount="${this._selectedItem ? 1 : 0}"
              >
                <div slot="empty-state" class="empty-state">
                  <p class="empty-state-text">Select an item to view details</p>
                </div>
                ${this._selectedItem
                  ? this._renderSidePanelContent(this._selectedItem)
                  : ''}
              </cds-add-select-selection-summary>
            </cds-tearsheet-summary-content>
          </cds-tearsheet-body>

          <cds-tearsheet-footer
            slot="footer"
            .actions="${[
              {
                kind: 'secondary',
                label: 'Cancel',
                onClick: () => this._handleClose(),
              },
              {
                kind: 'primary',
                label: 'Add',
                disabled: !this._selectedItemId,
                onClick: () => this._handleSubmit(),
              },
            ]}"
          ></cds-tearsheet-footer>
        </cds-tearsheet>
      </cds-add-select>
      </div>

      ${this._showNotification
        ? html`
            <div class="notification">
              <cds-toast-notification
                kind="success"
                low-contrast
                title="Asset Added"
                subtitle="Successfully added: ${this._selectedItem?.value ?? ''}"
                timeout="3000"
                @cds-notification-closed="${() => { this._showNotification = false; }}"
              ></cds-toast-notification>
            </div>
          `
        : ''}
    `;
  }
}

export default SingleAddSelectWithHierarchySidePanelExample;
