/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/notification/toast-notification.js';

import '../../../../src/components/tearsheet-preview/index';
import '../../../../src/components/add-select/add-select';
import '../../../../src/components/add-select/add-select-body';
import '../../../../src/components/add-select/add-select-content';
import '../../../../src/components/add-select/add-select-row';
import { AddSelectData, AddSelectItem } from '@carbon/ibm-products-web-components';


import styles from './single-add-select.scss?lit';

// Sample data for the example with hierarchy
const sampleItems: AddSelectItem[] = [
            {
              id: '1',
              title: 'Kansas',
              value: 'kansas',
            },
            {
              id: '2',
              title: 'Texas',
              value: 'texas',
            },
            {
              id: '3',
              title: 'Florida',
              value: 'florida',
            },
            {
              id: '4',
              title: 'California',
              value: 'california',
              children: {
                entries: [
                  {
                    id: '5',
                    title: 'Los Angeles',
                    value: 'la',
                    children: {
                      entries: [
                        {
                          id: '6',
                          title: 'Beverly Hills',
                          value: 'bh',
                        },
                        {
                          id: '7',
                          title: 'Malibu',
                          value: 'malibu',
                          children: {
                            entries: [
                              {
                                id: '8',
                                title: 'Malibu Rd',
                                value: 'malibu-rd',
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ];

@customElement('single-add-select-example')
export class AddSelectExample extends LitElement {
  static styles = styles;

  // Initialize the data utility
  private dataManager = new AddSelectData();

  @state()
  private _open: boolean = false;

  @state()
  private _showNotification: boolean = false;

  @state()
  private _selectedItem: string = '';

  @state()
  private _searchTerm: string = '';

  @state()
  private _filteredItems: AddSelectItem[] = [];

  @state()
  private _currentItems: AddSelectItem[] = [];

  @state()
  private _navigationStack: Array<{items: AddSelectItem[], parentId: string, parentTitle: string}> = [];

  constructor() {
    super();
    // Initialize data manager with sample items
    this.dataManager.setItems(sampleItems);
    this._filteredItems = this.dataManager.getItems();
    this._currentItems = this.dataManager.getItems();
  }

  private _openAddSelect() {
    this._open = true;
    this._searchTerm = '';
    this._filteredItems = this.dataManager.getItems();
    this._currentItems = this.dataManager.getItems();
    this._selectedItem = '';
    this._navigationStack = [];
    // Clear previous selections
    this.dataManager.clearSelections();
  }

  private _handleClose() {
    this._open = false;
    this._currentItems = this.dataManager.getItems();
    this._navigationStack = [];
  }

  private _handleItemSelect(event: CustomEvent) {
    // Update selected item when an item is selected
    const { itemId, selected } = event.detail;
    console.log(event.detail);
    if (selected) {
      this._selectedItem = itemId;
      // Use the data manager to set selection (exclusive mode for single select)
      this.dataManager.setSelectedItems(itemId, true);
    } else {
      // Clear selection when item is deselected
      this._selectedItem = '';
      this.dataManager.clearSelections();
    }
    console.log(this._selectedItem);
  }

  private _handleSubmit() {
    if (this._selectedItem) {
      this._handleClose();
      this._showNotification = true;
      setTimeout(() => {
        this._showNotification = false;
      }, 3000);
    }
  }

  private _handleSearch(event: CustomEvent) {
    this._searchTerm = event.detail.searchTerm.toLowerCase();
    
    if (this._searchTerm) {
      // Use the data manager's search functionality
      this._filteredItems = this.dataManager.search(this._searchTerm, {
        caseSensitive: false,
        searchFields: ['title', 'value']
      });
    } else {
      this._filteredItems = this._currentItems;
    }
  }

  private _handleNavigate(event: CustomEvent) {
    const { itemId, title, parentId } = event.detail;
    console.log('Navigate to children of:', title, itemId);
    
    // Use the data manager to get children
    const children = this.dataManager.getItemChildren(itemId);
    
    if (children.length > 0) {
      // Save current state to navigation stack
      this._navigationStack = [
        ...this._navigationStack,
        {
          items: this._currentItems,
          parentId: parentId || '',
          parentTitle: title
        }
      ];
      
      // Update current items to show children
      this._currentItems = children;
      this._filteredItems = children;
      this._searchTerm = '';
      this._selectedItem = '';
    }
  }

  private _handleNavigateBack() {
    if (this._navigationStack.length > 0) {
      const previous = this._navigationStack[this._navigationStack.length - 1];
      this._navigationStack = this._navigationStack.slice(0, -1);
      this._currentItems = previous.items;
      this._filteredItems = previous.items;
      this._searchTerm = '';
      this._selectedItem = '';
    }
  }

  private _handleBreadcrumbClick(event: CustomEvent) {
    const { index } = event.detail;
    console.log('Breadcrumb clicked, navigate to index:', index);
    
    // Navigate back to the clicked breadcrumb level
    const levelsToGoBack = this._navigationStack.length - index;
    
    for (let i = 0; i < levelsToGoBack; i++) {
      this._handleNavigateBack();
    }
  }

  private _getBreadcrumbPath() {
    const path = [{ id: 'root', title: 'Categories' }];
    
    this._navigationStack.forEach(item => {
      path.push({ id: item.parentId, title: item.parentTitle });
    });
    
    return path;
  }


  private _onNotificationClose() {
    this._showNotification = false;
  }

  render() {
    // Use the data manager to get the selected item
    const selectedItemData = this.dataManager.getItem(this._selectedItem);

    return html`
      <div class="example-container">
        <h3>Single Add Select Pattern Example</h3>
        <p>Click the button below to open the single add select dialog.</p>
        
        <cds-button
          class="launch-button"
          type="button"
          kind="primary"
          size="md"
          @click="${this._openAddSelect}"
        >
          Select an item
        </cds-button>

        ${this._showNotification
          ? html`
              <cds-toast-notification
                kind="success"
                title="Item selected"
                subtitle="You selected: ${selectedItemData?.title}"
                timeout="3000"
                @cds-notification-closed="${this._onNotificationClose}"
              >
              </cds-toast-notification>
            `
          : ''}

        <!-- Single Add Select Pattern using Preview Tearsheet -->
        ${this._open ? html`
          <c4p-add-select ?multi=${false}>
            <c4p-preview-tearsheet
              ?open=${this._open}
              variant="narrow"
              @c4p-preview-tearsheet-closed="${this._handleClose}"
            >
              <!-- Header -->
              <c4p-tearsheet-header hide-close-button>
                <c4p-tearsheet-header-content title="Select category">
                  <div slot="description">Choose one category from the list below</div>
                </c4p-tearsheet-header-content>
              </c4p-tearsheet-header>

              <!-- Body with Add Select Content -->
              <c4p-tearsheet-body>
                <c4p-add-select-body
                  slot="main-content"
                  global-search-label="Search categories"
                  global-search-placeholder="Search..."
                  items-label="Categories"
                  search-results-title="Search results"
                  no-results-title="No results found"
                  no-results-description="Try adjusting your search"
                  .itemCount="${this._filteredItems.length}"
                  .path="${this._getBreadcrumbPath()}"
                  @c4p-add-select-body-search="${this._handleSearch}"
                  @c4p-add-select-body-breadcrumb-click="${this._handleBreadcrumbClick}"
                >
                  ${this._filteredItems.length > 0
                    ? html`
                        <c4p-add-select-content>
                          ${this._filteredItems.map(
                            (item) => {
                              // Use the data manager to check if item has children
                              const hasChildren = this.dataManager.hasChildren(item.id);
                              return html`
                                <c4p-add-select-row
                                  item-id="${item.id}"
                                  title="${item.title}"
                                  value="${item.value}"
                                  ?has-children="${hasChildren}"
                                  ?selected="${this._selectedItem === item.id}"
                                  @c4p-add-select-row-select="${this._handleItemSelect}"
                                  @c4p-add-select-row-navigate="${this._handleNavigate}"
                                >
                                </c4p-add-select-row>
                              `;
                            }
                          )}
                        </c4p-add-select-content>
                      `
                    : html`
                        <div class="no-results">
                          <h4 class="no-results__title">No results found</h4>
                          <p class="no-results__description">
                            Try adjusting your search or browse categories
                          </p>
                        </div>
                      `}
                </c4p-add-select-body>
              </c4p-tearsheet-body>

              <!-- Footer with Action Buttons -->
              <c4p-tearsheet-footer slot="footer">
                <div class="default__action-buttons">
                  <cds-button
                    kind="secondary"
                    @click="${this._handleClose}"
                  >
                    Cancel
                  </cds-button>
                  <cds-button
                    kind="primary"
                    @click="${this._handleSubmit}"
                    ?disabled="${!this._selectedItem}"
                  >
                    Select
                  </cds-button>
                </div>
              </c4p-tearsheet-footer>
            </c4p-preview-tearsheet>
          </c4p-add-select>
        ` : ''}
      </div>
    `;
  }
}

export default AddSelectExample;
