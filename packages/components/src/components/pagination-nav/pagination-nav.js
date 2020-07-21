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

class PaginationNav extends mixin(
  createComponent,
  initComponentBySearch,
  handles
) {
  /**
   * Pagination Nav component
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a pagination nav.
   */
  constructor(element, options) {
    super(element, options);
    this.manage(on(this.element, 'click', (evt) => this.handleClick(evt)));
    this.manage(
      on(this.element, 'change', (evt) => {
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
    const activePageElement = this.element.querySelector(
      this.options.selectorPageActive
    );
    if (activePageElement) {
      pageNum = Number(activePageElement.getAttribute(this.options.attribPage));
    }
    return pageNum;
  };

  /**
   * Clear active page attributes
   */
  clearActivePage = (evt) => {
    const pageButtonNodeList = this.element.querySelectorAll(
      this.options.selectorPageButton
    );
    const pageSelectElement = this.element.querySelector(
      this.options.selectorPageSelect
    );
    Array.prototype.forEach.call(pageButtonNodeList, (el) => {
      el.classList.remove(this.options.classActive, this.options.classDisabled);
      el.removeAttribute(this.options.attribActive);
      el.removeAttribute('aria-disabled');
      el.removeAttribute('aria-current');
    });
    if (pageSelectElement) {
      pageSelectElement.removeAttribute('aria-current');
      const pageSelectElementOptions = pageSelectElement.options;
      Array.prototype.forEach.call(pageSelectElementOptions, (el) => {
        el.removeAttribute(this.options.attribActive);
      });
      if (!evt.target.matches(this.options.selectorPageSelect)) {
        pageSelectElement.classList.remove(this.options.classActive);
        pageSelectElement.value = '';
      }
    }
  };

  /**
   * Add active state on click
   */
  handleClick = (evt) => {
    if (!evt.target.getAttribute('aria-disabled') === true) {
      let nextActivePageNumber = this.getActivePageNumber();
      const pageElementNodeList = this.element.querySelectorAll(
        this.options.selectorPageElement
      );
      const pageSelectElement = this.element.querySelector(
        this.options.selectorPageSelect
      );
      this.clearActivePage(evt);
      if (evt.target.matches(this.options.selectorPageButton)) {
        nextActivePageNumber = Number(
          evt.target.getAttribute(this.options.attribPage)
        );
      }
      if (evt.target.matches(this.options.selectorPagePrevious)) {
        nextActivePageNumber -= 1;
      }
      if (evt.target.matches(this.options.selectorPageNext)) {
        nextActivePageNumber += 1;
      }
      const pageTargetElement = pageElementNodeList[nextActivePageNumber - 1];
      pageTargetElement.setAttribute(this.options.attribActive, true);
      if (pageTargetElement.tagName === 'OPTION') {
        pageSelectElement.value = this.getActivePageNumber();
        pageSelectElement.classList.add(this.options.classActive);
        pageSelectElement.setAttribute('aria-current', 'page');
      } else {
        pageTargetElement.classList.add(
          this.options.classActive,
          this.options.classDisabled
        );
        pageTargetElement.setAttribute('aria-disabled', true);
        pageTargetElement.setAttribute('aria-current', 'page');
      }
      this.setPrevNextStates();
    }
  };

  /**
   * Handle select menu on change
   */
  handleSelectChange = (evt) => {
    this.clearActivePage(evt);
    const pageSelectElement = this.element.querySelector(
      this.options.selectorPageSelect
    );
    const pageSelectElementOptions = pageSelectElement.options;
    pageSelectElementOptions[
      pageSelectElementOptions.selectedIndex
    ].setAttribute(this.options.attribActive, true);
    evt.target.setAttribute('aria-current', 'page');
    evt.target.classList.add(this.options.classActive);
    this.setPrevNextStates();
  };

  /**
   * Set Previous and Next button states
   */
  setPrevNextStates = () => {
    const pageElementNodeList = this.element.querySelectorAll(
      this.options.selectorPageElement
    );
    const totalPages = pageElementNodeList.length;
    const pageDirectionElementPrevious = this.element.querySelector(
      this.options.selectorPagePrevious
    );
    const pageDirectionElementNext = this.element.querySelector(
      this.options.selectorPageNext
    );
    if (pageDirectionElementPrevious) {
      if (this.getActivePageNumber() <= 1) {
        pageDirectionElementPrevious.setAttribute('aria-disabled', true);
        pageDirectionElementPrevious.classList.add(this.options.classDisabled);
      } else {
        pageDirectionElementPrevious.removeAttribute('aria-disabled');
        pageDirectionElementPrevious.classList.remove(
          this.options.classDisabled
        );
      }
    }
    if (pageDirectionElementNext) {
      if (this.getActivePageNumber() >= totalPages) {
        pageDirectionElementNext.setAttribute('aria-disabled', true);
        pageDirectionElementNext.classList.add(this.options.classDisabled);
      } else {
        pageDirectionElementNext.removeAttribute('aria-disabled');
        pageDirectionElementNext.classList.remove(this.options.classDisabled);
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
   * @type {object}
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
      selectorPageButton: '[data-page-button]',
      selectorPagePrevious: '[data-page-previous]',
      selectorPageNext: '[data-page-next]',
      selectorPageSelect: '[data-page-select]',
      selectorPageActive: '[data-page-active="true"]',
      attribPage: 'data-page',
      attribActive: 'data-page-active',
      classActive: `${prefix}--pagination-nav__page--active`,
      classDisabled: `${prefix}--pagination-nav__page--disabled`,
    };
  }
}

export default PaginationNav;
