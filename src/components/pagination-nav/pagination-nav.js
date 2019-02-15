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
    this.manage(
      on(this.element, 'change', evt => {
        if (evt.target.matches(this.options.selectorPageSelect)) {
          this.handleSelectChange(evt);
        }
      })
    );
  }

  /**
   * Get active page number
   */
  getActivePageNumber = () => {
    let pageNum;
    const activePageElement = this.element.querySelector(this.options.selectorPageActive);
    if (activePageElement) {
      pageNum = Number(activePageElement.getAttribute(this.options.attribPage));
    }
    return pageNum;
  };

  /**
   * Clear active page attributes
   */
  clearActivePage = evt => {
    const pageButtonNodeList = this.element.querySelectorAll(this.options.selectorPageButton);
    const selectorPageSelect = this.element.querySelector(this.options.selectorPageSelect);
    Array.prototype.forEach.call(pageButtonNodeList, el => {
      el.classList.remove(this.options.classActive, this.options.classDisabled);
      el.disabled = false;
      el.removeAttribute(this.options.attribActive);
      this.anchorAttributesHelper(el);
    });
    if (selectorPageSelect) {
      const selectorPageSelectOptions = selectorPageSelect.options;
      Array.prototype.forEach.call(selectorPageSelectOptions, el => {
        el.removeAttribute(this.options.attribActive);
      });
      if (!evt.target.matches(this.options.selectorPageSelect)) {
        selectorPageSelect.classList.remove(this.options.classActive);
        selectorPageSelect.value = '';
      }
    }
  };

  /**
   * Add active state on click
   */
  handleClick = evt => {
    let nextActivePageNumber = this.getActivePageNumber();
    const pageElementNodeList = this.element.querySelectorAll(this.options.selectorPageElement);
    const selectorPageSelect = this.element.querySelector(this.options.selectorPageSelect);
    this.clearActivePage(evt);
    if (evt.target.matches(this.options.selectorPageButton)) {
      nextActivePageNumber = Number(evt.target.getAttribute(this.options.attribPage));
    }
    if (evt.target.matches(this.options.selectorPageDirection)) {
      if (evt.target.getAttribute(this.options.attribPageDirection) === 'previous') {
        nextActivePageNumber -= 1;
      }
      if (evt.target.getAttribute(this.options.attribPageDirection) === 'next') {
        nextActivePageNumber += 1;
      }
    }
    const pageTargetElement = pageElementNodeList[nextActivePageNumber - 1];
    pageTargetElement.setAttribute(this.options.attribActive, true);
    if (pageTargetElement.tagName === 'OPTION') {
      selectorPageSelect.value = this.getActivePageNumber();
      selectorPageSelect.classList.add(this.options.classActive);
    } else {
      pageTargetElement.classList.add(this.options.classActive, this.options.classDisabled);
      pageTargetElement.disabled = true;
      if (pageTargetElement.tagName === 'A') {
        pageTargetElement.setAttribute('tabIndex', -1);
        pageTargetElement.setAttribute('aria-disabled', true);
      }
    }
    this.setPrevNextStates();
  };

  /**
   * Handle select menu on change
   */
  handleSelectChange = evt => {
    this.clearActivePage(evt);
    const selectorPageSelect = this.element.querySelector(this.options.selectorPageSelect);
    const selectorPageSelectOptions = selectorPageSelect.options;
    selectorPageSelectOptions[selectorPageSelectOptions.selectedIndex].setAttribute(this.options.attribActive, true);
    evt.target.classList.add(this.options.classActive);
    this.setPrevNextStates();
  };

  /**
   * Set Previous and Next button states
   */
  setPrevNextStates = () => {
    const pageElementNodeList = this.element.querySelectorAll(this.options.selectorPageElement);
    const totalPages = pageElementNodeList.length;
    const pageDirectionElementPrevious = this.element.querySelector(`[${this.options.attribPageDirection}="previous"]`);
    const pageDirectionElementNext = this.element.querySelector(`[${this.options.attribPageDirection}="next"]`);
    if (pageDirectionElementPrevious) {
      if (this.getActivePageNumber() <= 1) {
        pageDirectionElementPrevious.disabled = true;
        pageDirectionElementPrevious.classList.add(this.options.classDisabled);
        pageDirectionElementPrevious.blur();
        this.anchorAttributesHelper(pageDirectionElementPrevious, 'add');
      } else {
        pageDirectionElementPrevious.disabled = false;
        pageDirectionElementPrevious.classList.remove(this.options.classDisabled);
        this.anchorAttributesHelper(pageDirectionElementPrevious);
      }
    }
    if (pageDirectionElementNext) {
      if (this.getActivePageNumber() >= totalPages) {
        pageDirectionElementNext.disabled = true;
        pageDirectionElementNext.classList.add(this.options.classDisabled);
        pageDirectionElementNext.blur();
        this.anchorAttributesHelper(pageDirectionElementNext, 'add');
      } else {
        pageDirectionElementNext.disabled = false;
        pageDirectionElementNext.classList.remove(this.options.classDisabled);
        this.anchorAttributesHelper(pageDirectionElementNext);
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
      attribPage: 'data-page',
      attribPageDirection: 'data-page-direction',
      attribActive: 'data-active',
      classActive: `${prefix}--pagination-nav__page--active`,
      classDisabled: `${prefix}--pagination-nav__page--disabled`,
    };
  }
}

export default PaginationNav;
