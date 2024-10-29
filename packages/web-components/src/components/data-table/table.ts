/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { forEach } from '../../globals/internal/collection-helpers';
import { TABLE_SIZE, TABLE_SORT_DIRECTION } from './defs';
import styles from './data-table.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import {
  CDSRadioButton,
  CDSTableBatchActions,
  CDSTableCell,
  CDSTableHeaderCell,
  CDSTableHeaderRow,
  CDSTableRow,
  CDSTableToolbarSearch,
} from '../..';
import CDSTableExpandedRow from './table-expanded-row';

export { TABLE_SIZE };

/**
 * Data table.
 *
 * @element cds-table
 * @fires cds-table-header-cell-sort
 *   The name of the custom event fired before a new sort direction is set upon a user gesture.
 *   Cancellation of this event stops the user-initiated change in sort direction.
 * @fires cds-search input
 *   The name of the custom event fired during search bar input
 * @fires cds-table-change-selection-all
 *   The name of the custom event fired before header row is selected/unselected upon a user gesture.
 * @fires cds-table-row-change-selection
 *   The name of the custom event fired before a row is selected/unselected upon a user gesture.
 * @fires cds-table-batch-actions-cancel-clicked
 *   The name of the custom event fired after the Cancel button is clicked.
 * @fires cds-table-row-expando-toggled
 *   The name of the custom event fired after the expanded state of a row is toggled upon a user gesture.
 * @fires cds-table-row-selected
 *   The name of the custom event fired after a row has been selected.
 * @fires cds-table-row-all-selected
 *   The name of the custom event fired after all rows have been selected.
 * @fires cds-table-sorted
 *   The name of the custom event fired after the table has been sorted.
 * @fires cds-table-filtered
 *   The name of the custom event fired after the table has been filtered containing remaining rows.
 */
@customElement(`${prefix}-table`)
class CDSTable extends HostListenerMixin(LitElement) {
  /**
   * The map of how sorting direction affects sorting order.
   */
  private collationFactors = {
    [TABLE_SORT_DIRECTION.ASCENDING]: 1,
    [TABLE_SORT_DIRECTION.DESCENDING]: -1,
  };

  /**
   * Reference to download button
   */
  @state()
  private _downloadButton;

  /**
   * Current search value for filtering
   */
  @state()
  private _searchValue = '';

  /**
   * Table header row within component
   */
  @state()
  private _tableHeaderRow;

  /**
   * Table body
   */
  @state()
  private _tableBody;

  /**
   * Table expanded row within component
   */
  @state()
  private _tableExpandedRows;

  /**
   * Table rows within component
   */
  @state()
  private _tableRows;

  /**
   * Reference to the component containing batch actions
   */
  @state()
  private _tableBatchActions;

  /**
   * Reference to the table toolbar
   */
  @state()
  private _tableToolbar;

  /**
   * Reference to the table toolbar content
   */
  @state()
  private _tableToolbarContent;

  @state()
  private _selectedRows: CDSTableRow[] = [];

  /**
   * `true` if this table should support batch expansion
   */
  @property({ type: Boolean, reflect: true, attribute: 'batch-expansion' })
  batchExpansion = false;

  /**
   * The g11n collator to use.
   */
  @property({ attribute: false })
  collator;

  /**
   * @param lhs A value.
   * @param rhs Another value.
   * @param collator A custom collator.
   * @returns
   *   `0` if the given two values are equal
   *   A negative value to sort `lhs` to an index lower than `rhs`
   *   A positive value to sort `rhs` to an index lower than `lhs`
   */
  // eslint-disable-next-line class-methods-use-this
  customSortRow(lhs, rhs, collator) {
    if (typeof lhs === 'number' && typeof rhs === 'number') {
      return lhs - rhs;
    }
    return collator.compare(lhs, rhs);
  }

  /**
   * Specify whether the rows should be able to be expandable
   */
  @property({ type: Boolean, reflect: true })
  expandable = false;

  /**
   * The method used when filtering the table with the search bar.
   * Can be replaced with custom method.
   *
   * @param rowText A table row.
   * @param searchString A search string.
   * @returns `false` if the given table row matches the given search string.
   */
  @property()
  filterRows = (rowText: string, searchString: string) =>
    rowText.toLowerCase().indexOf(searchString.toLowerCase()) < 0;

  /**
   * The total headers
   */
  @property()
  headerCount = 0;

  /**
   * `true` if this table contains selectable rows
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-selectable' })
  isSelectable = false;

  /**
   * `true` if this table should support sorting.
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-sortable' })
  isSortable = false;

  /**
   * The table size.
   */
  @property({ reflect: true })
  locale = 'en';

  /**
   * Specify whether the overflow menu (if it exists) should be shown always, or only on hover
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'overflow-menu-on-hover',
  })
  overflowMenuOnHover = false;

  /**
   * Specify whether the control should be a radio button or inline checkbox
   */
  @property({ type: Boolean, reflect: true })
  radio = false;

  /**
   * The table size.
   */
  @property({ reflect: true })
  size = TABLE_SIZE.LG;

  /**
   * TODO: Uncomment when Carbon fully implements sticky header
   * Specify whether the header should be sticky.
   * Still experimental: may not work with every combination of table props
   */
  // @property({ type: Boolean, attribute: 'sticky-header', reflect: true })
  // stickyHeader = false;

  /**
   *  If true, will use a width of 'auto' instead of 100%
   */
  @property({ type: Boolean, attribute: 'use-static-width', reflect: true })
  useStaticWidth = false;

  /**
   *  true to add useZebraStyles striping.
   */
  @property({ type: Boolean, attribute: 'use-zebra-styles', reflect: true })
  useZebraStyles = false;

  @property({ type: Boolean, attribute: 'with-header', reflect: true })
  withHeader;

  /**
   *  true if AI Labels are added in the rows
   */
  @property({ type: Boolean, attribute: 'with-row-ai-labels' })
  withRowAILabels = false;

  /**
   *  true if slugs are added in the rows
   *
   * @deprecated remove in v12, use `with-row-ai-labels` instead
   */
  @property({ type: Boolean, attribute: 'with-row-slugs' })
  withRowSlugs = false;

  private _handleSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    this.withHeader = hasContent;
  }

  private _handleSortAction(columnIndex, sortDirection) {
    const rows = [...this._tableRows];

    // regular row sorting
    rows.sort((a, b) => {
      const cellA = a.querySelectorAll(
        (this.constructor as typeof CDSTable).selectorTableRowCells
      )[columnIndex].textContent;
      const cellB = b.querySelectorAll(
        (this.constructor as typeof CDSTable).selectorTableRowCells
      )[columnIndex].textContent;
      return (
        this.collationFactors[sortDirection] *
        this.customSortRow(cellA, cellB, this.collator)
      );
    });

    // take into account the expanded rows, mapping each expandable row to its original for proper reinsertion
    if (this.expandable) {
      const originalRows = [...this._tableRows];
      const expandedRows = [...this._tableExpandedRows];

      const mapping = originalRows.reduce((acc, element, index) => {
        const sortId = element.getAttribute('sort-id');
        acc[sortId] = expandedRows[index];
        return acc;
      }, {});

      const sortedWithExpanded = [] as any;

      rows.forEach((e) => {
        const sortId = e.getAttribute('sort-id');
        sortedWithExpanded.push(e);
        sortedWithExpanded.push(mapping[sortId]);
      });

      sortedWithExpanded.forEach((e) => {
        this._tableBody.insertBefore(e, null);
      });
    } else {
      rows.forEach((e) => {
        this._tableBody.insertBefore(e, null);
      });
    }
  }

  private _handleFilterRows() {
    const unfilteredRows = [] as any;
    forEach(this._tableRows, (elem) => {
      let rowText = elem.textContent?.trim();
      let filtered = this.filterRows(rowText as string, this._searchValue);
      (elem as any).filtered = filtered;

      if (filtered && this.expandable) {
        rowText = (elem as any).nextElementSibling.textContent?.trim();
        filtered = this.filterRows(rowText as string, this._searchValue);
        (elem as any).filtered = filtered;
      }

      if (!filtered) {
        unfilteredRows.push(elem);
      }

      if (this.expandable) {
        (elem as any).nextElementSibling.filtered = filtered;
      }
    });

    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        unfilteredRows,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSTable).eventTableFiltered,
        init
      )
    );
  }

  /**
   * Download manager for selected rows.
   */
  private _handleDownload({ target }) {
    const data = [] as any;

    const elementsToArray = (elements) =>
      Array.from(elements, (element) => (element as any).textContent);

    const headerCells = this.querySelectorAll(
      (this.constructor as typeof CDSTable).selectorHeaderCell
    );
    const rows = this._selectedRows;
    const headerTitleArray = elementsToArray(headerCells);

    rows.forEach((row) => {
      const rowData = {};
      const cells = elementsToArray(
        row.querySelectorAll(
          (this.constructor as typeof CDSTable).selectorTableRowCells
        )
      );

      cells.forEach((cellText, index) => {
        const headerTitle = headerTitleArray[index];
        rowData[headerTitle] = cellText;
      });

      data.push(rowData);
    });

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

    target.href = URL.createObjectURL(blob);
  }

  /**
   * Handles batch expansion
   */
  @HostListener('eventExpandoToggle')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleBatchExpansion = async (event: CustomEvent) => {
    const { detail, target } = event;
    const { expanded } = detail;

    if ((target as CDSTableHeaderRow) === this._tableHeaderRow) {
      this._tableRows.forEach((e) => ((e as CDSTableRow).expanded = expanded));
    }
  };

  /**
   * Handles sorting the table depending on the column selected
   */
  @HostListener('eventBeforeSort')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleSort = async (event: CustomEvent) => {
    const { detail, target } = event;
    const { sortDirection } = detail;

    if (!this.contains(target as any)) {
      return;
    }

    const columns = [...this._tableHeaderRow.children];
    const columnIndex = columns.indexOf(target);

    columns.forEach((e) => {
      if (e !== target && this.isSortable) {
        e.setAttribute('sort-direction', 'none');
      } else if (e.hasAttribute('is-sortable')) {
        e.setAttribute('sort-direction', 'none');
      }
    });

    this._handleSortAction(columnIndex, sortDirection);

    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        sortedHeader: columns[columnIndex],
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSTable).eventTableSorted,
        init
      )
    );

    this._handleFilterRows();
  };

  /**
   * Handles search input within the toolbar actions
   */
  @HostListener('eventSearchInput')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleSearchInput = async (event: CustomEvent) => {
    const { detail, target } = event;

    if (this.contains(target as CDSTableToolbarSearch)) {
      const { value } = detail;
      this._searchValue = value;
      this._handleFilterRows();
    }
  };

  /**
   * Handles row selection
   */
  @HostListener('eventBeforeChangeSelection')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleRowSelect = async (event: CustomEvent) => {
    const { detail, target } = event;
    const { selected } = detail;
    const {
      _tableBatchActions: tableBatchActions,
      _tableToolbarContent: tableToolbarContent,
      _tableHeaderRow: tableHeaderRow,
      _selectedRows: selectedRows,
    } = this;

    if (!this.contains(target as CDSTableRow)) {
      return;
    }

    if (this.radio) {
      this._tableRows.forEach((e) => {
        if (e !== target) {
          e.removeAttribute('selected');
          e.shadowRoot!.querySelector(`${prefix}-radio-button`).checked = false;
        }
      });
      this._selectedRows.push(...[target as CDSTableRow]);
    } else {
      if (selectedRows.includes(target as CDSTableRow)) {
        this._selectedRows = selectedRows.filter((e) => e !== target);
      } else {
        selectedRows.push(target as CDSTableRow);
      }

      if (tableBatchActions) {
        tableBatchActions.active = this._selectedRows?.length;
        tableBatchActions.selectedRowsCount += selected ? 1 : -1;
      }

      if (tableToolbarContent) {
        tableToolbarContent.hasBatchActions = this._selectedRows.length;
      }
    }

    const totalRows = [...this._tableRows].filter(
      (elem) => !elem.hasAttribute('filtered')
    ).length;

    // selected header checkbox upon all rows being selected
    const headerCheckbox = tableHeaderRow.shadowRoot
      ?.querySelector(`${prefix}-checkbox`)
      .shadowRoot.querySelector(`.${prefix}--checkbox`);
    const allRowsSelected = this._selectedRows.length === totalRows;
    headerCheckbox.checked = !this._selectedRows.length ? false : true;
    headerCheckbox.indeterminate =
      !allRowsSelected && this._selectedRows.length > 0;

    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        selectedRow: target,
        selectedRows: selectedRows,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSTable).eventTableRowSelect,
        init
      )
    );
  };

  /**
   * Handles header row selection, selecting/unselecting all rows
   */
  @HostListener('eventBeforeChangeSelectionAll')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleAllRowsSelect = async (event: CustomEvent) => {
    const { detail, target } = event;
    const { selected } = detail;
    const {
      _tableBatchActions: tableBatchActions,
      _tableToolbarContent: tableToolbarContent,
      _tableRows: tableRows,
    } = this;

    if (!this.contains(target as CDSTableRow)) {
      return;
    }

    let totalRows = 0;
    forEach(tableRows, (elem) => {
      if (!(elem as CDSTableRow).filtered) {
        (elem as CDSTableRow).selected = selected;
        this.radio
          ? ((
              (elem as CDSTableRow).shadowRoot!.querySelector(
                `${prefix}-radio-button`
              ) as CDSRadioButton
            ).checked = selected)
          : null;
        this._selectedRows.push(elem as CDSTableRow);
        totalRows++;

        const { selectorTableExpandedRows } = this
          .constructor as typeof CDSTable;
        const { nextElementSibling } = elem;

        // selecting the expanded row as well
        if (nextElementSibling?.matches(selectorTableExpandedRows)) {
          (elem.nextElementSibling as CDSTableExpandedRow).selected = selected;
        }
      }
    });

    if (!selected) {
      this._selectedRows = [];
    }

    if (tableBatchActions) {
      tableBatchActions.selectedRowsCount = selected ? totalRows : 0;
      tableBatchActions.active = selected;
    }

    if (tableToolbarContent) {
      tableToolbarContent.hasBatchActions = selected;
    }

    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        selectedRows: this._selectedRows,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSTable).eventTableRowSelectAll,
        init
      )
    );
  };

  /**
   * Handles cancel button within the toolbar actions
   */
  @HostListener('eventClickCancel')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleCancelSelection = async (event: CustomEvent) => {
    const { target } = event;
    const { _tableHeaderRow: tableHeaderRow } = this;

    if (this.contains(target as CDSTableBatchActions)) {
      tableHeaderRow.shadowRoot
        ?.querySelector(`${prefix}-checkbox`)
        .shadowRoot.querySelector(`.${prefix}--checkbox`)
        .click();
    }
  };

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'table');
    }

    /**
     * If using `with-row-slugs`, set `with-row-ai-labels` attribute to true so
     * the styles are applied for slug as well
     *
     * remove in v12
     */
    if (this.withRowSlugs) {
      this.setAttribute('with-rows-ai-labels', '');
      this.withRowAILabels = true;
    }
    super.connectedCallback();
  }

  firstUpdated() {
    this._tableBatchActions = this.querySelector(
      (this.constructor as typeof CDSTable).selectorTableBatchActions
    );
    this._tableToolbar = this.querySelector(
      (this.constructor as typeof CDSTable).selectorTableToolbar
    );
    this._tableToolbarContent = this.querySelector(
      (this.constructor as typeof CDSTable).selectorTableToolbarContent
    );
    this._tableBody = this.querySelector(
      (this.constructor as typeof CDSTable).selectorTableBody
    );
    this._tableHeaderRow = this.querySelector(
      (this.constructor as typeof CDSTable).selectorRowsWithHeader
    );
    this._tableExpandedRows = this.querySelectorAll(
      (this.constructor as typeof CDSTable).selectorTableExpandedRows
    );

    this._tableRows = this.querySelectorAll(
      (this.constructor as typeof CDSTable).selectorTableRow
    );

    this._downloadButton = this.querySelector(
      (this.constructor as typeof CDSTable).selectorToolbarDownload
    );
    if (this._downloadButton) {
      this._downloadButton.onclick = this._handleDownload.bind(this);
    }
    this.headerCount = this._tableHeaderRow.children.length;
  }

  updated(changedProperties) {
    if (changedProperties.has('expandable')) {
      this._tableRows.forEach((e, index) => {
        e.expandable = this.expandable;
        e.setAttribute('sort-id', index);
      });
      this._tableHeaderRow.expandable = this.expandable;
      this._tableHeaderRow.batchExpansion = this.batchExpansion;
      this.headerCount += this.expandable ? 1 : -1;
    }

    if (changedProperties.has('headerCount')) {
      this._tableExpandedRows.forEach((e) => {
        e.setAttribute('colspan', this.headerCount);
      });
    }

    if (changedProperties.has('isSelectable')) {
      if (this.isSelectable) {
        this._tableHeaderRow.setAttribute('selection-name', 'header');
        this._tableRows.forEach((e, index) => {
          if (!e.hasAttribute('selection-name')) {
            e.setAttribute('selection-name', index);
          }
        });
      }
      this.headerCount++;
    }

    if (changedProperties.has('locale')) {
      this.collator = new Intl.Collator(this.locale);
    }
    if (changedProperties.has('isSortable')) {
      if (this.isSortable) {
        this._enableSortAction();
      }
    }

    if (
      changedProperties.has('overflowMenuOnHover') ||
      changedProperties.has('size')
    ) {
      forEach(
        this.querySelectorAll(
          (this.constructor as typeof CDSTable).selectorTableCellOverflowMenu
        ),
        (elem) => {
          const cell = elem.parentNode as CDSTableCell;
          const row = cell.parentNode as CDSTableRow;
          cell.overflowMenuOnHover = this.overflowMenuOnHover;
          row.overflowMenuOnHover = this.overflowMenuOnHover;
          cell.setAttribute('size', this.size);
          elem.setAttribute('size', this.size);
          elem.setAttribute('data-table', '');
        }
      );
    }

    if (changedProperties.has('radio')) {
      // Propagate `size` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(
        this.querySelectorAll(
          (this.constructor as typeof CDSTable).selectorTableRow
        ),
        (elem) => {
          (elem as CDSTableRow).radio = this.radio;
        }
      );
    }

    if (changedProperties.has('size')) {
      // Propagate `size` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(
        this.querySelectorAll(
          (this.constructor as typeof CDSTable).selectorAllRows
        ),
        (elem) => {
          elem.setAttribute('size', this.size);
        }
      );
      this._tableToolbar?.setAttribute('size', this.size);
    }

    // TODO: Uncomment when Carbon fully implements Sticky header feature
    // if (changedProperties.has('stickyHeader')) {
    //   const tableBody = this.querySelector(
    //     (this.constructor as typeof CDSTable).selectorTableBody
    //   );
    //   const tableHead = this.querySelector(
    //     (this.constructor as typeof CDSTable).selectorTableHead
    //   );
    //   (tableBody as any).stickyHeader = this.stickyHeader;
    //   (tableHead as any).stickyHeader = this.stickyHeader;
    //   forEach(
    //     this.querySelectorAll(
    //       (this.constructor as typeof CDSTable).selectorRowsWithHeader
    //     ),
    //     (elem) => {
    //       (elem as any).stickyHeader = this.stickyHeader;
    //     }
    //   );
    //   forEach(
    //     this.querySelectorAll(
    //       (this.constructor as typeof CDSTable).selectorTableCells
    //     ),
    //     (elem) => {
    //       (elem as any).stickyHeader = this.stickyHeader;
    //     }
    //   );
    // }

    if (changedProperties.has('useZebraStyles')) {
      const tableBody = this.querySelector(
        (this.constructor as typeof CDSTable).selectorTableBody
      );
      (tableBody as any).useZebraStyles = this.useZebraStyles;
    }

    if (this.withRowAILabels) {
      this._tableHeaderRow.setAttribute('rows-with-ai-label', '');
      this._tableRows.forEach((row) => {
        row.setAttribute('rows-with-ai-label', '');
      });
    } else {
      this._tableHeaderRow.removeAttribute('rows-with-ai-label');
      this._tableRows.forEach((row) => {
        row.removeAttribute('rows-with-ai-label');
      });
    }

    // Gets table header info to add to the column cells for styles
    const headersWithAILabel: number[] = [];

    Array.prototype.slice
      .call(this._tableHeaderRow.children)
      .forEach((headerCell, index) => {
        if (
          headerCell.querySelector(`${prefix}-ai-label`) ||
          headerCell.querySelector(`${prefix}-slug`)
        ) {
          headerCell.setAttribute('ai-label', '');
          headersWithAILabel.push(index);
        } else {
          headerCell.removeAttribute('ai-label');
        }
      });

    this._tableRows.forEach((row) => {
      Array.prototype.slice
        .call((row as HTMLElement).children)
        .forEach((cell, index) => {
          headersWithAILabel.includes(index)
            ? cell.setAttribute('ai-label-in-header', '')
            : cell.removeAttribute('ai-label-in-header');
        });
    });
  }

  /* eslint-disable no-constant-condition */
  render() {
    return html`
      <div class="${prefix}--data-table-header-container">
        <div ?hidden="${!this.withHeader}" class="${prefix}--data-table-header">
          <slot @slotchange="${this._handleSlotChange}" name="title"></slot>
          <slot
            @slotchange="${this._handleSlotChange}"
            name="description"></slot>
        </div>
        <slot name="toolbar"></slot>
      </div>

      ${false // TODO: replace with this.stickyHeader when feature is fully implemented
        ? html` <div class="${prefix}--data-table_inner-container">
            <div class="${prefix}--data-table-content">
              <slot></slot>
            </div>
          </div>`
        : html`<slot></slot>`}
    `;
  }

  /**
   * Adds isSortable value for table header cells.
   */
  _enableSortAction() {
    const headerCells = this.querySelectorAll(
      (this.constructor as typeof CDSTable).selectorHeaderCell
    );
    headerCells.forEach((e) => {
      (e as CDSTableHeaderCell).isSortable = this.isSortable;
      (e as CDSTableHeaderCell).isSelectable = this.isSelectable;
      (e as CDSTableHeaderCell).isExpandable = this.expandable;
    });
    const columns = [...this._tableHeaderRow.children];
    let sortDirection;
    let columnIndex = 0;
    columns.forEach((column, index) => {
      if (
        column.hasAttribute('sort-direction') &&
        column.getAttribute('sort-direction') !== 'none'
      ) {
        sortDirection = column.getAttribute('sort-direction');
        columnIndex = index;
      }
    });

    columns.forEach((e, index) => {
      if (index !== columnIndex && this.isSortable) {
        e.setAttribute('sort-direction', 'none');
      } else if (e.hasAttribute('is-sortable')) {
        e.setAttribute('sort-direction', 'none');
      }
    });
    this._handleSortAction(columnIndex, sortDirection);
  }

  /* eslint-enable no-constant-condition */

  /**
   * The name of the custom event fired before a new sort direction is set upon a user gesture.
   * Cancellation of this event stops the user-initiated change in sort direction.
   */
  static get eventBeforeSort() {
    return `${prefix}-table-header-cell-sort`;
  }

  /**
   * The name of the custom event fired during search bar input
   */
  static get eventSearchInput() {
    return `${prefix}-search-input`;
  }

  /**
   * The name of the custom event fired before header row is selected/unselected upon a user gesture.
   */
  static get eventBeforeChangeSelectionAll() {
    return `${prefix}-table-change-selection-all`;
  }

  /**
   * The name of the custom event fired before a row is selected/unselected upon a user gesture.
   */
  static get eventBeforeChangeSelection() {
    return `${prefix}-table-row-change-selection`;
  }

  /**
   * The name of the custom event fired after the Cancel button is clicked.
   */
  static get eventClickCancel() {
    return `${prefix}-table-batch-actions-cancel-clicked`;
  }

  /**
   * The name of the custom event fired after the expanded state a row is toggled upon a user gesture.
   */
  static get eventExpandoToggle() {
    return `${prefix}-table-row-expando-toggled`;
  }

  /**
   * The name of the custom event fired after a row has been selected
   */
  static get eventTableRowSelect() {
    return `${prefix}-table-row-selected`;
  }

  /**
   * The name of the custom event fired after all rows have been selected
   */
  static get eventTableRowSelectAll() {
    return `${prefix}-table-row-all-selected`;
  }

  /**
   * The name of the custom event fired after the table has been sorted
   */
  static get eventTableSorted() {
    return `${prefix}-table-sorted`;
  }

  /**
   * The name of the custom event fired after the table has been filtered containing remaining rows.
   */
  static get eventTableFiltered() {
    return `${prefix}-table-filtered`;
  }

  /**
   * The CSS selector to find the overflow menu on the table cell
   */
  static get selectorTableCellOverflowMenu() {
    return `${prefix}-table-cell ${prefix}-overflow-menu`;
  }

  /**
   * The CSS selector to find the download button
   */
  static get selectorToolbarDownload() {
    return `${prefix}-button[download]`;
  }

  /**
   * The CSS selector to find the table batch actions
   */
  static get selectorTableBatchActions() {
    return `${prefix}-table-batch-actions`;
  }

  /**
   * The CSS selector to find the table toolbar
   */
  static get selectorTableToolbar() {
    return `${prefix}-table-toolbar`;
  }

  /**
   * The CSS selector to find the table toolbar content
   */
  static get selectorTableToolbarContent() {
    return `${prefix}-table-toolbar-content`;
  }

  /**
   * The CSS selector to find the table toolbar search
   */
  static get selectorTableToolbarSearch() {
    return `${prefix}-table-toolbar-search`;
  }

  /**
   * The CSS selector to find the table head
   */
  static get selectorTableHead() {
    return `${prefix}-table-head`;
  }

  /**
   * The CSS selector to find the table body
   */
  static get selectorTableBody() {
    return `${prefix}-table-body`;
  }

  /**
   * The CSS selector to find the table expanded rows
   */
  static get selectorTableExpandedRows() {
    return `${prefix}-table-expanded-row`;
  }

  /**
   * The CSS selector to find the table rows
   */
  static get selectorTableRow() {
    return `${prefix}-table-row`;
  }

  /**
   * The CSS selector to find the rows cells.
   */
  static get selectorTableRowCells() {
    return `${prefix}-table-cell`;
  }

  /**
   * The CSS selector to find the rows cells, including header cells.
   */
  static get selectorTableCells() {
    return `${prefix}-table-cell, ${prefix}-table-header-cell`;
  }

  /**
   * The CSS selector to find the header cell
   */
  static get selectorHeaderCell() {
    return `${prefix}-table-header-cell`;
  }

  /**
   * The CSS selector to find the rows, including header rows.
   */
  static get selectorRowsWithHeader() {
    return `${prefix}-table-header-row,${prefix}-table-row`;
  }

  /**
   * The CSS selector to find all rows
   */
  static get selectorAllRows() {
    return `${prefix}-table-header-row,${prefix}-table-row,${prefix}-table-expanded-row`;
  }

  static styles = styles;
}

export default CDSTable;
