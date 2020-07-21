/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';
import handles from '../../globals/js/mixins/handles';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

const toArray = (arrayLike) => Array.prototype.slice.call(arrayLike);

class DataTable extends mixin(
  createComponent,
  initComponentBySearch,
  eventedState,
  handles
) {
  /**
   * Data Table
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends   EventedState
   * @param {HTMLElement} element The root element of tables
   * @param {object} [options] the... options
   * @param {string} [options.selectorInit] selector initialization
   * @param {string} [options.selectorExpandCells] css selector for expand
   * @param {string} [options.expandableRow] css selector for expand
   * @param {string} [options.selectorParentRows] css selector for rows housing expansion
   * @param {string} [options.selectorTableBody] root css for table body
   * @param {string} [options.eventTrigger] selector for event bubble capture points
   * @param {string} [options.eventParentContainer] used find the bubble container
   */
  constructor(element, options) {
    super(element, options);

    this.container = element.parentNode;
    this.toolbarEl = this.element.querySelector(this.options.selectorToolbar);
    this.batchActionEl = this.element.querySelector(
      this.options.selectorActions
    );
    this.countEl = this.element.querySelector(this.options.selectorCount);
    this.cancelEl = this.element.querySelector(
      this.options.selectorActionCancel
    );
    this.tableHeaders = this.element.querySelectorAll('th');
    this.tableBody = this.element.querySelector(this.options.selectorTableBody);
    this.expandCells = [];
    this.expandableRows = [];
    this.parentRows = [];

    this.refreshRows();

    this.manage(on(this.element, 'mouseover', this._expandableHoverToggle));
    this.manage(on(this.element, 'mouseout', this._expandableHoverToggle));

    this.manage(
      on(this.element, 'click', (evt) => {
        const eventElement = eventMatches(evt, this.options.eventTrigger);
        const searchContainer = this.element.querySelector(
          this.options.selectorToolbarSearchContainer
        );

        if (eventElement) {
          this._toggleState(eventElement, evt);
        }

        if (searchContainer) {
          this._handleDocumentClick(evt);
        }
      })
    );

    this.manage(on(this.element, 'keydown', this._keydownHandler));

    this.state = {
      checkboxCount: 0,
    };
  }

  _handleDocumentClick(evt) {
    const searchContainer = this.element.querySelector(
      this.options.selectorToolbarSearchContainer
    );
    const searchEvent = eventMatches(evt, this.options.selectorSearchMagnifier);
    const activeSearch = searchContainer.classList.contains(
      this.options.classToolbarSearchActive
    );

    if (searchContainer && searchEvent) {
      this.activateSearch(searchContainer);
    }

    if (activeSearch) {
      this.deactivateSearch(searchContainer, evt);
    }
  }

  activateSearch(container) {
    const input = container.querySelector(this.options.selectorSearchInput);
    container.classList.add(this.options.classToolbarSearchActive);
    input.focus();
  }

  deactivateSearch(container, evt) {
    const trigger = container.querySelector(
      this.options.selectorSearchMagnifier
    );
    const input = container.querySelector(this.options.selectorSearchInput);
    const svg = trigger.querySelector('svg');
    if (
      input.value.length === 0 &&
      evt.target !== input &&
      evt.target !== trigger &&
      evt.target !== svg
    ) {
      container.classList.remove(this.options.classToolbarSearchActive);
      trigger.focus();
    }

    if (evt.which === 27 && evt.target === input) {
      container.classList.remove(this.options.classToolbarSearchActive);
      trigger.focus();
    }
  }

  _sortToggle = (detail) => {
    const { element, previousValue } = detail;

    toArray(this.tableHeaders).forEach((header) => {
      const sortEl = header.querySelector(this.options.selectorTableSort);

      if (sortEl !== null && sortEl !== element) {
        sortEl.classList.remove(this.options.classTableSortActive);
        sortEl.classList.remove(this.options.classTableSortAscending);
      }
    });

    if (!previousValue) {
      element.dataset.previousValue = 'ascending';
      element.classList.add(this.options.classTableSortActive);
      element.classList.add(this.options.classTableSortAscending);
    } else if (previousValue === 'ascending') {
      element.dataset.previousValue = 'descending';
      element.classList.add(this.options.classTableSortActive);
      element.classList.remove(this.options.classTableSortAscending);
    } else if (previousValue === 'descending') {
      element.removeAttribute('data-previous-value');
      element.classList.remove(this.options.classTableSortActive);
      element.classList.remove(this.options.classTableSortAscending);
    }
  };

  _selectToggle = (detail) => {
    const { element } = detail;
    const { checked } = element;

    // increment the  count
    this.state.checkboxCount += checked ? 1 : -1;
    this.countEl.textContent = this.state.checkboxCount;

    const row = element.parentNode.parentNode;

    row.classList.toggle(this.options.classTableSelected);

    // toggle on/off batch action bar
    this._actionBarToggle(this.state.checkboxCount > 0);
  };

  _selectAllToggle = ({ element }) => {
    const { checked } = element;

    const inputs = toArray(
      this.element.querySelectorAll(this.options.selectorCheckbox)
    );

    this.state.checkboxCount = checked ? inputs.length - 1 : 0;

    inputs.forEach((item) => {
      item.checked = checked;

      const row = item.parentNode.parentNode;
      if (checked && row) {
        row.classList.add(this.options.classTableSelected);
      } else {
        row.classList.remove(this.options.classTableSelected);
      }
    });

    this._actionBarToggle(this.state.checkboxCount > 0);

    if (this.batchActionEl) {
      this.countEl.textContent = this.state.checkboxCount;
    }
  };

  _actionBarCancel = () => {
    const inputs = toArray(
      this.element.querySelectorAll(this.options.selectorCheckbox)
    );
    const row = toArray(
      this.element.querySelectorAll(this.options.selectorTableSelected)
    );

    row.forEach((item) => {
      item.classList.remove(this.options.classTableSelected);
    });

    inputs.forEach((item) => {
      item.checked = false;
    });

    this.state.checkboxCount = 0;
    this._actionBarToggle(false);

    if (this.batchActionEl) {
      this.countEl.textContent = this.state.checkboxCount;
    }
  };

  _actionBarToggle = (toggleOn) => {
    let handleTransitionEnd;
    const transition = (evt) => {
      if (handleTransitionEnd) {
        handleTransitionEnd = this.unmanage(handleTransitionEnd).release();
      }

      if (evt.target.matches(this.options.selectorActions)) {
        if (this.batchActionEl.dataset.active === 'false') {
          this.batchActionEl.setAttribute('tabIndex', -1);
        } else {
          this.batchActionEl.setAttribute('tabIndex', 0);
        }
      }
    };

    if (toggleOn) {
      this.batchActionEl.dataset.active = true;
      this.batchActionEl.classList.add(this.options.classActionBarActive);
    } else if (this.batchActionEl) {
      this.batchActionEl.dataset.active = false;
      this.batchActionEl.classList.remove(this.options.classActionBarActive);
    }
    if (this.batchActionEl) {
      handleTransitionEnd = this.manage(
        on(this.batchActionEl, 'transitionend', transition)
      );
    }
  };

  _rowExpandToggle = ({ element, forceExpand }) => {
    const parent = element.closest(this.options.eventParentContainer);
    // NOTE: `data-previous-value` keeps UI state before this method makes change in style
    // eslint-disable-next-line eqeqeq
    const shouldExpand =
      forceExpand != null
        ? forceExpand
        : element.dataset.previousValue === undefined ||
          element.dataset.previousValue === 'expanded';

    if (shouldExpand) {
      element.dataset.previousValue = 'collapsed';
      parent.classList.add(this.options.classExpandableRow);
    } else {
      parent.classList.remove(this.options.classExpandableRow);
      element.dataset.previousValue = 'expanded';
      const expandHeader = this.element.querySelector(
        this.options.selectorExpandHeader
      );
      if (expandHeader) {
        expandHeader.dataset.previousValue = 'expanded';
      }
    }
  };

  _rowExpandToggleAll = ({ element }) => {
    // NOTE: `data-previous-value` keeps UI state before this method makes change in style
    const shouldExpand =
      element.dataset.previousValue === undefined ||
      element.dataset.previousValue === 'expanded';
    element.dataset.previousValue = shouldExpand ? 'collapsed' : 'expanded';
    const expandCells = this.element.querySelectorAll(
      this.options.selectorExpandCells
    );
    Array.prototype.forEach.call(expandCells, (cell) => {
      this._rowExpandToggle({ element: cell, forceExpand: shouldExpand });
    });
  };

  _expandableHoverToggle = (evt) => {
    const element = eventMatches(evt, this.options.selectorChildRow);
    if (element) {
      element.previousElementSibling.classList.toggle(
        this.options.classExpandableRowHover,
        evt.type === 'mouseover'
      );
    }
  };

  _toggleState = (element, evt) => {
    const data = element.dataset;
    const label = data.label ? data.label : '';
    const previousValue = data.previousValue ? data.previousValue : '';
    const initialEvt = evt;

    this.changeState({
      group: data.event,
      element,
      label,
      previousValue,
      initialEvt,
    });
  };

  _keydownHandler = (evt) => {
    const searchContainer = this.element.querySelector(
      this.options.selectorToolbarSearchContainer
    );
    const searchEvent = eventMatches(evt, this.options.selectorSearchMagnifier);
    const activeSearch = searchContainer.classList.contains(
      this.options.classToolbarSearchActive
    );

    if (evt.which === 27) {
      this._actionBarCancel();
    }

    if (searchContainer && searchEvent && evt.which === 13) {
      this.activateSearch(searchContainer);
    }

    if (activeSearch && evt.which === 27) {
      this.deactivateSearch(searchContainer, evt);
    }
  };

  _changeState(detail, callback) {
    this[this.constructor.eventHandlers[detail.group]](detail);
    callback();
  }

  refreshRows = () => {
    const newExpandCells = toArray(
      this.element.querySelectorAll(this.options.selectorExpandCells)
    );
    const newExpandableRows = toArray(
      this.element.querySelectorAll(this.options.selectorExpandableRows)
    );
    const newParentRows = toArray(
      this.element.querySelectorAll(this.options.selectorParentRows)
    );

    // check if this is a refresh or the first time
    if (this.parentRows.length > 0) {
      const diffParentRows = newParentRows.filter(
        (newRow) => !this.parentRows.some((oldRow) => oldRow === newRow)
      );

      // check if there are expandable rows
      if (newExpandableRows.length > 0) {
        const diffExpandableRows = diffParentRows.map(
          (newRow) => newRow.nextElementSibling
        );
        const mergedExpandableRows = [
          ...toArray(this.expandableRows),
          ...toArray(diffExpandableRows),
        ];
        this.expandableRows = mergedExpandableRows;
      }
    } else if (newExpandableRows.length > 0) {
      this.expandableRows = newExpandableRows;
    }

    this.expandCells = newExpandCells;
    this.parentRows = newParentRows;
  };

  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  // UI Events
  static eventHandlers /* #__PURE_CLASS_PROPERTY__ */ = {
    expand: '_rowExpandToggle',
    expandAll: '_rowExpandToggleAll',
    sort: '_sortToggle',
    select: '_selectToggle',
    'select-all': '_selectAllToggle',
    'action-bar-cancel': '_actionBarCancel',
  };

  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: `[data-table]`,
      selectorToolbar: `.${prefix}--table--toolbar`,
      selectorActions: `.${prefix}--batch-actions`,
      selectorCount: '[data-items-selected]',
      selectorActionCancel: `.${prefix}--batch-summary__cancel`,
      selectorCheckbox: `.${prefix}--checkbox`,
      selectorExpandHeader: `th.${prefix}--table-expand`,
      selectorExpandCells: `td.${prefix}--table-expand`,
      selectorExpandableRows: `.${prefix}--expandable-row`,
      selectorParentRows: `.${prefix}--parent-row`,
      selectorChildRow: '[data-child-row]',
      selectorTableBody: 'tbody',
      selectorTableSort: `.${prefix}--table-sort`,
      selectorTableSelected: `.${prefix}--data-table--selected`,
      selectorToolbarSearchContainer: `.${prefix}--toolbar-search-container-expandable`,
      selectorSearchMagnifier: `.${prefix}--search-magnifier`,
      selectorSearchInput: `.${prefix}--search-input`,
      classExpandableRow: `${prefix}--expandable-row`,
      classExpandableRowHidden: `${prefix}--expandable-row--hidden`,
      classExpandableRowHover: `${prefix}--expandable-row--hover`,
      classTableSortAscending: `${prefix}--table-sort--ascending`,
      classTableSortActive: `${prefix}--table-sort--active`,
      classToolbarSearchActive: `${prefix}--toolbar-search-container-active`,
      classActionBarActive: `${prefix}--batch-actions--active`,
      classTableSelected: `${prefix}--data-table--selected`,
      eventBeforeExpand: `data-table-beforetoggleexpand`,
      eventAfterExpand: `data-table-aftertoggleexpand`,
      eventBeforeExpandAll: `data-table-beforetoggleexpandall`,
      eventAfterExpandAll: `data-table-aftertoggleexpandall`,
      eventBeforeSort: `data-table-beforetogglesort`,
      eventAfterSort: `data-table-aftertogglesort`,
      eventTrigger: '[data-event]',
      eventParentContainer: '[data-parent-row]',
    };
  }
}

export default DataTable;
