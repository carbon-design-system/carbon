import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

class Toolbar extends mixin(createComponent, initComponentBySearch) {
  /**
   * Toolbar.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as an toolbar.
   */
  constructor(element, options) {
    super(element, options);

    if (!this.element.dataset.tableTarget) {
      console.warn('There is no table bound to this toolbar!'); // eslint-disable-line no-console
    } else {
      const boundTable = this.element.ownerDocument.querySelector(this.element.dataset.tableTarget);
      const rowHeightBtns = this.element.querySelector(this.options.selectorRowHeight);
      if (rowHeightBtns) {
        rowHeightBtns.addEventListener('click', event => {
          this._handleRowHeightChange(event, boundTable);
        });
        // [...this.element.querySelectorAll(this.options.selectorRowHeight)].forEach((item) => {
        //   item.addEventListener('click', (event) => { this._handleRowHeightChange(event, boundTable); });
        // });
      }
    }

    this.hDocumentKeyDown = on(this.element.ownerDocument, 'keydown', evt => {
      this._handleKeyDown(evt);
    });

    this.hDocumentClick = on(this.element.ownerDocument, 'click', evt => {
      this._handleDocumentClick(evt);
    });
  }

  /**
   * Handles toggling of active state of the toolbar search input
   * @param {Event} event The event triggering this method.
   */
  _handleDocumentClick(event) {
    const searchInput = eventMatches(event, this.options.selectorSearch);
    const isOfSelfSearchInput = searchInput && this.element.contains(searchInput);

    if (isOfSelfSearchInput) {
      const shouldBeOpen = isOfSelfSearchInput && !this.element.classList.contains(this.options.classSearchActive);
      searchInput.classList.toggle(this.options.classSearchActive, shouldBeOpen);
      if (shouldBeOpen) {
        searchInput.querySelector('input').focus();
      }
    }

    const targetComponentElement = eventMatches(event, this.options.selectorInit);
    [...this.element.ownerDocument.querySelectorAll(this.options.selectorSearch)].forEach(item => {
      if (!targetComponentElement || !targetComponentElement.contains(item)) {
        item.classList.remove(this.options.classSearchActive);
      }
    });
  }

  /**
   * Handles toggling of active state of the toolbar search input via the keyboard
   * @param {Event} event The event triggering this method.
   */
  _handleKeyDown(event) {
    const searchInput = eventMatches(event, this.options.selectorSearch);
    const isOfSelf = this.element.contains(event.target);
    const shouldBeOpen = isOfSelf && !this.element.classList.contains(this.options.classSearchActive);

    if (searchInput) {
      if ((event.which === 13 || event.which === 32) && !shouldBeOpen) {
        searchInput.classList.add(this.options.classSearchActive);
      }

      if (event.which === 27) {
        searchInput.classList.remove(this.options.classSearchActive);
      }
    }
  }

  /**
   * Handles toggling of the row height of the associated table
   * @param {Event} event The event triggering this method.
   * @param {HTMLElement} boundTable The table associated with the toolbar.
   */
  _handleRowHeightChange(event, boundTable) {
    const value = event.currentTarget.querySelector('input:checked').value;

    if (value === 'tall') {
      boundTable.classList.add(this.options.classTallRows);
    } else {
      boundTable.classList.remove(this.options.classTallRows);
    }
  }

  release() {
    if (this.hDocumentClick) {
      this.hDocumentClick = this.hDocumentClick.release();
    }
    if (this.hDocumentKeyPress) {
      this.hDocumentKeyPress = this.hDocumentKeyPress.release();
    }
    super.release();
  }

  /**
   * The map associating DOM element and Toolbar UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * properties in this object are overriden for the instance being created.
   * @property {string} selectorInit The CSS selector to find toolbar instances.
   * @property {string} selectorSearch The CSS selector to find search inputs in a toolbar.
   * @property {string} selectorRowHeight The CSS selector to find the row height inputs in a toolbar.
   * @property {string} classTallRows The CSS class for making table rows into tall rows.
   * @property {string} classSearchActive The CSS class the active state of the search input.
   */
  static options = {
    selectorInit: '[data-toolbar]',
    selectorSearch: '[data-toolbar-search]',
    selectorRowHeight: '[data-row-height]',
    classTallRows: 'bx--responsive-table--tall',
    classSearchActive: 'bx--toolbar-search--active',
  };
}

export default Toolbar;
