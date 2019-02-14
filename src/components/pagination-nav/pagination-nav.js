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
import handles from '../../globals/js/mixins/handles';
import on from '../../globals/js/misc/on';

class PaginationNav extends mixin(createComponent, initComponentBySearch, handles) {
  /**
   * Pagination Nav component
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a pagination nav.
   */
  constructor(element, options) {
    super(element, options);
    this.manage(on(this.element, 'click', evt => this.handleClick(evt)));
    this.activePageNumber = this.initActivePageNumber();
    this.selectorPageSelect = this.element.querySelector(this.options.selectorPageSelect);
    if (this.selectorPageSelect) {
      this.manage(on(this.selectorPageSelect, 'change', evt => this.handleSelectChange(evt)));
    }
  }

  /**
   * Get active page number
   */
  initActivePageNumber = () => {
    let pageNum;
    const activePageElement = this.element.querySelector(this.options.selectorPageActive);
    if (activePageElement) {
      pageNum = Number(activePageElement.dataset.page);
    }
    return pageNum;
  };

  /**
   * Clear active page attributes
   */
  clearActivePage = evt => {
    const selectorPageButtonArray = this.element.querySelectorAll(this.options.selectorPageButton);
    selectorPageButtonArray.forEach(el => {
      el.classList.remove(this.options.classActive, this.options.classDisabled);
      el.disabled = false;
      el.removeAttribute('data-active');
      this.anchorAttributesHelper(el);
    });
    if (this.selectorPageSelect) {
      const selectorPageSelectOptions = this.selectorPageSelect.options;
      for (let i = 0; i < selectorPageSelectOptions.length; i++) {
        selectorPageSelectOptions[i].removeAttribute('data-active');
      }
      if (!evt.target.matches(this.options.selectorPageSelect)) {
        this.selectorPageSelect.classList.remove(this.options.classActive);
        this.selectorPageSelect.value = '';
      }
    }
  };

  /**
   * Add active state on click
   */
  handleClick = evt => {
    this.clearActivePage(evt);
    const selectorPageElementArray = this.element.querySelectorAll(this.options.selectorPageElement);
    if (evt.target.matches(this.options.selectorPageButton)) {
      this.activePageNumber = Number(evt.target.dataset.page);
    }
    if (evt.target.matches(this.options.selectorPageDirection)) {
      if (evt.target.dataset.pageDirection === 'previous') {
        this.activePageNumber -= 1;
      }
      if (evt.target.dataset.pageDirection === 'next') {
        this.activePageNumber += 1;
      }
    }
    const selectorPageTarget = selectorPageElementArray[this.activePageNumber - 1];
    selectorPageTarget.dataset.active = true;
    if (selectorPageTarget.tagName === 'OPTION') {
      this.selectorPageSelect.value = this.activePageNumber;
      this.selectorPageSelect.classList.add(this.options.classActive);
    } else {
      selectorPageTarget.classList.add(this.options.classActive, this.options.classDisabled);
      selectorPageTarget.disabled = true;
      if (selectorPageTarget.tagName === 'A') {
        selectorPageTarget.setAttribute('tabIndex', -1);
        selectorPageTarget.setAttribute('aria-disabled', true);
      }
    }
    this.setPrevNextStates();
  };

  /**
   * Handle select menu on change
   */
  handleSelectChange = evt => {
    this.clearActivePage(evt);
    this.activePageNumber = Number(evt.target.value);
    const selectorPageSelectOptions = this.selectorPageSelect.options;
    selectorPageSelectOptions[selectorPageSelectOptions.selectedIndex].dataset.active = true;
    evt.target.classList.add(this.options.classActive);
    this.setPrevNextStates();
  };

  /**
   * Set Previous and Next button states
   */
  setPrevNextStates = () => {
    const selectorPageElementArray = this.element.querySelectorAll(this.options.selectorPageElement);
    const totalPages = selectorPageElementArray.length;
    const selectorPageDirectionPrevious = this.element.querySelector('[data-page-direction="previous"]');
    const selectorPageDirectionNext = this.element.querySelector('[data-page-direction="next"]');
    if (selectorPageDirectionPrevious) {
      if (this.activePageNumber <= 1) {
        selectorPageDirectionPrevious.disabled = true;
        selectorPageDirectionPrevious.classList.add(this.options.classDisabled);
        selectorPageDirectionPrevious.blur();
        this.anchorAttributesHelper(selectorPageDirectionPrevious, 'add');
      } else {
        selectorPageDirectionPrevious.disabled = false;
        selectorPageDirectionPrevious.classList.remove(this.options.classDisabled);
        this.anchorAttributesHelper(selectorPageDirectionPrevious);
      }
    }
    if (selectorPageDirectionNext) {
      if (this.activePageNumber >= totalPages) {
        selectorPageDirectionNext.disabled = true;
        selectorPageDirectionNext.classList.add(this.options.classDisabled);
        selectorPageDirectionNext.blur();
        this.anchorAttributesHelper(selectorPageDirectionNext, 'add');
      } else {
        selectorPageDirectionNext.disabled = false;
        selectorPageDirectionNext.classList.remove(this.options.classDisabled);
        this.anchorAttributesHelper(selectorPageDirectionNext);
      }
    }
  };

  /**
   * Add or remove anchor specific element attributes
   */
  anchorAttributesHelper = (el, action = 'remove') => {
    if (el.tagName === 'A') {
      if (action === 'remove') {
        el.removeAttribute('tabindex');
        el.removeAttribute('aria-disabled');
      } else {
        el.setAttribute('tabIndex', -1);
        el.setAttribute('aria-disabled', true);
      }
    }
  };

  /**
   * The map associating DOM element and pagination nav instance.
   * @member PaginationNav.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode PaginationNav.create .create()},
   * or {@linkcode PaginationNav.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode PaginationNav.init .init()} works.
   * @member PaginationNav.options
   * @type {Object}
   * @property {string} selectorInit The data attribute to find pagination nav.
   * @property {string} selectorPageElement The data attribute to find page element.
   * @property {string} selectorPageButton The data attribute to find page interactive element.
   * @property {string} selectorPageDirection The data attribute to find page change element.
   * @property {string} selectorPageSelect The data attribute to find page select element.
   * @property {string} selectorPageActive The data attribute to find active page element.
   * @property {string} [classActive] The CSS class for page's selected state.
   * @property {string} [classDisabled] The CSS class for page's disabled state.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-pagination-nav]',
      selectorPageElement: '[data-page]',
      selectorPageButton: '[data-button]',
      selectorPageDirection: '[data-page-direction]',
      selectorPageSelect: '[data-page-select]',
      selectorPageActive: '[data-active="true"]',
      classActive: `${prefix}--pagination-nav__page--active`,
      classDisabled: `${prefix}--pagination-nav__page--disabled`,
    };
  }
}

export default PaginationNav;
